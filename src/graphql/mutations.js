import gql from "graphql-tag";

// export const registerUserMutation = gql`
//   mutation register(registerInput: $registerDto) {
//         activation_token
//         error{
//           message
//         }
//       }

// `;

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
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
