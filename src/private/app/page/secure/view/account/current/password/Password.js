import {Box as MuiBox, Divider as MuiDivider} from "@mui/material"
import {API, graphqlOperation} from "aws-amplify"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes} from "react-router"
import {revvedCognitoUserUpdatePasswordChange} from "../../../../../../../../graphql/mutations"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_PASSWORD} from "../../../../../../../setting/path/app/page/secure/account/current/password"
import {Context as ContextAlert} from "../../../../../../context/Alert"
import {Context as ContextUser} from "../../../../../../context/User"
import * as AppUtilForm from "../../../../../../util/form"
import * as AppUtilGraphql from "../../../../../../util/graphql"
import {APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS} from "../../../../layout/alert/Alert"
import {Button as LayoutButton} from "../../../../layout/main/button/Button"
import {TextFieldPassword as LayoutTextFieldPassword} from "../../../../layout/main/form/text-field/TextFieldPassword"
import {LoadingLinearProgress as LayoutLoadingLinearProgress} from "../../../../layout/main/loading/LoadingLinearProgress"
import {LoadingSecurity as LayoutLoadingSecurity} from "../../../../layout/main/loading/LoadingSecurity"
import {LoadingText as LayoutLoadingText} from "../../../../layout/main/loading/LoadingText"
import {PaperContentRightAction as LayoutPaperContentRightAction} from "../../../../layout/main/paper/PaperContentRightAction"
import {PaperContentRightActionLeft as LayoutPaperContentRightActionLeft} from "../../../../layout/main/paper/PaperContentRightActionLeft"
import {PaperContentRightCenter as LayoutPaperContentRightCenter} from "../../../../layout/main/paper/PaperContentRightCenter"
import {PaperContentRightTitle as LayoutPaperContentRightTitle} from "../../../../layout/main/paper/PaperContentRightTitle"
import {PaperContentRightTitleLeft as LayoutPaperContentRightTitleLeft} from "../../../../layout/main/paper/PaperContentRightTitleLeft"
import {PaperContentRightTitleLeftTypographyLevel2 as LayoutPaperContentRightTitleLeftTypographyLevel2} from "../../../../layout/main/paper/PaperContentRightTitleLeftTypographyLevel2"
import {SecurityNavigateToIndex, SecurityNavigateToPathError404, SecurityRouteCurrentUser} from "../../../../security"

const STEP_RETURN_INITIAL = "step-return-initial"
const STEP_RETURN_SUCCESS = "step-return-success"
const STEP_RETURN_SECURITY_NAVIGATE_TO_PATH_ERROR_404 = "step-return-security-navigate-to-path-error-404"
const STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX = "step-return-security-navigate-to-index"
const STEP_EFFECT_INITIAL = "step-effect-initial"
const STEP_EFFECT_SUBSCRIBE = "step-effect-subscribe"
const STEP_EFFECT_REFRESH = "step-effect-refresh"
const STEP_EFFECT_REFRESH_THEN_SUCCESS = "step-effect-refresh-then-success"
const STEP_EFFECT_REFRESH_THEN_WARNING = "step-effect-refresh-then-warning"
const STEP_EFFECT_REFRESH_THEN_ERROR = "step-effect-refresh-then-error"
const STEP_EFFECT_REFRESH_ERROR = "step-effect-refresh-error"
const STEP_EFFECT_SUBMIT = "step-effect-submit"
const STEP_EFFECT_SUBMIT_WARNING = "step-effect-submit-warning"
const STEP_EFFECT_SUBMIT_IS_SUBMITTING = "step-effect-submit-is-submitting"
const STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_SUCCESS = "step-effect-submit-is-submitting-then-success"
const STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_WARNING = "step-effect-submit-is-submitting-then-warning"
const STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_ERROR = "step-effect-submit-is-submitting-then-error"
const STEP_EFFECT_SUBMIT_IS_SUBMITTING_ERROR = "step-effect-submit-is-submitting-error"
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
                fieldNewPassword,
                fieldConfirmNewPassword
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL,
                stepIsSubmitting: false,
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

        const fieldNewPasswordValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"], ["fieldTypePassword"]])
        }

        const fieldConfirmNewPasswordValidate = (value1, value2) => {
            return AppUtilForm.validateField(value1, [["fieldRequired"], ["fieldTypePassword"], ["fieldEqualTo", value2, <FormattedMessage id={"app.page.secure.view.account.current.password.field.confirm-new-password.label"}/>, <FormattedMessage id={"app.page.secure.view.account.current.password.field.new-password.label"}/>]])
        }

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
                    const user = contextUser.getUser()
                    const userId = user && user.id ? user.id : null
                    if (user && userId) {
                        let ERROR_INTERNET_DISCONNECTED = false
                        let ERROR_UNAUTHORIZED = false
                        const dataUserLoggedInModel = await AppUtilGraphql.getModel(
                            {
                                query: {
                                    name: "getUser",
                                    id: userId,
                                    itemList: [
                                        {
                                            key: "email",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "name",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        }
                                    ]
                                }
                            }
                        )
                        if (dataUserLoggedInModel._response.error && dataUserLoggedInModel._response.errorType) {
                            if (dataUserLoggedInModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                ERROR_INTERNET_DISCONNECTED = true
                            }
                            if (dataUserLoggedInModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                ERROR_UNAUTHORIZED = true
                            }
                        }
                        const userLoggedInModel = dataUserLoggedInModel.instance
                        if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel) {
                            return {
                                _response: {
                                    success: true
                                },
                                userModel: userLoggedInModel
                            }
                        } else {
                            let warningType = null
                            if (ERROR_INTERNET_DISCONNECTED === true) {
                                warningType = AppUtilGraphql.ERROR_INTERNET_DISCONNECTED
                            }
                            if (ERROR_UNAUTHORIZED === true) {
                                warningType = AppUtilGraphql.ERROR_UNAUTHORIZED
                            }
                            return {
                                _response: {
                                    warning: true,
                                    warningType: warningType
                                }
                            }
                        }
                    } else {
                        throw new Error("ContextUser Required")
                    }
                } catch (e) {
                    return {
                        _response: {
                            error: true
                        }
                    }
                }
            },
            [
                contextUser
            ]
        )

        const submitData = React.useCallback(
            async (data) => {
                try {
                    const user = contextUser.getUser()
                    const userId = user && user.id ? user.id : null
                    if (user && userId) {
                        let ERROR_INTERNET_DISCONNECTED = false
                        let ERROR_UNAUTHORIZED = false
                        const dataUserLoggedInModel = await AppUtilGraphql.getModel(
                            {
                                query: {
                                    name: "getUser",
                                    id: userId,
                                    itemList: [
                                        {
                                            key: "email",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "name",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        }
                                    ]
                                }
                            }
                        )
                        if (dataUserLoggedInModel._response.error && dataUserLoggedInModel._response.errorType) {
                            if (dataUserLoggedInModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                ERROR_INTERNET_DISCONNECTED = true
                            }
                            if (dataUserLoggedInModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                ERROR_UNAUTHORIZED = true
                            }
                        }
                        const userLoggedInModel = dataUserLoggedInModel.instance
                        if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel) {
                            try {
                                const responseRevvedCognitoUserUpdatePasswordChange = await API.graphql(graphqlOperation(revvedCognitoUserUpdatePasswordChange, {email: userLoggedInModel.email, password: data.password}))
                                const jsonRevvedCognitoUserUpdatePasswordChange = JSON.parse(responseRevvedCognitoUserUpdatePasswordChange.data.revvedCognitoUserUpdatePasswordChange)
                                if (jsonRevvedCognitoUserUpdatePasswordChange._response.success === true) {
                                    return {
                                        _response: {
                                            success: true
                                        },
                                        userModel: userLoggedInModel
                                    }
                                } else {
                                    return {
                                        _response: {
                                            warning: true,
                                            warningType: AppUtilGraphql.ERROR_UNAUTHORIZED
                                        }
                                    }
                                }
                            } catch (e) {
                                return {
                                    _response: {
                                        warning: true,
                                        warningType: AppUtilGraphql.ERROR_INTERNET_DISCONNECTED
                                    }
                                }
                            }
                        } else {
                            let warningType = null
                            if (ERROR_INTERNET_DISCONNECTED === true) {
                                warningType = AppUtilGraphql.ERROR_INTERNET_DISCONNECTED
                            }
                            if (ERROR_UNAUTHORIZED === true) {
                                warningType = AppUtilGraphql.ERROR_UNAUTHORIZED
                            }
                            return {
                                _response: {
                                    warning: true,
                                    warningType: warningType
                                }
                            }
                        }
                    } else {
                        throw new Error("ContextUser Required")
                    }
                } catch (e) {
                    return {
                        _response: {
                            error: true
                        }
                    }
                }
            },
            [
                contextUser
            ]
        )

        const handleRefresh = React.useCallback(
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
                contextAlert,
                stepEffect
            ]
        )

        const handleSubmit = React.useCallback(
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
                                        stepEffect: STEP_EFFECT_SUBMIT
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
                    if (stepEffect === STEP_EFFECT_SUBSCRIBE || stepEffect === STEP_EFFECT_REFRESH) {
                        await fetchData()
                            .then(
                                (data) => {
                                    if (data && data._response && (data._response.success || data._response.warning)) {
                                        if (data._response.success) {
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            stepEffect: STEP_EFFECT_REFRESH_THEN_SUCCESS,
                                                            stepIsSubmitting: false,
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
                                                )
                                            }
                                        } else {
                                            if (isComponentMountedRef.current === true) {
                                                if (data._response.warningType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED || data._response.warningType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                                    setState(
                                                        (oldState) => (
                                                            {
                                                                ...oldState,
                                                                stepEffect: STEP_EFFECT_REFRESH_THEN_WARNING,
                                                                stepIsSubmitting: false
                                                            }
                                                        )
                                                    )
                                                    if (data._response.warningType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_INTERNET_DISCONNECTED"}})
                                                    }
                                                    if (data._response.warningType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_UNAUTHORIZED"}})
                                                    }
                                                } else {
                                                    setState(
                                                        (oldState) => (
                                                            {
                                                                ...oldState,
                                                                stepEffect: STEP_EFFECT_REFRESH_THEN_ERROR,
                                                                stepIsSubmitting: false
                                                            }
                                                        )
                                                    )
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.password.alert.refresh.then.warning"}})
                                                }
                                            }
                                        }
                                    } else {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_REFRESH_THEN_ERROR,
                                                        stepIsSubmitting: false
                                                    }
                                                )
                                            )
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.password.alert.refresh.then.error"}})
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
                                    stepEffect: STEP_EFFECT_REFRESH_ERROR,
                                    stepIsSubmitting: false
                                }
                            )
                        )
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.password.alert.refresh.error"}})
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                fetchData
            ]
        )

        const handleStepEffectSubmit = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SUBMIT) {
                        const fieldNewPasswordError = fieldNewPasswordValidate(fieldNewPassword.value)
                        const fieldConfirmNewPasswordError = fieldConfirmNewPasswordValidate(fieldConfirmNewPassword.value, fieldNewPassword.value)

                        if (fieldNewPasswordError || fieldConfirmNewPasswordError) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_SUBMIT_WARNING,
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
                                            stepEffect: STEP_EFFECT_SUBMIT_IS_SUBMITTING,
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

        const handleStepEffectSubmitIsSubmitting = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SUBMIT_IS_SUBMITTING && stepIsSubmitting === true && 0 === contextAlert.getAlertList().length) {
                        await submitData(
                            {
                                password: fieldNewPassword.value
                            }
                        )
                            .then(
                                (data) => {
                                    if (data && data._response && (data._response.success || data._response.warning)) {
                                        if (data._response.success) {
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            stepEffect: STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_SUCCESS,
                                                            stepIsSubmitting: false,
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
                                                )
                                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS, message: {id: "app.page.secure.view.account.current.password.alert.submit.then.success", values: {name: data.userModel.name}}})
                                            }
                                        } else {
                                            if (isComponentMountedRef.current === true) {
                                                if (data._response.warningType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED || data._response.warningType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                                    setState(
                                                        (oldState) => (
                                                            {
                                                                ...oldState,
                                                                stepEffect: STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_WARNING,
                                                                stepIsSubmitting: false
                                                            }
                                                        )
                                                    )
                                                    if (data._response.warningType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_INTERNET_DISCONNECTED"}})
                                                    }
                                                    if (data._response.warningType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.util.graphql.error.ERROR_UNAUTHORIZED"}})
                                                    }
                                                } else {
                                                    setState(
                                                        (oldState) => (
                                                            {
                                                                ...oldState,
                                                                stepEffect: STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_ERROR,
                                                                stepIsSubmitting: false
                                                            }
                                                        )
                                                    )
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.password.alert.submit.then.warning"}})
                                                }
                                            }
                                        }
                                    } else {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_ERROR,
                                                        stepIsSubmitting: false
                                                    }
                                                )
                                            )
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.password.alert.submit.then.error"}})
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
                                    stepEffect: STEP_EFFECT_SUBMIT_IS_SUBMITTING_ERROR,
                                    stepIsSubmitting: false
                                }
                            )
                        )
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.password.alert.submit.error"}})
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                stepIsSubmitting,
                fieldNewPassword.value,
                submitData
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                switch (stepEffect) {
                    case STEP_EFFECT_INITIAL:
                        handleStepEffectInitial().then().catch().finally()
                        break
                    case STEP_EFFECT_SUBSCRIBE:
                        handleStepEffectRefresh().then().catch().finally()
                        break
                    case STEP_EFFECT_REFRESH:
                        handleStepEffectRefresh().then().catch().finally()
                        break
                    case STEP_EFFECT_REFRESH_THEN_SUCCESS:
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
                    case STEP_EFFECT_REFRESH_THEN_WARNING:
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
                    case STEP_EFFECT_REFRESH_THEN_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SECURITY_NAVIGATE_TO_PATH_ERROR_404,
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
                                    stepReturn: STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SUBMIT:
                        handleStepEffectSubmit().then().catch().finally()
                        break
                    case STEP_EFFECT_SUBMIT_WARNING:
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
                    case STEP_EFFECT_SUBMIT_IS_SUBMITTING:
                        handleStepEffectSubmitIsSubmitting().then().catch().finally()
                        break
                    case STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_SUCCESS:
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
                    case STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_WARNING:
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
                    case STEP_EFFECT_SUBMIT_IS_SUBMITTING_THEN_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SECURITY_NAVIGATE_TO_PATH_ERROR_404,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SUBMIT_IS_SUBMITTING_ERROR:
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
                handleStepEffectRefresh,
                handleStepEffectSubmit,
                handleStepEffectSubmitIsSubmitting
            ]
        )

        switch (stepReturn) {
            case STEP_RETURN_INITIAL:
                return (
                    <React.Fragment>
                        <LayoutPaperContentRightTitle>
                            <LayoutPaperContentRightTitleLeft>
                                <MuiBox component={"div"} p={1}>
                                    <LayoutPaperContentRightTitleLeftTypographyLevel2 iconFont={"password"} text1={<FormattedMessage id={"app.page.secure.view.account.current.password"}/>}/>
                                </MuiBox>
                            </LayoutPaperContentRightTitleLeft>
                        </LayoutPaperContentRightTitle>
                        <LayoutPaperContentRightCenter maxWidth={true}>
                            <LayoutLoadingSecurity/>
                            <MuiBox component={"div"} p={1}>
                                <LayoutLoadingText/>
                            </MuiBox>
                        </LayoutPaperContentRightCenter>
                    </React.Fragment>
                )
            case STEP_RETURN_SUCCESS:
                return (
                    <React.Fragment>
                        <LayoutPaperContentRightTitle>
                            <LayoutPaperContentRightTitleLeft>
                                <MuiBox component={"div"} p={1}>
                                    <LayoutPaperContentRightTitleLeftTypographyLevel2 iconFont={"password"} text1={<FormattedMessage id={"app.page.secure.view.account.current.password"}/>}/>
                                </MuiBox>
                            </LayoutPaperContentRightTitleLeft>
                        </LayoutPaperContentRightTitle>
                        <LayoutPaperContentRightCenter maxWidth={"400px"}>
                            {stepIsSubmitting || stepEffect !== STEP_EFFECT_DEFAULT ? <LayoutLoadingSecurity/> : null}
                            <MuiBox component={"div"} p={1}>
                                <LayoutTextFieldPassword
                                    disabled={stepIsSubmitting}
                                    required={true}
                                    label={<FormattedMessage id={"app.page.secure.view.account.current.password.field.new-password.label"}/>}
                                    field={fieldNewPassword}
                                    handleOnChange={fieldNewPasswordHandleOnChange}
                                />
                            </MuiBox>
                            <MuiBox component={"div"} p={1}>
                                <LayoutTextFieldPassword
                                    disabled={stepIsSubmitting}
                                    required={true}
                                    label={<FormattedMessage id={"app.page.secure.view.account.current.password.field.confirm-new-password.label"}/>}
                                    field={fieldConfirmNewPassword}
                                    handleOnChange={fieldConfirmNewPasswordHandleOnChange}
                                />
                            </MuiBox>
                        </LayoutPaperContentRightCenter>
                        <MuiBox component={"div"} p={0} pt={2}>
                            {stepIsSubmitting ? <LayoutLoadingLinearProgress/> : <MuiDivider component={"div"}/>}
                        </MuiBox>
                        <LayoutPaperContentRightAction>
                            <LayoutPaperContentRightActionLeft>
                                <MuiBox component={"div"} p={1}>
                                    <LayoutButton
                                        loading={stepIsSubmitting}
                                        disabled={stepIsSubmitting || Boolean(fieldNewPassword.error) || Boolean(fieldConfirmNewPassword.error)}
                                        variant={"contained"}
                                        size={"small"}
                                        iconFont={"save"}
                                        text={<FormattedMessage id={"app.page.secure.view.account.current.password.action.submit"}/>}
                                        handleOnClick={handleSubmit}
                                    />
                                </MuiBox>
                                <MuiBox component={"div"} p={1}>
                                    <LayoutButton
                                        loading={stepEffect === STEP_EFFECT_REFRESH}
                                        disabled={stepIsSubmitting}
                                        size={"small"}
                                        iconFont={"update"}
                                        text={<FormattedMessage id={"app.page.secure.view.account.current.password.action.refresh"}/>}
                                        handleOnClick={handleRefresh}
                                    />
                                </MuiBox>
                            </LayoutPaperContentRightActionLeft>
                        </LayoutPaperContentRightAction>
                    </React.Fragment>
                )
            case STEP_RETURN_SECURITY_NAVIGATE_TO_PATH_ERROR_404:
                return <SecurityNavigateToPathError404/>
            case STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX:
                return <SecurityNavigateToIndex pathFrom={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_PASSWORD}/>
            default:
                return null
        }
    }
)

export const Password = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`/`} element={<SecurityRouteCurrentUser pathFrom={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_PASSWORD}><View/></SecurityRouteCurrentUser>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
