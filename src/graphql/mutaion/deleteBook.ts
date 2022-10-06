import { gql } from "@apollo/client";

export default gql`
  mutation deleteBook($id: ID!) {
    deleteBook(input: { id: $id }) {
      id
    }
  }
`;
