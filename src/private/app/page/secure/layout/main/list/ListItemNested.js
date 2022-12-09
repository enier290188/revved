import {Box as MuiBox, Collapse as MuiCollapse, Icon as MuiIcon, ListItemButton as MuiListItemButton, ListItemIcon as MuiListItemIcon, ListItemText as MuiListItemText} from "@mui/material"
import React from "react"
import {useLocation} from "react-router"

export const ListItemNested = React.memo(
    ({level, url, iconFont, text, children}) => {
        const location = useLocation()
        const [open, setOpen] = React.useState(location.pathname.includes(url))
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
            padding: theme => theme.spacing(2, 4, 2, paddingLeft),
            color: theme => location.pathname.includes(url) ? theme.palette.primary.main : theme.palette.grey[600]
        }
        const SxListItemButtonIcon = {
            minWidth: 0,
            margin: theme => theme.spacing(0, 2, 0, 0),
            padding: theme => theme.spacing(0),
            color: "inherit"
        }
        const SxListItemButtonIconArrow = {
            alignSelf: "flex-end",
            minWidth: 0,
            margin: theme => theme.spacing(0, 0, 0, 2),
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
            <MuiBox component={"div"}>
                <MuiListItemButton component={"div"} sx={SxListItemButton} onClick={async () => await setOpen(!open)}>
                    <MuiListItemIcon component={"div"} sx={SxListItemButtonIcon}><MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>{iconFont}</MuiIcon></MuiListItemIcon>
                    <MuiListItemText component={"div"} primary={text} sx={SxListItemButtonText}/>
                    <MuiListItemIcon component={"div"} sx={SxListItemButtonIconArrow}><MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>{open ? "keyboard_arrow_down" : "keyboard_arrow_right"}</MuiIcon></MuiListItemIcon>
                </MuiListItemButton>
                <MuiCollapse in={open} timeout={"auto"} unmountOnExit={true}>
                    {children}
                </MuiCollapse>
            </MuiBox>
        )
    }
)
