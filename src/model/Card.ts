import { Schema, model } from 'mongoose';
import { Card } from '../enity/Card';
import { cardValidator } from '../validator/CardValidator';
import { cvvValidator } from '../validator/CVVValidator';
import { emailValidator } from '../validator/EmailValidator';
import { monthValidator } from '../validator/MonthValidator';
import { yearValidator } from '../validator/YearValidator';

const CardSchema = new Schema<Card>({
  email: {
    type: String,
  },
  card_number: {
    type: Number,
  },
  cvv: {
    type: Number,
  },
  expiration_year: {
    type: String,
  },
  expiration_month: {
    type: String,
  },
  token: { type: String },
});

export default model('Card', CardSchema);
