const apartmentsFromGuesty = [
    {
        id: '631815d66781f70033d49b10',
        title: "Griffith Wood - One Bedroom Apartment",
    }
];
export const typeDefs = `#graphql
  type Apartment {
    id: String
    title: String
  }

  type Query {
    hello: String
    apartments: [Apartment]
  }
`;
export const resolvers = {
    Query: {
        hello: () => 'world',
        apartments: () => apartmentsFromGuesty,
    },
};
