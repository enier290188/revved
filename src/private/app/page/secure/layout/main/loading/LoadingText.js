import {Box as MuiBox, CircularProgress as MuiCircularProgress, Typography as MuiTypography} from "@mui/material"
import React from "react"
import {FormattedMessage} from "react-intl"

export const LoadingText = React.memo(
    ({sxContainer}) => {
        const SxContainer = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            backgroundColor: "transparent",
            color: theme => theme.palette.grey[600],
            ...sxContainer
        }

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiCircularProgress component={"div"} variant={"indeterminate"} color={"inherit"} size={"1em"} sx={{margin: theme => theme.spacing(0, 1, 0, 0), padding: theme => theme.spacing(0)}}/>
                <MuiTypography component={"p"} variant={"body2"}><FormattedMessage id={"app.page.secure.layout.main.loading.text"}/></MuiTypography>
            </MuiBox>
        )
    }
)
