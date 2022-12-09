import {Avatar as MuiAvatar} from "@mui/material"
import React from "react"

export const Avatar = React.memo(
    ({disabled = false, component = "div", variant = "circular", src = null, text = "", sxContainer = {}}) => {
        const SxContainer = {
            width: theme => theme.spacing(8),
            height: theme => theme.spacing(8),
            backgroundColor: theme => src ? theme.palette.common.white : theme.palette.grey[600],
            color: theme => theme.palette.common.white,
            opacity: disabled ? 0.5 : 1,
            ...sxContainer
        }

        const getAvatarString = (text = "") => {
            try {
                const charList = text.split(" ")
                if (1 < charList.length) {
                    return `${charList[0][0]}${charList[1][0]}`
                } else {
                    if (charList.length === 1) {
                        return `${charList[0][0]}`
                    } else {
                        return ``
                    }
                }
            } catch (e) {
                return ``
            }
        }

        return (
            <MuiAvatar component={component} variant={variant} src={src} sx={SxContainer}>
                {src ? null : getAvatarString(text)}
            </MuiAvatar>
        )
    }
)
