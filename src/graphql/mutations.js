/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const revvedCognitoUserUpdatePasswordChange = /* GraphQL */ `
  mutation RevvedCognitoUserUpdatePasswordChange(
    $email: String
    $password: String
  ) {
    revvedCognitoUserUpdatePasswordChange(email: $email, password: $password)
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPet = /* GraphQL */ `
  mutation CreatePet(
    $input: CreatePetInput!
    $condition: ModelPetConditionInput
  ) {
    createPet(input: $input, condition: $condition) {
      id
      picture
      name
      ownerName
      ownerEmail
      ownerPhone
      ownerAddress
      ownerLanguage
      commentList
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePet = /* GraphQL */ `
  mutation UpdatePet(
    $input: UpdatePetInput!
    $condition: ModelPetConditionInput
  ) {
    updatePet(input: $input, condition: $condition) {
      id
      picture
      name
      ownerName
      ownerEmail
      ownerPhone
      ownerAddress
      ownerLanguage
      commentList
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePet = /* GraphQL */ `
  mutation DeletePet(
    $input: DeletePetInput!
    $condition: ModelPetConditionInput
  ) {
    deletePet(input: $input, condition: $condition) {
      id
      picture
      name
      ownerName
      ownerEmail
      ownerPhone
      ownerAddress
      ownerLanguage
      commentList
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createAdopter = /* GraphQL */ `
  mutation CreateAdopter(
    $input: CreateAdopterInput!
    $condition: ModelAdopterConditionInput
  ) {
    createAdopter(input: $input, condition: $condition) {
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
export const updateAdopter = /* GraphQL */ `
  mutation UpdateAdopter(
    $input: UpdateAdopterInput!
    $condition: ModelAdopterConditionInput
  ) {
    updateAdopter(input: $input, condition: $condition) {
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
export const deleteAdopter = /* GraphQL */ `
  mutation DeleteAdopter(
    $input: DeleteAdopterInput!
    $condition: ModelAdopterConditionInput
  ) {
    deleteAdopter(input: $input, condition: $condition) {
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
