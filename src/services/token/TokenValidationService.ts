import { decode, TAlgorithm } from 'jwt-simple';
import { CardSession } from '../../enity/CardSession';
import { TokenValidationResult } from '../../enity/TokenValidationResult';
import { TokenValidationType } from '../../enity/TokenValidationType';
import { TokenValidationServiceInterface } from './TokenValidationServiceInteface';

export class TokenValidationService implements TokenValidationServiceInterface {
  private decAlgorithm: TAlgorithm = 'HS512';

  validate(token: string): TokenValidationResult {
    const result: TokenValidationResult = { type: TokenValidationType.INVALID };

    let session: CardSession;

    try {
      session = decode(token, 'secret', false, this.decAlgorithm);
    } catch (err: unknown) {
      return result;
    }

    if (Date.now() > session.expires) {
      result.type = TokenValidationType.INVALID;
    } else {
      result.type = TokenValidationType.VALID;
    }

    result.session = session;

    return result;
  }
}
