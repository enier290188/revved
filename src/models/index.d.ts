import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";

export enum UserGroup {
  ADMIN = "ADMIN",
  SHELTER = "SHELTER"
}



export declare class User {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly picture?: string | null;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly userGroupList?: (UserGroup | null)[] | keyof typeof UserGroup | null;
  readonly cognitoUsername?: string | null;
  readonly cognitoUserStatus?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}