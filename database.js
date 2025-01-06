const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://login1:l81979914@logins.udp2u.mongodb.net/?retryWrites=true&w=majority&appName=Logins";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Você se conectou com sucesso ao MongoDB!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

module.exports = uri;