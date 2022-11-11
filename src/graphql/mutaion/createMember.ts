import { gql } from "@apollo/client";

export default gql`
  mutation createMember($params: MemberAttributes!) {
    createMember(input: { params: $params }) {
      member {
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
  }
`;
