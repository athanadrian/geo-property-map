const { ApolloServer } = require('apollo-server');
const dotenv = require('dotenv');
require('colors');

// get enviroment variables
dotenv.config({ path: './config/config.env' });

// import mongo DB connection
const connectDB = require('./config/db');

// import Apollo-Server dependencies
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// import controllers & functionality
const { findOrCreateUser } = require('./controllers/userController');

// connect to mongoDB
connectDB();

// initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (error) {
      console.error(`Unable to authenticate with token ${authToken}, ERROR: ${error}`);
    }
    // we provide the result through context
    return { currentUser };
  },
});

const port = process.env.PORT || 4000;

// Connect to Server
server
  .listen(port)
  .then(({ url }) =>
    console.log(
      `${'Server'.yellow.bold} ${'is running in'.yellow} ${
        process.env.NODE_ENV.yellow.bold.underline
      } ${'mode and listening on port:'.yellow} ${port.yellow.bold.underline}. ${
        'Server started....on url:'.yellow
      } ${url.yellow.bold.underline} `
    )
  );

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`UNHANDLED REJECTION 🎇 shuting down.......`);
  console.log(`Error: ${err.name} - ${err.message}`.red);
  // Close Server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`UNCAUGHT EXCEPTION 🎇 shuting down.......`);
  console.log(`Error: ${err.name} - ${err.message}`.red);
  // Close Server & exit process
  server.close(() => process.exit(1));
});
