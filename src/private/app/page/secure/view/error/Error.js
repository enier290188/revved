import React from "react"
import {Route, Routes} from "react-router"
import {SLUG_APP_PAGE_SECURE_ERROR_404} from "../../../../../setting/path/app/page/secure/error/404"
import {SecurityNavigateToPathError404} from "../../security"
import {Error404 as ViewError404} from "./404/Error404"

export const Error = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`${SLUG_APP_PAGE_SECURE_ERROR_404}*`} element={<ViewError404/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
