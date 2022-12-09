import {Box as MuiBox, CircularProgress as MuiCircularProgress} from "@mui/material"
import React from "react"

export const LoadingSecurity = React.memo(
    ({sxContainer}) => {
        const SxContainer = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "transparent",
            color: theme => theme.palette.grey[600],
            zIndex: theme => theme.zIndex.drawer + 3,
            cursor: "progress",
            ...sxContainer
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiCircularProgress component={"div"} variant={"indeterminate"} color={"inherit"} size={"5em"}/>
            </MuiBox>
        )
    }
)
