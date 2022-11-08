import { gql } from "@apollo/client";

export default gql`
  query members {
    members {
      userid
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
