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
