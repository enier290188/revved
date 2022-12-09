import {Box as MuiBox, Divider as MuiDivider} from "@mui/material"
import {Auth} from "aws-amplify"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes} from "react-router"
import {PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_FORGOT_PASSWORD} from "../../../../../../../setting/path/app/page/secure/account/guest/forgot-password"
import {PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN} from "../../../../../../../setting/path/app/page/secure/account/guest/sign-in"
import {Context as ContextAlert} from "../../../../../../context/Alert"
import * as AppUtilForm from "../../../../../../util/form"
import {APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, APP_PAGE_SECURE_LAYOUT_ALERT_INFO, APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS} from "../../../../layout/alert/Alert"
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
import {SecurityNavigateToIndex, SecurityNavigateToPathError404, SecurityRouteGuestUser} from "../../../../security"

const STEP_RETURN_INITIAL = "step-return-initial"
const STEP_RETURN_SEND_CONFIRMATION_CODE = "step-return-send-confirmation-code"
const STEP_RETURN_NEW_PASSWORD = "step-return-new-password"
const STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX = "step-return-security-navigate-to-index"
const STEP_RETURN_ERROR = "step-return-error"
const STEP_EFFECT_INITIAL = "step-effect-initial"
const STEP_EFFECT_REFRESH = "step-effect-refresh"
const STEP_EFFECT_REFRESH_THEN_SUCCESS = "step-effect-refresh-then-success"
const STEP_EFFECT_REFRESH_THEN_ERROR = "step-effect-refresh-then-error"
const STEP_EFFECT_REFRESH_ERROR = "step-effect-refresh-error"
const STEP_EFFECT_SEND_CONFIRMATION_CODE = "step-effect-send-confirmation-code"
const STEP_EFFECT_SEND_CONFIRMATION_CODE_WARNING = "step-effect-send-confirmation-code-warning"
const STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING = "step-effect-send-confirmation-code-is-submitting"
const STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING_THEN_SUCCESS = "step-effect-send-confirmation-code-is-submitting-then-success"
const STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING_THEN_ERROR = "step-effect-send-confirmation-code-is-submitting-then-error"
const STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING_ERROR = "step-effect-send-confirmation-code-is-submitting-error"
const STEP_EFFECT_NEW_PASSWORD = "step-effect-new-password"
const STEP_EFFECT_NEW_PASSWORD_WARNING = "step-effect-new-password-warning"
const STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING = "step-effect-new-password-is-submitting"
const STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_THEN_SUCCESS = "step-effect-new-password-is-submitting-then-success"
const STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_THEN_ERROR = "step-effect-new-password-is-submitting-then-error"
const STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING_ERROR = "step-effect-new-password-is-submitting-error"
const STEP_EFFECT_DEFAULT = "step-effect-default"

const View = React.memo(
    () => {
        const contextAlert = React.useContext(ContextAlert)
        const [
            {
                stepReturn,
                stepEffect,
                stepIsSubmitting,
                fieldEmail,
                fieldConfirmationCode,
                fieldNewPassword,
                fieldConfirmNewPassword
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL,
                stepIsSubmitting: false,
                fieldEmail: {
                    value: "",
                    error: null
                },
                fieldConfirmationCode: {
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

        const fieldConfirmationCodeValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"]])
        }

        const fieldNewPasswordValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"], ["fieldTypePassword"]])
        }

        const fieldConfirmNewPasswordValidate = (value1, value2) => {
            return AppUtilForm.validateField(value1, [["fieldRequired"], ["fieldTypePassword"], ["fieldEqualTo", value2, <FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.field.confirm-new-password.label"}/>, <FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.field.new-password.label"}/>]])
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

        const fieldConfirmationCodeHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldConfirmationCode: {
                                        ...oldState.fieldConfirmationCode,
                                        value: value,
                                        error: fieldConfirmationCodeValidate(value)
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

        const handleSendConfirmationCode = React.useCallback(
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
                                        stepEffect: STEP_EFFECT_SEND_CONFIRMATION_CODE
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
                                                        fieldConfirmationCode: {
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.refresh.error"}})
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                fetchData
            ]
        )

        const handleStepEffectSendConfirmationCode = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SEND_CONFIRMATION_CODE) {
                        const fieldEmailError = fieldEmailValidate(fieldEmail.value)

                        if (fieldEmailError) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_SEND_CONFIRMATION_CODE_WARNING,
                                            fieldEmail: {
                                                value: oldState.fieldEmail.value,
                                                error: fieldEmailError
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
                                            stepEffect: STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING,
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
                fieldEmail.value
            ]
        )

        const handleStepEffectSendConfirmationCodeIsSubmitting = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING && stepIsSubmitting === true && 0 === contextAlert.getAlertList().length) {
                        await Auth.forgotPassword(fieldEmail.value)
                            .then(
                                async () => {
                                    if (isComponentMountedRef.current === true) {
                                        setState(
                                            (oldState) => (
                                                {
                                                    ...oldState,
                                                    stepEffect: STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING_THEN_SUCCESS,
                                                    stepIsSubmitting: false
                                                }
                                            )
                                        )
                                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_INFO, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.send-confirmation-code.then.success"}})
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
                                    stepEffect: STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING_ERROR,
                                    stepIsSubmitting: false
                                }
                            )
                        )
                        switch (e.code) {
                            case "NetworkError":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.send-confirmation-code.error.NetworkError"}})
                                break
                            case "NotAuthorizedException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.send-confirmation-code.error.NotAuthorizedException"}})
                                break
                            case "InvalidParameterException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.send-confirmation-code.error.InvalidParameterException"}})
                                break
                            case "UserNotFoundException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.send-confirmation-code.error.UserNotFoundException"}})
                                break
                            case "LimitExceededException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.send-confirmation-code.error.LimitExceededException"}})
                                break
                            default:
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.send-confirmation-code.error"}})
                        }
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                stepIsSubmitting,
                fieldEmail.value
            ]
        )

        const handleStepEffectNewPassword = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_NEW_PASSWORD) {
                        const fieldConfirmationCodeError = fieldConfirmationCodeValidate(fieldConfirmationCode.value)
                        const fieldNewPasswordError = fieldNewPasswordValidate(fieldNewPassword.value)
                        const fieldConfirmNewPasswordError = fieldConfirmNewPasswordValidate(fieldConfirmNewPassword.value, fieldNewPassword.value)

                        if (fieldConfirmationCodeError || fieldNewPasswordError || fieldConfirmNewPasswordError) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_NEW_PASSWORD_WARNING,
                                            fieldConfirmationCode: {
                                                value: oldState.fieldConfirmationCode.value,
                                                error: fieldConfirmationCodeError
                                            },
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
                fieldConfirmationCode.value,
                fieldNewPassword.value,
                fieldConfirmNewPassword.value
            ]
        )

        const handleStepEffectNewPasswordIsSubmitting = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_NEW_PASSWORD_IS_SUBMITTING && stepIsSubmitting === true && 0 === contextAlert.getAlertList().length) {
                        await Auth.forgotPasswordSubmit(fieldEmail.value, fieldConfirmationCode.value, fieldNewPassword.value)
                            .then(
                                async () => {
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
                                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.new-password.then.success", values: {email: fieldEmail.value}}})
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
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.new-password.error.NetworkError"}})
                                break
                            case "ExpiredCodeException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.new-password.error.ExpiredCodeException"}})
                                break
                            case "CodeMismatchException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.new-password.error.CodeMismatchException"}})
                                break
                            case "InvalidPasswordException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.new-password.error.InvalidPasswordException"}})
                                break
                            case "InvalidParameterException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.new-password.error.InvalidParameterException"}})
                                break
                            case "LimitExceededException":
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.new-password.error.LimitExceededException"}})
                                break
                            default:
                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.guest.forgot-password.alert.submit.new-password.error"}})
                        }
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                stepIsSubmitting,
                fieldEmail.value,
                fieldConfirmationCode.value,
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
                                    stepReturn: STEP_RETURN_SEND_CONFIRMATION_CODE,
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
                    case STEP_EFFECT_SEND_CONFIRMATION_CODE:
                        handleStepEffectSendConfirmationCode().then().catch().finally()
                        break
                    case STEP_EFFECT_SEND_CONFIRMATION_CODE_WARNING:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SEND_CONFIRMATION_CODE,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING:
                        handleStepEffectSendConfirmationCodeIsSubmitting().then().catch().finally()
                        break
                    case STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING_THEN_SUCCESS:
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
                    case STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING_THEN_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SEND_CONFIRMATION_CODE,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SEND_CONFIRMATION_CODE_IS_SUBMITTING_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SEND_CONFIRMATION_CODE,
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
                handleStepEffectSendConfirmationCode,
                handleStepEffectSendConfirmationCodeIsSubmitting,
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
                                        <LayoutPaperTitleLeftTypographyLevel1 iconFont={"password"} text1={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password"}/>}/>
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
            case STEP_RETURN_SEND_CONFIRMATION_CODE:
                return (
                    <LayoutContainer maxWidth={"400px"}>
                        <LayoutPaper>
                            <LayoutPaperTitle>
                                <LayoutPaperTitleLeft>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutPaperTitleLeftTypographyLevel1 iconFont={"password"} text1={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password"}/>}/>
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
                                            label={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.field.email.label"}/>}
                                            field={fieldEmail}
                                            handleOnChange={fieldEmailHandleOnChange}
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
                                            disabled={stepIsSubmitting || Boolean(fieldEmail.error)}
                                            variant={"contained"}
                                            size={"small"}
                                            iconFont={"send"}
                                            text={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.action.send-confirmation-code"}/>}
                                            handleOnClick={handleSendConfirmationCode}
                                        />
                                    </MuiBox>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutNavLinkButton
                                            url={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN}
                                            loading={false}
                                            disabled={stepIsSubmitting}
                                            size={"small"}
                                            iconFont={"cancel"}
                                            text={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.action.cancel"}/>}
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
                            <LayoutPaperTitle>
                                <LayoutPaperTitleLeft>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutPaperTitleLeftTypographyLevel1 iconFont={"password"} text1={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password"}/>}/>
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
                                            type={"text"}
                                            autoComplete={null}
                                            iconFont={"vpn_key"}
                                            label={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.field.confirmation-code.label"}/>}
                                            field={fieldConfirmationCode}
                                            handleOnChange={fieldConfirmationCodeHandleOnChange}
                                        />
                                    </MuiBox>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutTextFieldPassword
                                            disabled={stepIsSubmitting}
                                            required={true}
                                            label={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.field.new-password.label"}/>}
                                            field={fieldNewPassword}
                                            handleOnChange={fieldNewPasswordHandleOnChange}
                                        />
                                    </MuiBox>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutTextFieldPassword
                                            disabled={stepIsSubmitting}
                                            required={true}
                                            label={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.field.confirm-new-password.label"}/>}
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
                                            disabled={stepIsSubmitting || Boolean(fieldEmail.error) || Boolean(fieldConfirmationCode.error) || Boolean(fieldNewPassword.error)}
                                            variant={"contained"}
                                            size={"small"}
                                            iconFont={"save"}
                                            text={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.action.save"}/>}
                                            handleOnClick={handleNewPassword}
                                        />
                                    </MuiBox>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutNavLinkButton
                                            url={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN}
                                            loading={false}
                                            disabled={stepIsSubmitting}
                                            size={"small"}
                                            iconFont={"cancel"}
                                            text={<FormattedMessage id={"app.page.secure.view.account.guest.forgot-password.action.cancel"}/>}
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

export const ForgotPassword = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`/`} element={<SecurityRouteGuestUser pathFrom={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_FORGOT_PASSWORD}><View/></SecurityRouteGuestUser>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)

