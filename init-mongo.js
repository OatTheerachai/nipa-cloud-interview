db = db.getSiblingDB("mydatabase");

db.createUser({
  user: "root",
  pwd: "example",
  roles: [
    {
      role: "readWrite",
      db: "mydatabase",
    },
  ],
});

db.tickets.insertMany([
  {
    title: "Sample Ticket 1",
    description: "Description for ticket 1",
    contactInformation: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "0984121212",
    },
    createdTimestamp: new Date(),
    latestUpdateTimestamp: new Date(),
    status: "pending",
  },
  {
    title: "Sample Ticket 2",
    description: "Description for ticket 2",
    contactInformation: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "0977777777",
    },
    createdTimestamp: new Date(),
    latestUpdateTimestamp: new Date(),
    status: "resolved",
  },
]);
