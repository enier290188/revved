import {Box as MuiBox, Icon as MuiIcon, Typography as MuiTypography} from "@mui/material"
import React from "react"

export const Typography = React.memo(
    ({component = "p", variant = "body1", iconFont = "", text = "", noWrap = true, sxContainer}) => {
        const SxContainer = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            ...sxContainer
        }

        return (
            <MuiTypography component={component} variant={variant} noWrap={noWrap} sx={SxContainer}>
                {
                    iconFont
                        ? (
                            <MuiIcon component={"span"} color={"inherit"} fontSize={"inherit"} sx={{margin: theme => theme.spacing(0, 2, 0, 0), padding: theme => theme.spacing(0)}}>
                                {iconFont}
                            </MuiIcon>
                        )
                        : null
                }
                {
                    text
                        ? (
                            <MuiBox component={"span"} sx={{margin: theme => theme.spacing(0), padding: theme => theme.spacing(0)}}>
                                {text}
                            </MuiBox>
                        )
                        : null
                }
            </MuiTypography>
        )
    }
)
