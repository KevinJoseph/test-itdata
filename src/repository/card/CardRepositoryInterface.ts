import { Card } from '../../enity/Card';
import { Token } from '../../enity/Token';

export interface CardRepositoryInterface {
  save(card: Card, cardToken: Token): Promise<boolean>;
}
