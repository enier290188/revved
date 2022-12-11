import {Auth} from "aws-amplify"
import React from "react"
import {Navigate, useLocation} from "react-router"
import {PATH_APP} from "../../../../setting/path/app"
import {PATH_APP_PAGE} from "../../../../setting/path/app/page"
import {PATH_APP_PAGE_SECURE} from "../../../../setting/path/app/page/secure"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT} from "../../../../setting/path/app/page/secure/account/current/sign-out"
import {PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN} from "../../../../setting/path/app/page/secure/account/guest/sign-in"
import {PATH_APP_PAGE_SECURE_ERROR_404} from "../../../../setting/path/app/page/secure/error/404"
import {PATH_APP_PAGE_SECURE_SHELTER_DASHBOARD} from "../../../../setting/path/app/page/secure/shelter/dashboard"
import {Context as ContextAlert} from "../../../context/Alert"
import {Context as ContextUser} from "../../../context/User"
import * as AppUtilGraphql from "../../../util/graphql"
import {APP_PAGE_SECURE_LAYOUT_ALERT_ERROR} from "../layout/alert/Alert"
import {LoadingSecurity} from "../layout/main/loading/LoadingSecurity"

export const APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED = "CONFIRMED"
export const APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD"
export const APP_PAGE_SECURE_SECURITY_COGNITO_USER_GROUP_ADMIN = "Admin"
export const APP_PAGE_SECURE_SECURITY_COGNITO_USER_GROUP_SHELTER = "Shelter"

export const APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_STATUS_CONFIRMED = "CONFIRMED"
export const APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_STATUS_FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD"
export const APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN = "ADMIN"
export const APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER = "SHELTER"

export const APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_STATUS_CONFIRMED_LABEL = "Confirmed"
export const APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_STATUS_FORCE_CHANGE_PASSWORD_LABEL = "Force Change Password"
export const APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN_LABEL = "Admin"
export const APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER_LABEL = "Shelter"

export const SecurityNavigateToPath = React.memo(
    ({path, replace = true}) => {
        return (
            <Navigate to={path} replace={replace}/>
        )
    }
)

export const SecurityNavigateToPathError404 = React.memo(
    () => {
        return (
            <SecurityNavigateToPath path={PATH_APP_PAGE_SECURE_ERROR_404}/>
        )
    }
)

export const SecurityNavigateToIndex = React.memo(
    ({pathFrom}) => {
        const contextUser = React.useContext(ContextUser)
        const location = useLocation()

        const urlNextQuery = "urlNext="
        const getUrlNext = () => {
            const start = location.search.indexOf(urlNextQuery) + urlNextQuery.length
            let end = start
            while (end < location.search.length) {
                if (location.search[end] === "&") {
                    break
                }
                end++
            }
            return location.search.substring(start, end)
        }

        let userModel = contextUser.getUser()
        const userModelUserGroupList = userModel && userModel.userGroupList ? [...userModel.userGroupList] : []

        if (0 === userModelUserGroupList.length) {
            userModel = null
            contextUser.changeUserToDefault()
        }

        const pathTo = userModel
            ? pathFrom === PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN && location.search && location.search.indexOf(urlNextQuery) !== -1
                ? getUrlNext()
                : userModelUserGroupList.includes(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER)
                    ? PATH_APP_PAGE_SECURE_SHELTER_DASHBOARD
                    : PATH_APP_PAGE_SECURE
            : pathFrom === "/" || pathFrom === PATH_APP || pathFrom === PATH_APP_PAGE || pathFrom === PATH_APP_PAGE_SECURE || pathFrom === PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN || pathFrom === PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT
                ? `${PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN}`
                : `${PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN}?${urlNextQuery}${pathFrom}`

        return (
            <SecurityNavigateToPath path={pathTo}/>
        )
    }
)

export const SecurityLayoutCurrentUser = React.memo(
    ({children}) => {
        const contextUser = React.useContext(ContextUser)
        const userModel = contextUser.getUser()
        const userModelUserGroupList = userModel && userModel.userGroupList ? [...userModel.userGroupList] : []

        if (userModelUserGroupList.includes(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN) || userModelUserGroupList.includes(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER)) {
            return children
        } else {
            return null
        }
    }
)

export const SecurityLayoutCurrentUserAdmin = React.memo(
    ({children}) => {
        const contextUser = React.useContext(ContextUser)
        const userModel = contextUser.getUser()
        const userModelUserGroupList = userModel && userModel.userGroupList ? [...userModel.userGroupList] : []

        if (userModelUserGroupList.includes(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN)) {
            return children
        } else {
            return null
        }
    }
)

export const SecurityLayoutCurrentUserShelter = React.memo(
    ({children}) => {
        const contextUser = React.useContext(ContextUser)
        const userModel = contextUser.getUser()
        const userModelUserGroupList = userModel && userModel.userGroupList ? [...userModel.userGroupList] : []

        if (userModelUserGroupList.includes(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER)) {
            return children
        } else {
            return null
        }
    }
)

export const SecurityLayoutGuestUser = React.memo(
    ({children}) => {
        const contextUser = React.useContext(ContextUser)
        const userModel = contextUser.getUser()

        if (!userModel) {
            return children
        } else {
            return null
        }
    }
)

const STEP_RETURN_INITIAL = "step-return-initial"
const STEP_RETURN_SUCCESS = "step-return-success"
const STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX = "step-return-security-navigate-to-index"
const STEP_EFFECT_INITIAL = "step-effect-initial"
const STEP_EFFECT_AUTH = "step-effect-auth"
const STEP_EFFECT_AUTH_THEN_SUCCESS = "step-effect-auth-then-success"
const STEP_EFFECT_AUTH_THEN_WARNING = "step-effect-auth-then-warning"
const STEP_EFFECT_AUTH_THEN_ERROR = "step-effect-auth-then-error"
const STEP_EFFECT_AUTH_ERROR = "step-effect-auth-error"
const STEP_EFFECT_DEFAULT = "step-effect-default"

const SecurityRouteCurrent = React.memo(
    ({children, pathFrom, dynamodbUserGroupToCheckList}) => {
        const contextUser = React.useContext(ContextUser)
        const contextAlert = React.useContext(ContextAlert)
        const [
            {
                stepReturn,
                stepEffect
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL
            }
        )
        const isComponentMountedRef = React.useRef(true)

        const handleStepEffectInitial = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_INITIAL) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_AUTH
                                    }
                                )
                            )
                        }
                    }
                } catch (e) {
                }
            },
            [
                stepEffect
            ]
        )

        const handleStepEffectAuth = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_AUTH) {
                        const user = contextUser.getUser()
                        const userId = user && user.id ? user.id : null
                        if (user && userId) {
                            await Auth.currentAuthenticatedUser({bypassCache: true}) // bypassCache is optional, by default is false. If set to true, this call will send a request to Cognito to get the latest user data.
                                .then(
                                    async (cognitoUser) => {
                                        await Auth.currentSession().then().catch()
                                        const cognitoUserGroupList = cognitoUser.signInUserSession && cognitoUser.signInUserSession.accessToken && cognitoUser.signInUserSession.accessToken.payload && cognitoUser.signInUserSession.accessToken.payload["cognito:groups"] ? [...cognitoUser.signInUserSession.accessToken.payload["cognito:groups"]] : []
                                        const dynamodbUserGroupList = []
                                        for (const cognitoUserGroupForOf of [APP_PAGE_SECURE_SECURITY_COGNITO_USER_GROUP_ADMIN, APP_PAGE_SECURE_SECURITY_COGNITO_USER_GROUP_SHELTER]) {
                                            if (cognitoUserGroupList.includes(cognitoUserGroupForOf)) {
                                                switch (cognitoUserGroupForOf) {
                                                    case APP_PAGE_SECURE_SECURITY_COGNITO_USER_GROUP_ADMIN:
                                                        dynamodbUserGroupList.push(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN)
                                                        break
                                                    case APP_PAGE_SECURE_SECURITY_COGNITO_USER_GROUP_SHELTER:
                                                        dynamodbUserGroupList.push(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER)
                                                        break
                                                    default:
                                                        break
                                                }
                                            }
                                        }
                                        let ERROR_INTERNET_DISCONNECTED = false
                                        let ERROR_UNAUTHORIZED = false
                                        const dataUserModel = await AppUtilGraphql.getModel(
                                            {
                                                query: {
                                                    name: "getUser",
                                                    id: userId,
                                                    itemList: [
                                                        {
                                                            key: "companyId",
                                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_ID
                                                        },
                                                        {
                                                            key: "picture",
                                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                        },
                                                        {
                                                            key: "email",
                                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                        },
                                                        {
                                                            key: "name",
                                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                        },
                                                        {
                                                            key: "userGroupList",
                                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_LIST
                                                        },
                                                        {
                                                            key: "cognitoUsername",
                                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                        },
                                                        {
                                                            key: "cognitoUserStatus",
                                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                        }
                                                    ]
                                                }
                                            }
                                        )
                                        if (dataUserModel._response.error && dataUserModel._response.errorType) {
                                            if (dataUserModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                                ERROR_INTERNET_DISCONNECTED = true
                                            }
                                            if (dataUserModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                                ERROR_UNAUTHORIZED = true
                                            }
                                        }
                                        const userModel = dataUserModel.instance
                                        if (userModel) {
                                            let itNeedsToBeUpdated = false
                                            for (const dynamodbUserGroupForOf of dynamodbUserGroupList) {
                                                if (!userModel.userGroupList.includes(dynamodbUserGroupForOf)) {
                                                    itNeedsToBeUpdated = true
                                                    break
                                                }
                                            }
                                            for (const userModelGroupForOf of userModel.userGroupList) {
                                                if (!dynamodbUserGroupList.includes(userModelGroupForOf)) {
                                                    itNeedsToBeUpdated = true
                                                    break
                                                }
                                            }
                                            if (itNeedsToBeUpdated) {
                                                const dataUserUpdatedModel = await AppUtilGraphql.updateModel(
                                                    {
                                                        query: {
                                                            name: "updateUser",
                                                            id: userModel.id,
                                                            itemList: [
                                                                {
                                                                    key: "companyId",
                                                                    type: AppUtilGraphql.QUERY_ITEM_TYPE_ID
                                                                },
                                                                {
                                                                    key: "picture",
                                                                    type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                                },
                                                                {
                                                                    key: "email",
                                                                    type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                                },
                                                                {
                                                                    key: "name",
                                                                    type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                                },
                                                                {
                                                                    key: "userGroupList",
                                                                    type: AppUtilGraphql.QUERY_ITEM_TYPE_LIST
                                                                },
                                                                {
                                                                    key: "cognitoUsername",
                                                                    type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                                },
                                                                {
                                                                    key: "cognitoUserStatus",
                                                                    type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                                }
                                                            ],
                                                            input: {
                                                                userGroupList: dynamodbUserGroupList,
                                                                _version: userModel._version
                                                            }
                                                        }
                                                    }
                                                )
                                                if (dataUserUpdatedModel._response.error && dataUserUpdatedModel._response.errorType) {
                                                    if (dataUserUpdatedModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                                        ERROR_INTERNET_DISCONNECTED = true
                                                    }
                                                    if (dataUserUpdatedModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                                        ERROR_UNAUTHORIZED = true
                                                    }
                                                }
                                                const userUpdatedModel = dataUserUpdatedModel.instance
                                                if (userUpdatedModel) {
                                                    userModel.id = userUpdatedModel.id
                                                    userModel.companyId = userUpdatedModel.companyId
                                                    userModel.picture = userUpdatedModel.picture
                                                    userModel.name = userUpdatedModel.name
                                                    userModel.userGroupList = userUpdatedModel.userGroupList
                                                    userModel.cognitoUsername = userUpdatedModel.cognitoUsername
                                                    userModel.cognitoUserStatus = userUpdatedModel.cognitoUserStatus
                                                    userModel.createdAt = userUpdatedModel.createdAt
                                                    userModel.updatedAt = userUpdatedModel.updatedAt
                                                    userModel._version = userUpdatedModel._version
                                                }
                                            }
                                        }
                                        if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userModel && userModel.cognitoUserStatus === APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED && 0 < userModel.userGroupList.length) {
                                            let itIsChecked = false
                                            for (const userModelGroupForOf of userModel.userGroupList) {
                                                if (dynamodbUserGroupToCheckList.includes(userModelGroupForOf)) {
                                                    itIsChecked = true
                                                    break
                                                }
                                            }
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            stepEffect: itIsChecked === true ? STEP_EFFECT_AUTH_THEN_SUCCESS : STEP_EFFECT_AUTH_THEN_WARNING
                                                        }
                                                    )
                                                )
                                                contextUser.changeUser(
                                                    {
                                                        id: userModel.id,
                                                        companyId: userModel.companyId,
                                                        picture: userModel.picture,
                                                        email: userModel.email,
                                                        name: userModel.name,
                                                        userGroupList: userModel.userGroupList
                                                    }
                                                )
                                            }
                                        } else {
                                            try {
                                                await Auth.signOut({global: true}).then().catch().finally()
                                            } catch (e) {
                                            }
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            stepEffect: STEP_EFFECT_AUTH_THEN_ERROR
                                                        }
                                                    )
                                                )
                                                if (ERROR_INTERNET_DISCONNECTED === true) {
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_INTERNET_DISCONNECTED"}})
                                                }
                                                if (ERROR_UNAUTHORIZED === true) {
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_UNAUTHORIZED"}})
                                                }
                                                contextUser.changeUserToDefault()
                                            }
                                        }
                                    }
                                )
                        } else {
                            throw new Error("ContextUser Required")
                        }
                    }
                } catch (e) {
                    try {
                        await Auth.signOut({global: true}).then().catch().finally()
                    } catch (e) {
                    }
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_AUTH_ERROR
                                }
                            )
                        )
                        contextUser.changeUserToDefault()
                    }
                }
            },
            [
                contextUser,
                contextAlert,
                stepEffect
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                switch (stepEffect) {
                    case STEP_EFFECT_INITIAL:
                        handleStepEffectInitial().then().catch().finally()
                        break
                    case STEP_EFFECT_AUTH:
                        handleStepEffectAuth().then().catch().finally()
                        break
                    case STEP_EFFECT_AUTH_THEN_SUCCESS:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SUCCESS,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_AUTH_THEN_WARNING:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_AUTH_THEN_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_AUTH_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    default:
                        break
                }

                return () => {
                    isComponentMountedRef.current = false
                }
            },
            [
                stepEffect,
                handleStepEffectInitial,
                handleStepEffectAuth
            ]
        )

        switch (stepReturn) {
            case STEP_RETURN_INITIAL:
                return (
                    <LoadingSecurity/>
                )
            case STEP_RETURN_SUCCESS:
                return (
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                )
            case STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX:
                return (
                    <SecurityNavigateToIndex pathFrom={pathFrom}/>
                )
            default:
                return null
        }
    }
)

export const SecurityRouteCurrentUser = React.memo(
    ({children, pathFrom}) => {
        return (
            <SecurityRouteCurrent pathFrom={pathFrom} dynamodbUserGroupToCheckList={[APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN, APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER]}>
                {children}
            </SecurityRouteCurrent>
        )
    }
)

export const SecurityRouteCurrentUserAdmin = React.memo(
    ({children, pathFrom}) => {
        return (
            <SecurityRouteCurrent pathFrom={pathFrom} dynamodbUserGroupToCheckList={[APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN]}>
                {children}
            </SecurityRouteCurrent>
        )
    }
)

export const SecurityRouteCurrentUserShelter = React.memo(
    ({children, pathFrom}) => {
        return (
            <SecurityRouteCurrent pathFrom={pathFrom} dynamodbUserGroupToCheckList={[APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER]}>
                {children}
            </SecurityRouteCurrent>
        )
    }
)

const SecurityRouteGuest = React.memo(
    ({children, pathFrom}) => {
        const contextUser = React.useContext(ContextUser)
        const [
            {
                stepReturn,
                stepEffect
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL
            }
        )
        const isComponentMountedRef = React.useRef(true)

        const handleStepEffectInitial = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_INITIAL) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_AUTH
                                    }
                                )
                            )
                        }
                    }
                } catch (e) {
                }
            },
            [
                stepEffect
            ]
        )

        const handleStepEffectAuth = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_AUTH) {
                        const user = contextUser.getUser()
                        const userId = user && user.id ? user.id : null
                        if (user && userId) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_AUTH_THEN_ERROR
                                        }
                                    )
                                )
                            }
                        } else {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_AUTH_THEN_SUCCESS
                                        }
                                    )
                                )
                            }
                        }
                    }
                } catch (e) {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_AUTH_ERROR
                                }
                            )
                        )
                        contextUser.changeUserToDefault()
                    }
                }
            },
            [
                contextUser,
                stepEffect
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                switch (stepEffect) {
                    case STEP_EFFECT_INITIAL:
                        handleStepEffectInitial().then().catch().finally()
                        break
                    case STEP_EFFECT_AUTH:
                        handleStepEffectAuth().then().catch().finally()
                        break
                    case STEP_EFFECT_AUTH_THEN_SUCCESS:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SUCCESS,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_AUTH_THEN_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_AUTH_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    default:
                        break
                }

                return () => {
                    isComponentMountedRef.current = false
                }
            },
            [
                stepEffect,
                handleStepEffectInitial,
                handleStepEffectAuth
            ]
        )

        switch (stepReturn) {
            case STEP_RETURN_INITIAL:
                return (
                    <LoadingSecurity/>
                )
            case STEP_RETURN_SUCCESS:
                return (
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                )
            case STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX:
                return (
                    <SecurityNavigateToIndex pathFrom={pathFrom}/>
                )
            default:
                return null
        }
    }
)

export const SecurityRouteGuestUser = React.memo(
    ({children, pathFrom}) => {
        return (
            <SecurityRouteGuest pathFrom={pathFrom}>
                {children}
            </SecurityRouteGuest>
        )
    }
)
