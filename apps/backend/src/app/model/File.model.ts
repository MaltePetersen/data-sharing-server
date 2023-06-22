import { Token } from './Token.model';

export interface File {
  id: string;
  name: string;
  content: Buffer;
  uploadDate: Date;
  token: Token;
}
