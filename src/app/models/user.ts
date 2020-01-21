import {Recipient} from './recipient';

export interface User {
  userId: number;
  username: string;
  password: string;
  email: string;
  recipients: Recipient[];
}
