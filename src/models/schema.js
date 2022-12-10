export const schema = {
    "models": {
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "picture": {
                    "name": "picture",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "userGroupList": {
                    "name": "userGroupList",
                    "isArray": true,
                    "type": {
                        "enum": "UserGroup"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "cognitoUsername": {
                    "name": "cognitoUsername",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "cognitoUserStatus": {
                    "name": "cognitoUserStatus",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Shelter"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ],
                                "provider": "userPools"
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "UserGroup": {
            "name": "UserGroup",
            "values": [
                "ADMIN",
                "SHELTER"
            ]
        }
    },
    "nonModels": {},
    "version": "1d131c445881ab4d2f429a3f165b75fe"
};