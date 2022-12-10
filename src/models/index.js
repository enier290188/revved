// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserGroup = {
  "ADMIN": "ADMIN",
  "SHELTER": "SHELTER"
};

const { User } = initSchema(schema);

export {
  User,
  UserGroup
};