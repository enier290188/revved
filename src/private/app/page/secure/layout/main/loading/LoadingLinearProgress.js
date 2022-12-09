import {Box as MuiBox, LinearProgress as MuiLinearProgress} from "@mui/material"
import React from "react"

export const LoadingLinearProgress = React.memo(
    ({sxContainer}) => {
        const SxContainer = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            ...sxContainer
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiLinearProgress component={"div"} variant={"indeterminate"} color={"primary"} sx={{height: "1px"}}/>
            </MuiBox>
        )
    }
)
