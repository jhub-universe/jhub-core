export default `
  scalar Date 

  type Name {
    first: String!
    last: String!
  }

  type User {
    nickName: String!
    name: Name!
    email: String!
    showEmail: Boolean
    aboutMe: String
    webSite: String
    work: String
    contry: String
  }

  type Follow {
    profileId: String!
    user: User
    followedDate: Date
  }

  type Profile {
    id: ID
    user: User!
    followers: [Follow]!
    following: [Follow]!
    planets: [Planet]!
    deletedAt: Date
  }

  type Query {
    allProfiles: [Profile]!
  }
`
