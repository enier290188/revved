import React from "react"
import {Route, Routes} from "react-router"
import {SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT} from "../../../../../setting/path/app/page/secure/account/current"
import {SLUG_APP_PAGE_SECURE_ACCOUNT_GUEST} from "../../../../../setting/path/app/page/secure/account/guest"
import {SecurityNavigateToPathError404} from "../../security"
import {Current as ViewCurrent} from "./current/Current"
import {Guest as ViewGuest} from "./guest/Guest"

export const Account = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`${SLUG_APP_PAGE_SECURE_ACCOUNT_CURRENT}*`} element={<ViewCurrent/>}/>
                <Route path={`${SLUG_APP_PAGE_SECURE_ACCOUNT_GUEST}*`} element={<ViewGuest/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
