import { gql } from "@apollo/client";

export default gql`
  mutation updateMember($id: ID!, $params: MemberAttributes!) {
    updateMember(input: { id: $id, params: $params }) {
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
