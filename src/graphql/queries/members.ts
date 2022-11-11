import { gql } from "@apollo/client";

export default gql`
  query members {
    members {
      id
      fullname
      hurigana
      department
      grade
      gender
      birthday
      admin
    }
  }
`;
