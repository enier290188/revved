import {Box as MuiBox, Divider as MuiDivider, Drawer as MuiDrawer} from "@mui/material"
import React from "react"
import {FormattedMessage} from "react-intl"
import {useLocation} from "react-router"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT} from "../../../../../setting/path/app/page/secure/account/current"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO} from "../../../../../setting/path/app/page/secure/account/current/info"
import {PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT} from "../../../../../setting/path/app/page/secure/account/current/sign-out"
import {PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_FORGOT_PASSWORD} from "../../../../../setting/path/app/page/secure/account/guest/forgot-password"
import {PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN} from "../../../../../setting/path/app/page/secure/account/guest/sign-in"
import {PATH_APP_PAGE_SECURE_SHELTER_ADOPTER} from "../../../../../setting/path/app/page/secure/shelter/adopter"
import {PATH_APP_PAGE_SECURE_SHELTER_DASHBOARD} from "../../../../../setting/path/app/page/secure/shelter/dashboard"
import {PATH_APP_PAGE_SECURE_SHELTER_PET} from "../../../../../setting/path/app/page/secure/shelter/pet"
import {Context as ContextDrawer} from "../../../../context/Drawer"
import {SecurityLayoutCurrentUser, SecurityLayoutCurrentUserShelter, SecurityLayoutGuestUser} from "../../security"
import {List as LayoutList} from "./list/List"
import {ListSubheader as LayoutListSubheader} from "./list/ListSubheader"
import {ListItem as LayoutListItem} from "./list/ListItem"

export const LayoutDrawer = React.memo(
    ({isMobile, handleMuiDrawerListItemOnClick}) => {
        const location = useLocation()
        const SxDrawer = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0, 0, 16, 0)
        }

        return (
            <MuiBox component={"div"} sx={SxDrawer}>
                <SecurityLayoutCurrentUserShelter>
                    <MuiDivider/>
                    <LayoutList level={1} subheader={<LayoutListSubheader level={1} text={<FormattedMessage id={"app.page.secure.layout.drawer.shelter"}/>}/>}>
                        <LayoutListItem
                            level={1}
                            url={PATH_APP_PAGE_SECURE_SHELTER_DASHBOARD}
                            iconFont={"dashboard"}
                            text={<FormattedMessage id={"app.page.secure.layout.drawer.shelter.dashboard"}/>}
                            activeUrl={true}
                            urlToCheck={PATH_APP_PAGE_SECURE_SHELTER_DASHBOARD}
                            handleOnClick={async () => await handleMuiDrawerListItemOnClick(isMobile)}
                        />
                        <LayoutListItem
                            level={1}
                            url={PATH_APP_PAGE_SECURE_SHELTER_PET}
                            iconFont={"pets"}
                            text={<FormattedMessage id={"app.page.secure.layout.drawer.shelter.pet"}/>}
                            activeUrl={true}
                            urlToCheck={PATH_APP_PAGE_SECURE_SHELTER_PET}
                            handleOnClick={async () => await handleMuiDrawerListItemOnClick(isMobile)}
                        />
                        <LayoutListItem
                            level={1}
                            url={PATH_APP_PAGE_SECURE_SHELTER_ADOPTER}
                            iconFont={"settings_accessibility"}
                            text={<FormattedMessage id={"app.page.secure.layout.drawer.shelter.adopter"}/>}
                            activeUrl={true}
                            urlToCheck={PATH_APP_PAGE_SECURE_SHELTER_ADOPTER}
                            handleOnClick={async () => await handleMuiDrawerListItemOnClick(isMobile)}
                        />
                    </LayoutList>
                </SecurityLayoutCurrentUserShelter>
                <SecurityLayoutCurrentUser>
                    <MuiDivider/>
                    <LayoutList level={1} subheader={<LayoutListSubheader level={1} text={<FormattedMessage id={"app.page.secure.layout.drawer.account"}/>}/>}>
                        <LayoutListItem
                            level={1}
                            url={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_INFO}
                            iconFont={"account_circle"}
                            text={<FormattedMessage id={"app.page.secure.layout.drawer.account.current"}/>}
                            activeUrl={location.pathname !== PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT}
                            urlToCheck={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT}
                            handleOnClick={async () => await handleMuiDrawerListItemOnClick(isMobile)}
                        />
                        <LayoutListItem
                            level={1}
                            url={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT}
                            iconFont={"power_settings_new"}
                            text={<FormattedMessage id={"app.page.secure.layout.drawer.account.current.sign-out"}/>}
                            activeUrl={true}
                            urlToCheck={PATH_APP_PAGE_SECURE_ACCOUNT_CURRENT_SIGN_OUT}
                            handleOnClick={async () => await handleMuiDrawerListItemOnClick(isMobile)}
                        />
                    </LayoutList>
                </SecurityLayoutCurrentUser>
                <SecurityLayoutGuestUser>
                    <MuiDivider/>
                    <LayoutList level={1}>
                        <LayoutListItem
                            level={1}
                            url={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN}
                            iconFont={"vpn_lock"}
                            text={<FormattedMessage id={"app.page.secure.layout.drawer.account.guest.sign-in"}/>}
                            activeUrl={true}
                            urlToCheck={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN}
                            handleOnClick={async () => await handleMuiDrawerListItemOnClick(isMobile)}
                        />
                        <LayoutListItem
                            level={1}
                            url={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_FORGOT_PASSWORD}
                            iconFont={"password"}
                            text={<FormattedMessage id={"app.page.secure.layout.drawer.account.guest.forgot-password"}/>}
                            activeUrl={true}
                            urlToCheck={PATH_APP_PAGE_SECURE_ACCOUNT_GUEST_FORGOT_PASSWORD}
                            handleOnClick={async () => await handleMuiDrawerListItemOnClick(isMobile)}
                        />
                    </LayoutList>
                </SecurityLayoutGuestUser>
            </MuiBox>
        )
    }
)

export const Drawer = React.memo(
    () => {
        const contextDrawer = React.useContext(ContextDrawer)
        const contextDrawerStatus = contextDrawer.getDrawer()
        const SxContainer = {
            display: "none",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch",
            backgroundColor: theme => theme.palette.common.white,
            zIndex: theme => theme.zIndex.drawer,
            borderWidth: "1px 0 1px 1px",
            borderStyle: "solid",
            borderColor: theme => ({xs: "transparent", md: theme.palette.divider}),
            boxShadow: {xs: 0, md: 1},
            overflow: "hidden hidden"
        }
        const SxContent = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch",
            overflow: "auto auto"
        }

        const handleMuiDrawerOnClose = React.useCallback(
            async () => {
                try {
                    contextDrawer.changeDrawerClose()
                } catch (e) {
                }
            },
            [
                contextDrawer
            ]
        )

        const handleMuiDrawerListItemOnClick = React.useCallback(
            async (isMobile) => {
                try {
                    if (isMobile === true) {
                        if (contextDrawerStatus) {
                            contextDrawer.changeDrawerClose()
                        } else {
                            contextDrawer.changeDrawerOpen()
                        }
                    }
                } catch (e) {
                }
            },
            [
                contextDrawer,
                contextDrawerStatus
            ]
        )

        console.log("Drawer")

        return contextDrawerStatus
            ? (
                <React.Fragment>
                    <MuiDrawer component={"div"} disablePortal={true} open={contextDrawerStatus} onClose={handleMuiDrawerOnClose} sx={{display: {xs: contextDrawerStatus === true ? "flex" : "none", md: "none"}, overflow: "hidden hidden"}}>
                        <MuiBox component={"div"} sx={{...SxContainer, display: {xs: contextDrawerStatus === true ? "flex" : "none", md: "none"}}}>
                            <MuiBox component={"div"} sx={{margin: theme => theme.spacing(14, 0, 0, 0), padding: theme => theme.spacing(0), borderWidth: "2px 0 0 0", borderStyle: "solid", borderColor: "transparent", overflow: "hidden hidden"}}/>
                            <MuiBox component={"div"} sx={SxContent}>
                                <LayoutDrawer isMobile={true} handleMuiDrawerListItemOnClick={handleMuiDrawerListItemOnClick}/>
                            </MuiBox>
                        </MuiBox>
                    </MuiDrawer>
                    <MuiBox component={"div"} sx={{...SxContainer, display: {xs: "none", md: contextDrawerStatus === true ? "flex" : "none"}}}>
                        <MuiBox component={"div"} sx={SxContent}>
                            <LayoutDrawer isMobile={false} handleMuiDrawerListItemOnClick={handleMuiDrawerListItemOnClick}/>
                        </MuiBox>
                    </MuiBox>
                </React.Fragment>
            )
            : null
    }
)
