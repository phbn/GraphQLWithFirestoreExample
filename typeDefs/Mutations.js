export default `
# this schema allows the following mutation:
type Mutation {
  LikeUser (
    id: ID!
  ): User
}
`;
