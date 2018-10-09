import assert from 'assert';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

// models
import { IModel } from './models/models';
import { IUserModel } from './models/user';

// schemas
import { userSchema } from './schemas/user';

// Use connect method to connect to the server

export default () => {
  let dbName;
  switch (process.env.NODE_ENV) {
    case 'test':
      dbName = 'chatter_test';
      break;
    case 'production':
      dbName = 'chatter';
      break;
    default:
      dbName = 'chatter_dev';
  }

  // an instance of IModel
  let model: IModel;

  // use q promises
  global.Promise = require('q').Promise;
  mongoose.Promise = global.Promise;

  // Connection URL
  const mongodbConnection = `mongodb://localhost:27017/${dbName}`;

  // connect to mongoose
  let connection: mongoose.Connection = mongoose.createConnection(mongodbConnection);

  // create models
  model.user = connection.model<IUserModel>('User', userSchema);
};
