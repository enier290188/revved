import {Box as MuiBox} from "@mui/material"
import React from "react"

export const PaperContentLeft = React.memo(
    ({children, sxContainer}) => {
        const SxContainer = {
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "stretch",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            borderWidth: {xs: "0 0 0 0", md: "0 1px 0 0"},
            borderStyle: "solid",
            borderColor: theme => theme.palette.divider,
            ...sxContainer
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                {children}
            </MuiBox>
        )
    }
)
