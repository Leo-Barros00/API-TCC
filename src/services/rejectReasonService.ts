import database from '../database'

class RejectReasonService {
  static async store(userId: string, reason: string) {
    return await database.rejectReason.create({
      data: {
        userId,
        reason,
      },
    })
  }
}

export default RejectReasonService
