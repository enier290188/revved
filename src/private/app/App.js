import React from "react"
import {Page} from "./page/Page"

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

export const App = React.memo(
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
                        console.log("App")
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
                    <Page/>
                )
            case STEP_RETURN_ERROR:
                return null
            default:
                return null
        }
    }
)
