import {Box as MuiBox, Divider as MuiDivider} from "@mui/material"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes} from "react-router"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO} from "../../../../../../../setting/path/app/page/secure/account/current/info"
import {Context as ContextAlert} from "../../../../../../context/Alert"
import {Context as ContextUser} from "../../../../../../context/User"
import * as AppUtilForm from "../../../../../../util/form"
import * as AppUtilGraphql from "../../../../../../util/graphql"
import {APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS} from "../../../../layout/alert/Alert"
import {Button as LayoutButton} from "../../../../layout/main/button/Button"
import {TextField as LayoutTextField} from "../../../../layout/main/form/text-field/TextField"
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
                fieldEmail,
                fieldName
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
                fieldName: {
                    value: "",
                    error: null
                }
            }
        )
        const isComponentMountedRef = React.useRef(true)

        const fieldEmailValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"], ["fieldTypeEmail"]])
        }

        const fieldNameValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"], ["fieldMaxLength", 32]])
        }

        const fieldNameHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldName: {
                                        ...oldState.fieldName,
                                        value: value,
                                        error: fieldNameValidate(value)
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
                            const dataUserLoggedInUpdatedModel = await AppUtilGraphql.updateModel(
                                {
                                    query: {
                                        name: "updateUser",
                                        id: userLoggedInModel.id,
                                        itemList: [
                                            {
                                                key: "email",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            },
                                            {
                                                key: "name",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            }
                                        ],
                                        input: {
                                            name: data.name,
                                            _version: userLoggedInModel._version
                                        }
                                    }
                                }
                            )
                            if (dataUserLoggedInUpdatedModel._response.error && dataUserLoggedInUpdatedModel._response.errorType) {
                                if (dataUserLoggedInUpdatedModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                    ERROR_INTERNET_DISCONNECTED = true
                                }
                                if (dataUserLoggedInUpdatedModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                    ERROR_UNAUTHORIZED = true
                                }
                            }
                            const userLoggedInUpdatedModel = dataUserLoggedInUpdatedModel.instance
                            if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInUpdatedModel) {
                                return {
                                    _response: {
                                        success: true
                                    },
                                    userModel: userLoggedInUpdatedModel
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
                                                            fieldEmail: {
                                                                value: data.userModel.email,
                                                                error: fieldEmailValidate(data.userModel.email)
                                                            },
                                                            fieldName: {
                                                                value: data.userModel.name,
                                                                error: fieldNameValidate(data.userModel.name)
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
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.info.alert.refresh.then.warning"}})
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
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.info.alert.refresh.then.error"}})
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.info.alert.refresh.error"}})
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
                        const fieldNameError = fieldNameValidate(fieldName.value)

                        if (fieldNameError) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_SUBMIT_WARNING,
                                            fieldName: {
                                                ...oldState.fieldName,
                                                error: fieldNameError
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
                fieldName.value
            ]
        )

        const handleStepEffectSubmitIsSubmitting = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SUBMIT_IS_SUBMITTING && stepIsSubmitting === true && 0 === contextAlert.getAlertList().length) {
                        await submitData(
                            {
                                name: fieldName.value
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
                                                            fieldEmail: {
                                                                value: data.userModel.email,
                                                                error: fieldEmailValidate(data.userModel.email)
                                                            },
                                                            fieldName: {
                                                                value: data.userModel.name,
                                                                error: fieldNameValidate(data.userModel.name)
                                                            }
                                                        }
                                                    )
                                                )
                                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS, message: {id: "app.page.secure.view.account.current.info.alert.submit.then.success", values: {name: data.userModel.name}}})
                                                contextUser.changeUser(
                                                    {
                                                        ...contextUser.getUser(),
                                                        name: data.userModel.name
                                                    }
                                                )
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
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.info.alert.submit.then.warning"}})
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
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.info.alert.submit.then.error"}})
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.account.current.info.alert.submit.error"}})
                    }
                }
            },
            [
                contextUser,
                contextAlert,
                stepEffect,
                stepIsSubmitting,
                fieldName.value,
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
                                    <LayoutPaperContentRightTitleLeftTypographyLevel2 iconFont={"manage_accounts"} text1={<FormattedMessage id={"app.page.secure.view.account.current.info"}/>}/>
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
                                    <LayoutPaperContentRightTitleLeftTypographyLevel2 iconFont={"manage_accounts"} text1={<FormattedMessage id={"app.page.secure.view.account.current.info"}/>}/>
                                </MuiBox>
                            </LayoutPaperContentRightTitleLeft>
                        </LayoutPaperContentRightTitle>
                        <LayoutPaperContentRightCenter maxWidth={"400px"}>
                            {stepIsSubmitting || stepEffect !== STEP_EFFECT_DEFAULT ? <LayoutLoadingSecurity/> : null}
                            <MuiBox component={"div"} p={1}>
                                <LayoutTextField
                                    disabled={true}
                                    required={true}
                                    type={"email"}
                                    iconFont={"email"}
                                    label={<FormattedMessage id={"app.page.secure.view.account.current.info.field.email.label"}/>}
                                    field={fieldEmail}
                                    handleOnChange={null}
                                />
                            </MuiBox>
                            <MuiBox component={"div"} p={1}>
                                <LayoutTextField
                                    disabled={stepIsSubmitting}
                                    required={true}
                                    type={"text"}
                                    iconFont={"person_pin"}
                                    label={<FormattedMessage id={"app.page.secure.view.account.current.info.field.name.label"}/>}
                                    field={fieldName}
                                    handleOnChange={fieldNameHandleOnChange}
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
                                        disabled={stepIsSubmitting || Boolean(fieldEmail.error) || Boolean(fieldName.error)}
                                        variant={"contained"}
                                        size={"small"}
                                        iconFont={"save"}
                                        text={<FormattedMessage id={"app.page.secure.view.account.current.info.action.submit"}/>}
                                        handleOnClick={handleSubmit}
                                    />
                                </MuiBox>
                                <MuiBox component={"div"} p={1}>
                                    <LayoutButton
                                        loading={stepEffect === STEP_EFFECT_REFRESH}
                                        disabled={stepIsSubmitting}
                                        size={"small"}
                                        iconFont={"update"}
                                        text={<FormattedMessage id={"app.page.secure.view.account.current.info.action.refresh"}/>}
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
                return <SecurityNavigateToIndex pathFrom={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO}/>
            default:
                return null
        }
    }
)

export const Info = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`/`} element={<SecurityRouteCurrentUser pathFrom={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO}><View/></SecurityRouteCurrentUser>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
