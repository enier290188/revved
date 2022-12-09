import {Box as MuiBox, Typography as MuiTypography} from "@mui/material"
import React from "react"

export const HelperTextError = React.memo(
    ({messageList}) => {
        try {
            return messageList.map(
                (messageListMap) => (
                    messageListMap.map(
                        (messageMap, index) => (
                            <MuiBox key={index} component={"span"} sx={{display: "flex"}}>
                                <MuiTypography component={"span"} variant={"caption"} color={"error"}>- {messageMap}</MuiTypography>
                            </MuiBox>
                        )
                    )
                )
            )
        } catch (e) {
            return null
        }
    }
)

export const HelperTextHelp = React.memo(
    ({messageList}) => {
        try {
            return messageList.map(
                (messageMap, index) => (
                    <MuiBox key={index} component={"span"} sx={{display: "flex"}}>
                        <MuiTypography component={"span"} variant={"caption"} color={"inherit"}>{messageMap}</MuiTypography>
                    </MuiBox>
                )
            )
        } catch (e) {
            return null
        }
    }
)
