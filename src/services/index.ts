import { Mongoose } from 'mongoose';

export interface MongoDbServiceInterface {
  connect(): Promise<Mongoose>;
}
