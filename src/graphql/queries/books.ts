import { gql } from "@apollo/client";

export default gql`
  query books {
    books {
      id
      title
    }
  }
`;
