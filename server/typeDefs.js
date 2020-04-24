const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Pin {
    _id: ID
    createdAt: String
    updatedAt: String
    title: String
    content: String
    category: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
    owners: [Owner]
    assets: [Asset]
  }

  type Owner {
    name: String
    percentage: String
    createdAt: String
    creater: User
  }

  type Asset {
    codeName: String
    renter: String
    rent: String
    category: String
    isRented: Boolean
    creater: User
  }

  input CreateAssetInput {
    codeName: String
    renter: String
    rent: String
    category: String
    isRented: Boolean
  }

  type Comment {
    text: String
    createdAt: String
    author: User
  }

  input CreatePinInput {
    title: String
    image: String
    category: String
    content: String
    latitude: Float
    longitude: Float
  }

  input OwnerInput {
    name: String
    percentage: String
  }

  type Query {
    me: User
    getPins: [Pin!]
  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
    deletePin(pinId: ID!): Pin
    createComment(pinId: ID!, text: String!): Pin
    createOwner(pinId: ID!, name: String!, percentage: String!): Pin
    updateOwner(pinId: ID!, i: Int!, name: String, percentage: String!): Pin
    deleteOwner(pinId: ID!, i: Int!): Pin
    createAsset(
      pinId: ID!
      codeName: String!
      renter: String
      rent: String
      category: String!
      isRented: Boolean!
    ): Pin
    updateAsset(
      pinId: ID!
      codeName: String!
      renter: String
      rent: String
      category: String!
      isRented: Boolean!
    ): Pin
    deleteAsset(pinId: ID!, i: Int!): Pin
  }

  type Subscription {
    pinAdded: Pin
    pinDeleted: Pin
    pinUpdated: Pin
  }
`;
