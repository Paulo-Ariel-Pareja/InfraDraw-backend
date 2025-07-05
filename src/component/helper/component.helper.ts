/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, Endpoint } from '../entities/component.entity';

export function transform(dbElement): Component {
  const { _id, __v, ...element } = dbElement.toObject();
  const { endpoints, ...data } = element;
  const endpointEdited = endpoints.map((e) => {
    const { _id, ...others } = e;
    return {
      id: _id,
      ...others,
    } as Endpoint;
  });
  const result = {
    id: _id,
    endpoints: endpointEdited,
    ...data,
  };
  return result as Component;
}
