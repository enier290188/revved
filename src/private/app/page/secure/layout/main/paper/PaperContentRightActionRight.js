import {Box as MuiBox} from "@mui/material"
import React from "react"

export const PaperContentRightActionRight = React.memo(
    ({children, sxContainer}) => {
        const SxContainer = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "flex-start",
            justifyContent: {xs: "flex-start", md: "flex-end"},
            alignItems: "flex-start",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(1),
            ...sxContainer
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                {children}
            </MuiBox>
        )
    }
)
