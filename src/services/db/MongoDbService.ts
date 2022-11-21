import { MongoDbServiceInterface } from './MongoDbServiceInterface';
import { connect } from 'mongoose';
import { MongoDbConfig } from '../../config/db';

export class MongoDbService implements MongoDbServiceInterface {
  public config: MongoDbConfig = new MongoDbConfig();

  constructor() {
    this.config.load();
  }

  connect(): void {
    connect(this.config.mongoUrl)
      .then(() => {
        console.log('[+] Database connected with Atlas Cluster');
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
