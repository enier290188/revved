import {Box as MuiBox, CssBaseline as MuiCssBaseline} from "@mui/material"
import {ThemeProvider} from "@mui/material/styles"
import React from "react"
import {Routes, Route} from "react-router"
import {PATH_APP_PAGE_SECURE} from "../../../setting/path/app/page/secure"
import {SLUG_APP_PAGE_SECURE_ACCOUNT} from "../../../setting/path/app/page/secure/account"
import {SLUG_APP_PAGE_SECURE_ERROR} from "../../../setting/path/app/page/secure/error"
import {SLUG_APP_PAGE_SECURE_SHELTER} from "../../../setting/path/app/page/secure/shelter"
import {Theme} from "../../../setting/theme/app/page/secure"
import {Alert as LayoutAlert} from "./layout/alert/Alert"
import {Drawer as LayoutDrawer} from "./layout/drawer/Drawer"
import {Header as LayoutHeader} from "./layout/header/Header"
import {Main as LayoutMain} from "./layout/main/Main"
import {SecurityNavigateToIndex, SecurityNavigateToPathError404} from "./security"
import {Account as ViewAccount} from "./view/account/Account"
import {Error as ViewError} from "./view/error/Error"
import {Shelter as ViewShelter} from "./view/shelter/Shelter"

const STEP_RETURN_INITIAL = "step-return-initial"
const STEP_RETURN_SUCCESS = "step-return-success"
const STEP_RETURN_ERROR = "step-return-error"
const STEP_EFFECT_INITIAL = "step-effect-initial"
const STEP_EFFECT_SUBSCRIBE = "step-effect-subscribe"
const STEP_EFFECT_REFRESH = "step-effect-refresh"
const STEP_EFFECT_REFRESH_THEN_SUCCESS = "step-effect-refresh-then-success"
const STEP_EFFECT_REFRESH_THEN_ERROR = "step-effect-refresh-then-error"
const STEP_EFFECT_REFRESH_ERROR = "step-effect-refresh-error"
const STEP_EFFECT_DEFAULT = "step-effect-default"

export const Secure = React.memo(
    () => {
        const [
            {
                stepReturn,
                stepEffect
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL
            }
        )
        const isComponentMountedRef = React.useRef(true)

        const fetchData = React.useCallback(
            async () => {
                try {
                    return {
                        _response: {
                            success: true
                        }
                    }
                } catch (e) {
                    return {
                        _response: {
                            error: true
                        }
                    }
                }
            },
            []
        )

        const handleStepEffectInitial = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_INITIAL) {
                        if (window && window.document) {
                            const bodyQuerySelector = window.document.querySelector("body")
                            const scriptQuerySelector = window.document.querySelector("#google-map-api")
                            if (bodyQuerySelector !== null && scriptQuerySelector === null) {
                                const scriptElement = window.document.createElement("script")
                                scriptElement.setAttribute("id", "google-map-api")
                                scriptElement.setAttribute("type", "text/javascript")
                                scriptElement.setAttribute("charset", "UTF-8")
                                scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places,drawing,geometry&v=weekly`
                                scriptElement.setAttribute("async", "false")
                                bodyQuerySelector.appendChild(scriptElement)
                                if (isComponentMountedRef.current === true) {
                                    setState(
                                        (oldState) => (
                                            {
                                                ...oldState,
                                                stepEffect: STEP_EFFECT_REFRESH
                                            }
                                        )
                                    )
                                }
                            }
                        }
                    }
                } catch (e) {
                }
            },
            [
                stepEffect
            ]
        )

        const handleStepEffectRefresh = React.useCallback(
            async () => {
                try {
                    if (stepEffect === STEP_EFFECT_SUBSCRIBE || stepEffect === STEP_EFFECT_REFRESH) {
                        await fetchData()
                            .then(
                                (data) => {
                                    if (data && data._response && data._response.success) {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_REFRESH_THEN_SUCCESS
                                                    }
                                                )
                                            )
                                        }
                                    } else {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_REFRESH_THEN_ERROR
                                                    }
                                                )
                                            )
                                        }
                                    }
                                }
                            )
                    }
                } catch (e) {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_REFRESH_ERROR
                                }
                            )
                        )
                    }
                }
            },
            [
                stepEffect,
                fetchData
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                switch (stepEffect) {
                    case STEP_EFFECT_INITIAL:
                        handleStepEffectInitial().then().catch().finally()
                        break
                    case STEP_EFFECT_SUBSCRIBE:
                        handleStepEffectRefresh().then().catch().finally()
                        break
                    case STEP_EFFECT_REFRESH:
                        handleStepEffectRefresh().then().catch().finally()
                        break
                    case STEP_EFFECT_REFRESH_THEN_SUCCESS:
                        console.log("Secure")
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SUCCESS,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_REFRESH_THEN_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_ERROR,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_REFRESH_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_ERROR,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    default:
                        break
                }

                return () => {
                    isComponentMountedRef.current = false
                }
            },
            [
                stepEffect,
                handleStepEffectInitial,
                handleStepEffectRefresh
            ]
        )

        switch (stepReturn) {
            case STEP_RETURN_INITIAL:
                return null
            case STEP_RETURN_SUCCESS:
                return (
                    <ThemeProvider theme={Theme}>
                        <MuiCssBaseline/>
                        <MuiBox component={"div"} sx={{display: "flex", flexDirection: "column", flexWrap: "nowrap", alignContent: "center", justifyContent: "flex-start", alignItems: "stretch", width: "100vw", height: "100vh"}}>
                            <MuiBox component={"div"} sx={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "flex-start", justifyContent: "flex-start", alignItems: "stretch"}}>
                                <LayoutHeader/>
                            </MuiBox>
                            <MuiBox component={"div"} sx={{flexGrow: 1, display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "flex-start", justifyContent: "flex-start", alignItems: "stretch", overflow: "hidden hidden"}}>
                                <LayoutDrawer/>
                                <Routes>
                                    <Route path={`/`} element={<SecurityNavigateToIndex pathFrom={`${PATH_APP_PAGE_SECURE}`}/>}/>
                                    <Route path={`${SLUG_APP_PAGE_SECURE_ACCOUNT}*`} element={<LayoutMain><ViewAccount/></LayoutMain>}/>
                                    <Route path={`${SLUG_APP_PAGE_SECURE_ERROR}*`} element={<LayoutMain><ViewError/></LayoutMain>}/>
                                    <Route path={`${SLUG_APP_PAGE_SECURE_SHELTER}*`} element={<LayoutMain><ViewShelter/></LayoutMain>}/>
                                    <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
                                </Routes>
                            </MuiBox>
                        </MuiBox>
                        <LayoutAlert/>
                    </ThemeProvider>
                )
            case STEP_RETURN_ERROR:
                return null
            default:
                return null
        }
    }
)
