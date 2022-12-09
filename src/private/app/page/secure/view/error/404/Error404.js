import {Box as MuiBox, Typography as MuiTypography} from "@mui/material"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes} from "react-router"
import {Container as LayoutContainer} from "../../../layout/main/container/Container"
import {Paper as LayoutPaper} from "../../../layout/main/paper/Paper"
import {PaperContent as LayoutPaperContent} from "../../../layout/main/paper/PaperContent"
import {PaperContentCenter as LayoutPaperContentCenter} from "../../../layout/main/paper/PaperContentCenter"
import {SecurityNavigateToPathError404} from "../../../security"

const View = React.memo(
    () => {
        const SxView = {
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(7, 1)
        }

        return (
            <LayoutContainer maxWidth={"sm"}>
                <LayoutPaper>
                    <LayoutPaperContent>
                        <LayoutPaperContentCenter maxWidth={"sm"}>
                            <MuiBox component={"div"} sx={SxView}>
                                <MuiTypography component={"h3"} variant={"h3"} sx={{textAlign: "center"}}><FormattedMessage id={"app.page.secure.view.error.404"}/></MuiTypography>
                                <MuiTypography component={"h4"} variant={"h4"} sx={{textAlign: "center"}}><FormattedMessage id={"app.page.secure.view.error.404.message"}/></MuiTypography>
                            </MuiBox>
                        </LayoutPaperContentCenter>
                    </LayoutPaperContent>

                </LayoutPaper>
            </LayoutContainer>
        )
    }
)

export const Error404 = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`/`} element={<View/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)

