export const CREATE_PIN_MUTATION = `
  mutation($title: String!, $category: String!, $image: String!, $content: String!, $latitude: Float!, $longitude: Float!) {
    createPin(input: {
      title: $title,
      category: $category,
      image: $image,
      content: $content,
      latitude: $latitude,
      longitude: $longitude
    }) {
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
    }
  }
`;

export const DELETE_PIN_MUTATION = `
  mutation($pinId: ID!) {
    deletePin(pinId: $pinId) {
      _id
    }
  }
`;

export const CREATE_COMMENT_MUTATION = `
  mutation($pinId: ID!, $text: String!) {
    createComment(pinId: $pinId, text: $text) {
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

export const CREATE_OWNER_MUTATION = `
  mutation($pinId: ID!, $name: String!, $percentage: String!) {
    createOwner(pinId: $pinId, name: $name, percentage:$percentage) {
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
      comments {
        text
        createdAt
        author {
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
    }
  }
`;
export const UPDATE_OWNER_MUTATION = `
  mutation($pinId: ID!, $i: Int!, $name: String!, $percentage: String!) {
    updateOwner(pinId: $pinId, i: $i, name: $name, percentage: $percentage) {
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
      comments {
        text
        createdAt
        author {
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
    }
  }
`;

export const DELETE_OWNER_MUTATION = `
  mutation($pinId: ID!, $i:Int!) {
    deleteOwner(pinId: $pinId, i:$i) {
      _id
    }
  }
`;

export const CREATE_ASSET_MUTATION = `
  mutation($pinId: ID!, $codeName: String!, $renter: String, $rent: String, $isRented:Boolean!, $category:String!) {
    createAsset(pinId: $pinId, codeName: $codeName, renter: $renter, rent: $rent, isRented:$isRented, category:$category) {
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
      owners {
        name
        percentage
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
export const UPDATE_ASSET_MUTATION = `
  mutation($pinId: ID!, $i: Int!, $codeName: String!, $renter: String, $rent: String, $isRented:Boolean!, $category:String!) {
    updateAsset(pinId: $pinId, i: $i, codeName: $codeName, renter: $renter, rent: $rent, isRented:$isRented, category:$category) {
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
      owners {
        name
        percentage
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

export const DELETE_ASSET_MUTATION = `
  mutation($pinId: ID!, $i:Int!) {
    deleteAsset(pinId: $pinId, i:$i) {
      _id
    }
  }
`;
