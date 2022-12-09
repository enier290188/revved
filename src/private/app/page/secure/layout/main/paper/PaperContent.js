import {Box as MuiBox} from "@mui/material"
import React from "react"

export const PaperContent = React.memo(
    ({children, sxContainer}) => {
        const SxContainer = {
            display: "flex",
            flexDirection: {xs: "column", md: "row"},
            flexWrap: "nowrap",
            alignContent: {xs: "center", md: "flex-start"},
            justifyContent: {xs: "flex-start", md: "space-between"},
            alignItems: {xs: "stretch", md: "stretch"},
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            ...sxContainer
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                {children}
            </MuiBox>
        )
    }
)
