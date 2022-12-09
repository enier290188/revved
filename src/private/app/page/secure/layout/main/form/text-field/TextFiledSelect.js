import {Box as MuiBox, FormHelperText as MuiFormHelperText, Icon as MuiIcon, MenuItem as MuiMenuItem, TextField as MuiTextField} from "@mui/material"
import React from "react"
import {HelperTextError as LayoutHelperTextError, HelperTextHelp as LayoutHelperTextHelp} from "../helper-text/HelperText"

export const TextFiledSelect = React.memo(
    ({disabled = false, required = false, readOnly = false, fullWidth = true, autoComplete = "", iconFont = "", label = "", field = {value: "", error: null, help: null}, handleOnKeyDown = null, handleOnChange = null}) => {
        const SxContainer = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2, 0, 0, 0)
        }
        const SxMuiTextField = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            "& .MuiOutlinedInput-root": {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignContent: "flex-start",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0),
                "& .MuiOutlinedInput-input": {
                    margin: theme => theme.spacing(0),
                    padding: theme => theme.spacing(2, 2, 2, 0)
                }
            },
            "& .MuiFormHelperText-root": {
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0)
            }
        }
        const SxMuiTextFieldInputPropsStartAdornment = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2)
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiTextField
                    select={true}
                    disabled={disabled}
                    required={required}
                    type={"text"}
                    variant={"outlined"}
                    margin={"none"}
                    size={"small"}
                    fullWidth={fullWidth}
                    autoComplete={autoComplete}
                    autoFocus={false}
                    InputProps={
                        {
                            readOnly: readOnly,
                            startAdornment: (
                                <MuiBox component={"div"} sx={SxMuiTextFieldInputPropsStartAdornment}>
                                    <MuiIcon component={"span"} color={disabled ? "disabled" : Boolean(field.error) ? "error" : "primary"} fontSize={"medium"}>
                                        {iconFont}
                                    </MuiIcon>
                                </MuiBox>
                            )
                        }
                    }
                    label={label}
                    value={field.value}
                    onKeyDown={handleOnKeyDown}
                    onChange={handleOnChange}
                    error={Boolean(field.error)}
                    helperText={
                        <LayoutHelperTextError messageList={field.error}/>
                    }
                    sx={SxMuiTextField}
                >
                    {
                        field.valueList.map(
                            (fieldValueMap, index) => {
                                return (
                                    <MuiMenuItem key={index} value={fieldValueMap.value}>
                                        {fieldValueMap.label}
                                    </MuiMenuItem>
                                )
                            }
                        )
                    }
                </MuiTextField>
                {
                    field.help
                        ? (
                            <MuiFormHelperText sx={{margin: theme => theme.spacing(0), padding: theme => theme.spacing(0)}}>
                                <LayoutHelperTextHelp messageList={field.help}/>
                            </MuiFormHelperText>
                        )
                        : null
                }
            </MuiBox>
        )
    }
)
