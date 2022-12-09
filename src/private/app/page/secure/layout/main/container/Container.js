import {Container as MuiContainer} from "@mui/material"
import React from "react"

export const Container = React.memo(
    ({children, sxContainer, maxWidth = "md"}) => {
        const SxContainer = {
            maxWidth: maxWidth,
            margin: theme => theme.spacing(0),
            padding: theme => `${theme.spacing(2)} !important`,
            ...sxContainer
        }

        return (
            <MuiContainer component={"div"} fixed={false} maxWidth={maxWidth} disableGutters={false} sx={SxContainer}>
                {children}
            </MuiContainer>
        )
    }
)
