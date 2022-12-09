import {Box as MuiBox, Divider as MuiDivider} from "@mui/material"
import React from "react"
import {FormattedMessage} from "react-intl"
import {Route, Routes} from "react-router"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO, SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO} from "../../../../../../setting/path/app/page/secure/account/current/info"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_PASSWORD, SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT_PASSWORD} from "../../../../../../setting/path/app/page/secure/account/current/password"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_PICTURE, SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT_PICTURE} from "../../../../../../setting/path/app/page/secure/account/current/picture"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT, SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT} from "../../../../../../setting/path/app/page/secure/account/current/sign-out"
import {List as LayoutList} from "../../../layout/main/list/List"
import {ListItem as LayoutListItem} from "../../../layout/main/list/ListItem"
import {Container as LayoutContainer} from "../../../layout/main/container/Container"
import {Paper as LayoutPaper} from "../../../layout/main/paper/Paper"
import {PaperContent as LayoutPaperContent} from "../../../layout/main/paper/PaperContent"
import {PaperContentLeft as LayoutPaperContentLeft} from "../../../layout/main/paper/PaperContentLeft"
import {PaperContentRight as LayoutPaperContentRight} from "../../../layout/main/paper/PaperContentRight"
import {PaperTitle as LayoutPaperTitle} from "../../../layout/main/paper/PaperTitle"
import {PaperTitleLeft as LayoutPaperTitleLeft} from "../../../layout/main/paper/PaperTitleLeft"
import {PaperTitleLeftTypographyLevel1 as LayoutPaperTitleLeftTypographyLevel1} from "../../../layout/main/paper/PaperTitleLeftTypographyLevel1"
import {SecurityNavigateToPathError404} from "../../../security"
import {Info as ViewInfo} from "./info/Info"
import {Password as ViewPassword} from "./password/Password"
import {Picture as ViewPicture} from "./picture/Picture"
import {SignOut as ViewSignOut} from "./sign-out/SignOut"

const Layout = React.memo(
    ({children}) => {
        return (
            <LayoutContainer maxWidth={"sm"}>
                <LayoutPaper>
                    <LayoutPaperTitle>
                        <LayoutPaperTitleLeft>
                            <MuiBox component={"div"} p={1}>
                                <LayoutPaperTitleLeftTypographyLevel1 iconFont={"account_circle"} text1={<FormattedMessage id={"app.page.secure.view.account.current"}/>}/>
                            </MuiBox>
                        </LayoutPaperTitleLeft>
                    </LayoutPaperTitle>
                    <MuiBox component={"div"} p={0}>
                        <MuiDivider component={"div"}/>
                    </MuiBox>
                    <LayoutPaperContent>
                        <LayoutPaperContentLeft>
                            <LayoutList level={1}>
                                <LayoutListItem
                                    level={1}
                                    url={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO}
                                    iconFont={"manage_accounts"}
                                    text={<FormattedMessage id={"app.page.secure.view.account.current.info"}/>}
                                    activeUrl={true}
                                    urlToCheck={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO}
                                    handleOnClick={null}
                                />
                                <LayoutListItem
                                    level={1}
                                    url={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_PASSWORD}
                                    iconFont={"password"}
                                    text={<FormattedMessage id={"app.page.secure.view.account.current.password"}/>}
                                    activeUrl={true}
                                    urlToCheck={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_PASSWORD}
                                    handleOnClick={null}
                                />
                                <LayoutListItem
                                    level={1}
                                    url={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_PICTURE}
                                    iconFont={"crop"}
                                    text={<FormattedMessage id={"app.page.secure.view.account.current.picture"}/>}
                                    activeUrl={true}
                                    urlToCheck={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_PICTURE}
                                    handleOnClick={null}
                                />
                                <LayoutListItem
                                    level={1}
                                    url={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT}
                                    iconFont={"power_settings_new"}
                                    text={<FormattedMessage id={"app.page.secure.view.account.current.sign-out"}/>}
                                    activeUrl={true}
                                    urlToCheck={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT}
                                    handleOnClick={null}
                                />
                            </LayoutList>
                        </LayoutPaperContentLeft>
                        <MuiBox component={"div"} p={0} sx={{display: {xs: "block", md: "none"}}}>
                            <MuiDivider component={"div"}/>
                        </MuiBox>
                        <LayoutPaperContentRight>
                            {children}
                        </LayoutPaperContentRight>
                    </LayoutPaperContent>
                </LayoutPaper>
            </LayoutContainer>
        )
    }
)

export const Current = React.memo(
    () => {
        return (
            <Layout>
                <Routes>
                    <Route path={`${SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO}*`} element={<ViewInfo/>}/>
                    <Route path={`${SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT_PASSWORD}*`} element={<ViewPassword/>}/>
                    <Route path={`${SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT_PICTURE}*`} element={<ViewPicture/>}/>
                    <Route path={`${SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT}*`} element={<ViewSignOut/>}/>
                    <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
                </Routes>
            </Layout>
        )
    }
)
