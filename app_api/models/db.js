const mongoose = require('mongoose');
const readLine = require('readline');


let dbURL = 'mongodb+srv://thakurjp:thakur64@cluster0.ekb4npj.mongodb.net/expresslocation?retryWrites=true&w=majority';

const connect = () => {
  setTimeout(() => mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }), 1000);
}

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURL}`);
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit("SIGINT");
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

connect();

require('./locations');
