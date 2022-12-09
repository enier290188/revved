import {Alert as MuiAlert, AlertTitle as MuiAlertTitle, Box as MuiBox, Icon as MuiIcon, IconButton as MuiIconButton, Typography as MuiTypography} from "@mui/material"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Context as ContextAlert} from "../../../../context/Alert"

export const APP_PAGE_SECURE_LAYOUT_ALERT_ERROR = "error"
export const APP_PAGE_SECURE_LAYOUT_ALERT_WARNING = "warning"
export const APP_PAGE_SECURE_LAYOUT_ALERT_INFO = "info"
export const APP_PAGE_SECURE_LAYOUT_ALERT_SUCCESS = "success"

const LayoutAlert = React.memo(
    ({alert}) => {
        const contextAlert = React.useContext(ContextAlert)
        const SxContainer = {
            maxWidth: "sm",
            margin: theme => theme.spacing(0, 0, 1, 0),
            padding: theme => theme.spacing(2, 4),
            borderRadius: 1,
            boxShadow: 1,
            "&:last-child": {
                margin: theme => theme.spacing(0)
            }
        }

        return (
            <MuiAlert component={"div"} severity={alert.type} variant={"filled"} action={<MuiIconButton component={"div"} color={"inherit"} size={"medium"} onClick={async () => await contextAlert.deleteAlert(alert)}><MuiIcon component={"span"} color={"inherit"} fontSize={"inherit"}>{"close"}</MuiIcon></MuiIconButton>} sx={SxContainer}>
                <MuiAlertTitle component={"p"} variant={"body1"}>
                    <FormattedMessage id={`app.page.secure.layout.alert.${alert.type}`}/>
                </MuiAlertTitle>
                <MuiTypography component={"p"} variant={"body1"}>
                    <FormattedMessage id={alert.message.id} values={alert.message.values}/>
                </MuiTypography>
            </MuiAlert>
        )
    }
)

export const Alert = React.memo(
    () => {
        const contextAlert = React.useContext(ContextAlert)
        const SxContainer = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "center",
            alignItems: "flex-start",
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            zIndex: theme => theme.zIndex.drawer + 4
        }
        const SxContent = {
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "stretch",
            position: "absolute",
            margin: theme => theme.spacing(16, 0, 0, 0),
            padding: theme => theme.spacing(0)
        }

        React.useEffect(
            () => {
                contextAlert.createTimeout()
            },
            [
                contextAlert
            ]
        )

        const alertList = contextAlert.getAlertList()

        return 0 < alertList.length
            ? (
                <MuiBox component={"div"} sx={SxContainer}>
                    <MuiBox component={"div"} sx={SxContent}>
                        {
                            alertList.map(
                                (alertMap, index) => (
                                    <LayoutAlert key={index} alert={alertMap}/>
                                )
                            )
                        }
                    </MuiBox>
                </MuiBox>
            )
            : null
    }
)
