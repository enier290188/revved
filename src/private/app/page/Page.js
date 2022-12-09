import React from "react"
import {Navigate, Routes, Route} from "react-router"
import {BrowserRouter} from "react-router-dom"
import {PATH_APP} from "../../setting/path/app"
import {PATH_APP_PAGE} from "../../setting/path/app/page"
import {PATH_APP_PAGE_GUEST} from "../../setting/path/app/page/guest"
import {PATH_APP_PAGE_SECURE} from "../../setting/path/app/page/secure"
import {PATH_APP_PAGE_SECURE_ERROR_404} from "../../setting/path/app/page/secure/error/404"
import {Wrapper as WrapperContextAlert} from "../context/Alert"
import {Wrapper as WrapperContextDrawer} from "../context/Drawer"
import {Wrapper as WrapperContextI18n} from "../context/I18n"
import {Wrapper as WrapperContextUser} from "../context/User"
import {Guest as PageGuest} from "./guest/Guest"
import {Secure as PageSecure} from "./secure/Secure"
import {SecurityNavigateToIndex} from "./secure/security"

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

export const Page = React.memo(
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
                        console.log("Page")
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
                    <WrapperContextUser>
                        <WrapperContextI18n>
                            <WrapperContextDrawer>
                                <WrapperContextAlert>
                                    <BrowserRouter>
                                        <Routes>
                                            <Route path={`/`} element={<SecurityNavigateToIndex pathFrom={`/`}/>}/>
                                            <Route path={`${PATH_APP}`} element={<SecurityNavigateToIndex pathFrom={`${PATH_APP}`}/>}/>
                                            <Route path={`${PATH_APP_PAGE}`} element={<SecurityNavigateToIndex pathFrom={`${PATH_APP_PAGE}`}/>}/>
                                            <Route path={`${PATH_APP_PAGE_GUEST}*`} element={<PageGuest/>}/>
                                            <Route path={`${PATH_APP_PAGE_SECURE}*`} element={<PageSecure/>}/>
                                            <Route path={`*`} element={<Navigate to={PATH_APP_PAGE_SECURE_ERROR_404} replace={true}/>}/>
                                        </Routes>
                                    </BrowserRouter>
                                </WrapperContextAlert>
                            </WrapperContextDrawer>
                        </WrapperContextI18n>
                    </WrapperContextUser>
                )
            case STEP_RETURN_ERROR:
                return null
            default:
                return null
        }
    }
)
