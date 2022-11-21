import { MongoDbServiceInterface } from './MongoDbServiceInterface';
import { connect } from 'mongoose';
import { MongoDbConfig } from '../../config/db';

export class MongoDbService implements MongoDbServiceInterface {
  public config: MongoDbConfig;

  constructor() {
    this.config = new MongoDbConfig();
    this.config.load();
  }

  connect(): void {
    const con = connect(this.config.mongoUrl);
    con
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
