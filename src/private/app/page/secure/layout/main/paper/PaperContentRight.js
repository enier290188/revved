import {Box as MuiBox} from "@mui/material"
import React from "react"

export const PaperContentRight = React.memo(
    ({children, sxContainer}) => {
        const SxContainer = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "stretch",
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
