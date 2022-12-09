import {Alert as MuiAlert, AlertTitle as MuiAlertTitle, Box as MuiBox, Divider as MuiDivider, Icon as MuiIcon, IconButton as MuiIconButton, Typography as MuiTypography} from "@mui/material"
import React from "react"
import {FormattedMessage} from "react-intl"
import * as AppUtilForm from "../../../../../../util/form"
import {Avatar as LayoutAvatar} from "../../avatar/Avatar"
import {DateTime as LayoutDateTime} from "../../date/DateTime"
import {TextArea as LayoutTextArea} from "../../form/text-area/TextArea"
import {Typography as LayoutTypography} from "../../typography/Typography"

const LayoutCommentCreate = React.memo(
    ({stepIsSubmitting, handleCreate}) => {
        const [
            {
                fieldComment
            },
            setState
        ] = React.useState(
            {
                fieldComment: {
                    value: "",
                    error: null
                }
            }
        )
        const isComponentMountedRef = React.useRef(true)
        const SxContainer = {
            margin: theme => theme.spacing(2, 0, 0, 0),
            padding: theme => theme.spacing(0),
            border: theme => `1px solid ${theme.palette.divider}`
        }
        const SxContent = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2)
        }
        const SxContentLeft = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch"
        }
        const SxContentRight = {
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch"
        }

        const fieldCommentValidate = (value) => {
            return AppUtilForm.validateField(String(value).trim(), [["fieldRequired"], ["fieldMaxLength", 1024]])
        }

        const fieldCommentHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldComment: {
                                        ...oldState.fieldComment,
                                        value: value,
                                        error: fieldCommentValidate(value)
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

        const handleActionCreate = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldComment: {
                                        ...oldState.fieldComment,
                                        value: "",
                                        error: null
                                    }
                                }
                            )
                        )
                        await handleCreate({comment: fieldComment.value})
                    }
                } catch (e) {
                }
            },
            [
                handleCreate,
                fieldComment.value
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                return () => {
                    isComponentMountedRef.current = false
                }
            },
            []
        )

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiBox component={"div"} sx={SxContent}>
                    <MuiBox component={"div"} sx={SxContentLeft}>
                        <LayoutTextArea disabled={stepIsSubmitting} required={true} iconFont={"notes"} label={<FormattedMessage id={"app.page.secure.layout.main.crud.commentList.field.comment.label"}/>} field={fieldComment} handleOnChange={fieldCommentHandleOnChange}/>
                    </MuiBox>
                    <MuiBox component={"div"} sx={SxContentRight}>
                        <MuiBox component={"div"} pl={2} sx={{display: "flex", flexDirection: "column", flexWrap: "nowrap", alignContent: "center", justifyContent: "center", alignItems: "center"}}>
                            <MuiIconButton disabled={stepIsSubmitting || Boolean(fieldComment.error) || String(fieldComment.value).trim() === ""} component={"div"} color={"primary"} size={"small"} onClick={handleActionCreate}>
                                <MuiIcon component={"span"} color={"inherit"} fontSize={"small"}>{"add_circle"}</MuiIcon>
                            </MuiIconButton>
                        </MuiBox>
                    </MuiBox>
                </MuiBox>
            </MuiBox>
        )
    }
)

const LayoutCommentUpdateOrDelete = React.memo(
    ({stepIsSubmitting, index, comment, handleUpdate, handleDelete}) => {
        const [
            {
                actionUpdate,
                actionDelete,
                fieldComment
            },
            setState
        ] = React.useState(
            {
                actionUpdate: false,
                actionDelete: false,
                fieldComment: {
                    value: comment.comment,
                    error: null
                }
            }
        )
        const isComponentMountedRef = React.useRef(true)
        const SxContainer = {
            margin: theme => theme.spacing(2, 0, 0, 0),
            padding: theme => theme.spacing(0),
            border: theme => `1px solid ${theme.palette.divider}`
        }
        const SxContent = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2)
        }
        const SxContentLeft = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch"
        }
        const SxContentLeftTop = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center"
        }
        const SxContentLeftCenter = {}
        const SxContentRight = {
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch"
        }

        const fieldCommentValidate = (value) => {
            return AppUtilForm.validateField(String(value).trim(), [["fieldRequired"], ["fieldMaxLength", 1024]])
        }

        const fieldCommentHandleOnChange = React.useCallback(
            ({target: {value}}) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    fieldComment: {
                                        ...oldState.fieldComment,
                                        value: value,
                                        error: fieldCommentValidate(value)
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

        const handleActionUpdateShow = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    actionUpdate: true,
                                    actionDelete: false,
                                    fieldComment: {
                                        ...oldState.fieldComment,
                                        value: comment.comment,
                                        error: fieldCommentValidate(comment.comment)
                                    }
                                }
                            )
                        )
                    }
                } catch (e) {
                }
            },
            [
                comment.comment
            ]
        )

        const handleActionUpdateHide = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    actionUpdate: false,
                                    actionDelete: false
                                }
                            )
                        )
                    }
                } catch (e) {
                }
            },
            []
        )

        const handleActionUpdateRefresh = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    actionUpdate: true,
                                    actionDelete: false,
                                    fieldComment: {
                                        ...oldState.fieldComment,
                                        value: comment.comment,
                                        error: fieldCommentValidate(comment.comment)
                                    }
                                }
                            )
                        )
                    }
                } catch (e) {
                }
            },
            [
                comment.comment
            ]
        )

        const handleActionUpdateSave = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    actionUpdate: false,
                                    actionDelete: false
                                }
                            )
                        )
                        await handleUpdate(index, {...comment, comment: fieldComment.value})
                    }
                } catch (e) {
                }
            },
            [
                index,
                comment,
                handleUpdate,
                fieldComment.value
            ]
        )

        const handleActionDeleteShow = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    actionUpdate: false,
                                    actionDelete: true
                                }
                            )
                        )
                    }
                } catch (e) {
                }
            },
            []
        )

        const handleActionDeleteHide = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    actionUpdate: false,
                                    actionDelete: false
                                }
                            )
                        )
                    }
                } catch (e) {
                }
            },
            []
        )

        const handleActionDeleteConfirm = React.useCallback(
            async (event) => {
                try {
                    if (event) {
                        event.preventDefault()
                    }
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    actionUpdate: false,
                                    actionDelete: false
                                }
                            )
                        )
                        await handleDelete(index, comment)
                    }
                } catch (e) {
                }
            },
            [
                index,
                comment,
                handleDelete
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                return () => {
                    isComponentMountedRef.current = false
                }
            },
            []
        )

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiBox component={"div"} sx={SxContent}>
                    <MuiBox component={"div"} sx={SxContentLeft}>
                        <MuiBox component={"div"} sx={SxContentLeftTop}>
                            <MuiBox component={"div"} p={0}>
                                <LayoutAvatar disabled={stepIsSubmitting} src={comment.user.picture} sxContainer={{width: theme => theme.spacing(8), height: theme => theme.spacing(8)}}/>
                            </MuiBox>
                            <MuiBox component={"div"} p={0} pl={2}>
                                <LayoutTypography component={"p"} variant={"body2"} iconFont={null} text={comment.user.name} sxContainer={{fontWeight: "bold"}}/>
                                <LayoutDateTime component={"p"} variant={"body2"} dateTime={comment.updatedAt}/>
                            </MuiBox>
                        </MuiBox>
                        <MuiBox component={"div"} p={0} pt={1}/>
                        <MuiDivider component={"div"}/>
                        <MuiBox component={"div"} p={0} pt={1}/>
                        <MuiBox component={"div"} sx={SxContentLeftCenter}>
                            {
                                actionUpdate
                                    ? (
                                        <LayoutTextArea disabled={stepIsSubmitting} required={true} iconFont={"notes"} label={<FormattedMessage id={"app.page.secure.layout.main.crud.commentList.field.comment.label"}/>} field={fieldComment} handleOnChange={fieldCommentHandleOnChange}/>
                                    )
                                    : actionDelete
                                        ? (
                                            <MuiAlert component={"div"} severity={"warning"} variant={"filled"}>
                                                <MuiAlertTitle component={"p"} variant={"body1"}>
                                                    <FormattedMessage id={"app.page.secure.layout.alert.warning"}/>
                                                </MuiAlertTitle>
                                                <MuiTypography component={"p"} variant={"body1"}>
                                                    <FormattedMessage id={"app.page.secure.layout.main.crud.commentList.alert.action.delete.question"}/>
                                                </MuiTypography>
                                            </MuiAlert>
                                        )
                                        : (
                                            <LayoutTypography component={"p"} variant={"body2"} iconFont={null} text={stepIsSubmitting ? String(fieldComment.value) : comment.comment} sxContainer={{whiteSpace: "pre-line", wordBreak: "break-word", color: stepIsSubmitting ? theme => theme.palette.grey[600] : "inherit"}}/>
                                        )
                            }
                        </MuiBox>
                    </MuiBox>
                    <MuiBox component={"div"} sx={SxContentRight}>
                        {
                            actionUpdate
                                ? (
                                    <MuiBox component={"div"} pl={2} sx={{display: "flex", flexDirection: "column", flexWrap: "nowrap", alignContent: "center", justifyContent: "center", alignItems: "center"}}>
                                        <MuiIconButton disabled={stepIsSubmitting} component={"div"} color={"primary"} size={"small"} onClick={handleActionUpdateHide}>
                                            <MuiIcon component={"span"} color={"inherit"} fontSize={"small"}>{"close"}</MuiIcon>
                                        </MuiIconButton>
                                        <MuiBox component={"div"} p={2}/>
                                        <MuiIconButton disabled={stepIsSubmitting || Boolean(fieldComment.error) || fieldComment.value === comment.comment || String(fieldComment.value).trim() === comment.comment || String(fieldComment.value).trim() === ""} component={"div"} color={"primary"} size={"small"} onClick={handleActionUpdateSave}>
                                            <MuiIcon component={"span"} color={"inherit"} fontSize={"small"}>{"save"}</MuiIcon>
                                        </MuiIconButton>
                                        <MuiBox component={"div"} p={0.5}/>
                                        <MuiIconButton disabled={stepIsSubmitting} component={"div"} color={"primary"} size={"small"} onClick={handleActionUpdateRefresh}>
                                            <MuiIcon component={"span"} color={"inherit"} fontSize={"small"}>{"update"}</MuiIcon>
                                        </MuiIconButton>
                                    </MuiBox>
                                )
                                : actionDelete
                                    ? (
                                        <MuiBox component={"div"} pl={2} sx={{display: "flex", flexDirection: "column", flexWrap: "nowrap", alignContent: "center", justifyContent: "center", alignItems: "center"}}>
                                            <MuiIconButton disabled={stepIsSubmitting} component={"div"} color={"primary"} size={"small"} onClick={handleActionDeleteHide}>
                                                <MuiIcon component={"span"} color={"inherit"} fontSize={"small"}>{"close"}</MuiIcon>
                                            </MuiIconButton>
                                            <MuiBox component={"div"} p={2}/>
                                            <MuiIconButton disabled={stepIsSubmitting} component={"div"} color={"error"} size={"small"} onClick={handleActionDeleteConfirm}>
                                                <MuiIcon component={"span"} color={"inherit"} fontSize={"small"}>{"delete"}</MuiIcon>
                                            </MuiIconButton>
                                        </MuiBox>
                                    )
                                    : (
                                        <MuiBox component={"div"} sx={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "flex-start", justifyContent: "flex-start", alignItems: "flex-start"}}>
                                            <MuiBox component={"div"} p={1}/>
                                            <MuiIconButton disabled={stepIsSubmitting || (!(comment.user && comment.user.permission && comment.user.permission.actionUpdate))} component={"div"} color={"primary"} size={"small"} onClick={handleActionUpdateShow}>
                                                <MuiIcon component={"span"} color={"inherit"} fontSize={"small"}>{"edit"}</MuiIcon>
                                            </MuiIconButton>
                                            <MuiBox component={"div"} p={0.5}/>
                                            <MuiIconButton disabled={stepIsSubmitting || (!(comment.user && comment.user.permission && comment.user.permission.actionDelete))} component={"div"} color={"primary"} size={"small"} onClick={handleActionDeleteShow}>
                                                <MuiIcon component={"span"} color={"inherit"} fontSize={"small"}>{"delete"}</MuiIcon>
                                            </MuiIconButton>
                                        </MuiBox>
                                    )
                        }
                    </MuiBox>
                </MuiBox>
            </MuiBox>
        )
    }
)

export const CommentList = React.memo(
    ({stepIsSubmitting, commentList, handleCreate, handleUpdate, handleDelete}) => {
        const SxContainer = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0)
        }
        const SxContentCreate = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0)
        }
        const SxContentList = {
            margin: theme => theme.spacing(4, 0, 2, 0),
            padding: theme => theme.spacing(0)
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiBox component={"div"} sx={SxContentCreate}>
                    <LayoutCommentCreate stepIsSubmitting={stepIsSubmitting} handleCreate={handleCreate}/>
                </MuiBox>
                {
                    commentList && 0 < commentList.length
                        ? (
                            <MuiBox component={"div"} sx={SxContentList}>
                                {commentList.map((instanceContactCommentMap, index) => (<LayoutCommentUpdateOrDelete key={index} stepIsSubmitting={stepIsSubmitting} index={index} comment={instanceContactCommentMap} handleUpdate={handleUpdate} handleDelete={handleDelete}/>)).reverse()}
                            </MuiBox>
                        )
                        : null
                }
            </MuiBox>
        )
    }
)
