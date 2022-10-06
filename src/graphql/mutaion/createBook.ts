import { gql } from "@apollo/client";

export default gql`
  mutation createBook($params: BookAttributes!) {
    createBook(input: { params: $params }) {
      book {
        id
        title
      }
    }
  }
`;
