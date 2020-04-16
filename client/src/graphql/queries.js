export const ME_QUERY = `
{
  me {
    _id
		name
		email
		picture
  }
}
`;

export const GET_PINS_QUERY = `
  {
    getPins {
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
          _id 
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
          _id 
          name
          picture
        }
      }
      comments {
        text
        createdAt
        author {
          _id 
          name
          picture
        }
      }
    }
  }
`;
