import {Button as MuiButton, CircularProgress as MuiCircularProgress, Icon as MuiIcon} from "@mui/material"
import React from "react"

export const Button = React.memo(
    ({loading = false, disabled = false, type = "button", variant = "outlined", color = "primary", size = "medium", fullWidth = false, iconFont = "", text = "", handleOnClick = null}) => {
        const layoutMuiIcon = (
            <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>
                {iconFont}
            </MuiIcon>
        )

        return (
            <MuiButton
                disabled={disabled}
                type={type}
                variant={variant}
                color={color}
                size={size}
                fullWidth={fullWidth}
                startIcon={loading ? <MuiCircularProgress component={"div"} variant={"indeterminate"} color={"inherit"} size={"1em"}/> : iconFont && text ? layoutMuiIcon : null}
                onClick={handleOnClick}
            >
                {iconFont && text ? text : iconFont ? layoutMuiIcon : text ? text : null}
            </MuiButton>
        )
    }
)
