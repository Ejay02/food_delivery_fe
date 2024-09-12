import gql from "graphql-tag";

export const registerMutation = gql`
  mutation register(
    $name: String!
    $password: String!
    $email: String!
    $phone_number: Float!
  ) {
    register(
      registerInput: {
        name: $name
        password: $password
        email: $email
        phone_number: $phone_number
      }
    ) {
      activation_token
    }
  }
`;

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        role
        address
        createdAt
        phone_number
        avatar {
          id
          public_id
          url
          userId
        }
      }
      accessToken
      refreshToken
      error {
        message
      }
    }
  }
`;