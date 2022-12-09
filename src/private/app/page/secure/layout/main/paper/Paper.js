import {Paper as MuiPaper} from "@mui/material"
import React from "react"

export const Paper = React.memo(
    ({children, sxContainer}) => {
        const SxContainer = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            borderRadius: 1,
            boxShadow: 1,
            ...sxContainer
        }

        return (
            <MuiPaper component={"div"} variant={"elevation"} sx={SxContainer}>
                {children}
            </MuiPaper>
        )
    }
)
