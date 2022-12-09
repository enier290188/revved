import React from "react"
import {Route, Routes} from "react-router"
import {SLUG_APP_PAGE_SECURE_SHELTER_DASHBOARD} from "../../../../../setting/path/app/page/secure/shelter/dashboard"
import {SecurityNavigateToPathError404} from "../../security"
import {Dashboard as ViewDashboard} from "./dashboard/Dashboard"

export const Shelter = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`${SLUG_APP_PAGE_SECURE_SHELTER_DASHBOARD}*`} element={<ViewDashboard/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
