import {Icon as MuiIcon, Link as MuiLink, ListItemButton as MuiListItemButton, ListItemIcon as MuiListItemIcon, ListItemText as MuiListItemText} from "@mui/material"
import React from "react"
import {useLocation} from "react-router"
import {NavLink} from "react-router-dom"

export const ListItem = React.memo(
    ({level, url, iconFont, text, activeUrl, urlToCheck, handleOnClick}) => {
        const location = useLocation()
        const SxLink = {
            display: "block",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            color: theme => theme.palette.grey[600],
            textDecoration: "none"
        }
        const SxLinkActive = {
            color: theme => theme.palette.primary.main
        }
        let paddingLeft = 4
        switch (level) {
            case 1:
                paddingLeft *= 1
                break
            case 2:
                paddingLeft *= 2
                break
            case 3:
                paddingLeft *= 3
                break
            default:
                break
        }
        const SxListItemButton = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2, 4, 2, paddingLeft)
        }
        const SxListItemButtonIcon = {
            minWidth: 0,
            margin: theme => theme.spacing(0, 2, 0, 0),
            padding: theme => theme.spacing(0),
            color: "inherit"
        }
        const SxListItemButtonText = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            color: "inherit",
            whiteSpace: "nowrap"
        }

        return (
            <MuiLink component={NavLink} to={url} sx={activeUrl && String(location.pathname).includes(urlToCheck) ? {...SxLink, ...SxLinkActive} : SxLink} onClick={handleOnClick}>
                <MuiListItemButton component={"div"} sx={SxListItemButton}>
                    <MuiListItemIcon component={"div"} sx={SxListItemButtonIcon}><MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>{iconFont}</MuiIcon></MuiListItemIcon>
                    <MuiListItemText component={"div"} primary={text} sx={SxListItemButtonText}/>
                </MuiListItemButton>
            </MuiLink>
        )
    }
)
