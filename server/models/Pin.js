const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    image: String,
    latitude: Number,
    longitude: Number,
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        author: { type: mongoose.Schema.ObjectId, ref: 'User' },
      },
    ],
    owners: [
      {
        name: String,
        percentage: String,
        createdAt: { type: Date, default: Date.now },
        creater: { type: mongoose.Schema.ObjectId, ref: 'User' },
      },
    ],
    assets: [
      {
        codeName: String,
        renter: String,
        rent: String,
        isRented: Boolean,
        category: String,
        creater: { type: mongoose.Schema.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pin', PinSchema);
