import {Dialog as MuiDialog} from "@mui/material"
import React from "react"

export const Dialog = React.memo(
    ({children, sxContainer}) => {
        const SxContainer = {
            width: "100%",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            "& .MuiDialog-container": {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignContent: "flex-start",
                justifyContent: "center",
                alignItems: "flex-start",
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0)
            },
            "& .MuiDialog-paper": {
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                alignContent: "center",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                margin: theme => theme.spacing(0),
                padding: theme => ({xs: theme.spacing(0), md: theme.spacing(14, 0, 0, 0)}),
                borderRadius: 0,
                boxShadow: 0,
                backgroundColor: "transparent"
            },
            zIndex: theme => theme.zIndex.drawer + 2,
            ...sxContainer
        }

        return (
            <MuiDialog fullScreen={false} fullWidth={true} maxWidth={false} scroll={"paper"} disableEscapeKeyDown={true} sx={SxContainer} open={true} onClose={null}>
                {children}
            </MuiDialog>
        )
    }
)
