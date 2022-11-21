import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MongoDbService } from '../services/db/MongoDbService';

new MongoDbService().connect;

export const createToken = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({}),
  };

  try {
    response.body = JSON.stringify('ok');
  } catch (error: unknown) {
    response.body = JSON.stringify('error');
  }

  return response;
};
