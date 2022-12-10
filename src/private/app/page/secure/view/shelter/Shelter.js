import React from "react"
import {Route, Routes} from "react-router"
import {SLUG_APP_PAGE_SECURE_SHELTER_ADOPTER} from "../../../../../setting/path/app/page/secure/shelter/adopter"
import {SLUG_APP_PAGE_SECURE_SHELTER_DASHBOARD} from "../../../../../setting/path/app/page/secure/shelter/dashboard"
import {SLUG_APP_PAGE_SECURE_SHELTER_PET} from "../../../../../setting/path/app/page/secure/shelter/pet"
import {SecurityNavigateToPathError404} from "../../security"
import {Adopter as ViewAdopter} from "./adopter/Adopter"
import {Dashboard as ViewDashboard} from "./dashboard/Dashboard"
import {Pet as ViewPet} from "./pet/Pet"

export const Shelter = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`${SLUG_APP_PAGE_SECURE_SHELTER_DASHBOARD}*`} element={<ViewDashboard/>}/>
                <Route path={`${SLUG_APP_PAGE_SECURE_SHELTER_PET}*`} element={<ViewPet/>}/>
                <Route path={`${SLUG_APP_PAGE_SECURE_SHELTER_ADOPTER}*`} element={<ViewAdopter/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
