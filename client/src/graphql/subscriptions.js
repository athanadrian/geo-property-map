import gql from 'graphql-tag';

export const PIN_ADDED_SUBSCRIPTION = gql`
  subscription {
    pinAdded {
      _id
      createdAt
      updatedAt
      title
      category
      image
      content
      latitude
      longitude
      author {
        _id
        name
        email
        picture
      }
      owners {
        name
        percentage
        creater {
          name
          picture
        }
      }
      assets {
        codeName
        renter
        rent
        category
        isRented
        creater {
          name
          picture
        }
      }
      comments {
        text
        createdAt
        author {
          name
          picture
        }
      }
    }
  }
`;

export const PIN_UPDATED_SUBSCRIPTION = gql`
  subscription {
    pinUpdated {
      _id
      createdAt
      updatedAt
      title
      category
      content
      image
      latitude
      longitude
      author {
        _id
        name
      }
      owners {
        name
        percentage
        creater {
          name
          picture
        }
      }
      assets {
        codeName
        renter
        rent
        category
        isRented
        creater {
          name
          picture
        }
      }
      comments {
        text
        createdAt
        author {
          name
          picture
        }
      }
    }
  }
`;

export const PIN_DELETED_SUBSCRIPTION = gql`
  subscription {
    pinDeleted {
      _id
    }
  }
`;
