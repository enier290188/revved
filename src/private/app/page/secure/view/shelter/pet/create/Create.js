import {Box as MuiBox, Divider as MuiDivider} from "@mui/material"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes} from "react-router"
import {PATH_APP_PAGE_SECURE_SHELTER_PET} from "../../../../../../../setting/path/app/page/secure/shelter/pet"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET_CREATE} from "../../../../../../../setting/path/app/page/secure/shelter/pet/create"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET_UPDATE} from "../../../../../../../setting/path/app/page/secure/shelter/pet/update"
import {Context as ContextAlert} from "../../../../../../context/Alert"
import {Context as ContextUser} from "../../../../../../context/User"
import * as AppUtilForm from "../../../../../../util/form"
import * as AppUtilGraphql from "../../../../../../util/graphql"
import {APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS} from "../../../../layout/alert/Alert"
import {Button as LayoutButton} from "../../../../layout/main/button/Button"
import {NavLinkButton as LayoutNavLinkButton} from "../../../../layout/main/button/NavLinkButton"
import {Container as LayoutContainer} from "../../../../layout/main/container/Container"
import {Dialog as LayoutDialog} from "../../../../layout/main/dialog/Dialog"
import {AutocompleteGoogleAddress as LayoutAutocompleteGoogleAddress} from "../../../../layout/main/form/autocomplete/AutocompleteGoogleAddress"
import {AutocompleteGoogleAddressMap as LayoutAutocompleteGoogleAddressMap} from "../../../../layout/main/form/autocomplete/AutocompleteGoogleAddressMap"
import {TextField as LayoutTextField} from "../../../../layout/main/form/text-field/TextField"
import {TextFiledSelect as LayoutTextFiledSelect} from "../../../../layout/main/form/text-field/TextFiledSelect"
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
import {PaperTitleRight as LayoutPaperTitleRight} from "../../../../layout/main/paper/PaperTitleRight"
import {SecurityNavigateToIndex, SecurityNavigateToPath, SecurityNavigateToPathError404} from "../../../../security"

const STEP_RETURN_INITIAL = "step-return-initial"
const STEP_RETURN_SUCCESS = "step-return-success"
const STEP_RETURN_SUCCESS_SECURITY_NAVIGATE_TO_UPDATE = "step-return-success-security-navigate-to-UPDATE"
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
                instancePet,
                fieldName,
                fieldOwnerName,
                fieldEmail,
                fieldPhone,
                fieldAddress,
                fieldAddressMap,
                fieldLanguage
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL,
                stepIsSubmitting: false,
                instancePet: null,
                fieldName: {
                    value: "",
                    error: null
                },
                fieldOwnerName: {
                    value: "",
                    error: null
                },
                fieldEmail: {
                    value: "",
                    error: null,
                    help: [<FormattedMessage id={"app.page.secure.view.shelter.pet.create.field.email.help"}/>]
                },
                fieldPhone: {
                    value: "",
                    error: null,
                    help: [<FormattedMessage id={"app.page.secure.view.shelter.pet.create.field.phone.help"}/>]
                },
                fieldAddress: {
                    value: {},
                    valueList: [],
                    error: null
                },
                fieldAddressMap: {
                    value: {}
                },
                fieldLanguage: {
                    value: "",
                    valueList: [
                        {
                            value: "ENGLISH",
                            label: "ENGLISH"
                        },
                        {
                            value: "SPANISH",
                            label: "SPANISH"
                        }
                    ],
                    error: null
                }
            }
        )
        const isComponentMountedRef = React.useRef(true)

        const fieldNameValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"], ["fieldMaxLength", 32]])
        }

        const fieldOwnerNameValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"], ["fieldMaxLength", 32]])
        }

        const fieldEmailValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldTypeEmail"]])
        }

        const fieldPhoneValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldTypePhone"]])
        }

        const fieldAddressValidate = (value) => {
            return AppUtilForm.validateField(value && value.id ? value.id : "", [["fieldRequired"]])
        }

        const fieldLanguageValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"]])
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

        const fieldOwnerNameHandleOnChange = React.useCallback(
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

        const fieldPhoneHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldPhone: {
                                        ...oldState.fieldPhone,
                                        value: value,
                                        error: fieldPhoneValidate(value)
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

        const handleFieldAddressSearch = React.useCallback(
            async (search) => {
                try {
                    if (search && typeof search === "string" && search.trim() !== "") {
                        if (typeof window !== "undefined" && window.google) {
                            await (new window.google.maps.places.AutocompleteService())
                                .getPlacePredictions(
                                    {input: search},
                                    async (data) => {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        fieldAddress: {
                                                            ...oldState.fieldAddress,
                                                            valueList: data
                                                                ? data.map(
                                                                    (valueMap) => {
                                                                        return {
                                                                            id: valueMap.place_id,
                                                                            label: valueMap.description,
                                                                            mainText: valueMap.structured_formatting.main_text,
                                                                            mainTextMatchedSubstringList: valueMap.structured_formatting.main_text_matched_substrings,
                                                                            secondaryText: valueMap.structured_formatting.secondary_text
                                                                        }
                                                                    }
                                                                )
                                                                : []
                                                        }
                                                    }
                                                )
                                            )
                                        }
                                    }
                                )
                        }
                    } else {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        fieldAddress: {
                                            ...oldState.fieldAddress,
                                            value: {},
                                            valueList: [],
                                            error: fieldAddressValidate({})
                                        },
                                        fieldAddressMap: {
                                            ...oldState.fieldAddressMap,
                                            value: {}
                                        }
                                    }
                                )
                            )
                        }
                    }
                } catch (e) {
                }
            },
            []
        )

        const handleFieldAddressChanged = React.useCallback(
            async (value) => {
                try {
                    if (value && value.id) {
                        if (typeof window !== "undefined" && window.google) {
                            await (new window.google.maps.Geocoder())
                                .geocode({placeId: value.id})
                                .then(
                                    async ({results}) => {
                                        if (results[0] && results[0].geometry && results[0].geometry.location) {
                                            const lat = results[0].geometry.location.lat()
                                            const lng = results[0].geometry.location.lng()
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            fieldAddress: {
                                                                ...oldState.fieldAddress,
                                                                value: {...value, lat: lat, lng: lng, zoom: 18},
                                                                valueList: [...oldState.fieldAddress.valueList],
                                                                error: fieldAddressValidate(value)
                                                            },
                                                            fieldAddressMap: {
                                                                ...oldState.fieldAddressMap,
                                                                value: {...value, lat: lat, lng: lng, zoom: 18}
                                                            }
                                                        }
                                                    )
                                                )
                                            }
                                        }
                                    }
                                )
                        }
                    } else {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        fieldAddress: {
                                            ...oldState.fieldAddress,
                                            value: {},
                                            valueList: [],
                                            error: fieldAddressValidate({})
                                        },
                                        fieldAddressMap: {
                                            ...oldState.fieldAddressMap,
                                            value: {}
                                        }
                                    }
                                )
                            )
                        }
                    }
                } catch (e) {
                }
            },
            []
        )

        const handleFieldAddressMapChanged = React.useCallback(
            async (value) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldAddress: {
                                        ...oldState.fieldAddress,
                                        value: value,
                                        error: fieldAddressValidate(value)
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

        const fieldLanguageHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldLanguage: {
                                        ...oldState.fieldLanguage,
                                        value: value,
                                        error: fieldLanguageValidate(value)
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
                                    itemList: []
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
                            const petModelAddress = {}
                            const instancePet = {
                                id: null,
                                name: "",
                                ownerName: "",
                                email: "",
                                phone: "",
                                language: "ENGLISH"
                            }
                            return {
                                _response: {
                                    success: true
                                },
                                instancePet: instancePet,
                                fieldAddress: {
                                    value: petModelAddress,
                                    valueList: []
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
                                    itemList: []
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
                            const dataDictAddress = {}
                            try {
                                const dataDict = data.address
                                if (dataDict.id && dataDict.lat && dataDict.lng && dataDict.zoom && dataDict.label && dataDict.mainText && dataDict.secondaryText) {
                                    dataDictAddress.id = dataDict.id
                                    dataDictAddress.lat = dataDict.lat
                                    dataDictAddress.lng = dataDict.lng
                                    dataDictAddress.zoom = dataDict.zoom
                                    dataDictAddress.label = dataDict.label
                                    dataDictAddress.mainText = dataDict.mainText
                                    dataDictAddress.secondaryText = dataDict.secondaryText
                                }
                            } catch (e) {
                            }
                            const dataPetCreatedModel = await AppUtilGraphql.createModel(
                                {
                                    query: {
                                        name: "createPet",
                                        itemList: [
                                            {
                                                key: "name",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            },
                                            {
                                                key: "email",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            },
                                            {
                                                key: "phone",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            },
                                            {
                                                key: "address",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_DICTIONARY
                                            },
                                            {
                                                key: "language",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            }
                                        ],
                                        input: {
                                            name: data.name,
                                            email: data.email,
                                            phone: data.phone,
                                            address: JSON.stringify(dataDictAddress),
                                            language: data.language
                                        }
                                    }
                                }
                            )
                            if (dataPetCreatedModel._response.error && dataPetCreatedModel._response.errorType) {
                                if (dataPetCreatedModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                    ERROR_INTERNET_DISCONNECTED = true
                                }
                                if (dataPetCreatedModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                    ERROR_UNAUTHORIZED = true
                                }
                            }
                            const petCreatedModel = dataPetCreatedModel.instance

                            if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel && petCreatedModel) {
                                const petUpdatedModelAddress = {}
                                try {
                                    const jsonParse = JSON.parse(petCreatedModel.address)
                                    if (jsonParse.id && jsonParse.lat && jsonParse.lng && jsonParse.zoom && jsonParse.label && jsonParse.mainText && jsonParse.secondaryText) {
                                        petUpdatedModelAddress.id = jsonParse.id
                                        petUpdatedModelAddress.lat = jsonParse.lat
                                        petUpdatedModelAddress.lng = jsonParse.lng
                                        petUpdatedModelAddress.zoom = jsonParse.zoom
                                        petUpdatedModelAddress.label = jsonParse.label
                                        petUpdatedModelAddress.mainText = jsonParse.mainText
                                        petUpdatedModelAddress.secondaryText = jsonParse.secondaryText
                                    }
                                } catch (e) {
                                }
                                const instancePetCreated = {
                                    id: petCreatedModel.id,
                                    name: petCreatedModel.name,
                                    email: petCreatedModel.email,
                                    phone: petCreatedModel.phone,
                                    language: petCreatedModel.language
                                }
                                return {
                                    _response: {
                                        success: true
                                    },
                                    instancePet: instancePetCreated,
                                    fieldAddress: {
                                        value: petUpdatedModelAddress,
                                        valueList: []
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
                                                            instancePet: data.instancePet,
                                                            fieldName: {
                                                                ...oldState.fieldName,
                                                                value: data.instancePet.name,
                                                                error: fieldNameValidate(data.instancePet.name)
                                                            },
                                                            fieldOwnerName: {
                                                                ...oldState.fieldOwnerName,
                                                                value: data.instancePet.ownerName,
                                                                error: fieldOwnerNameValidate(data.instancePet.ownerName)
                                                            },
                                                            fieldEmail: {
                                                                ...oldState.fieldEmail,
                                                                value: data.instancePet.email,
                                                                error: fieldEmailValidate(data.instancePet.email)
                                                            },
                                                            fieldPhone: {
                                                                ...oldState.fieldPhone,
                                                                value: data.instancePet.phone,
                                                                error: fieldPhoneValidate(data.instancePet.phone)
                                                            },
                                                            fieldAddress: {
                                                                ...oldState.fieldAddress,
                                                                value: data.fieldAddress.value,
                                                                valueList: data.fieldAddress.valueList,
                                                                error: fieldAddressValidate(data.fieldAddress.value)
                                                            },
                                                            fieldAddressMap: {
                                                                ...oldState.fieldAddressMap,
                                                                value: data.fieldAddress.value
                                                            },
                                                            fieldLanguage: {
                                                                ...oldState.fieldLanguage,
                                                                value: data.instancePet.language,
                                                                error: fieldLanguageValidate(data.instancePet.language)
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
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.create.alert.refresh.then.warning"}})
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
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.create.alert.refresh.then.error"}})
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.create.alert.refresh.error"}})
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
                        const fieldEmailError = fieldEmailValidate(fieldEmail.value)
                        const fieldPhoneError = fieldPhoneValidate(fieldPhone.value)
                        const fieldAddressError = fieldAddressValidate(fieldAddress.value)
                        const fieldLanguageError = fieldLanguageValidate(fieldLanguage.value)

                        if (fieldNameError || fieldEmailError || fieldPhoneError || fieldAddressError || fieldLanguageError) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_SUBMIT_WARNING,
                                            fieldName: {
                                                ...oldState.fieldName,
                                                error: fieldNameError
                                            },
                                            fieldEmail: {
                                                ...oldState.fieldEmail,
                                                error: fieldEmailError
                                            },
                                            fieldPhone: {
                                                ...oldState.fieldPhone,
                                                error: fieldPhoneError
                                            },
                                            fieldAddress: {
                                                ...oldState.fieldAddress,
                                                error: fieldAddressError
                                            },
                                            fieldLanguage: {
                                                ...oldState.fieldLanguage,
                                                error: fieldLanguageError
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
                fieldName.value,
                fieldEmail.value,
                fieldPhone.value,
                fieldAddress.value,
                fieldLanguage.value
            ]
        )

        const handleStepEffectSubmitIsSubmitting = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SUBMIT_IS_SUBMITTING && stepIsSubmitting === true && 0 === contextAlert.getAlertList().length) {
                        await submitData(
                            {
                                name: fieldName.value,
                                email: fieldEmail.value,
                                phone: fieldPhone.value,
                                address: fieldAddress.value,
                                language: fieldLanguage.value
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
                                                            instancePet: data.instancePet,
                                                            fieldName: {
                                                                ...oldState.fieldName,
                                                                value: data.instancePet.name,
                                                                error: fieldNameValidate(data.instancePet.name)
                                                            },
                                                            fieldEmail: {
                                                                ...oldState.fieldEmail,
                                                                value: data.instancePet.email,
                                                                error: fieldEmailValidate(data.instancePet.email)
                                                            },
                                                            fieldPhone: {
                                                                ...oldState.fieldPhone,
                                                                value: data.instancePet.phone,
                                                                error: fieldPhoneValidate(data.instancePet.phone)
                                                            },
                                                            fieldAddress: {
                                                                ...oldState.fieldAddress,
                                                                value: data.fieldAddress.value,
                                                                valueList: data.fieldAddress.valueList,
                                                                error: fieldAddressValidate(data.fieldAddress.value)
                                                            },
                                                            fieldAddressMap: {
                                                                ...oldState.fieldAddressMap,
                                                                value: data.fieldAddress.value
                                                            },
                                                            fieldLanguage: {
                                                                ...oldState.fieldLanguage,
                                                                value: data.instancePet.language,
                                                                error: fieldLanguageValidate(data.instancePet.language)
                                                            }
                                                        }
                                                    )
                                                )
                                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS, message: {id: "app.page.secure.view.shelter.pet.create.alert.submit.then.success", values: {name: data.instancePet.name}}})
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
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.create.alert.submit.then.warning"}})
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
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.create.alert.submit.then.error"}})
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.create.alert.submit.error"}})
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                stepIsSubmitting,
                fieldName.value,
                fieldEmail.value,
                fieldPhone.value,
                fieldAddress.value,
                fieldLanguage.value,
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
                                    stepReturn: STEP_RETURN_SUCCESS_SECURITY_NAVIGATE_TO_UPDATE,
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
                        <LayoutLoadingSecurity/>
                        <LayoutDialog>
                            <LayoutContainer maxWidth={"sm"}>
                                <LayoutPaper>
                                    <LayoutPaperTitle>
                                        <LayoutPaperTitleLeft>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutPaperTitleLeftTypographyLevel1 iconFont={"add_circle"} text1={<FormattedMessage id={"app.page.secure.view.shelter.pet.create"}/>}/>
                                            </MuiBox>
                                        </LayoutPaperTitleLeft>
                                    </LayoutPaperTitle>
                                    <MuiBox component={"div"} p={0}>
                                        <MuiDivider component={"div"}/>
                                    </MuiBox>
                                    <LayoutPaperContent>
                                        <LayoutPaperContentCenter maxWidth={true}>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutLoadingText/>
                                            </MuiBox>
                                        </LayoutPaperContentCenter>
                                    </LayoutPaperContent>
                                </LayoutPaper>
                            </LayoutContainer>
                        </LayoutDialog>
                    </React.Fragment>
                )
            case STEP_RETURN_SUCCESS:
                return (
                    <React.Fragment>
                        {stepIsSubmitting || stepEffect !== STEP_EFFECT_DEFAULT ? <LayoutLoadingSecurity/> : null}
                        <LayoutDialog>
                            <LayoutContainer maxWidth={"sm"}>
                                <LayoutPaper>
                                    <LayoutPaperTitle>
                                        <LayoutPaperTitleLeft>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutPaperTitleLeftTypographyLevel1 iconFont={"add_circle"} text1={<FormattedMessage id={"app.page.secure.view.shelter.pet.create"}/>}/>
                                            </MuiBox>
                                        </LayoutPaperTitleLeft>
                                        <LayoutPaperTitleRight>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutNavLinkButton
                                                    url={PATH_APP_PAGE_SECURE_SHELTER_PET}
                                                    loading={false}
                                                    disabled={stepIsSubmitting}
                                                    variant={"contained"}
                                                    color={"error"}
                                                    size={"small"}
                                                    iconFont={"close"}
                                                />
                                            </MuiBox>
                                        </LayoutPaperTitleRight>
                                    </LayoutPaperTitle>
                                    <MuiBox component={"div"} p={0}>
                                        <MuiDivider component={"div"}/>
                                    </MuiBox>
                                    <LayoutPaperContent>
                                        <LayoutPaperContentCenter maxWidth={"480px"}>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutTextField
                                                    disabled={stepIsSubmitting}
                                                    required={false}
                                                    type={"text"}
                                                    iconFont={"description"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.create.field.name.label"}/>}
                                                    field={fieldName}
                                                    handleOnChange={fieldNameHandleOnChange}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutTextField
                                                    disabled={stepIsSubmitting}
                                                    required={false}
                                                    type={"text"}
                                                    iconFont={"description"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.create.field.owner-name.label"}/>}
                                                    field={fieldOwnerName}
                                                    handleOnChange={fieldOwnerNameHandleOnChange}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutTextField
                                                    disabled={stepIsSubmitting}
                                                    required={false}
                                                    type={"email"}
                                                    iconFont={"email"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.create.field.email.label"}/>}
                                                    field={fieldEmail}
                                                    handleOnChange={fieldEmailHandleOnChange}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutTextField
                                                    disabled={stepIsSubmitting}
                                                    required={false}
                                                    type={"tel"}
                                                    iconFont={"phone"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.create.field.phone.label"}/>}
                                                    field={fieldPhone}
                                                    handleOnChange={fieldPhoneHandleOnChange}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutAutocompleteGoogleAddress
                                                    disabled={stepIsSubmitting}
                                                    required={true}
                                                    iconFont={"place"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.create.field.address.label"}/>}
                                                    field={fieldAddress}
                                                    handleSearch={handleFieldAddressSearch}
                                                    handleChanged={handleFieldAddressChanged}
                                                />
                                                <LayoutAutocompleteGoogleAddressMap
                                                    field={fieldAddressMap}
                                                    handleChanged={handleFieldAddressMapChanged}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutTextFiledSelect
                                                    disabled={stepIsSubmitting}
                                                    required={true}
                                                    type={"text"}
                                                    iconFont={"translate"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.create.field.language.label"}/>}
                                                    field={fieldLanguage}
                                                    handleOnChange={fieldLanguageHandleOnChange}
                                                />
                                            </MuiBox>
                                        </LayoutPaperContentCenter>
                                    </LayoutPaperContent>
                                    <MuiBox component={"div"} p={0} pt={2}>
                                        {stepIsSubmitting ? <LayoutLoadingLinearProgress/> : <MuiDivider component={"div"}/>}
                                    </MuiBox>
                                    <LayoutPaperAction>
                                        <LayoutPaperActionLeft>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutButton
                                                    loading={stepIsSubmitting}
                                                    disabled={stepIsSubmitting || Boolean(fieldName.error) || Boolean(fieldEmail.error) || Boolean(fieldPhone.error) || Boolean(fieldAddress.error) || Boolean(fieldLanguage.error)}
                                                    variant={"contained"}
                                                    size={"small"}
                                                    iconFont={"save"}
                                                    text={<FormattedMessage id={"app.page.secure.view.shelter.pet.create.action.submit"}/>}
                                                    handleOnClick={handleSubmit}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutButton
                                                    loading={stepEffect === STEP_EFFECT_REFRESH}
                                                    disabled={stepIsSubmitting}
                                                    size={"small"}
                                                    iconFont={"update"}
                                                    text={<FormattedMessage id={"app.page.secure.view.shelter.pet.create.action.refresh"}/>}
                                                    handleOnClick={handleRefresh}
                                                />
                                            </MuiBox>
                                        </LayoutPaperActionLeft>
                                    </LayoutPaperAction>
                                </LayoutPaper>
                            </LayoutContainer>
                        </LayoutDialog>
                    </React.Fragment>
                )
            case STEP_RETURN_SUCCESS_SECURITY_NAVIGATE_TO_UPDATE:
                return <SecurityNavigateToPath path={`${PATH_APP_PAGE_SECURE_SHELTER_PET}${instancePet.id}/${SLUG_APP_PAGE_SECURE_SHELTER_PET_UPDATE}`}/>
            case STEP_RETURN_SECURITY_NAVIGATE_TO_PATH_ERROR_404:
                return <SecurityNavigateToPathError404/>
            case STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX:
                return <SecurityNavigateToIndex pathFrom={`${PATH_APP_PAGE_SECURE_SHELTER_PET}${SLUG_APP_PAGE_SECURE_SHELTER_PET_CREATE}`}/>
            default:
                return null
        }
    }
)

export const Create = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`/`} element={<View/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
