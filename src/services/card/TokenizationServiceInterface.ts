import { Card } from '../../enity/Card';
import { Token } from '../../enity/Token';

export interface TokenizationServiceInterface {
  tokenizeCard(card: Card): Token;

  persist(card: Card, token: Token): Promise<boolean>;
}
