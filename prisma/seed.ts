import database from '../src/database'
import log, { LogType } from '../src/utils/log'

const addressStateCityNeighborhood = [
  {
    stateName: 'Acre',
    uf: 'AC',
    cities: [],
  },
  {
    stateName: 'Alagoas',
    uf: 'AL',
    cities: [],
  },
  {
    stateName: 'Amapá',
    uf: 'AP',
    cities: [],
  },
  {
    stateName: 'Amazonas',
    uf: 'AM',
    cities: [],
  },
  {
    stateName: 'Bahia',
    uf: 'BA',
    cities: [
      {
        cityName: 'Brumado',
        neighborhoods: [
          'Centro',
          'Baraúnas',
          'Vila Presidente Vargas',
          'São Jorge',
          'São Félix',
          'Parque Alvorada',
          'Novo Brumado',
        ],
      },
    ],
  },
  {
    stateName: 'Ceará',
    uf: 'CE',
    cities: [],
  },
  {
    stateName: 'Distrito Federal',
    uf: 'DF',
    cities: [],
  },
  {
    stateName: 'Espírito Santo',
    uf: 'ES',
    cities: [],
  },
  {
    stateName: 'Goiás',
    uf: 'GO',
    cities: [],
  },
  {
    stateName: 'Maranhão',
    uf: 'MA',
    cities: [],
  },
  {
    stateName: 'Mato Grosso',
    uf: 'MT',
    cities: [],
  },
  {
    stateName: 'Mato Grosso do Sul',
    uf: 'MS',
    cities: [],
  },
  {
    stateName: 'Minas Gerais',
    uf: 'MG',
    cities: [
      {
        cityName: 'Juvenilia',
        neighborhoods: ['Centro', 'Vila Pardal'],
      },
      {
        cityName: 'Espinosa',
        neighborhoods: [],
      },
    ],
  },
  {
    stateName: 'Pará',
    uf: 'PA',
    cities: [],
  },
  {
    stateName: 'Paraíba',
    uf: 'PB',
    cities: [],
  },
  {
    stateName: 'Paraná',
    uf: 'PR',
    cities: [],
  },
  {
    stateName: 'Pernambuco',
    uf: 'PE',
    cities: [],
  },
  {
    stateName: 'Piauí',
    uf: 'PI',
    cities: [],
  },
  {
    stateName: 'Rio de Janeiro',
    uf: 'RJ',
    cities: [
      {
        cityName: 'Rio de Janeiro',
        neighborhoods: [
          'Centro',
          'Benfica',
          'Botafogo',
          'Grajaú',
          'Barra da Tijuca',
          'Bangu',
          'Realengo',
        ],
      },
    ],
  },
  {
    stateName: 'Rio Grande do Norte',
    uf: 'RN',
    cities: [],
  },
  {
    stateName: 'Rio Grande do Sul',
    uf: 'RS',
    cities: [],
  },
  {
    stateName: 'Rondônia',
    uf: 'RO',
    cities: [],
  },
  {
    stateName: 'Roraima',
    uf: 'RR',
    cities: [],
  },
  {
    stateName: 'Santa Catarina',
    uf: 'SC',
    cities: [],
  },
  {
    stateName: 'São Paulo',
    uf: 'SP',
    cities: [
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
    ],
  },
  {
    stateName: 'Sergipe',
    uf: 'SE',
    cities: [],
  },
  {
    stateName: 'Tocantins',
    uf: 'TO',
    cities: [],
  },
]

async function main() {
  // Seeding states, citys and neighborhoods
  await addressStateCityNeighborhood.reduce(async (memo, { stateName, uf, cities }) => {
    await memo

    const state = await database.state.create({
      data: {
        name: stateName,
        uf,
      },
    })

    await cities.reduce(async (memo, { cityName, neighborhoods }) => {
      await memo

      const neighborhoodFormatted = neighborhoods.map((neighborhoodName) => ({
        name: neighborhoodName,
      }))

      await database.city.create({
        data: {
          name: cityName,
          stateId: state.id,
          neighborhoods: {
            createMany: {
              data: neighborhoodFormatted,
            },
          },
        },
      })
    }, undefined as any)
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
