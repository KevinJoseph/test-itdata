import { ConfigInterface } from '../ConfigInterface';
import dotenv from 'dotenv';
dotenv.config();

export class MongoDbConfig implements ConfigInterface {
  public mongoUrl: string = '';

  load(): void {
    this.mongoUrl = process.env.MONGODB_URL as string;
  }
}
