import database from '../database'

class AddressServices {
  static async getAllCitiesWithNeighborhoods() {
    const cities = await database.city.findMany({
      include: {
        neighborhoods: true,
      },
    })

    return cities
  }
}

export default AddressServices
