import { encode, TAlgorithm } from 'jwt-simple';
import { Card } from '../../enity/Card';
import { CardSession } from '../../enity/CardSession';
import { Token } from '../../enity/Token';
import { TokenizationServiceInterface } from './TokenizationServiceInterface';
import { CardRepository } from '../../repository/card/CardRepository';

export class TokenizationService implements TokenizationServiceInterface {
  public repository: CardRepository;
  constructor() {
    this.repository = new CardRepository();
  }

  tokenizeCard(card: Card): Token {
    const algorithm: TAlgorithm = 'HS512';

    const issued: number = Date.now();
    const fifteenMinutesToMs: number = 15 * 60 * 1000;
    const expires: number = issued + fifteenMinutesToMs;
    const cardSession: CardSession = {
      ...card,
      issued,
      expires,
    };

    return {
      token: encode(cardSession, 'secret', algorithm),
      issued,
      expires,
    };
  }

  async persist(card: Card, token: Token): Promise<boolean> {
    return await this.repository.save(card, token);
  }
}
