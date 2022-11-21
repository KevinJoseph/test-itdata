import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { TokenValidationResult } from '../enity/TokenValidationResult';
import { TokenValidationType } from '../enity/TokenValidationType';
import { TokenValidationService } from '../services/token/TokenValidationService';

export const validate = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({}),
  };

  try {
    const authToken: string = event.headers.authorization as string;
    const privateKey: string = event.headers.pk as string;

    if (!privateKey) {
      response.body = JSON.stringify({ message: 'pk is invalid' });

      return response;
    }

    const tokenValidationResult: TokenValidationResult = new TokenValidationService().validate(
      authToken,
    );

    if (tokenValidationResult.type === TokenValidationType.INVALID) {
      response.body = JSON.stringify({
        message: 'token has expired',
      });
      return response;
    }

    if (!tokenValidationResult.session) {
      response.body = JSON.stringify({
        message: 'invalid card session',
      });

      return response;
    }

    const { card_number, expiration_year, expiration_month } = tokenValidationResult.session;

    response.statusCode = 200;
    response.body = JSON.stringify({
      card_number,
      expiration_year,
      expiration_month,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
  }

  return response;
};
