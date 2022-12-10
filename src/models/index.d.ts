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

export declare class Pet {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pet, 'id'>;
  };
  readonly id: string;
  readonly picture?: string | null;
  readonly name?: string | null;
  readonly ownerName?: string | null;
  readonly ownerEmail?: string | null;
  readonly ownerPhone?: string | null;
  readonly ownerAddress?: string | null;
  readonly commentList?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Pet>);
  static copyOf(source: Pet, mutator: (draft: MutableModel<Pet>) => MutableModel<Pet> | void): Pet;
}

export declare class Adopter {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Adopter, 'id'>;
  };
  readonly id: string;
  readonly picture?: string | null;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly address?: string | null;
  readonly language?: string | null;
  readonly commentList?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Adopter>);
  static copyOf(source: Adopter, mutator: (draft: MutableModel<Adopter>) => MutableModel<Adopter> | void): Adopter;
}