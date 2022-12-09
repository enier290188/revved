/* Amplify Params - DO NOT EDIT
	AUTH_REVVED_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import("@types/aws-lambda").APIGatewayProxyHandler}
 */
exports.handler = async ({arguments: {email, password}}) => {
    try {
        const {CognitoIdentityServiceProvider} = require("aws-sdk")
        const cognitoISP = new CognitoIdentityServiceProvider({apiVersion: "2016-04-18"})

        const AUTH_REVVED_USERPOOLID = process.env.AUTH_REVVED_USERPOOLID
        if (!AUTH_REVVED_USERPOOLID) {
            throw new Error(`Function requires environment variable: "AUTH_REVVED_USERPOOLID"`)
        }

        const argAdminSetUserPassword = {
            UserPoolId: AUTH_REVVED_USERPOOLID,
            Username: email,
            Password: password,
            Permanent: true
        }

        const argAdminGetUser = {
            UserPoolId: AUTH_REVVED_USERPOOLID,
            Username: email
        }

        let error = false
        let cognitoUser = null
        try {
            await cognitoISP.adminSetUserPassword(argAdminSetUserPassword).promise().then().catch().finally()
            cognitoUser = await cognitoISP.adminGetUser(argAdminGetUser).promise().then().catch().finally()
        } catch (e) {
            error = true
        }

        if (!error && cognitoUser) {
            return {
                _response: {
                    success: true
                }
            }
        } else {
            return {
                _response: {
                    error: true
                }
            }
        }
    } catch (e) {
        return {
            _response: {
                error: true
            }
        }
    }
}
