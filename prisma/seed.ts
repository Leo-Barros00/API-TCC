import database from '../src/database'
import log, { LogType } from '../src/utils/log'

const addressCityNeighborhood = [
  {
    cityName: 'Campinas',
    neighborhoods: [
      'Centro',
      'Cambuí',
      'Barão Geraldo',
      'Cidade Universitária',
      'Taquaral',
      'Nova Campinas',
      'Satélite Íris',
    ],
  },
  {
    cityName: 'Valinhos',
    neighborhoods: [
      'Centro',
      'Jardim Centenário',
      'Vera Cruz',
      'Jardim São Marcos',
      'Dois Córregos',
    ],
  },
]

async function main() {
  // Seeding citys and neighborhoods
  await addressCityNeighborhood.reduce(async (memo, { cityName, neighborhoods }) => {
    await memo

    const neighborhoodFormatted = neighborhoods.map((neighborhoodName) => ({
      name: neighborhoodName,
    }))

    await database.city.create({
      data: {
        name: cityName,
        neighborhoods: {
          createMany: {
            data: neighborhoodFormatted,
          },
        },
      },
    })
  }, undefined as any)

  log(LogType.SUCCESS, 'SEED', 'Database seeded')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await database.$disconnect()
  })
