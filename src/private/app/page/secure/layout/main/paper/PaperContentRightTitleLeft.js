import {Box as MuiBox} from "@mui/material"
import React from "react"

export const PaperContentRightTitleLeft = React.memo(
    ({children, sxContainer}) => {
        const SxContainer = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: {xs: "wrap", md: "nowrap"},
            alignContent: "flex-start",
            justifyContent: "flex-start",
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
