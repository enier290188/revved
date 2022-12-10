import {Box as MuiBox, Divider as MuiDivider} from "@mui/material"
import {Auth} from "aws-amplify"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes} from "react-router"
import {PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_FORGOT_PASSWORD} from "../../../../../../../setting/path/app/page/secure/account/guest/forgot-password"
import {PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN} from "../../../../../../../setting/path/app/page/secure/account/guest/sign-in"
import {Context as ContextAlert} from "../../../../../../context/Alert"
import {Context as ContextUser} from "../../../../../../context/User"
import * as AppUtilForm from "../../../../../../util/form"
import * as AppUtilGraphql from "../../../../../../util/graphql"
import {APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, APP_PAGE_SECURE_LAYOUT_ALERT_INFO, APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS, APP_PAGE_SECURE_LAYOUT_ALERT_WARNING} from "../../../../layout/alert/Alert"
import {Button as LayoutButton} from "../../../../layout/main/button/Button"
import {NavLinkButton as LayoutNavLinkButton} from "../../../../layout/main/button/NavLinkButton"
import {Container as LayoutContainer} from "../../../../layout/main/container/Container"
import {TextField as LayoutTextField} from "../../../../layout/main/form/text-field/TextField"
import {TextFieldPassword as LayoutTextFieldPassword} from "../../../../layout/main/form/text-field/TextFieldPassword"
import {LoadingLinearProgress as LayoutLoadingLinearProgress} from "../../../../layout/main/loading/LoadingLinearProgress"
import {LoadingSecurity as LayoutLoadingSecurity} from "../../../../layout/main/loading/LoadingSecurity"
import {LoadingText as LayoutLoadingText} from "../../../../layout/main/loading/LoadingText"
import {Paper as LayoutPaper} from "../../../../layout/main/paper/Paper"
import {PaperAction as LayoutPaperAction} from "../../../../layout/main/paper/PaperAction"
import {PaperActionLeft as LayoutPaperActionLeft} from "../../../../layout/main/paper/PaperActionLeft"
import {PaperContent as LayoutPaperContent} from "../../../../layout/main/paper/PaperContent"
import {PaperContentCenter as LayoutPaperContentCenter} from "../../../../layout/main/paper/PaperContentCenter"
import {PaperTitle as LayoutPaperTitle} from "../../../../layout/main/paper/PaperTitle"
import {PaperTitleLeft as LayoutPaperTitleLeft} from "../../../../layout/main/paper/PaperTitleLeft"
import {PaperTitleLeftTypographyLevel1 as LayoutPaperTitleLeftTypographyLevel1} from "../../../../layout/main/paper/PaperTitleLeftTypographyLevel1"
import {APP_PAGE_SECURE_SECURITY_COGNITO_USER_GROUP_ADMIN, APP_PAGE_SECURE_SECURITY_COGNITO_USER_GROUP_SHELTER, APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED, APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN, APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER, SecurityNavigateToIndex, SecurityNavigateToPathError404, SecurityRouteGuestUser} from "../../../../security"

const STEP_RETURN_INITIAL = "step-return-initial"
const STEP_RETURN_SIGN_IN = "step-return-sign-in"
const STEP_RETURN_NEW_PASSWORD = "step-return-new-password"
const STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX = "step-return-security-navigate-to-index"
const STEP_RETURN_ERROR = "step-return-error"
const STEP_EFFECT_INITIAL = "step-effect-initial"
const STEP_EFFECT_REFRESH = "step-effect-refresh"
const STEP_EFFECT_REFRESH_THEN_SUCCESS = "step-effect-refresh-then-success"
const STEP_EFFECT_REFRESH_THEN_ERROR = "step-effect-refresh-then-error"
const STEP_EFFECT_REFRESH_ERROR = "step-effect-refresh-error"
const STEP_EFFECT_SIGN_IN = "step-effect-sign-in"
const STEP_EFFECT_SIGN_IN_WARNING = "step-effect-sign-in-warning"
const STEP_EFFECT_SIGN_IN_IS_SUBMITTING = "step-effect-sign-in-is-submitting"
const STEP_EFFECT_SIGN_IN_IS_SUBMITTING_THEN_SUCCESS = "step-effect-sign-in-is-submitting-then-success"
const STEP_EFFECT_SIGN_IN_IS_SUBMITTING_THEN_SUCCESS_NEW_PASSWORD = "step-effect-sign-in-is-submitting-then-success-new-password"
const STEP_EFFECT_SIGN_IN_IS_SUBMITTING_THEN_ERROR = "step-effect-sign-in-is-submitting-then-error"
const STEP_EFFECT_SIGN_IN_IS_SUBMITTING_ERROR = "step-effect-sign-in-is-submitting-error"
const STEP_EFFECT_NEW_PASSWORD = "step-effect-new-password"
const STEP_EFFECT_NEW_PASSWORD_WARNING = "step-effect-new-password-warning"
const STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING = "step-effect-new-password-is-submitting"
const STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_THEN_SUCCESS = "step-effect-new-password-is-submitting-then-success"
const STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_THEN_ERROR = "step-effect-new-password-is-submitting-then-error"
const STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_ERROR = "step-effect-new-password-is-submitting-error"
const STEP_EFFECT_DEFAULT = "step-effect-default"

const View = React.memo(
    () => {
        const contextUser = React.useContext(ContextUser)
        const contextAlert = React.useContext(ContextAlert)
        const [
            {
                stepReturn,
                stepEffect,
                stepIsSubmitting,
                cognitoUserNewPassword,
                fieldEmail,
                fieldPassword,
                fieldNewPassword,
                fieldConfirmNewPassword
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL,
                stepIsSubmitting: false,
                cognitoUserNewPassword: null,
                fieldEmail: {
                    value: "",
                    error: null
                },
                fieldPassword: {
                    value: "",
                    error: null
                },
                fieldNewPassword: {
                    value: "",
                    error: null
                },
                fieldConfirmNewPassword: {
                    value: "",
                    error: null
                }
            }
        )
        const isComponentMountedRef = React.useRef(true)

        const fieldEmailValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"], ["fieldTypeEmail"]])
        }

        const fieldPasswordValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"], ["fieldTypePassword"]])
        }

        const fieldNewPasswordValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"], ["fieldTypePassword"]])
        }

        const fieldConfirmNewPasswordValidate = (value1, value2) => {
            return AppUtilForm.validateField(value1, [["fieldRequired"], ["fieldTypePassword"], ["fieldEqualTo", value2, <FormattedMessage id={"app.page.secure.view.account.guest.sign-in.field.confirm-new-password.label"}/>, <FormattedMessage id={"app.page.secure.view.account.guest.sign-in.field.new-password.label"}/>]])
        }

        const fieldEmailHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldEmail: {
                                        ...oldState.fieldEmail,
                                        value: value,
                                        error: fieldEmailValidate(value)
                                    }
                                }
                            )
                        )
                    }
                } catch (e) {
                }
            },
            []
        )

        const fieldPasswordHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldPassword: {
                                        ...oldState.fieldPassword,
                                        value: value,
                                        error: fieldPasswordValidate(value)
                                    }
                                }
                            )
                        )
                    }
                } catch (e) {
                }
            },
            []
        )

        const fieldNewPasswordHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldNewPassword: {
                                        ...oldState.fieldNewPassword,
                                        value: value,
                                        error: fieldNewPasswordValidate(value)
                                    },
                                    fieldConfirmNewPassword: {
                                        ...oldState.fieldConfirmNewPassword,
                                        error: fieldConfirmNewPasswordValidate(oldState.fieldConfirmNewPassword.value, value)
                                    }
                                }
                            )
                        )
                    }
                } catch (e) {
                }
            },
            []
        )

        const fieldConfirmNewPasswordHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldConfirmNewPassword: {
                                        ...oldState.fieldConfirmNewPassword,
                                        value: value,
                                        error: fieldConfirmNewPasswordValidate(value, oldState.fieldNewPassword.value)
                                    }
                                }
                            )
                        )
                    }
                } catch (e) {
                }
            },
            []
        )

        const fetchData = React.useCallback(
            async () => {
                try {
                    return {
                        _response: {
                            success: true
                        }
                    }
                } catch (e) {
                    return {
                        _response: {
                            error: true
                        }
                    }
                }
            },
            []
        )

        const handleSignIn = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    contextAlert.cleanAlertList()
                    if (stepEffect === STEP_EFFECT_DEFAULT) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_SIGN_IN
                                    }
                                )
                            )
                        }
                    }
                } catch (e) {
                }
            },
            [
                contextAlert,
                stepEffect
            ]
        )

        const handleNewPassword = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    contextAlert.cleanAlertList()
                    if (stepEffect === STEP_EFFECT_DEFAULT) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_NEW_PASSWORD
                                    }
                                )
                            )
                        }
                    }
                } catch (e) {
                }
            },
            [
                contextAlert,
                stepEffect
            ]
        )

        const handleStepEffectInitial = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_INITIAL) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_REFRESH
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

        const handleStepEffectRefresh = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_REFRESH) {
                        await fetchData()
                            .then(
                                (data) => {
                                    if (data && data._response && data._response.success) {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_REFRESH_THEN_SUCCESS,
                                                        stepIsSubmitting: false,
                                                        fieldEmail: {
                                                            value: "",
                                                            error: null
                                                        },
                                                        fieldPassword: {
                                                            value: "",
                                                            error: null
                                                        },
                                                        fieldNewPassword: {
                                                            value: "",
                                                            error: null
                                                        },
                                                        fieldConfirmNewPassword: {
                                                            value: "",
                                                            error: null
                                                        },
                                                        cognitoUserNewPassword: null
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
                                                        stepEffect: STEP_EFFECT_REFRESH_THEN_ERROR
                                                    }
                                                )
                                            )
                                        }
                                    }
                                }
                            )
                    }
                } catch (e) {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_REFRESH_ERROR
                                }
                            )
                        )
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.refresh.error"}})
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                fetchData
            ]
        )

        const handleStepEffectSignIn = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SIGN_IN) {
                        const fieldEmailError = fieldEmailValidate(fieldEmail.value)
                        const fieldPasswordError = fieldPasswordValidate(fieldPassword.value)

                        if (fieldEmailError || fieldPasswordError) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_SIGN_IN_WARNING,
                                            fieldEmail: {
                                                value: oldState.fieldEmail.value,
                                                error: fieldEmailError
                                            },
                                            fieldPassword: {
                                                value: oldState.fieldPassword.value,
                                                error: fieldPasswordError
                                            }
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
                                            stepEffect: STEP_EFFECT_SIGN_IN_IS_SUBMITTING,
                                            stepIsSubmitting: true
                                        }
                                    )
                                )
                            }
                        }
                    }
                } catch (e) {
                }
            },
            [
                stepEffect,
                fieldEmail.value,
                fieldPassword.value
            ]
        )

        const handleStepEffectSignInIsSubmitting = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SIGN_IN_IS_SUBMITTING && stepIsSubmitting === true && 0 === contextAlert.getAlertList().length) {
                        await Auth.signIn(fieldEmail.value, fieldPassword.value)
                            .then(
                                async (cognitoUser) => {
                                    if (cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED") {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_SIGN_IN_IS_SUBMITTING_THEN_SUCCESS_NEW_PASSWORD,
                                                        stepIsSubmitting: false,
                                                        cognitoUserNewPassword: cognitoUser
                                                    }
                                                )
                                            )
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_INFO, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.sign-in.then.success.new-password"}})
                                        }
                                    } else {
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
                                        const dataUserModelList = await AppUtilGraphql.getModelList(
                                            {
                                                query: {
                                                    name: "listUsers",
                                                    itemList: [
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
                                                    filter: {
                                                        and: [
                                                            {
                                                                email: {
                                                                    eq: fieldEmail.value
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        )
                                        if (dataUserModelList._response.error && dataUserModelList._response.errorType) {
                                            if (dataUserModelList._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                                ERROR_INTERNET_DISCONNECTED = true
                                            }
                                            if (dataUserModelList._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                                ERROR_UNAUTHORIZED = true
                                            }
                                        }
                                        const userModelList = dataUserModelList.instanceList
                                        const userModel = 0 < userModelList.length ? {...userModelList[0]} : {}
                                        if (userModel && userModel.id) {
                                            let itNeedsToBeUpdated = false
                                            if (userModel.cognitoUserStatus !== APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED) {
                                                itNeedsToBeUpdated = true
                                            }
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
                                                                cognitoUsername: cognitoUser.username,
                                                                cognitoUserStatus: APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED,
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
                                        } else {
                                            if (dynamodbUserGroupList.includes(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN) || dynamodbUserGroupList.includes(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER)) {
                                                const dataUserCreatedModel = await AppUtilGraphql.createModel(
                                                    {
                                                        query: {
                                                            name: "createUser",
                                                            itemList: [
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
                                                                email: fieldEmail.value,
                                                                userGroupList: dynamodbUserGroupList,
                                                                cognitoUsername: cognitoUser.username,
                                                                cognitoUserStatus: APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED
                                                            }
                                                        }
                                                    }
                                                )
                                                if (dataUserCreatedModel._response.error && dataUserCreatedModel._response.errorType) {
                                                    if (dataUserCreatedModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                                        ERROR_INTERNET_DISCONNECTED = true
                                                    }
                                                    if (dataUserCreatedModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                                        ERROR_UNAUTHORIZED = true
                                                    }
                                                }
                                                const userCreatedModel = dataUserCreatedModel.instance
                                                if (userCreatedModel) {
                                                    userModel.id = userCreatedModel.id
                                                    userModel.picture = userCreatedModel.picture
                                                    userModel.name = userCreatedModel.name
                                                    userModel.userGroupList = userCreatedModel.userGroupList
                                                    userModel.cognitoUsername = userCreatedModel.cognitoUsername
                                                    userModel.cognitoUserStatus = userCreatedModel.cognitoUserStatus
                                                    userModel.createdAt = userCreatedModel.createdAt
                                                    userModel.updatedAt = userCreatedModel.updatedAt
                                                    userModel._version = userCreatedModel._version
                                                }
                                            }
                                        }
                                        if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userModel && userModel.cognitoUserStatus === APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED && 0 < userModel.userGroupList.length) {
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            stepEffect: STEP_EFFECT_SIGN_IN_IS_SUBMITTING_THEN_SUCCESS,
                                                            stepIsSubmitting: false
                                                        }
                                                    )
                                                )
                                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.sign-in.then.success", values: {email: fieldEmail.value}}})
                                                contextUser.changeUser(
                                                    {
                                                        id: userModel.id,
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
                                                            stepEffect: STEP_EFFECT_SIGN_IN_IS_SUBMITTING_THEN_ERROR,
                                                            stepIsSubmitting: false
                                                        }
                                                    )
                                                )
                                                if (ERROR_INTERNET_DISCONNECTED === true) {
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_INTERNET_DISCONNECTED"}})
                                                }
                                                if (ERROR_UNAUTHORIZED === true) {
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_UNAUTHORIZED"}})
                                                }
                                                if (userModel && userModel.id) {
                                                    if (!(0 < userModel.userGroupList.length)) {
                                                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_WARNING, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.sign-in.then.error.UserWithoutGroup", values: {email: fieldEmail.value}}})
                                                    } else {
                                                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.sign-in.then.error"}})
                                                    }
                                                } else {
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_WARNING, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.sign-in.then.error.UserWithoutUserModel", values: {email: fieldEmail.value}}})
                                                }
                                            }
                                        }
                                    }
                                }
                            )
                    }
                } catch (e) {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_SIGN_IN_IS_SUBMITTING_ERROR,
                                    stepIsSubmitting: false
                                }
                            )
                        )
                        switch (e.code) {
                            case "NetworkError":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.sign-in.error.NetworkError"}})
                                break
                            case "UserNotFoundException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.sign-in.error.UserNotFoundException"}})
                                break
                            case "NotAuthorizedException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.sign-in.error.NotAuthorizedException"}})
                                break
                            default:
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.sign-in.error"}})
                        }
                    }
                }
            },
            [
                contextUser,
                contextAlert,
                stepEffect,
                stepIsSubmitting,
                fieldEmail.value,
                fieldPassword.value
            ]
        )

        const handleStepEffectNewPassword = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_NEW_PASSWORD) {
                        const fieldNewPasswordError = fieldNewPasswordValidate(fieldNewPassword.value)
                        const fieldConfirmNewPasswordError = fieldConfirmNewPasswordValidate(fieldConfirmNewPassword.value, fieldNewPassword.value)

                        if (fieldNewPasswordError || fieldConfirmNewPasswordError) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_NEW_PASSWORD_WARNING,
                                            fieldNewPassword: {
                                                value: oldState.fieldNewPassword.value,
                                                error: fieldNewPasswordError
                                            },
                                            fieldConfirmNewPassword: {
                                                value: oldState.fieldConfirmNewPassword.value,
                                                error: fieldConfirmNewPasswordError
                                            }
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
                                            stepEffect: STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING,
                                            stepIsSubmitting: true
                                        }
                                    )
                                )
                            }
                        }
                    }
                } catch (e) {
                }
            },
            [
                stepEffect,
                fieldNewPassword.value,
                fieldConfirmNewPassword.value
            ]
        )

        const handleStepEffectNewPasswordIsSubmitting = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING && stepIsSubmitting === true && 0 === contextAlert.getAlertList().length) {
                        await Auth.completeNewPassword(cognitoUserNewPassword, fieldNewPassword.value)
                            .then(
                                async (cognitoUser) => {
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
                                    const dataUserModelList = await AppUtilGraphql.getModelList(
                                        {
                                            query: {
                                                name: "listUsers",
                                                itemList: [
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
                                                filter: {
                                                    and: [
                                                        {
                                                            email: {
                                                                eq: fieldEmail.value
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    )
                                    if (dataUserModelList._response.error && dataUserModelList._response.errorType) {
                                        if (dataUserModelList._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                            ERROR_INTERNET_DISCONNECTED = true
                                        }
                                        if (dataUserModelList._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                            ERROR_UNAUTHORIZED = true
                                        }
                                    }
                                    const userModelList = dataUserModelList.instanceList
                                    const userModel = 0 < userModelList.length ? {...userModelList[0]} : {}
                                    if (userModel && userModel.id) {
                                        let itNeedsToBeUpdated = false
                                        if (userModel.cognitoUserStatus !== APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED) {
                                            itNeedsToBeUpdated = true
                                        }
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
                                                            cognitoUsername: cognitoUser.username,
                                                            cognitoUserStatus: APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED,
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
                                    } else {
                                        if (dynamodbUserGroupList.includes(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_ADMIN) || dynamodbUserGroupList.includes(APP_PAGE_SECURE_SECURITY_DYNAMODB_USER_GROUP_SHELTER)) {
                                            const dataUserCreatedModel = await AppUtilGraphql.createModel(
                                                {
                                                    query: {
                                                        name: "createUser",
                                                        itemList: [
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
                                                            email: fieldEmail.value,
                                                            userGroupList: dynamodbUserGroupList,
                                                            cognitoUsername: cognitoUser.username,
                                                            cognitoUserStatus: APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED
                                                        }
                                                    }
                                                }
                                            )
                                            if (dataUserCreatedModel._response.error && dataUserCreatedModel._response.errorType) {
                                                if (dataUserCreatedModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                                    ERROR_INTERNET_DISCONNECTED = true
                                                }
                                                if (dataUserCreatedModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                                    ERROR_UNAUTHORIZED = true
                                                }
                                            }
                                            const userCreatedModel = dataUserCreatedModel.instance
                                            if (userCreatedModel) {
                                                userModel.id = userCreatedModel.id
                                                userModel.picture = userCreatedModel.picture
                                                userModel.name = userCreatedModel.name
                                                userModel.userGroupList = userCreatedModel.userGroupList
                                                userModel.cognitoUsername = userCreatedModel.cognitoUsername
                                                userModel.cognitoUserStatus = userCreatedModel.cognitoUserStatus
                                                userModel.createdAt = userCreatedModel.createdAt
                                                userModel.updatedAt = userCreatedModel.updatedAt
                                                userModel._version = userCreatedModel._version
                                            }
                                        }
                                    }
                                    if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userModel && userModel.cognitoUserStatus === APP_PAGE_SECURE_SECURITY_COGNITO_USER_STATUS_CONFIRMED && 0 < userModel.userGroupList.length) {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_THEN_SUCCESS,
                                                        stepIsSubmitting: false
                                                    }
                                                )
                                            )
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.then.success", values: {email: fieldEmail.value}}})
                                            contextUser.changeUser(
                                                {
                                                    id: userModel.id,
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
                                                        stepEffect: STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_THEN_ERROR,
                                                        stepIsSubmitting: false
                                                    }
                                                )
                                            )
                                            if (ERROR_INTERNET_DISCONNECTED === true) {
                                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_INTERNET_DISCONNECTED"}})
                                            }
                                            if (ERROR_UNAUTHORIZED === true) {
                                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_UNAUTHORIZED"}})
                                            }
                                            if (userModel && userModel.id) {
                                                if (!(0 < userModel.userGroupList.length)) {
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_WARNING, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.then.error.UserWithoutGroup", values: {email: fieldEmail.value}}})
                                                } else {
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.then.error"}})
                                                }
                                            } else {
                                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_WARNING, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.then.error.UserWithoutUserModel", values: {email: fieldEmail.value}}})
                                            }
                                        }
                                    }
                                }
                            )
                    }
                } catch (e) {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_ERROR,
                                    stepIsSubmitting: false
                                }
                            )
                        )
                        switch (e.code) {
                            case "NetworkError":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.error.NetworkError"}})
                                break
                            case "NotAuthorizedException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.error.NotAuthorizedException"}})
                                break
                            case "InvalidPasswordException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.error.InvalidPasswordException"}})
                                break
                            case "InvalidParameterException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.error.InvalidParameterException"}})
                                break
                            case "LimitExceededException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.error.LimitExceededException"}})
                                break
                            default:
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.sign-in.alert.submit.new-password.error"}})
                        }
                    }
                }
            },
            [
                contextUser,
                contextAlert,
                stepEffect,
                stepIsSubmitting,
                cognitoUserNewPassword,
                fieldEmail.value,
                fieldNewPassword.value
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                switch (stepEffect) {
                    case STEP_EFFECT_INITIAL:
                        handleStepEffectInitial().then().catch().finally()
                        break
                    case STEP_EFFECT_REFRESH:
                        handleStepEffectRefresh().then().catch().finally()
                        break
                    case STEP_EFFECT_REFRESH_THEN_SUCCESS:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SIGN_IN,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_REFRESH_THEN_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_ERROR,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_REFRESH_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_ERROR,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SIGN_IN:
                        handleStepEffectSignIn().then().catch().finally()
                        break
                    case STEP_EFFECT_SIGN_IN_WARNING:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SIGN_IN,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SIGN_IN_IS_SUBMITTING:
                        handleStepEffectSignInIsSubmitting().then().catch().finally()
                        break
                    case STEP_EFFECT_SIGN_IN_IS_SUBMITTING_THEN_SUCCESS:
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
                    case STEP_EFFECT_SIGN_IN_IS_SUBMITTING_THEN_SUCCESS_NEW_PASSWORD:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_NEW_PASSWORD,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SIGN_IN_IS_SUBMITTING_THEN_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SIGN_IN,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SIGN_IN_IS_SUBMITTING_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SIGN_IN,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_NEW_PASSWORD:
                        handleStepEffectNewPassword().then().catch().finally()
                        break
                    case STEP_EFFECT_NEW_PASSWORD_WARNING:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_NEW_PASSWORD,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING:
                        handleStepEffectNewPasswordIsSubmitting().then().catch().finally()
                        break
                    case STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_THEN_SUCCESS:
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
                    case STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_THEN_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_NEW_PASSWORD,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_NEW_PASSWORD,
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
                handleStepEffectRefresh,
                handleStepEffectSignIn,
                handleStepEffectSignInIsSubmitting,
                handleStepEffectNewPassword,
                handleStepEffectNewPasswordIsSubmitting
            ]
        )

        switch (stepReturn) {
            case STEP_RETURN_INITIAL:
                return (
                    <LayoutContainer maxWidth={"400px"}>
                        <LayoutPaper>
                            <LayoutPaperTitle>
                                <LayoutPaperTitleLeft>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutPaperTitleLeftTypographyLevel1 iconFont={"vpn_lock"} text1={<FormattedMessage id={"app.page.secure.view.account.guest.sign-in"}/>}/>
                                    </MuiBox>
                                </LayoutPaperTitleLeft>
                            </LayoutPaperTitle>
                            <MuiBox component={"div"} p={0}>
                                <MuiDivider component={"div"}/>
                            </MuiBox>
                            <LayoutPaperContent>
                                <LayoutPaperContentCenter maxWidth={true}>
                                    <LayoutLoadingSecurity/>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutLoadingText/>
                                    </MuiBox>
                                </LayoutPaperContentCenter>
                            </LayoutPaperContent>
                        </LayoutPaper>
                    </LayoutContainer>
                )
            case STEP_RETURN_SIGN_IN:
                return (
                    <LayoutContainer maxWidth={"400px"}>
                        <LayoutPaper>
                            <LayoutPaperTitle>
                                <LayoutPaperTitleLeft>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutPaperTitleLeftTypographyLevel1 iconFont={"vpn_lock"} text1={<FormattedMessage id={"app.page.secure.view.account.guest.sign-in"}/>}/>
                                    </MuiBox>
                                </LayoutPaperTitleLeft>
                            </LayoutPaperTitle>
                            <MuiBox component={"div"} p={0}>
                                <MuiDivider component={"div"}/>
                            </MuiBox>
                            <LayoutPaperContent>
                                <LayoutPaperContentCenter maxWidth={true}>
                                    {stepIsSubmitting || stepEffect !== STEP_EFFECT_DEFAULT ? <LayoutLoadingSecurity/> : null}
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutTextField
                                            disabled={stepIsSubmitting}
                                            required={true}
                                            type={"email"}
                                            autoComplete={"current-email"}
                                            iconFont={"email"}
                                            label={<FormattedMessage id={"app.page.secure.view.account.guest.sign-in.field.email.label"}/>}
                                            field={fieldEmail}
                                            handleOnChange={fieldEmailHandleOnChange}
                                        />
                                    </MuiBox>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutTextFieldPassword
                                            disabled={stepIsSubmitting}
                                            required={true}
                                            label={<FormattedMessage id={"app.page.secure.view.account.guest.sign-in.field.password.label"}/>}
                                            field={fieldPassword}
                                            handleOnChange={fieldPasswordHandleOnChange}
                                        />
                                    </MuiBox>
                                </LayoutPaperContentCenter>
                            </LayoutPaperContent>
                            <MuiBox component={"div"} p={0}>
                                {stepIsSubmitting ? <LayoutLoadingLinearProgress/> : <MuiDivider component={"div"}/>}
                            </MuiBox>
                            <LayoutPaperAction>
                                <LayoutPaperActionLeft>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutButton
                                            loading={stepIsSubmitting}
                                            disabled={stepIsSubmitting || Boolean(fieldEmail.error) || Boolean(fieldPassword.error)}
                                            variant={"contained"}
                                            size={"small"}
                                            iconFont={"add_task"}
                                            text={<FormattedMessage id={"app.page.secure.view.account.guest.sign-in.action.sign-in"}/>}
                                            handleOnClick={handleSignIn}
                                        />
                                    </MuiBox>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutNavLinkButton
                                            url={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_FORGOT_PASSWORD}
                                            loading={false}
                                            disabled={stepIsSubmitting}
                                            size={"small"}
                                            iconFont={"password"}
                                            text={<FormattedMessage id={"app.page.secure.view.account.guest.sign-in.action.forgot-password"}/>}
                                        />
                                    </MuiBox>
                                </LayoutPaperActionLeft>
                            </LayoutPaperAction>
                        </LayoutPaper>
                    </LayoutContainer>
                )
            case STEP_RETURN_NEW_PASSWORD:
                return (
                    <LayoutContainer maxWidth={"400px"}>
                        <LayoutPaper>
                            <LayoutPaperContent>
                                <LayoutPaperContentCenter maxWidth={true}>
                                    {stepIsSubmitting || stepEffect !== STEP_EFFECT_DEFAULT ? <LayoutLoadingSecurity/> : null}
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutTextFieldPassword
                                            disabled={stepIsSubmitting}
                                            required={true}
                                            label={<FormattedMessage id={"app.page.secure.view.account.guest.sign-in.field.new-password.label"}/>}
                                            field={fieldNewPassword}
                                            handleOnChange={fieldNewPasswordHandleOnChange}
                                        />
                                    </MuiBox>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutTextFieldPassword
                                            disabled={stepIsSubmitting}
                                            required={true}
                                            label={<FormattedMessage id={"app.page.secure.view.account.guest.sign-in.field.confirm-new-password.label"}/>}
                                            field={fieldConfirmNewPassword}
                                            handleOnChange={fieldConfirmNewPasswordHandleOnChange}
                                        />
                                    </MuiBox>
                                </LayoutPaperContentCenter>
                            </LayoutPaperContent>
                            <MuiBox component={"div"} p={0}>
                                {stepIsSubmitting ? <LayoutLoadingLinearProgress/> : <MuiDivider component={"div"}/>}
                            </MuiBox>
                            <LayoutPaperAction>
                                <LayoutPaperActionLeft>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutButton
                                            loading={stepIsSubmitting}
                                            disabled={stepIsSubmitting || Boolean(fieldNewPassword.error) || Boolean(fieldConfirmNewPassword.error)}
                                            variant={"contained"}
                                            size={"small"}
                                            iconFont={"save"}
                                            text={<FormattedMessage id={"app.page.secure.view.account.guest.sign-in.action.save"}/>}
                                            handleOnClick={handleNewPassword}
                                        />
                                    </MuiBox>
                                </LayoutPaperActionLeft>
                            </LayoutPaperAction>
                        </LayoutPaper>
                    </LayoutContainer>
                )
            case STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX:
                return <SecurityNavigateToIndex pathFrom={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN}/>
            case STEP_RETURN_ERROR:
                return <SecurityNavigateToPathError404/>
            default:
                return null
        }
    }
)

export const SignIn = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`/`} element={<SecurityRouteGuestUser pathFrom={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN}><View/></SecurityRouteGuestUser>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
