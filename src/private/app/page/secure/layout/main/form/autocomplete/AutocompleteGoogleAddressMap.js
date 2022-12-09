import {Box as MuiBox} from "@mui/material"
import React from "react"

export const AutocompleteGoogleAddressMap = React.memo(
    ({field = {value: {}}, handleChanged = null}) => {
        const [
            {
                mapContainerRefHeight
            },
            setState
        ] = React.useState(
            {
                mapContainerRefHeight: 0
            }
        )
        const isComponentMountedRef = React.useRef(true)
        const mapContainerRef = React.useRef(null)
        const mapContentRef = React.useRef(null)

        const fetchMap = React.useCallback(
            async () => {
                try {
                    let iteration = 0
                    while (iteration < 10) {
                        if (typeof window !== "undefined" && window.document && window.google) {
                            if (mapContainerRef.current && mapContentRef.current) {
                                if (field && field.value && field.value.id && field.value.lat && field.value.lng && field.value.zoom && field.value.label) {
                                    try {
                                        const mapContainerRefWidth = mapContainerRef.current.getBoundingClientRect().width
                                        if (mapContainerRefWidth && typeof mapContainerRefWidth === "number" && mapContainerRefWidth !== mapContainerRefHeight) {
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            mapContainerRefHeight: mapContainerRefWidth
                                                        }
                                                    )
                                                )
                                                return null
                                            }
                                        }
                                    } catch (e) {
                                    }
                                    const fieldValueLatLng = {
                                        "lat": field.value.lat,
                                        "lng": field.value.lng
                                    }
                                    const fieldValueZoom = field.value.zoom
                                    const map = await (
                                        new window.google.maps.Map(
                                            mapContentRef.current,
                                            {
                                                center: fieldValueLatLng,
                                                zoom: fieldValueZoom,
                                                heading: 0,
                                                tilt: 0,
                                                gestureHandling: "cooperative",
                                                scrollwheel: false,
                                                controlSize: 25,

                                                mapTypeControl: false,
                                                mapTypeControlOptions: {
                                                    position: window.google.maps.ControlPosition.TOP_LEFT,
                                                    style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                                    mapTypeIds: ["satellite", "hybrid"]
                                                },
                                                mapTypeId: window.google.maps.MapTypeId.HYBRID,

                                                fullscreenControl: true,
                                                fullscreenControlOptions: {
                                                    position: window.google.maps.ControlPosition.RIGHT_TOP
                                                },

                                                zoomControl: true,
                                                zoomControlOptions: {
                                                    position: window.google.maps.ControlPosition.RIGHT_TOP
                                                },

                                                rotateControl: false,
                                                rotateControlOptions: {
                                                    position: window.google.maps.ControlPosition.RIGHT_BOTTOM
                                                },

                                                streetViewControl: true,
                                                streetViewControlOptions: {
                                                    position: window.google.maps.ControlPosition.RIGHT_BOTTOM
                                                },

                                                keyboardShortcuts: false,
                                                scaleControl: false
                                            }
                                        )
                                    )
                                    const fieldValueMarker = await (
                                        new window.google.maps.Marker(
                                            {
                                                map: map,
                                                position: fieldValueLatLng,
                                                animation: window.google.maps.Animation.DROP,
                                                title: field.value.label,
                                                draggable: true
                                            }
                                        )
                                    )
                                    const fieldValueInfoWindow = await new window.google.maps.InfoWindow()
                                    const fieldValueInfoWindowName = field.value.label ? `<div style="margin: 0; padding: 4px 0"><strong>${field.value.label}</strong></div>` : ""
                                    fieldValueInfoWindow.setContent(`${fieldValueInfoWindowName}`)
                                    window.google.maps.event.addListener(
                                        fieldValueMarker,
                                        "click",
                                        async () => {
                                            try {
                                                if (fieldValueInfoWindow.getMap()) {
                                                    fieldValueInfoWindow.close()
                                                    fieldValueMarker.setAnimation(window.google.maps.Animation.BOUNCE)
                                                } else {
                                                    fieldValueInfoWindow.open(map, fieldValueMarker)
                                                    fieldValueMarker.setAnimation(null)
                                                }
                                            } catch (e) {
                                            }
                                        }
                                    )
                                    window.google.maps.event.addListener(
                                        fieldValueMarker,
                                        "dragend",
                                        async (markerUpdated) => {
                                            try {
                                                const markerUpdatedLatLng = markerUpdated.latLng
                                                const latUpdated = markerUpdatedLatLng.lat()
                                                const lngUpdated = markerUpdatedLatLng.lng()
                                                const zoom = map.getZoom()
                                                await handleChanged(
                                                    {
                                                        ...field.value,
                                                        lat: latUpdated,
                                                        lng: lngUpdated,
                                                        zoom: zoom
                                                    }
                                                )
                                                    .then()
                                                    .catch()
                                                    .finally()
                                            } catch (e) {
                                            }
                                        }
                                    )
                                    window.google.maps.event.addListener(
                                        map,
                                        "zoom_changed",
                                        async () => {
                                            try {
                                                const markerLatLng = fieldValueMarker.position
                                                const lat = markerLatLng.lat()
                                                const lng = markerLatLng.lng()
                                                const zoomUpdated = map.getZoom()
                                                await handleChanged(
                                                    {
                                                        ...field.value,
                                                        lat: lat,
                                                        lng: lng,
                                                        zoom: zoomUpdated
                                                    }
                                                )
                                                    .then()
                                                    .catch()
                                                    .finally()
                                            } catch (e) {
                                            }
                                        }
                                    )
                                } else {
                                    if (isComponentMountedRef.current === true) {
                                        setState(
                                            (oldState) => (
                                                {
                                                    ...oldState,
                                                    mapContainerRefHeight: 0
                                                }
                                            )
                                        )
                                        return null
                                    }
                                }
                                break
                            }
                        }
                        iteration += 1
                    }
                } catch (e) {
                }
            },
            [
                mapContainerRefHeight,
                field,
                handleChanged
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                fetchMap().then().catch().finally()

                return () => {
                    isComponentMountedRef.current = false
                }
            },
            [
                fetchMap
            ]
        )

        return (
            <MuiBox
                ref={mapContainerRef}
                component={"div"}
                sx={
                    {
                        height: mapContainerRefHeight && mapContainerRefHeight !== 0 ? `${mapContainerRefHeight}px` : 0,
                        "& .gm-style > div > div > a[href^='https://maps.google.com/maps']": {
                            // display: "none !important",
                            // background: "none !important"
                        },
                        "& .gm-style > div:last-child": {
                            display: "none !important",
                            background: "none !important"
                        }
                    }
                }
            >
                <MuiBox
                    ref={mapContentRef}
                    component={"div"}
                    sx={
                        {
                            width: "100%",
                            height: "100%",
                            margin: 0,
                            padding: 0,
                            backgroundColor: theme => theme.palette.grey[100]
                        }
                    }
                />
            </MuiBox>
        )
    }
)
