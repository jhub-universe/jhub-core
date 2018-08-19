import { tryLogin } from '../auth'
import formatErrors from '../formatErrors'

export default {
  Query: {
    allProfiles: async (parent, args, { repositories }) => {
      // const ProfileRepository = repositories.ProfileRepository
      // return await ProfileRepository.findAll()
    }
  }
}
