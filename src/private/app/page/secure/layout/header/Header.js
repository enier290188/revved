import {AppBar as MuiAppBar, Badge as MuiBadge, Box as MuiBox, Icon as MuiIcon, IconButton as MuiIconButton, Link as MuiLink, ListItemIcon as MuiListItemIcon, ListItemText as MuiListItemText, MenuItem as MuiMenuItem, MenuList as MuiMenuList, Popover as MuiPopover, Toolbar as MuiToolbar, Typography as MuiTypography} from "@mui/material"
import React from "react"
import {FormattedMessage} from "react-intl"
import {NavLink} from "react-router-dom"
import ImgLogo from "../../../../../asset/image/logo.png"
import {PATH_APP_PAGE_SECURE} from "../../../../../setting/path/app/page/secure"
import {Context as ContextDrawer} from "../../../../context/Drawer"
import {Context as ContextI18n} from "../../../../context/I18n"

const LayoutHeaderAppbarToolbarLeftButtonDrawer = React.memo(
    () => {
        const contextDrawer = React.useContext(ContextDrawer)
        const contextDrawerStatus = contextDrawer.getDrawer()
        const SxButtonDrawer = {
            margin: theme => theme.spacing(0, 2, 0, 0),
            padding: theme => theme.spacing(0)
        }

        const handleButtonDrawerClick = React.useCallback(
            async () => {
                try {
                    if (contextDrawerStatus) {
                        contextDrawer.changeDrawerClose()
                    } else {
                        contextDrawer.changeDrawerOpen()
                    }
                } catch (e) {
                }
            },
            [
                contextDrawer,
                contextDrawerStatus
            ]
        )

        return (
            <MuiIconButton component={"span"} color={"inherit"} size={"small"} onClick={handleButtonDrawerClick} sx={SxButtonDrawer}>
                <MuiIcon component={"span"} color={"inherit"} fontSize={"large"}>{contextDrawerStatus ? "menu_open" : "menu"}</MuiIcon>
            </MuiIconButton>
        )
    }
)

const LayoutHeaderAppbarToolbarRightMenuNotification = React.memo(
    () => {
        const [anchorEl, setAnchorEl] = React.useState(null)

        const handleAnchorElOpen = React.useCallback(
            async (event) => {
                try {
                    setAnchorEl(event.currentTarget)
                } catch (e) {
                }
            },
            []
        )

        const handleAnchorElClose = React.useCallback(
            async () => {
                try {
                    setAnchorEl(null)
                } catch (e) {
                }
            },
            []
        )

        const handleButtonClick = React.useCallback(
            async (event) => {
                try {
                    if (Boolean(anchorEl)) {
                        await handleAnchorElClose()
                    } else {
                        await handleAnchorElOpen(event)
                    }
                } catch (e) {
                }
            },
            [
                anchorEl,
                handleAnchorElOpen,
                handleAnchorElClose
            ]
        )

        return (
            <MuiBox component={"div"} onMouseLeave={handleAnchorElClose}>
                <MuiIconButton component={"div"} color={"inherit"} size={"medium"} onClick={handleButtonClick}>
                    <MuiBadge component={"span"} color={"error"} badgeContent={0}>
                        <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>
                            {"notifications"}
                        </MuiIcon>
                    </MuiBadge>
                </MuiIconButton>
                <MuiPopover component={"div"} disablePortal={false} anchorEl={anchorEl} anchorOrigin={{vertical: "bottom", horizontal: "center"}} transformOrigin={{vertical: "top", horizontal: "center"}} open={Boolean(anchorEl)} onClose={handleAnchorElClose} onMouseLeave={handleAnchorElClose}>
                    <MuiMenuList component={"ul"}>
                        <MuiMenuItem component={"li"}>
                            <MuiListItemText component={"div"} primary={<FormattedMessage id={"app.page.secure.layout.header.menu.notification.there-are-no-notifications"}/>}/>
                        </MuiMenuItem>
                    </MuiMenuList>
                </MuiPopover>
            </MuiBox>
        )
    }
)

const LayoutHeaderAppbarToolbarRightMenuI18n = React.memo(
    () => {
        const contextI18n = React.useContext(ContextI18n)
        const [anchorEl, setAnchorEl] = React.useState(null)
        const contextI18nLocaleList = React.useRef(contextI18n.getLocaleList())
        const contextI18nLocale = React.useRef(contextI18n.getLocale())

        const handleAnchorElOpen = React.useCallback(
            async (event) => {
                try {
                    setAnchorEl(event.currentTarget)
                } catch (e) {
                }
            },
            []
        )

        const handleAnchorElClose = React.useCallback(
            async () => {
                try {
                    setAnchorEl(null)
                } catch (e) {
                }
            },
            []
        )

        const handleButtonClick = React.useCallback(
            async (event) => {
                try {
                    if (Boolean(anchorEl)) {
                        await handleAnchorElClose()
                    } else {
                        await handleAnchorElOpen(event)
                    }
                } catch (e) {
                }
            },
            [
                anchorEl,
                handleAnchorElOpen,
                handleAnchorElClose
            ]
        )

        const handleContextI18NChangeLanguage = React.useCallback(
            async (locale) => {
                try {
                    if (contextI18nLocale.current !== locale) {
                        await handleAnchorElClose()
                        contextI18nLocale.current = locale
                        contextI18n.changeLocale(locale)
                    }
                } catch (e) {
                }
            },
            [
                contextI18n,
                handleAnchorElClose
            ]
        )

        return (
            <MuiBox component={"div"} onMouseLeave={handleAnchorElClose}>
                <MuiIconButton component={"div"} color={"inherit"} size={"medium"} onClick={handleButtonClick}>
                    <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>
                        {"translate"}
                    </MuiIcon>
                    <MuiTypography component={"span"} variant={"body1"} noWrap={true} sx={{display: {xs: "none", md: "flex"}}}>
                        <FormattedMessage id={`app.page.secure.layout.header.menu.i18n.${contextI18nLocale.current}`}/>
                    </MuiTypography>
                </MuiIconButton>
                <MuiPopover component={"div"} disablePortal={false} anchorEl={anchorEl} anchorOrigin={{vertical: "bottom", horizontal: "center"}} transformOrigin={{vertical: "top", horizontal: "center"}} open={Boolean(anchorEl)} onClose={handleAnchorElClose} onMouseLeave={handleAnchorElClose}>
                    <MuiMenuList component={"ul"}>
                        {
                            contextI18nLocaleList.current.map(
                                (locale) => (
                                    <MuiMenuItem component={"li"} key={locale} disabled={contextI18nLocale.current === locale} onClick={async () => await handleContextI18NChangeLanguage(locale)}>
                                        <MuiListItemIcon component={"div"}>
                                            <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>
                                                {"language"}
                                            </MuiIcon>
                                        </MuiListItemIcon>
                                        <MuiListItemText component={"div"} primary={<FormattedMessage id={`app.page.secure.layout.header.menu.i18n.${locale}`}/>}/>
                                    </MuiMenuItem>
                                )
                            )
                        }
                    </MuiMenuList>
                </MuiPopover>
            </MuiBox>
        )
    }
)

export const Header = React.memo(
    () => {
        const SxContainer = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch",
            backgroundColor: theme => theme.palette.primary.main,
            zIndex: theme => theme.zIndex.drawer + 1,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme => theme.palette.divider,
            boxShadow: 1
        }
        const SxContent = {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch"
        }
        const SxAppBar = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            color: theme => theme.palette.common.white,
            boxShadow: 0
        }
        const SxToolbar = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "stretch",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0)
        }
        const SxToolbarLeft = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: theme => theme.spacing(1, 2, 1, 2),
            padding: theme => theme.spacing(0)
        }
        const SxToolbarLeftBrandLink = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            textDecoration: "none"
        }
        const SxToolbarLeftBrandLinkLogo = {
            width: theme => theme.spacing(12),
            height: theme => theme.spacing(12),
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0)
        }
        const SxToolbarLeftBrandLinkText = {
            display: {xs: "none", md: "block"},
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            color: theme => theme.palette.common.white
        }
        const SxToolbarRight = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: theme => theme.spacing(1, 2, 1, 2),
            padding: theme => theme.spacing(0)
        }
        const SxToolbarRightMenu = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            textDecoration: "none"
        }

        console.log("Header")

        return (
            <MuiBox component={"div"} sx={SxContainer}>
                <MuiBox component={"div"} sx={SxContent}>
                    <MuiAppBar component={"div"} position={"static"} color={"primary"} sx={SxAppBar}>
                        <MuiToolbar component={"div"} variant={"dense"} disableGutters={true} sx={SxToolbar}>
                            <MuiBox component={"div"} sx={SxToolbarLeft}>
                                <LayoutHeaderAppbarToolbarLeftButtonDrawer/>
                                <MuiLink component={NavLink} to={PATH_APP_PAGE_SECURE} sx={SxToolbarLeftBrandLink}>
                                    <MuiBox component={"div"} sx={SxToolbarLeftBrandLinkLogo}>
                                        <img src={ImgLogo} alt={""} loading={"lazy"} width={"100%"} height={"100%"}/>
                                    </MuiBox>
                                    <MuiBox component={"div"} sx={SxToolbarLeftBrandLinkText}>
                                        <MuiTypography component={"h5"} variant={"h5"} noWrap={true}>
                                            <FormattedMessage id={"app.page.secure.layout.header.brand"}/>
                                        </MuiTypography>
                                    </MuiBox>
                                </MuiLink>
                            </MuiBox>
                            <MuiBox component={"div"} sx={SxToolbarRight}>
                                <MuiBox component={"div"} sx={SxToolbarRightMenu}>
                                    <LayoutHeaderAppbarToolbarRightMenuNotification/>
                                    <LayoutHeaderAppbarToolbarRightMenuI18n/>
                                </MuiBox>
                            </MuiBox>
                        </MuiToolbar>
                    </MuiAppBar>
                </MuiBox>
            </MuiBox>
        )
    }
)
