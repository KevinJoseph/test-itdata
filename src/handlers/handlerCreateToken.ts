import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Card } from '../enity/Card';
import { MongoDbService } from '../services/db/MongoDbService';
import { validateCreditCard } from '../utils/validateCreditCard';
import { TokenizationService } from '../services/card/TokenizationService';
import { Token } from '../enity/Token';

new MongoDbService().connect;
const tokenizationService = new TokenizationService();

export const createToken = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({}),
  };

  try {
    const requestBody = JSON.parse(event.body as string);
    await validateCreditCard.validate(requestBody);
    const card: Card = { ...requestBody };
    const cardToken: Token = tokenizationService.tokenizeCard(card);
    const wasCardSaved = await tokenizationService.persist(card, cardToken);
    if (wasCardSaved) {
      response.statusCode = 200;
      response.body = JSON.stringify(cardToken);

      return response;
    }

    response.body = JSON.stringify({
      message: 'unable to save card into database, please check the connection',
    });

    response.body = JSON.stringify('ok');
  } catch (error: unknown) {
    response.body = JSON.stringify('error');
  }

  return response;
};
