import gql from "graphql-tag";

export const authUserQuery = gql`
  query authUser {
    user {
      id
      name
      email
      avatar
      role
      address
      phone_number
      createdAt
    }
    accessToken
    refreshToken
  }
`;
