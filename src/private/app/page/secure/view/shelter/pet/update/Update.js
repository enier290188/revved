import {Box as MuiBox, Divider as MuiDivider} from "@mui/material"
import {Storage} from "aws-amplify"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes, useParams} from "react-router"
import {PATH_APP_PAGE_SECURE_SHELTER_PET} from "../../../../../../../setting/path/app/page/secure/shelter/pet"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET_COMMENT} from "../../../../../../../setting/path/app/page/secure/shelter/pet/comment"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET_DELETE} from "../../../../../../../setting/path/app/page/secure/shelter/pet/delete"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET_UPDATE} from "../../../../../../../setting/path/app/page/secure/shelter/pet/update"
import {STORAGE_APP_PET} from "../../../../../../../setting/storage/app"
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
import {ImageCropped as LayoutImageCropped} from "../../../../layout/main/form/image/ImageCropped"
import {TextField as LayoutTextField} from "../../../../layout/main/form/text-field/TextField"
import {TextFiledSelect as LayoutTextFiledSelect} from "../../../../layout/main/form/text-field/TextFiledSelect"
import {LoadingLinearProgress as LayoutLoadingLinearProgress} from "../../../../layout/main/loading/LoadingLinearProgress"
import {LoadingSecurity as LayoutLoadingSecurity} from "../../../../layout/main/loading/LoadingSecurity"
import {LoadingText as LayoutLoadingText} from "../../../../layout/main/loading/LoadingText"
import {Paper as LayoutPaper} from "../../../../layout/main/paper/Paper"
import {PaperAction as LayoutPaperAction} from "../../../../layout/main/paper/PaperAction"
import {PaperActionLeft as LayoutPaperActionLeft} from "../../../../layout/main/paper/PaperActionLeft"
import {PaperActionRight as LayoutPaperActionRight} from "../../../../layout/main/paper/PaperActionRight"
import {PaperContent as LayoutPaperContent} from "../../../../layout/main/paper/PaperContent"
import {PaperContentCenter as LayoutPaperContentCenter} from "../../../../layout/main/paper/PaperContentCenter"
import {PaperTitle as LayoutPaperTitle} from "../../../../layout/main/paper/PaperTitle"
import {PaperTitleLeft as LayoutPaperTitleLeft} from "../../../../layout/main/paper/PaperTitleLeft"
import {PaperTitleLeftTypographyLevel1 as LayoutPaperTitleLeftTypographyLevel1} from "../../../../layout/main/paper/PaperTitleLeftTypographyLevel1"
import {PaperTitleRight as LayoutPaperTitleRight} from "../../../../layout/main/paper/PaperTitleRight"
import {SecurityNavigateToIndex, SecurityNavigateToPathError404} from "../../../../security"

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

const CROP_CONFIG_INITIAL_PICTURE = {
    unit: "px",
    aspect: 1,
    x: 0,
    y: 0,
    width: 200,
    height: 200
}

const View = React.memo(
    () => {
        const {paramPetId} = useParams()
        const contextUser = React.useContext(ContextUser)
        const contextAlert = React.useContext(ContextAlert)
        const [
            {
                stepReturn,
                stepEffect,
                stepIsSubmitting,
                instancePet,
                fieldPicture,
                fieldName,
                fieldOwnerName,
                fieldOwnerEmail,
                fieldOwnerPhone,
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
                fieldPicture: {
                    key: "fieldPicture",
                    value: "",
                    error: null
                },
                fieldName: {
                    value: "",
                    error: null
                },
                fieldOwnerName: {
                    value: "",
                    error: null
                },
                fieldOwnerEmail: {
                    value: "",
                    error: null,
                    help: [<FormattedMessage id={"app.page.secure.view.shelter.pet.update.field.owner-email.help"}/>]
                },
                fieldOwnerPhone: {
                    value: "",
                    error: null,
                    help: [<FormattedMessage id={"app.page.secure.view.shelter.pet.update.field.owner-phone.help"}/>]
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

        const fieldPictureValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldTypePicture"]])
        }

        const fieldNameValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldMaxLength", 32]])
        }

        const fieldOwnerNameValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldMaxLength", 32]])
        }

        const fieldOwnerEmailValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldTypeEmail"]])
        }

        const fieldOwnerPhoneValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldTypeOwnerPhone"]])
        }

        const fieldAddressValidate = (value) => {
            return AppUtilForm.validateField(value && value.id ? value.id : "", [["fieldRequired"]])
        }

        const fieldLanguageValidate = (value) => {
            return AppUtilForm.validateField(value, [["fieldRequired"]])
        }

        const fieldPictureHandleOnChange = React.useCallback(
            (newStatePicture) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldPicture: {
                                        ...oldState.fieldPicture,
                                        error: newStatePicture.imageCroppedFile ? fieldPictureValidate(newStatePicture.imageCroppedFile) : oldState.fieldPicture.error,
                                        ...newStatePicture
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
                                    fieldOwnerName: {
                                        ...oldState.fieldOwnerName,
                                        value: value,
                                        error: fieldOwnerNameValidate(value)
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

        const fieldOwnerEmailHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldOwnerEmail: {
                                        ...oldState.fieldOwnerEmail,
                                        value: value,
                                        error: fieldOwnerEmailValidate(value)
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

        const fieldOwnerPhoneHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldOwnerPhone: {
                                        ...oldState.fieldOwnerPhone,
                                        value: value,
                                        error: fieldOwnerPhoneValidate(value)
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

                        const dataPetModel = await AppUtilGraphql.getModel(
                            {
                                query: {
                                    name: "getPet",
                                    id: paramPetId,
                                    itemList: [
                                        {
                                            key: "picture",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "name",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "ownerName",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "ownerEmail",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "ownerPhone",
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
                                    ]
                                }
                            }
                        )
                        if (dataPetModel._response.error && dataPetModel._response.errorType) {
                            if (dataPetModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                ERROR_INTERNET_DISCONNECTED = true
                            }
                            if (dataPetModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                ERROR_UNAUTHORIZED = true
                            }
                        }
                        const petModel = dataPetModel.instance

                        if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel && petModel) {
                            let petModelPicture = null
                            const petModelPictureUrl = petModel.picture
                                ? await Storage.get(
                                    petModel.picture,
                                    {
                                        level: "public",
                                        acl: "private",
                                        contentType: "image/png",
                                        expires: 60
                                    }
                                )
                                : null
                            if (petModelPictureUrl) {
                                const toDataURL = async url => fetch(url)
                                    .then(
                                        response => response.blob()
                                    )
                                    .then(
                                        blob => new Promise(
                                            (resolve, reject) => {
                                                const reader = new FileReader()
                                                reader.onloadend = () => resolve(reader.result)
                                                reader.onerror = reject
                                                reader.readAsDataURL(blob)
                                            }
                                        )
                                    )
                                await toDataURL(petModelPictureUrl)
                                    .then(
                                        (dataUrl) => {
                                            petModelPicture = dataUrl
                                        }
                                    )
                            }
                            const petModelAddress = {}
                            try {
                                const jsonParse = JSON.parse(petModel.address)
                                if (jsonParse.id && jsonParse.lat && jsonParse.lng && jsonParse.zoom && jsonParse.label && jsonParse.mainText && jsonParse.secondaryText) {
                                    petModelAddress.id = jsonParse.id
                                    petModelAddress.lat = jsonParse.lat
                                    petModelAddress.lng = jsonParse.lng
                                    petModelAddress.zoom = jsonParse.zoom
                                    petModelAddress.label = jsonParse.label
                                    petModelAddress.mainText = jsonParse.mainText
                                    petModelAddress.secondaryText = jsonParse.secondaryText
                                }
                            } catch (e) {
                            }
                            const instancePet = {
                                id: petModel.id,
                                name: petModel.name,
                                ownerName: petModel.ownerName,
                                ownerEmail: petModel.ownerEmail,
                                ownerPhone: petModel.ownerPhone,
                                language: petModel.language
                            }
                            return {
                                _response: {
                                    success: true
                                },
                                instancePet: instancePet,
                                fieldPicture: {
                                    value: petModelPicture
                                },
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
                paramPetId,
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

                        const dataPetModel = await AppUtilGraphql.getModel(
                            {
                                query: {
                                    name: "getPet",
                                    id: paramPetId,
                                    itemList: [
                                        {
                                            key: "picture",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "name",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "ownerName",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "ownerEmail",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "ownerPhone",
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
                                    ]
                                }
                            }
                        )
                        if (dataPetModel._response.error && dataPetModel._response.errorType) {
                            if (dataPetModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                ERROR_INTERNET_DISCONNECTED = true
                            }
                            if (dataPetModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                ERROR_UNAUTHORIZED = true
                            }
                        }
                        const petModel = dataPetModel.instance

                        if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel && petModel) {
                            let storageResponsePicture = null
                            try {
                                if (data.picture.imageToDelete === true) {
                                    await Storage.remove(
                                        `${STORAGE_APP_PET}${petModel.id}/picture.png`,
                                        {
                                            level: "public"
                                        }
                                    )
                                } else {
                                    if (data.picture.imageCroppedFile) {
                                        storageResponsePicture = await Storage.put(
                                            `${STORAGE_APP_PET}${petModel.id}/picture.png`,
                                            data.picture.imageCroppedFile,
                                            {
                                                level: "public",
                                                acl: "private",
                                                contentType: "image/png"
                                            }
                                        )
                                    }
                                }
                            } catch (e) {
                            }
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
                            const dataPetUpdatedModel = await AppUtilGraphql.updateModel(
                                {
                                    query: {
                                        name: "updatePet",
                                        id: petModel.id,
                                        itemList: [
                                            {
                                                key: "picture",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            },
                                            {
                                                key: "name",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            },
                                            {
                                                key: "ownerName",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            },
                                            {
                                                key: "ownerEmail",
                                                type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                            },
                                            {
                                                key: "ownerPhone",
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
                                            picture: data.picture.imageToDelete === true ? "" : storageResponsePicture && storageResponsePicture.key ? storageResponsePicture.key : petModel.picture,
                                            name: data.name,
                                            ownerName: data.ownerName,
                                            ownerEmail: data.ownerEmail,
                                            ownerPhone: data.ownerPhone,
                                            address: JSON.stringify(dataDictAddress),
                                            language: data.language,
                                            _version: petModel._version
                                        }
                                    }
                                }
                            )
                            if (dataPetUpdatedModel._response.error && dataPetUpdatedModel._response.errorType) {
                                if (dataPetUpdatedModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                    ERROR_INTERNET_DISCONNECTED = true
                                }
                                if (dataPetUpdatedModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                    ERROR_UNAUTHORIZED = true
                                }
                            }
                            const petUpdatedModel = dataPetUpdatedModel.instance

                            if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel && petUpdatedModel) {
                                let petUpdatedModelPicture = null
                                const petUpdatedModelPictureUrl = petUpdatedModel.picture
                                    ? await Storage.get(
                                        petUpdatedModel.picture,
                                        {
                                            level: "public",
                                            acl: "private",
                                            contentType: "image/png",
                                            expires: 60
                                        }
                                    )
                                    : null
                                if (petUpdatedModelPictureUrl) {
                                    const toDataURL = async url => fetch(url)
                                        .then(
                                            response => response.blob()
                                        )
                                        .then(
                                            blob => new Promise(
                                                (resolve, reject) => {
                                                    const reader = new FileReader()
                                                    reader.onloadend = () => resolve(reader.result)
                                                    reader.onerror = reject
                                                    reader.readAsDataURL(blob)
                                                }
                                            )
                                        )
                                    await toDataURL(petUpdatedModelPictureUrl)
                                        .then(
                                            (dataUrl) => {
                                                petUpdatedModelPicture = dataUrl
                                            }
                                        )
                                }
                                const petUpdatedModelAddress = {}
                                try {
                                    const jsonParse = JSON.parse(petUpdatedModel.address)
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
                                const instancePetUpdated = {
                                    id: petUpdatedModel.id,
                                    name: petUpdatedModel.name,
                                    ownerName: petUpdatedModel.ownerName,
                                    ownerEmail: petUpdatedModel.ownerEmail,
                                    ownerPhone: petUpdatedModel.ownerPhone,
                                    language: petUpdatedModel.language
                                }
                                return {
                                    _response: {
                                        success: true
                                    },
                                    instancePet: instancePetUpdated,
                                    fieldPicture: {
                                        value: petUpdatedModelPicture
                                    },
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
                paramPetId,
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
                                                            fieldPicture: {
                                                                ...oldState.fieldPicture,
                                                                value: data.fieldPicture.value,
                                                                error: null,
                                                                cropConfigInitial: CROP_CONFIG_INITIAL_PICTURE,
                                                                cropConfig: CROP_CONFIG_INITIAL_PICTURE,
                                                                imageToDelete: false,
                                                                imageRef: null,
                                                                imageFile: null,
                                                                imageSrc: null,
                                                                imageCroppedFile: null,
                                                                imageCroppedSrc: null,
                                                                text: data.instancePet.name
                                                            },
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
                                                            fieldOwnerEmail: {
                                                                ...oldState.fieldOwnerEmail,
                                                                value: data.instancePet.ownerEmail,
                                                                error: fieldOwnerEmailValidate(data.instancePet.ownerEmail)
                                                            },
                                                            fieldOwnerPhone: {
                                                                ...oldState.fieldOwnerPhone,
                                                                value: data.instancePet.ownerPhone,
                                                                error: fieldOwnerPhoneValidate(data.instancePet.ownerPhone)
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
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.update.alert.refresh.then.warning"}})
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
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.update.alert.refresh.then.error"}})
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.update.alert.refresh.error"}})
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
                        const fieldPictureError = fieldPictureValidate(fieldPicture.imageCroppedFile)
                        const fieldNameError = fieldNameValidate(fieldName.value)
                        const fieldOwnerNameError = fieldOwnerNameValidate(fieldOwnerName.value)
                        const fieldOwnerEmailError = fieldOwnerEmailValidate(fieldOwnerEmail.value)
                        const fieldOwnerPhoneError = fieldOwnerPhoneValidate(fieldOwnerPhone.value)
                        const fieldAddressError = fieldAddressValidate(fieldAddress.value)
                        const fieldLanguageError = fieldLanguageValidate(fieldLanguage.value)

                        if (fieldPictureError || fieldNameError || fieldOwnerNameError || fieldOwnerEmailError || fieldOwnerPhoneError || fieldAddressError || fieldLanguageError) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_SUBMIT_WARNING,
                                            fieldPicture: {
                                                ...oldState.fieldPicture,
                                                value: oldState.fieldPicture.value,
                                                error: fieldPictureError
                                            },
                                            fieldName: {
                                                ...oldState.fieldName,
                                                error: fieldNameError
                                            },
                                            fieldOwnerName: {
                                                ...oldState.fieldOwnerName,
                                                error: fieldOwnerNameError
                                            },
                                            fieldOwnerEmail: {
                                                ...oldState.fieldOwnerEmail,
                                                error: fieldOwnerEmailError
                                            },
                                            fieldOwnerPhone: {
                                                ...oldState.fieldOwnerPhone,
                                                error: fieldOwnerPhoneError
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
                fieldPicture.imageCroppedFile,
                fieldName.value,
                fieldOwnerName.value,
                fieldOwnerEmail.value,
                fieldOwnerPhone.value,
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
                                picture: {
                                    imageToDelete: fieldPicture.imageToDelete,
                                    imageCroppedFile: fieldPicture.imageCroppedFile
                                },
                                name: fieldName.value,
                                ownerName: fieldOwnerName.value,
                                ownerEmail: fieldOwnerEmail.value,
                                ownerPhone: fieldOwnerPhone.value,
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
                                                            fieldPicture: {
                                                                ...oldState.fieldPicture,
                                                                value: data.fieldPicture.value,
                                                                error: null,
                                                                cropConfigInitial: CROP_CONFIG_INITIAL_PICTURE,
                                                                cropConfig: CROP_CONFIG_INITIAL_PICTURE,
                                                                imageToDelete: false,
                                                                imageRef: null,
                                                                imageFile: null,
                                                                imageSrc: null,
                                                                imageCroppedFile: null,
                                                                imageCroppedSrc: null,
                                                                text: data.instancePet.name
                                                            },
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
                                                            fieldOwnerEmail: {
                                                                ...oldState.fieldOwnerEmail,
                                                                value: data.instancePet.ownerEmail,
                                                                error: fieldOwnerEmailValidate(data.instancePet.ownerEmail)
                                                            },
                                                            fieldOwnerPhone: {
                                                                ...oldState.fieldOwnerPhone,
                                                                value: data.instancePet.ownerPhone,
                                                                error: fieldOwnerPhoneValidate(data.instancePet.ownerPhone)
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
                                                contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS, message: {id: "app.page.secure.view.shelter.pet.update.alert.submit.then.success", values: {name: data.instancePet.name}}})
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
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.update.alert.submit.then.warning"}})
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
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.update.alert.submit.then.error"}})
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.update.alert.submit.error"}})
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                stepIsSubmitting,
                fieldPicture.imageToDelete,
                fieldPicture.imageCroppedFile,
                fieldName.value,
                fieldOwnerName.value,
                fieldOwnerEmail.value,
                fieldOwnerPhone.value,
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
                        <LayoutLoadingSecurity/>
                        <LayoutDialog>
                            <LayoutContainer maxWidth={"sm"}>
                                <LayoutPaper>
                                    <LayoutPaperTitle>
                                        <LayoutPaperTitleLeft>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutPaperTitleLeftTypographyLevel1 iconFont={"edit"} text1={<FormattedMessage id={"app.page.secure.view.shelter.pet.update"}/>}/>
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
                                                <LayoutPaperTitleLeftTypographyLevel1 iconFont={"edit"} text1={<FormattedMessage id={"app.page.secure.view.shelter.pet.update"}/>}/>
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
                                                <LayoutImageCropped
                                                    disabled={stepIsSubmitting}
                                                    variant={"circular"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.field.picture.label"}/>}
                                                    field={fieldPicture}
                                                    handleOnChange={fieldPictureHandleOnChange}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutTextField
                                                    disabled={stepIsSubmitting}
                                                    required={false}
                                                    type={"text"}
                                                    iconFont={"description"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.field.name.label"}/>}
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
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.field.owner-name.label"}/>}
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
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.field.owner-email.label"}/>}
                                                    field={fieldOwnerEmail}
                                                    handleOnChange={fieldOwnerEmailHandleOnChange}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutTextField
                                                    disabled={stepIsSubmitting}
                                                    required={false}
                                                    type={"tel"}
                                                    iconFont={"phone"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.field.owner-phone.label"}/>}
                                                    field={fieldOwnerPhone}
                                                    handleOnChange={fieldOwnerPhoneHandleOnChange}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutAutocompleteGoogleAddress
                                                    disabled={stepIsSubmitting}
                                                    required={true}
                                                    iconFont={"place"}
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.field.address.label"}/>}
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
                                                    label={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.field.language.label"}/>}
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
                                                    disabled={stepIsSubmitting || Boolean(fieldPicture.error) || Boolean(fieldName.error) || Boolean(fieldOwnerName.error) || Boolean(fieldOwnerEmail.error) || Boolean(fieldOwnerPhone.error) || Boolean(fieldAddress.error) || Boolean(fieldLanguage.error)}
                                                    variant={"contained"}
                                                    size={"small"}
                                                    iconFont={"save"}
                                                    text={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.action.submit"}/>}
                                                    handleOnClick={handleSubmit}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutButton
                                                    loading={stepEffect === STEP_EFFECT_REFRESH}
                                                    disabled={stepIsSubmitting}
                                                    size={"small"}
                                                    iconFont={"update"}
                                                    text={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.action.refresh"}/>}
                                                    handleOnClick={handleRefresh}
                                                />
                                            </MuiBox>
                                        </LayoutPaperActionLeft>
                                        <LayoutPaperActionRight>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutNavLinkButton
                                                    url={`${PATH_APP_PAGE_SECURE_SHELTER_PET}${paramPetId}/${SLUG_APP_PAGE_SECURE_SHELTER_PET_COMMENT}`}
                                                    loading={false}
                                                    disabled={stepIsSubmitting}
                                                    size={"small"}
                                                    iconFont={"comment"}
                                                    text={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.action.comment"}/>}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutNavLinkButton
                                                    url={`${PATH_APP_PAGE_SECURE_SHELTER_PET}${paramPetId}/${SLUG_APP_PAGE_SECURE_SHELTER_PET_DELETE}`}
                                                    loading={false}
                                                    disabled={stepIsSubmitting}
                                                    size={"small"}
                                                    iconFont={"delete"}
                                                    text={<FormattedMessage id={"app.page.secure.view.shelter.pet.update.action.delete"}/>}
                                                />
                                            </MuiBox>
                                        </LayoutPaperActionRight>
                                    </LayoutPaperAction>
                                </LayoutPaper>
                            </LayoutContainer>
                        </LayoutDialog>
                    </React.Fragment>
                )
            case STEP_RETURN_SECURITY_NAVIGATE_TO_PATH_ERROR_404:
                return <SecurityNavigateToPathError404/>
            case STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX:
                return <SecurityNavigateToIndex pathFrom={`${PATH_APP_PAGE_SECURE_SHELTER_PET}${paramPetId}/${SLUG_APP_PAGE_SECURE_SHELTER_PET_UPDATE}`}/>
            default:
                return null
        }
    }
)

export const Update = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`/`} element={<View/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
