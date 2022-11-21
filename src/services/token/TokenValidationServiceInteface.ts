import { TokenValidationResult } from '../../enity/TokenValidationResult';

export interface TokenValidationServiceInterface {
  validate(token: string): TokenValidationResult;
}
