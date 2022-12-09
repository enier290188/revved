import {Box as MuiBox} from "@mui/material"
import React from "react"

export const PaperContentRightCenter = React.memo(
    ({children, sxContainer, sxContent, maxWidth = "md"}) => {
        const SxContainer = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "space-between",
            alignItems: "stretch",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            ...sxContainer
        }
        const SxContent = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "stretch",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(1),
            ...sxContent
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiBox component={"div"} m={0} p={0}/>
                <MuiBox component={"div"} maxWidth={maxWidth} sx={SxContent}>
                    {children}
                </MuiBox>
                <MuiBox component={"div"} m={0} p={0}/>
            </MuiBox>
        )
    }
)
