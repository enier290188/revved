import {Button as MuiButton, CircularProgress as MuiCircularProgress, Icon as MuiIcon, Link as MuiLink} from "@mui/material"
import React from "react"
import {NavLink} from "react-router-dom"

export const NavLinkButton = React.memo(
    ({url, target = "_self", loading = false, disabled = false, type = "button", variant = "outlined", color = "primary", size = "medium", fullWidth = false, iconFont = "", text = "", handleOnClick = null}) => {
        const layoutMuiIcon = (
            <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>
                {iconFont}
            </MuiIcon>
        )

        return (
            <MuiLink component={NavLink} to={url} target={target} display={"block"}>
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
            </MuiLink>
        )
    }
)
