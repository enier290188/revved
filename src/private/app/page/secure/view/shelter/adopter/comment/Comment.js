import {Box as MuiBox, Divider as MuiDivider} from "@mui/material"
import {Storage} from "aws-amplify"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes, useParams} from "react-router"
import {PATH_APP_PAGE_SECURE_SHELTER_ADOPTER} from "../../../../../../../setting/path/app/page/secure/shelter/adopter"
import {SLUG_APP_PAGE_SECURE_SHELTER_ADOPTER_DELETE} from "../../../../../../../setting/path/app/page/secure/shelter/adopter/delete"
import {SLUG_APP_PAGE_SECURE_SHELTER_ADOPTER_UPDATE} from "../../../../../../../setting/path/app/page/secure/shelter/adopter/update"
import {Context as ContextAlert} from "../../../../../../context/Alert"
import {Context as ContextUser} from "../../../../../../context/User"
import * as AppUtilGraphql from "../../../../../../util/graphql"
import {APP_PAGE_SECURE_LAYOUT_ALERT_ERROR} from "../../../../layout/alert/Alert"
import {Button as LayoutButton} from "../../../../layout/main/button/Button"
import {NavLinkButton as LayoutNavLinkButton} from "../../../../layout/main/button/NavLinkButton"
import {CommentList as LayoutCommentList} from "../../../../layout/main/crud/commentList/CommentList"
import {Container as LayoutContainer} from "../../../../layout/main/container/Container"
import {Dialog as LayoutDialog} from "../../../../layout/main/dialog/Dialog"
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
import {Typography as LayoutTypography} from "../../../../layout/main/typography/Typography"
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

const View = React.memo(
    () => {
        const {paramAdopterId} = useParams()
        const contextUser = React.useContext(ContextUser)
        const contextAlert = React.useContext(ContextAlert)
        const [
            {
                stepReturn,
                stepEffect,
                stepIsSubmitting,
                instanceAdopter,
                actionOnInstanceAdopterCommentList
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL,
                stepIsSubmitting: false,
                instanceAdopter: null,
                actionOnInstanceAdopterCommentList: null
            }
        )
        const isComponentMountedRef = React.useRef(true)

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

                        const dataAdopterModel = await AppUtilGraphql.getModel(
                            {
                                query: {
                                    name: "getAdopter",
                                    id: paramAdopterId,
                                    itemList: [
                                        {
                                            key: "name",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "commentList",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_LIST
                                        }
                                    ]
                                }
                            }
                        )
                        if (dataAdopterModel._response.error && dataAdopterModel._response.errorType) {
                            if (dataAdopterModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                ERROR_INTERNET_DISCONNECTED = true
                            }
                            if (dataAdopterModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                ERROR_UNAUTHORIZED = true
                            }
                        }
                        const adopterModel = dataAdopterModel.instance

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
                                            key: "name",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        }
                                    ]
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

                        if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel && adopterModel) {
                            const instanceAdopter = {
                                id: adopterModel.id,
                                name: adopterModel.name,
                                commentList: []
                            }
                            if (0 < adopterModel.commentList.length) {
                                const userModelListDict = {}
                                for (const userModelForOf of userModelList) {
                                    try {
                                        let pictureData = null
                                        const pictureUrl = userModelForOf.picture
                                            ? await Storage.get(
                                                userModelForOf.picture,
                                                {
                                                    level: "public",
                                                    acl: "private",
                                                    contentType: "image/png",
                                                    expires: 60
                                                }
                                            )
                                            : null
                                        if (pictureUrl) {
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
                                            await toDataURL(pictureUrl)
                                                .then(
                                                    (dataUrl) => {
                                                        pictureData = dataUrl
                                                    }
                                                )
                                        }
                                        userModelListDict[userModelForOf.id] = {
                                            id: userModelForOf.id,
                                            picture: pictureData,
                                            name: userModelForOf.name
                                        }
                                    } catch (e) {
                                    }
                                }
                                for (const adopterModelCommentForOf of adopterModel.commentList) {
                                    try {
                                        const adopterModelCommentForOfJSONParse = JSON.parse(adopterModelCommentForOf)
                                        const user = {
                                            id: null,
                                            picture: null,
                                            name: "",
                                            permission: {
                                                actionUpdate: false,
                                                actionDelete: false
                                            }
                                        }
                                        try {
                                            const userModelDict = userModelListDict[adopterModelCommentForOfJSONParse.userId]
                                            user["id"] = userModelDict.id
                                            user["picture"] = userModelDict.picture
                                            user["name"] = userModelDict.name
                                            user["permission"]["actionUpdate"] = true
                                            user["permission"]["actionDelete"] = true
                                        } catch (e) {
                                        }
                                        const comment = {
                                            user: user,
                                            comment: adopterModelCommentForOfJSONParse.comment,
                                            createdAt: adopterModelCommentForOfJSONParse.createdAt,
                                            updatedAt: adopterModelCommentForOfJSONParse.updatedAt
                                        }
                                        instanceAdopter.commentList.push(comment)
                                    } catch (e) {
                                    }
                                }
                            }

                            return {
                                _response: {
                                    success: true
                                },
                                instanceAdopter: instanceAdopter
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
                paramAdopterId,
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

                        const dataAdopterModel = await AppUtilGraphql.getModel(
                            {
                                query: {
                                    name: "getAdopter",
                                    id: paramAdopterId,
                                    itemList: [
                                        {
                                            key: "name",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        },
                                        {
                                            key: "commentList",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_LIST
                                        }
                                    ]
                                }
                            }
                        )
                        if (dataAdopterModel._response.error && dataAdopterModel._response.errorType) {
                            if (dataAdopterModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                ERROR_INTERNET_DISCONNECTED = true
                            }
                            if (dataAdopterModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                ERROR_UNAUTHORIZED = true
                            }
                        }
                        const adopterModel = dataAdopterModel.instance

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
                                            key: "name",
                                            type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                        }
                                    ]
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

                        if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel && adopterModel) {
                            const dataActionOnInstanceAdopterCommentList = {...data.actionOnInstanceAdopterCommentList}
                            let adopterUpdatedModel = null
                            if (
                                (dataActionOnInstanceAdopterCommentList.type) &&
                                (dataActionOnInstanceAdopterCommentList.type === "CREATE" || dataActionOnInstanceAdopterCommentList.type === "UPDATE" || dataActionOnInstanceAdopterCommentList.type === "DELETE") &&
                                (dataActionOnInstanceAdopterCommentList.comment)
                            ) {
                                let adopterModelCommentList = adopterModel.commentList
                                const dateNow = Date.now()
                                try {
                                    switch (dataActionOnInstanceAdopterCommentList.type) {
                                        case "CREATE": {
                                            const commentJSONStringify = JSON.stringify(
                                                {
                                                    userId: userId,
                                                    comment: dataActionOnInstanceAdopterCommentList.comment.comment,
                                                    createdAt: dateNow,
                                                    updatedAt: dateNow
                                                }
                                            )
                                            adopterModelCommentList.push(commentJSONStringify)
                                            break
                                        }
                                        case "UPDATE": {
                                            const commentJSONParse = JSON.parse(adopterModelCommentList[dataActionOnInstanceAdopterCommentList.index])
                                            if (
                                                commentJSONParse.userId === dataActionOnInstanceAdopterCommentList.comment.user.id &&
                                                // commentJSONParse.comment === dataActionOnInstanceAdopterCommentList.comment.comment &&
                                                commentJSONParse.createdAt === dataActionOnInstanceAdopterCommentList.comment.createdAt &&
                                                commentJSONParse.updatedAt === dataActionOnInstanceAdopterCommentList.comment.updatedAt
                                            ) {
                                                adopterModelCommentList = adopterModelCommentList.map(
                                                    (adopterModelCommentMap, index) => {
                                                        if ((index === dataActionOnInstanceAdopterCommentList.index)) {
                                                            return JSON.stringify(
                                                                {
                                                                    userId: userId,
                                                                    comment: dataActionOnInstanceAdopterCommentList.comment.comment,
                                                                    createdAt: dataActionOnInstanceAdopterCommentList.comment.createdAt,
                                                                    updatedAt: dateNow
                                                                }
                                                            )
                                                        } else {
                                                            return adopterModelCommentMap
                                                        }
                                                    }
                                                )
                                            }
                                            break
                                        }
                                        case "DELETE": {
                                            const commentJSONParse = JSON.parse(adopterModelCommentList[dataActionOnInstanceAdopterCommentList.index])
                                            if (
                                                commentJSONParse.userId === dataActionOnInstanceAdopterCommentList.comment.user.id &&
                                                commentJSONParse.comment === dataActionOnInstanceAdopterCommentList.comment.comment &&
                                                commentJSONParse.createdAt === dataActionOnInstanceAdopterCommentList.comment.createdAt &&
                                                commentJSONParse.updatedAt === dataActionOnInstanceAdopterCommentList.comment.updatedAt
                                            ) {
                                                adopterModelCommentList = adopterModelCommentList.filter((adopterModelCommentFilter, index) => (index !== dataActionOnInstanceAdopterCommentList.index))
                                            }
                                            break
                                        }
                                        default: {
                                            break
                                        }
                                    }
                                    const dataAdopterUpdatedModel = await AppUtilGraphql.updateModel(
                                        {
                                            query: {
                                                name: "updateAdopter",
                                                id: adopterModel.id,
                                                itemList: [
                                                    {
                                                        key: "name",
                                                        type: AppUtilGraphql.QUERY_ITEM_TYPE_STRING
                                                    },
                                                    {
                                                        key: "commentList",
                                                        type: AppUtilGraphql.QUERY_ITEM_TYPE_LIST
                                                    }
                                                ],
                                                input: {
                                                    commentList: adopterModelCommentList,
                                                    _version: adopterModel._version
                                                }
                                            }
                                        }
                                    )
                                    if (dataAdopterUpdatedModel._response.error && dataAdopterUpdatedModel._response.errorType) {
                                        if (dataAdopterUpdatedModel._response.errorType === AppUtilGraphql.ERROR_INTERNET_DISCONNECTED) {
                                            ERROR_INTERNET_DISCONNECTED = true
                                        }
                                        if (dataAdopterUpdatedModel._response.errorType === AppUtilGraphql.ERROR_UNAUTHORIZED) {
                                            ERROR_UNAUTHORIZED = true
                                        }
                                    }
                                    adopterUpdatedModel = dataAdopterUpdatedModel.instance
                                } catch (e) {
                                    adopterUpdatedModel = adopterModel
                                }
                            } else {
                                adopterUpdatedModel = adopterModel
                            }

                            if (ERROR_INTERNET_DISCONNECTED === false && ERROR_UNAUTHORIZED === false && userLoggedInModel && adopterUpdatedModel) {
                                const instanceAdopterUpdated = {
                                    id: adopterUpdatedModel.id,
                                    name: adopterUpdatedModel.name,
                                    commentList: []
                                }
                                if (0 < adopterUpdatedModel.commentList.length) {
                                    const userModelListDict = {}
                                    for (const userModelForOf of userModelList) {
                                        try {
                                            let pictureData = null
                                            const pictureUrl = userModelForOf.picture
                                                ? await Storage.get(
                                                    userModelForOf.picture,
                                                    {
                                                        level: "public",
                                                        acl: "private",
                                                        contentType: "image/png",
                                                        expires: 60
                                                    }
                                                )
                                                : null
                                            if (pictureUrl) {
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
                                                await toDataURL(pictureUrl)
                                                    .then(
                                                        (dataUrl) => {
                                                            pictureData = dataUrl
                                                        }
                                                    )
                                            }
                                            userModelListDict[userModelForOf.id] = {
                                                id: userModelForOf.id,
                                                picture: pictureData,
                                                name: userModelForOf.name
                                            }
                                        } catch (e) {
                                        }
                                    }
                                    for (const adopterUpdatedModelCommentForOf of adopterUpdatedModel.commentList) {
                                        try {
                                            const adopterUpdatedModelCommentForOfJSONParse = JSON.parse(adopterUpdatedModelCommentForOf)
                                            const user = {
                                                id: null,
                                                picture: null,
                                                name: "",
                                                permission: {
                                                    actionUpdate: false,
                                                    actionDelete: false
                                                }
                                            }
                                            try {
                                                const userModelDict = userModelListDict[adopterUpdatedModelCommentForOfJSONParse.userId]
                                                user["id"] = userModelDict.id
                                                user["picture"] = userModelDict.picture
                                                user["name"] = userModelDict.name
                                                user["permission"]["actionUpdate"] = true
                                                user["permission"]["actionDelete"] = true
                                            } catch (e) {
                                            }
                                            const comment = {
                                                user: user,
                                                comment: adopterUpdatedModelCommentForOfJSONParse.comment,
                                                createdAt: adopterUpdatedModelCommentForOfJSONParse.createdAt,
                                                updatedAt: adopterUpdatedModelCommentForOfJSONParse.updatedAt
                                            }
                                            instanceAdopterUpdated.commentList.push(comment)
                                        } catch (e) {
                                        }
                                    }
                                }

                                return {
                                    _response: {
                                        success: true
                                    },
                                    instanceAdopter: instanceAdopterUpdated
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
                paramAdopterId,
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

        const handleCreate = React.useCallback(
            async (comment) => {
                try {
                    contextAlert.cleanAlertList()
                    if (stepEffect === STEP_EFFECT_DEFAULT) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_SUBMIT,
                                        actionOnInstanceAdopterCommentList: {
                                            ...oldState.actionOnInstanceAdopterCommentList,
                                            type: "CREATE",
                                            index: null,
                                            comment: comment
                                        }
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

        const handleUpdate = React.useCallback(
            async (index, comment) => {
                try {
                    contextAlert.cleanAlertList()
                    if (stepEffect === STEP_EFFECT_DEFAULT) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_SUBMIT,
                                        actionOnInstanceAdopterCommentList: {
                                            ...oldState.actionOnInstanceAdopterCommentList,
                                            type: "UPDATE",
                                            index: index,
                                            comment: comment
                                        }
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

        const handleDelete = React.useCallback(
            async (index, comment) => {
                try {
                    contextAlert.cleanAlertList()
                    if (stepEffect === STEP_EFFECT_DEFAULT) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_SUBMIT,
                                        actionOnInstanceAdopterCommentList: {
                                            ...oldState.actionOnInstanceAdopterCommentList,
                                            type: "DELETE",
                                            index: index,
                                            comment: comment
                                        }
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
                                                            instanceAdopter: data.instanceAdopter,
                                                            actionOnInstanceAdopterCommentList: null
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
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.adopter.comment.alert.refresh.then.warning"}})
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
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.adopter.comment.alert.refresh.then.error"}})
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.adopter.comment.alert.refresh.error"}})
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
                        const fieldError = (() => false)()

                        if (fieldError) {
                            if (isComponentMountedRef.current === true) {
                                setState(
                                    (oldState) => (
                                        {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_SUBMIT_WARNING
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
                stepEffect
            ]
        )

        const handleStepEffectSubmitIsSubmitting = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SUBMIT_IS_SUBMITTING && stepIsSubmitting === true && 0 === contextAlert.getAlertList().length) {
                        await submitData({actionOnInstanceAdopterCommentList: actionOnInstanceAdopterCommentList})
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
                                                            instanceAdopter: data.instanceAdopter,
                                                            actionOnInstanceAdopterCommentList: null
                                                        }
                                                    )
                                                )
                                                // contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS, message: {id: "app.page.secure.view.shelter.adopter.comment.alert.submit.then.success", values: {name: data.instanceAdopter.name}}})
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
                                                    contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.adopter.comment.alert.submit.then.warning"}})
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
                                            contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.adopter.comment.alert.submit.then.error"}})
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
                        contextAlert.addAlert({type: APP_PAGE_SECURE_LAYOUT_ALERT_ERROR, message: {id: "app.page.secure.view.shelter.adopter.comment.alert.submit.error"}})
                    }
                }
            },
            [
                contextAlert,
                stepEffect,
                stepIsSubmitting,
                actionOnInstanceAdopterCommentList,
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
                                                <LayoutPaperTitleLeftTypographyLevel1 iconFont={"comment"} text1={<FormattedMessage id={"app.page.secure.view.shelter.adopter.comment"}/>}/>
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
                                                <LayoutPaperTitleLeftTypographyLevel1 iconFont={"comment"} text1={<FormattedMessage id={"app.page.secure.view.shelter.adopter.comment"}/>}/>
                                            </MuiBox>
                                        </LayoutPaperTitleLeft>
                                        <LayoutPaperTitleRight>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutNavLinkButton
                                                    url={PATH_APP_PAGE_SECURE_SHELTER_ADOPTER}
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
                                    <LayoutPaperAction>
                                        <LayoutPaperActionLeft>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutTypography component={"h6"} variant={"h6"} iconFont={"face"} text={instanceAdopter.name}/>
                                            </MuiBox>
                                        </LayoutPaperActionLeft>
                                        <LayoutPaperActionRight>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutButton
                                                    loading={stepEffect === STEP_EFFECT_REFRESH}
                                                    disabled={stepIsSubmitting}
                                                    size={"small"}
                                                    iconFont={"update"}
                                                    text={<FormattedMessage id={"app.page.secure.view.shelter.adopter.comment.action.refresh"}/>}
                                                    handleOnClick={handleRefresh}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutNavLinkButton
                                                    url={`${PATH_APP_PAGE_SECURE_SHELTER_ADOPTER}${paramAdopterId}/${SLUG_APP_PAGE_SECURE_SHELTER_ADOPTER_UPDATE}`}
                                                    loading={false}
                                                    disabled={stepIsSubmitting}
                                                    size={"small"}
                                                    iconFont={"edit"}
                                                    text={<FormattedMessage id={"app.page.secure.view.shelter.adopter.comment.action.update"}/>}
                                                />
                                            </MuiBox>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutNavLinkButton
                                                    url={`${PATH_APP_PAGE_SECURE_SHELTER_ADOPTER}${paramAdopterId}/${SLUG_APP_PAGE_SECURE_SHELTER_ADOPTER_DELETE}`}
                                                    loading={false}
                                                    disabled={stepIsSubmitting}
                                                    size={"small"}
                                                    iconFont={"delete"}
                                                    text={<FormattedMessage id={"app.page.secure.view.shelter.adopter.comment.action.delete"}/>}
                                                />
                                            </MuiBox>
                                        </LayoutPaperActionRight>
                                    </LayoutPaperAction>
                                    <MuiBox component={"div"} p={0}>
                                        {stepIsSubmitting ? <LayoutLoadingLinearProgress/> : <MuiDivider component={"div"}/>}
                                    </MuiBox>
                                    <LayoutPaperContent>
                                        <LayoutPaperContentCenter maxWidth={"480px"}>
                                            <MuiBox component={"div"} p={1}>
                                                <LayoutCommentList stepIsSubmitting={stepIsSubmitting} commentList={instanceAdopter.commentList} handleCreate={handleCreate} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
                                            </MuiBox>
                                        </LayoutPaperContentCenter>
                                    </LayoutPaperContent>
                                </LayoutPaper>
                            </LayoutContainer>
                        </LayoutDialog>
                    </React.Fragment>
                )
            case STEP_RETURN_SECURITY_NAVIGATE_TO_PATH_ERROR_404:
                return <SecurityNavigateToPathError404/>
            case STEP_RETURN_SECURITY_NAVIGATE_TO_INDEX:
                return <SecurityNavigateToIndex pathFrom={`${PATH_APP_PAGE_SECURE_SHELTER_ADOPTER}${paramAdopterId}/${SLUG_APP_PAGE_SECURE_SHELTER_ADOPTER_UPDATE}`}/>
            default:
                return null
        }
    }
)

export const Comment = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`/`} element={<View/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
