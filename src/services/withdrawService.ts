import database from '../database'

class WithdrawService {
  static async store(value: number, userId: string) {
    return database.withdrawl.create({
      data: {
        value,
        userId,
      },
    })
  }
}

export default WithdrawService
