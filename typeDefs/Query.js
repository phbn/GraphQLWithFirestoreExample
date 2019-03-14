export default `
# Query our API
type Query {
  User(id: ID!): User
  Space(id: ID!): Space
}
`;
