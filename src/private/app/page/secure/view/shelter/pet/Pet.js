import {Box as MuiBox, Divider as MuiDivider} from "@mui/material"
import {API, Auth} from "aws-amplify"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes, useLocation} from "react-router"
import * as AmplifyGraphqlSubscription from "../../../../../../../graphql/subscriptions"
import {PATH_APP_PAGE_SECURE_SHELTER_PET} from "../../../../../../setting/path/app/page/secure/shelter/pet"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET_COMMENT} from "../../../../../../setting/path/app/page/secure/shelter/pet/comment"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET_CREATE} from "../../../../../../setting/path/app/page/secure/shelter/pet/create"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET_DELETE} from "../../../../../../setting/path/app/page/secure/shelter/pet/delete"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET_UPDATE} from "../../../../../../setting/path/app/page/secure/shelter/pet/update"
import {Context as ContextAlert} from "../../../../../context/Alert"
import {Context as ContextUser} from "../../../../../context/User"
import * as AppUtilGraphql from "../../../../../util/graphql"
import {APP_PAGE_SECURE_LAYOUT_ALERT_ERROR} from "../../../layout/alert/Alert"
import {Button as LayoutButton} from "../../../layout/main/button/Button"
import {Container as LayoutContainer} from "../../../layout/main/container/Container"
import {LoadingSecurity as LayoutLoadingSecurity} from "../../../layout/main/loading/LoadingSecurity"
import {LoadingText as LayoutLoadingText} from "../../../layout/main/loading/LoadingText"
import {Paper as LayoutPaper} from "../../../layout/main/paper/Paper"
import {PaperContent as LayoutPaperContent} from "../../../layout/main/paper/PaperContent"
import {PaperContentCenter as LayoutPaperContentCenter} from "../../../layout/main/paper/PaperContentCenter"
import {PaperTitle as LayoutPaperTitle} from "../../../layout/main/paper/PaperTitle"
import {PaperTitleLeft as LayoutPaperTitleLeft} from "../../../layout/main/paper/PaperTitleLeft"
import {PaperTitleLeftTypographyLevel1 as LayoutPaperTitleLeftTypographyLevel1} from "../../../layout/main/paper/PaperTitleLeftTypographyLevel1"
import {PaperTitleRight as LayoutPaperTitleRight} from "../../../layout/main/paper/PaperTitleRight"
import {Table as LayoutTable, TABLE_COLUMN_TYPE_DATETIME, TABLE_COLUMN_TYPE_STRING, TABLE_SORT_ORDER_ASC} from "../../../layout/main/table/Table"
import {SecurityNavigateToIndex, SecurityNavigateToPathError404, SecurityRouteCurrentUserShelter} from "../../../security"
import {Comment as ViewComment} from "./comment/Comment"
import {Create as ViewCreate} from "./create/Create"
import {Delete as ViewDelete} from "./delete/Delete"
import {Update as ViewUpdate} from "./update/Update"

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
const STEP_EFFECT_DEFAULT = "step-effect-default"

const ViewList = React.memo(
    ({children}) => {
        const contextUser = React.useContext(ContextUser)
        const contextAlert = React.useContext(ContextAlert)
        const [
            {
                stepReturn,
                stepEffect,
                stepIsSubmitting,
                crud
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL,
                stepIsSubmitting: false,
                crud: {
                    url: PATH_APP_PAGE_SECURE_SHELTER_PET,
                    action: {
                        headList: [
                            {
                                slug: SLUG_APP_PAGE_SECURE_SHELTER_PET_CREATE,
                                iconFont: "add_circle"
                            }
                        ],
                        bodyList: [
                            {
                                slug: SLUG_APP_PAGE_SECURE_SHELTER_PET_UPDATE,
                                iconFont: "edit"
                            },
                            {
                                slug: SLUG_APP_PAGE_SECURE_SHELTER_PET_COMMENT,
                                iconFont: "comment"
                            },
                            {
                                slug: SLUG_APP_PAGE_SECURE_SHELTER_PET_DELETE,
                                iconFont: "delete"
                            }
                        ]
                    },
                    pagination: true,
                    columnList: [
                        {
                            id: "name",
                            label: <FormattedMessage id={"app.page.secure.view.shelter.pet.list.column.name"}/>,
                            type: TABLE_COLUMN_TYPE_STRING,
                            search: true,
                            sort: {order: TABLE_SORT_ORDER_ASC, active: true},
                            action: null,
                            width: null
                        }
                    ],
                    columnExtraList: [
                        {
                            id: "ownerName",
                            label: <FormattedMessage id={"app.page.secure.view.shelter.pet.list.column.owner-name"}/>,
                            type: TABLE_COLUMN_TYPE_STRING,
                            search: true,
                            action: null
                        },
                        {
                            id: "ownerEmail",
                            label: <FormattedMessage id={"app.page.secure.view.shelter.pet.list.column.owner-email"}/>,
                            type: TABLE_COLUMN_TYPE_STRING,
                            search: true,
                            action: null
                        },
                        {
                            id: "ownerPhone",
                            label: <FormattedMessage id={"app.page.secure.view.shelter.pet.list.column.owner-phone"}/>,
                            type: TABLE_COLUMN_TYPE_STRING,
                            search: true,
                            action: null
                        },
                        {
                            id: "ownerAddress",
                            label: <FormattedMessage id={"app.page.secure.view.shelter.pet.list.column.owner-address"}/>,
                            type: TABLE_COLUMN_TYPE_STRING,
                            search: true,
                            action: null
                        },
                        {
                            id: "ownerLanguage",
                            label: <FormattedMessage id={"app.page.secure.view.shelter.pet.list.column.owner-language"}/>,
                            type: TABLE_COLUMN_TYPE_STRING,
                            search: true,
                            action: null
                        },
                        {
                            id: "createdAt",
                            label: <FormattedMessage id={"app.page.secure.view.shelter.pet.list.column.created-at"}/>,
                            type: TABLE_COLUMN_TYPE_DATETIME,
                            search: null,
                            action: null
                        },
                        {
                            id: "updatedAt",
                            label: <FormattedMessage id={"app.page.secure.view.shelter.pet.list.column.updated-at"}/>,
                            type: TABLE_COLUMN_TYPE_DATETIME,
                            search: null,
                            action: null
                        }
                    ],
                    rowList: []
                }
            }
        )
        const isComponentMountedRef = React.useRef(true)
        const subscriptionOnCreatePetModelRef = React.useRef(null)
        const subscriptionOnUpdatePetModelRef = React.useRef(null)
        const subscriptionOnDeletePetModelRef = React.useRef(null)

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

                        const dataPetModelList = await AppUtilGraphql.getModelList(
                            {
                                query: {
                                    name: "listPets",
                                    itemList: [
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
                                            key: "ownerAddress",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_DICTIONARY
                                        },
                                        {
                                            key: "ownerLanguage",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        }
                                    ]
                                }
                            }
                        )
                        if (dataPetModelList._response.error && dataPetModelList._response.errorType) {
                            if (dataPetModelList._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                ERROR_INTERNET_DISCONNECTED = true
                            }
                            if (dataPetModelList._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                ERROR_UNAUTHORIZED = true
                            }
                        }
                        const petModelList = dataPetModelList.instanceList

                        if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel) {
                            const petRowList = []
                            for (const petModelForOf of petModelList) {
                                const petModelForOfOwnerAddress = {
                                    label: ""
                                }
                                try {
                                    const jsonParse = JSON.parse(petModelForOf.ownerAddress)
                                    if (jsonParse.id && jsonParse.lat && jsonParse.lng && jsonParse.zoom && jsonParse.label && jsonParse.mainText && jsonParse.secondaryText) {
                                        petModelForOfOwnerAddress.id = jsonParse.id
                                        petModelForOfOwnerAddress.lat = jsonParse.lat
                                        petModelForOfOwnerAddress.lng = jsonParse.lng
                                        petModelForOfOwnerAddress.zoom = jsonParse.zoom
                                        petModelForOfOwnerAddress.label = jsonParse.label
                                        petModelForOfOwnerAddress.mainText = jsonParse.mainText
                                        petModelForOfOwnerAddress.secondaryText = jsonParse.secondaryText
                                    }
                                } catch (e) {
                                }

                                petRowList.push(
                                    {
                                        id: petModelForOf.id,
                                        name: petModelForOf.name,
                                        ownerName: petModelForOf.ownerName,
                                        ownerEmail: petModelForOf.ownerEmail,
                                        ownerPhone: petModelForOf.ownerPhone,
                                        ownerAddress: petModelForOfOwnerAddress.label,
                                        ownerLanguage: petModelForOf.ownerLanguage,
                                        createdAt: petModelForOf.createdAt,
                                        updatedAt: petModelForOf.updatedAt
                                    }
                                )
                            }
                            return {
                                _response: {
                                    success: true
                                },
                                rowList: petRowList
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
                                                            crud: {
                                                                ...oldState.crud,
                                                                rowList: data.rowList
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
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.alert.refresh.then.warning"}})
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
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.alert.refresh.then.error"}})
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.pet.alert.refresh.error"}})
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                fetchData
            ]
        )

        React.useEffect(
            () => {
                const subscription = async () => {
                    let authToken
                    try {
                        authToken = (await Auth.currentSession()).getIdToken().getJwtToken()
                    } catch (error) {
                        authToken = null
                    }

                    subscriptionOnCreatePetModelRef.current = API.graphql(
                        {
                            query: AmplifyGraphqlSubscription.onCreatePet,
                            authMode: "AWS_IAM",
                            authToken: authToken
                        }
                    )
                        .subscribe(
                            {
                                next: async (response) => {
                                    try {
                                        if (response && response.value && response.value.data && response.value.data.onCreatePet) {
                                            const petCreatedModel = response.value.data.onCreatePet
                                            const petCreatedModelOwnerAddress = {
                                                label: ""
                                            }
                                            try {
                                                const jsonParse = JSON.parse(petCreatedModel.ownerAddress)
                                                if (jsonParse.id && jsonParse.lat && jsonParse.lng && jsonParse.zoom && jsonParse.label && jsonParse.mainText && jsonParse.secondaryText) {
                                                    petCreatedModelOwnerAddress.id = jsonParse.id
                                                    petCreatedModelOwnerAddress.lat = jsonParse.lat
                                                    petCreatedModelOwnerAddress.lng = jsonParse.lng
                                                    petCreatedModelOwnerAddress.zoom = jsonParse.zoom
                                                    petCreatedModelOwnerAddress.label = jsonParse.label
                                                    petCreatedModelOwnerAddress.mainText = jsonParse.mainText
                                                    petCreatedModelOwnerAddress.secondaryText = jsonParse.secondaryText
                                                }
                                            } catch (e) {
                                            }
                                            const crudRowList = [...crud.rowList]
                                            crudRowList.push(
                                                {
                                                    id: petCreatedModel.id,
                                                    name: petCreatedModel.name,
                                                    ownerName: petCreatedModel.ownerName,
                                                    ownerEmail: petCreatedModel.ownerEmail,
                                                    ownerPhone: petCreatedModel.ownerPhone,
                                                    ownerAddress: petCreatedModelOwnerAddress.label,
                                                    ownerLanguage: petCreatedModel.ownerLanguage,
                                                    createdAt: petCreatedModel.createdAt,
                                                    updatedAt: petCreatedModel.updatedAt
                                                }
                                            )
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            crud: {
                                                                ...oldState.crud,
                                                                rowList: crudRowList
                                                            }
                                                        }
                                                    )
                                                )
                                            }
                                        }
                                    } catch (e) {
                                    }
                                }
                            }
                        )

                    subscriptionOnUpdatePetModelRef.current = API.graphql(
                        {
                            query: AmplifyGraphqlSubscription.onUpdatePet,
                            authMode: "AWS_IAM",
                            authToken: authToken
                        }
                    )
                        .subscribe(
                            {
                                next: async (response) => {
                                    try {
                                        if (response && response.value && response.value.data && response.value.data.onUpdatePet) {
                                            const petUpdatedModel = response.value.data.onUpdatePet
                                            const petUpdatedModelOwnerAddress = {
                                                label: ""
                                            }
                                            try {
                                                const jsonParse = JSON.parse(petUpdatedModel.ownerAddress)
                                                if (jsonParse.id && jsonParse.lat && jsonParse.lng && jsonParse.zoom && jsonParse.label && jsonParse.mainText && jsonParse.secondaryText) {
                                                    petUpdatedModelOwnerAddress.id = jsonParse.id
                                                    petUpdatedModelOwnerAddress.lat = jsonParse.lat
                                                    petUpdatedModelOwnerAddress.lng = jsonParse.lng
                                                    petUpdatedModelOwnerAddress.zoom = jsonParse.zoom
                                                    petUpdatedModelOwnerAddress.label = jsonParse.label
                                                    petUpdatedModelOwnerAddress.mainText = jsonParse.mainText
                                                    petUpdatedModelOwnerAddress.secondaryText = jsonParse.secondaryText
                                                }
                                            } catch (e) {
                                            }
                                            const crudRowList = [...crud.rowList]
                                            let index = 0
                                            for (const crudRowForOf of crudRowList) {
                                                if (petUpdatedModel.id === crudRowForOf.id) {
                                                    crudRowList[index] = {
                                                        ...crudRowList[index],
                                                        name: petUpdatedModel.name,
                                                        ownerName: petUpdatedModel.ownerName,
                                                        ownerEmail: petUpdatedModel.ownerEmail,
                                                        ownerPhone: petUpdatedModel.ownerPhone,
                                                        ownerAddress: petUpdatedModelOwnerAddress.label,
                                                        ownerLanguage: petUpdatedModel.ownerLanguage,
                                                        createdAt: petUpdatedModel.createdAt,
                                                        updatedAt: petUpdatedModel.updatedAt
                                                    }
                                                    if (isComponentMountedRef.current === true) {
                                                        setState(
                                                            (oldState) => (
                                                                {
                                                                    ...oldState,
                                                                    crud: {
                                                                        ...oldState.crud,
                                                                        rowList: crudRowList
                                                                    }
                                                                }
                                                            )
                                                        )
                                                    }
                                                    break
                                                }
                                                index++
                                            }
                                        }
                                    } catch (e) {
                                    }
                                }
                            }
                        )

                    subscriptionOnDeletePetModelRef.current = API.graphql(
                        {
                            query: AmplifyGraphqlSubscription.onDeletePet,
                            authMode: "AWS_IAM",
                            authToken: authToken
                        }
                    )
                        .subscribe(
                            {
                                next: async (response) => {
                                    try {
                                        if (response && response.value && response.value.data && response.value.data.onDeletePet) {
                                            const petDeletedModel = response.value.data.onDeletePet
                                            const crudRowList = [...crud.rowList]
                                            const crudRowNewList = []
                                            for (const crudRowForOf of crudRowList) {
                                                if (petDeletedModel.id !== crudRowForOf.id) {
                                                    crudRowNewList.push(crudRowForOf)
                                                }
                                            }
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            crud: {
                                                                ...oldState.crud,
                                                                rowList: crudRowNewList
                                                            }
                                                        }
                                                    )
                                                )
                                            }
                                        }
                                    } catch (e) {
                                    }
                                }
                            }
                        )
                }

                subscription().then().catch().finally()

                return () => {
                    if (subscriptionOnCreatePetModelRef.current) {
                        subscriptionOnCreatePetModelRef.current.unsubscribe()
                    }
                    if (subscriptionOnUpdatePetModelRef.current) {
                        subscriptionOnUpdatePetModelRef.current.unsubscribe()
                    }
                    if (subscriptionOnDeletePetModelRef.current) {
                        subscriptionOnDeletePetModelRef.current.unsubscribe()
                    }
                }
            },
            [
                crud.rowList
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
                handleStepEffectRefresh
            ]
        )

        switch (stepReturn) {
            case STEP_RETURN_INITIAL:
                return (
                    <LayoutContainer maxWidth={"lg"}>
                        <LayoutPaper>
                            <LayoutPaperTitle>
                                <LayoutPaperTitleLeft>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutPaperTitleLeftTypographyLevel1 iconFont={"pets"} text1={<FormattedMessage id={"app.page.secure.view.shelter.pet"}/>}/>
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
            case STEP_RETURN_SUCCESS:
                return (
                    <LayoutContainer maxWidth={"lg"}>
                        <LayoutPaper>
                            <LayoutPaperTitle>
                                <LayoutPaperTitleLeft>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutPaperTitleLeftTypographyLevel1 iconFont={"pets"} text1={<FormattedMessage id={"app.page.secure.view.shelter.pet"}/>}/>
                                    </MuiBox>
                                </LayoutPaperTitleLeft>
                                <LayoutPaperTitleRight>
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutButton
                                            loading={stepEffect === STEP_EFFECT_REFRESH}
                                            disabled={stepIsSubmitting}
                                            size={"small"}
                                            iconFont={"update"}
                                            text={<FormattedMessage id={"app.page.secure.view.shelter.pet.action.refresh"}/>}
                                            handleOnClick={handleRefresh}
                                        />
                                    </MuiBox>
                                </LayoutPaperTitleRight>
                            </LayoutPaperTitle>
                            <MuiBox component={"div"} p={0}>
                                <MuiDivider component={"div"}/>
                            </MuiBox>
                            <LayoutPaperContent>
                                <LayoutPaperContentCenter maxWidth={true}>
                                    {stepIsSubmitting || stepEffect !== STEP_EFFECT_DEFAULT ? <LayoutLoadingSecurity/> : null}
                                    <MuiBox component={"div"} p={1}>
                                        <LayoutTable crud={crud}/>
                                    </MuiBox>
                                    {children}
                                </LayoutPaperContentCenter>
                            </LayoutPaperContent>
                        </LayoutPaper>
                    </LayoutContainer>
                )
            case STEP_RETURN_SECURITY_NAVIGATE_TO_PATH_ERROR_404:
                return <SecurityNavigateToPathError404/>
            case STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX:
                return <SecurityNavigateToIndex pathFrom={PATH_APP_PAGE_SECURE_SHELTER_PET}/>
            default:
                return null
        }
    }
)

export const Pet = React.memo(
    () => {
        const location = useLocation()
        const pathFrom = location.pathname

        return (
            <Routes>
                <Route path={`/`} element={<SecurityRouteCurrentUserShelter pathFrom={pathFrom}><ViewList/></SecurityRouteCurrentUserShelter>}/>
                <Route path={`${SLUG_APP_PAGE_SECURE_SHELTER_PET_CREATE}*`} element={<SecurityRouteCurrentUserShelter pathFrom={pathFrom}><ViewList><ViewCreate/></ViewList></SecurityRouteCurrentUserShelter>}/>
                <Route path={`:paramPetId/${SLUG_APP_PAGE_SECURE_SHELTER_PET_UPDATE}*`} element={<SecurityRouteCurrentUserShelter pathFrom={pathFrom}><ViewList><ViewUpdate/></ViewList></SecurityRouteCurrentUserShelter>}/>
                <Route path={`:paramPetId/${SLUG_APP_PAGE_SECURE_SHELTER_PET_COMMENT}*`} element={<SecurityRouteCurrentUserShelter pathFrom={pathFrom}><ViewList><ViewComment/></ViewList></SecurityRouteCurrentUserShelter>}/>
                <Route path={`:paramPetId/${SLUG_APP_PAGE_SECURE_SHELTER_PET_DELETE}*`} element={<SecurityRouteCurrentUserShelter pathFrom={pathFrom}><ViewList><ViewDelete/></ViewList></SecurityRouteCurrentUserShelter>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
