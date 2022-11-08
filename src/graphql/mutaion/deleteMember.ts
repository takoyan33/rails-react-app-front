import { gql } from "@apollo/client";

export default gql`
  mutation deleteMember($id: ID!) {
    deleteMember(input: { id: $id }) {
      id
    }
  }
`;
