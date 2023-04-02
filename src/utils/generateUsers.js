import { faker } from '@faker-js/faker'

const generateUser = () => ({
  id: faker.datatype.uuid(),
  username: faker.internet.userName(),
  age: faker.datatype.number({ min: 18, max: 80 }),
  phoneNumber: faker.phone.number(),
  occupation: faker.name.jobTitle(),
  address: {
    street: faker.address.street(),
    city: faker.address.city(),
    state: faker.address.state(),
    streetAddress: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    country: setCountry(),
  },
  vehicle: {
    make: setManufacturer(),
    model: faker.vehicle.model(),
    age:
      new Date().getFullYear() -
      faker.datatype.number({ min: 1998, max: 2010 }),
  },
})

export const users = []

for (let i = 0; i < 100000; i++) {
  users.push(generateUser())
}
