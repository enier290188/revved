/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      picture
      email
      name
      userGroupList
      cognitoUsername
      cognitoUserStatus
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        picture
        email
        name
        userGroupList
        cognitoUsername
        cognitoUserStatus
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        picture
        email
        name
        userGroupList
        cognitoUsername
        cognitoUserStatus
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPet = /* GraphQL */ `
  query GetPet($id: ID!) {
    getPet(id: $id) {
      id
      picture
      name
      ownerName
      ownerEmail
      ownerPhone
      ownerAddress
      commentList
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listPets = /* GraphQL */ `
  query ListPets(
    $filter: ModelPetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        picture
        name
        ownerName
        ownerEmail
        ownerPhone
        ownerAddress
        commentList
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPets = /* GraphQL */ `
  query SyncPets(
    $filter: ModelPetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        picture
        name
        ownerName
        ownerEmail
        ownerPhone
        ownerAddress
        commentList
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAdopter = /* GraphQL */ `
  query GetAdopter($id: ID!) {
    getAdopter(id: $id) {
      id
      picture
      name
      email
      phone
      address
      language
      commentList
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAdopters = /* GraphQL */ `
  query ListAdopters(
    $filter: ModelAdopterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdopters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        picture
        name
        email
        phone
        address
        language
        commentList
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAdopters = /* GraphQL */ `
  query SyncAdopters(
    $filter: ModelAdopterFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAdopters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        picture
        name
        email
        phone
        address
        language
        commentList
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
