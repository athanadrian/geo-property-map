const { AuthenticationError, PubSub } = require('apollo-server');
const Pin = require('./models/Pin');

const pubsub = new PubSub();
const PIN_ADDED = 'PIN_ADDED';
const PIN_DELETED = 'PIN_DELETED';
const PIN_UPDATED = 'PIN_UPDATED';

const authenticated = (next) => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in');
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),
    getPins: async (root, args, ctx) => {
      const pins = await Pin.find({})
        .populate('author')
        .populate('comments.author')
        .populate('owners.author')
        .populate('assets.author');
      return pins;
    },
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id,
      });
      newPin.save();
      const pinAdded = await Pin.populate(newPin, 'author');
      pubsub.publish(PIN_ADDED, { pinAdded });
      return pinAdded;
    }),
    deletePin: authenticated(async (root, args, ctx) => {
      const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();
      pubsub.publish(PIN_DELETED, { pinDeleted });
      return pinDeleted;
    }),
    createComment: authenticated(async (root, args, ctx) => {
      const newComment = { text: args.text, author: ctx.currentUser._id };
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $push: { comments: newComment } },
        { new: true }
      )
        .populate('author')
        .populate('comments.author')
        .populate('owners.author')
        .populate('assets.author');
      pubsub.publish(PIN_UPDATED, { pinUpdated });
      return pinUpdated;
    }),
    createOwner: authenticated(async (root, args, ctx) => {
      const newOwner = {
        name: args.name,
        percentage: args.percentage,
        creater: ctx.currentUser._id,
      };
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $push: { owners: newOwner } },
        { new: true }
      )
        .populate('author')
        .populate('comments.author')
        .populate('owners.author')
        .populate('assets.author');
      pubsub.publish(PIN_UPDATED, { pinUpdated });
      return pinUpdated;
    }),
    deleteOwner: authenticated(async (root, args, ctx) => {
      const pin = await Pin.find({ _id: args.pinId }).exec();
      // console.log('pin', pin[0].owners);
      // const owners = pin[0].owners;
      // owners.slice(args.i, 1);
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $set: { owners: pin[0].owners.slice(args.i, 1) } },
        { new: true }
      )
        .populate('author')
        .populate('comments.author')
        .populate('owners.author')
        .populate('assets.author');
      pubsub.publish(PIN_UPDATED, { pinUpdated });
      return pinUpdated;
    }),
    createAsset: authenticated(async (root, args, ctx) => {
      const newAsset = {
        creater: ctx.currentUser._id,
        codeName: args.codeName,
        renter: args.renter,
        rent: args.rent,
        category: args.category,
        isRented: args.isRented,
      };
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $push: { assets: newAsset } },
        { new: true }
      )
        .populate('author')
        .populate('comments.author')
        .populate('owners.author')
        .populate('assets.author');
      pubsub.publish(PIN_UPDATED, { pinUpdated });
      return pinUpdated;
    }),
  },
  Subscription: {
    pinAdded: {
      subscribe: () => pubsub.asyncIterator(PIN_ADDED),
    },
    pinDeleted: {
      subscribe: () => pubsub.asyncIterator(PIN_DELETED),
    },
    pinUpdated: {
      subscribe: () => pubsub.asyncIterator(PIN_UPDATED),
    },
  },
};
