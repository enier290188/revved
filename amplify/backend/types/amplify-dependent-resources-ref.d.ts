export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "AdminGroupRole": "string",
            "ShelterGroupRole": "string"
        },
        "revved": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "revved": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "revved": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "revvedCognitoUserUpdatePasswordChange": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}