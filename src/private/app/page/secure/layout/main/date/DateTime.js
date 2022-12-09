import {Typography as MuiTypography} from "@mui/material"
import React from "react"

export const DateTime = React.memo(
    ({component = "p", variant = "body1", noWrap = true, dateTime = null, sxContainer}) => {
        const SxContainer = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            ...sxContainer
        }

        const getDateTimeString = (dateTime) => {
            try {
                const date = new Date(dateTime)
                return `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getFullYear()}, ${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
            } catch (e) {
                return ``
            }
        }

        return (
            <MuiTypography component={component} variant={variant} noWrap={noWrap} sx={SxContainer}>
                {getDateTimeString(dateTime)}
            </MuiTypography>
        )
    }
)
