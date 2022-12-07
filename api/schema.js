export const typeDefs = `#graphql

type City {
  city: String
  country: String
  state: String
}

type Address {
  city: String
  country: String
  full: String
  street: String
  state: String
  lat: Float
  lng: Float
}

type Picture {
  original: String
  thumbnail: String
}

type Prices {
  basePrice: Int
  currency: String
}

type Apartment {
  id: String
  title: String
  pictures: [Picture]
  prices: Prices
  address: Address
}

type Query {
  hello: String
  apartments: [Apartment]
  cities: [City]
}
`
export const resolvers = {
  Query: {
    hello: () => 'world',
    //apartments: () => apartmentsFromGuesty,
    apartments: async (_, {}, { dataSources }) => {
      return dataSources.guestyAPI.getApartments(12)
    },
    cities: async (_, {}, { dataSources }) => {
      return dataSources.guestyAPI.getCities()
    },
  },
}
