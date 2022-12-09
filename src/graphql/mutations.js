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
    }
  }
`;
