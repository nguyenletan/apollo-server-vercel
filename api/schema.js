
export const typeDefs = `#graphql

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
}
`;
export const resolvers = {
    Query: {
        hello: () => 'world',
        //apartments: () => apartmentsFromGuesty,
        apartments: async (_, {}, { dataSources }) => {
            return dataSources.guestyAPI.getApartments(10);
        },
    },
};
