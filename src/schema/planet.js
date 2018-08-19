// REFAC: StarUser seems a jerry-rig
export default `
  type StarUser {
    users: [User]!
  }
  type Star {
    by: StarUser!
  }

  type OpenedUser {
    usersId: [User]!
  }

  type Opened {
    by: OpenedUser!
  }

  type JupterNotebook {
    link: String!
    size: Int
    imageURL: String
    needGPU: Boolean
  }

  type Planet {
    name: String!
    stared: Star
    opened: Opened
    views: Int
    description: String
    jupterNotebook: JupterNotebook!
    framworks: [String]!
    libs: [String]!
    deletedAt: Date
  }
`
