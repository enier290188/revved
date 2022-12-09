import {Box as MuiBox, Icon as MuiIcon, Typography as MuiTypography} from "@mui/material"
import React from "react"

export const PaperContentRightTitleLeftTypographyLevel1 = React.memo(
    ({iconFont, text1, text2}) => {
        const SxContainer = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center"
        }

        return (
            <MuiTypography component={"h5"} variant={"h5"} noWrap={true} sx={SxContainer}>
                <MuiIcon component={"span"} color={"inherit"} fontSize={"inherit"}>
                    {iconFont}
                </MuiIcon>
                <MuiBox component={"span"} sx={{margin: theme => theme.spacing(0, 0, 0, 2), padding: theme => theme.spacing(0)}}>
                    {text1}
                </MuiBox>
                {
                    text2
                        ? (
                            <MuiBox component={"span"} sx={{margin: theme => theme.spacing(0, 0, 0, 2), padding: theme => theme.spacing(0)}}>
                                {`"${text2}"`}
                            </MuiBox>
                        )
                        : null
                }
            </MuiTypography>
        )
    }
)
