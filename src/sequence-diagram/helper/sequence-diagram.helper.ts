/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SequenceDiagram } from '../entities/sequence-diagram.entity';

export function transform(dbElement): SequenceDiagram {
  const { _id, __v, ...element } = dbElement.toObject();
  const result = {
    id: _id,
    ...element,
  };
  return result as SequenceDiagram;
}
