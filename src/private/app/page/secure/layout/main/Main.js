import {Box as MuiBox} from "@mui/material"
import React from "react"

export const Main = React.memo(
    ({children, sxContainer, sxContent, sxContentCenter}) => {
        const SxContainer = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch",
            backgroundColor: theme => theme.palette.grey[50],
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme => theme.palette.divider,
            boxShadow: 1,
            overflow: "hidden hidden",
            ...sxContainer
        }
        const SxContent = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch",
            overflow: "auto auto",
            ...sxContent
        }
        const SxContentCenter = {
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            ...sxContentCenter
        }

        console.log("Main")

        return (
            <MuiBox component={"main"} sx={SxContainer}>
                <MuiBox component={"div"} sx={SxContent}>
                    <MuiBox component={"div"} sx={SxContentCenter}>
                        {children}
                    </MuiBox>
                </MuiBox>
            </MuiBox>
        )
    }
)
