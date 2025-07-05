/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Board } from '../entities/board.entity';

export function transform(dbElement): Board {
  const { _id, __v, ...element } = dbElement.toObject();
  const result = {
    id: _id,
    ...element,
  };
  return result as Board;
}
