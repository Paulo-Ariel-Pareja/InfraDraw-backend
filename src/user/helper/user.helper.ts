/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { User } from '../entities/user.entity';

export function transform(dbElement): User {
  const { _id, password, __v, ...others } = dbElement.toObject();
  return {
    id: _id,
    ...others,
  } as User;
}
