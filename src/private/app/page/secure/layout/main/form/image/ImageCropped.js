import {Box as MuiBox, FormHelperText as MuiFormHelperText, Icon as MuiIcon, IconButton as MuiIconButton, Input as MuiInput, InputLabel as MuiInputLabel, Typography as MuiTypography} from "@mui/material"
import React from "react"
import ReactCrop from "react-image-crop"
import {Avatar as LayoutAvatar} from "../../avatar/Avatar"
import {HelperTextError as LayoutHelperTextError, HelperTextHelp as LayoutHelperTextHelp} from "../helper-text/HelperText"
import "react-image-crop/dist/ReactCrop.css"

export const ImageCropped = React.memo(
    ({disabled = false, downloadable = false, variant = "square", label = "", field = {}, handleOnChange = null}) => {
        const SxContainer = {
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "stretch"
        }
        const SxHead = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "center"
        }
        const SxHeadLeft = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center"
        }
        const SxHeadLeftLabel = {
            alignSelf: "flex-start",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "stretch",
            alignItems: "center",
            color: theme => disabled || Boolean(field.imageSrc) ? theme.palette.text.disabled : theme.palette.primary.main,
            cursor: disabled || Boolean(field.imageSrc) ? "not-allowed" : "pointer"
        }
        const SxHeadLeftLabelIcon = {
            color: theme => disabled || Boolean(field.imageSrc) ? theme.palette.action.disabled : theme.palette.primary.main,
            cursor: disabled || Boolean(field.imageSrc) ? "not-allowed" : "pointer"
        }
        const SxHeadRight = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-end",
            alignItems: "center"
        }
        const SxContent = {
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "auto auto !important"
        }
        const SxContentInput = {
            display: "none"
        }
        const SxContentImage = {
            width: `${field.cropConfigInitial.width}px`,
            height: `${field.cropConfigInitial.height}px`,
            fontSize: `${field.cropConfigInitial.height * 0.50}px`,
            opacity: disabled ? downloadable ? 1 : 0.5 : 1
        }
        const SxContentCrop = {
            opacity: disabled ? 0.5 : 1
        }

        /**
         * @param {Object} cropConfig - crop Object
         * @param {HTMLImageElement} imageRef - Image File Object
         * @return {File} file cropped in Promise
         */
        const getImageCroppedFile = React.useCallback(
            (cropConfig, imageRef) => {
                const canvasElement = document.createElement("canvas")
                const scaleX = imageRef.naturalWidth / imageRef.width
                const scaleY = imageRef.naturalHeight / imageRef.height
                canvasElement.width = cropConfig.width
                canvasElement.height = cropConfig.height
                const canvasElementContext2D = canvasElement.getContext("2d")
                const devicePixelRatio = 1
                canvasElement.width = cropConfig.width * devicePixelRatio
                canvasElement.height = cropConfig.height * devicePixelRatio
                canvasElementContext2D.setTransform(
                    devicePixelRatio,
                    0,
                    0,
                    devicePixelRatio,
                    0,
                    0
                )
                canvasElementContext2D.imageSmoothingQuality = "high"
                canvasElementContext2D.drawImage(
                    imageRef,
                    cropConfig.x * scaleX,
                    cropConfig.y * scaleY,
                    cropConfig.width * scaleX,
                    cropConfig.height * scaleY,
                    0,
                    0,
                    cropConfig.width,
                    cropConfig.height
                )

                return new Promise(
                    (resolve) => {
                        canvasElement.toBlob(
                            (blob) => {
                                if (!blob) {
                                    return null
                                }
                                resolve(blob)
                            },
                            "image/png",
                            1
                        )
                    }
                )
            },
            []
        )

        const handleChangedInputFile = React.useCallback(
            async (event) => {
                if (event) {
                    event.preventDefault()
                }
                const files = event && event.target && event.target.files ? event.target.files : null
                if (files && 0 < files.length && files[0]) {
                    const handleFileReaderLoaded = async (event) => {
                        if (event && event.target && event.target.result) {
                            await handleOnChange(
                                {
                                    imageFile: files[0],
                                    imageSrc: event.target.result
                                }
                            )
                        }
                    }
                    const fileReader = new FileReader()
                    fileReader.onload = handleFileReaderLoaded
                    fileReader.readAsDataURL(files[0])
                }
            },
            [
                handleOnChange
            ]
        )

        const handleChangedToDefault = React.useCallback(
            async (event) => {
                if (event) {
                    event.preventDefault()
                }
                await handleOnChange(
                    {
                        error: null,
                        cropConfig: field.cropConfigInitial,
                        imageToDelete: false,
                        imageRef: null,
                        imageFile: null,
                        imageSrc: null,
                        imageCroppedFile: null,
                        imageCroppedSrc: null
                    }
                )
            },
            [
                field,
                handleOnChange
            ]
        )

        const handleChangedImageToDelete = React.useCallback(
            async (event) => {
                if (event) {
                    event.preventDefault()
                }
                await handleOnChange(
                    {
                        imageToDelete: true
                    }
                )
            },
            [
                handleOnChange
            ]
        )

        const handleImageLoadedNewImage = async (event) => {
            if (event) {
                event.preventDefault()
            }
            const imageRef = event.currentTarget
            if (imageRef) {
                let x
                let y
                let width
                let height
                if (imageRef.width < field.cropConfig.width || imageRef.height < field.cropConfig.height) {
                    if (imageRef.width >= imageRef.height) {
                        x = (imageRef.width - imageRef.height) / 2
                        y = 0
                        width = height = imageRef.height
                    } else {
                        x = 0
                        y = (imageRef.height - imageRef.width) / 2
                        height = width = imageRef.width
                    }
                } else {
                    if (imageRef.width > field.cropConfig.width) {
                        x = (imageRef.width - field.cropConfig.width) / 2
                        width = field.cropConfig.width
                    } else {
                        x = 0
                        width = imageRef.width
                    }
                    if (imageRef.height > field.cropConfig.height) {
                        y = (imageRef.height - field.cropConfig.height) / 2
                        height = field.cropConfig.height
                    } else {
                        y = 0
                        height = imageRef.height
                    }
                }
                const cropConfig = {
                    ...field.cropConfig,
                    x: x,
                    y: y,
                    width: width,
                    height: height
                }
                const imageCroppedFile = await getImageCroppedFile(cropConfig, imageRef)
                if (field.imageCroppedSrc) {
                    window.URL.revokeObjectURL(field.imageCroppedSrc)
                }
                await handleOnChange(
                    {
                        cropConfig: cropConfig,
                        imageRef: imageRef,
                        imageCroppedFile: imageCroppedFile,
                        imageCroppedSrc: imageCroppedFile ? window.URL.createObjectURL(imageCroppedFile) : null
                    }
                )
                return false // Return false if you set cropConfig state in here.
            }
        }

        const handleChangedCropConfig = async (cropConfig) => {
            if (cropConfig && field.imageRef) {
                await handleOnChange(
                    {
                        cropConfig: cropConfig
                    }
                )
            }
        }

        const handleChangedCompletedCropConfig = async (cropConfig) => {
            if (cropConfig && field.imageRef) {
                const imageCroppedFile = await getImageCroppedFile(cropConfig, field.imageRef)
                if (field.imageCroppedSrc) {
                    window.URL.revokeObjectURL(field.imageCroppedSrc)
                }
                await handleOnChange(
                    {
                        imageCroppedFile: imageCroppedFile,
                        imageCroppedSrc: imageCroppedFile ? window.URL.createObjectURL(imageCroppedFile) : null
                    }
                )
            }
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiBox component={"div"} sx={SxHead}>
                    <MuiBox component={"div"} sx={SxHeadLeft}>
                        <MuiInputLabel htmlFor={Boolean(field.imageSrc) ? null : field.key} disabled={disabled || Boolean(field.imageSrc)} sx={SxHeadLeftLabel}>
                            <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"} sx={SxHeadLeftLabelIcon}>
                                {Boolean(field.value) ? "photo_camera" : "add_a_photo"}
                            </MuiIcon>
                            <MuiBox component={"div"} p={1}/>
                            <MuiBox component={"div"}>
                                <MuiTypography component={"p"} variant={"body1"}>
                                    {label}
                                </MuiTypography>
                            </MuiBox>
                        </MuiInputLabel>
                    </MuiBox>
                    <MuiBox component={"div"} sx={SxHeadRight}>
                        <MuiIconButton component={"div"} disabled={disabled ? true : Boolean(field.imageSrc) ? false : Boolean(field.imageToDelete) ? false : !Boolean(field.value)} color={"primary"} size={"medium"} onClick={Boolean(field.imageSrc) ? handleChangedToDefault : Boolean(field.imageToDelete) ? handleChangedToDefault : handleChangedImageToDelete}>
                            <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>
                                {Boolean(field.imageSrc) ? "close" : Boolean(field.imageToDelete) ? "close" : "delete"}
                            </MuiIcon>
                        </MuiIconButton>
                    </MuiBox>
                </MuiBox>
                <MuiBox component={"div"} sx={SxContent}>
                    {
                        Boolean(field.imageSrc)
                            ? (
                                <MuiBox component={"div"}>
                                    <ReactCrop
                                        crop={field.cropConfig}
                                        aspect={field.cropConfig.aspect}
                                        // src={field.imageSrc}
                                        // onImageLoaded={handleImageLoadedNewImage}
                                        onChange={handleChangedCropConfig}
                                        onComplete={handleChangedCompletedCropConfig}
                                        ruleOfThirds={true}
                                        locked={false}
                                        keepSelection={true}
                                        sx={SxContentCrop}
                                    >
                                        <img alt={""} src={field.imageSrc} onLoad={handleImageLoadedNewImage}/>
                                    </ReactCrop>
                                </MuiBox>
                            )
                            : (
                                <MuiBox component={"div"}>
                                    <MuiInput id={field.key} type={"file"} inputProps={{accept: "image/png, image/jpg, image/jpeg"}} sx={SxContentInput} onChange={handleChangedInputFile}/>
                                    <LayoutAvatar
                                        disabled={disabled || Boolean(field.imageSrc)}
                                        variant={variant}
                                        src={Boolean(field.imageToDelete) ? null : field.value}
                                        text={field.text}
                                        sxContainer={SxContentImage}
                                    />
                                </MuiBox>
                            )
                    }
                    {
                        field.error
                            ? (
                                <MuiFormHelperText sx={{alignSelf: "flex-start", margin: theme => theme.spacing(0), padding: theme => theme.spacing(0)}}>
                                    <LayoutHelperTextError messageList={field.error}/>
                                </MuiFormHelperText>
                            )
                            : null
                    }
                    {
                        field.help
                            ? (
                                <MuiFormHelperText sx={{alignSelf: "flex-start", margin: theme => theme.spacing(0), padding: theme => theme.spacing(0)}}>
                                    <LayoutHelperTextHelp messageList={field.help}/>
                                </MuiFormHelperText>
                            )
                            : null
                    }
                </MuiBox>
            </MuiBox>
        )
    }
)
