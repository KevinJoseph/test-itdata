import { ConfigInterface } from '../ConfigInterface';
import dotenv from 'dotenv';

dotenv.config();

export class MongoDbConfig implements ConfigInterface {
  mongoUrl: string = '';

  load(): void {
    this.mongoUrl = process.env.MONGODB_URL as string;
  }
}
