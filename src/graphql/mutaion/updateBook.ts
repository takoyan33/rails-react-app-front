import { gql } from "@apollo/client";

export default gql`
  mutation updateBook($id: ID!, $params: BookAttributes!) {
    updateBook(input: { id: $id, params: $params }) {
      book {
        id
        title
      }
    }
  }
`;
