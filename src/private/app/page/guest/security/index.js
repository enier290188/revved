import React from "react"
import {Navigate} from "react-router"
import {PATH_APP_PAGE_GUEST_ERROR_404} from "../../../../setting/path/app/page/guest/error/404"

export const SecurityNavigateToPath = ({path}) => {
    return (
        <Navigate to={path} replace={true}/>
    )
}

export const SecurityNavigateToPathError404 = () => {
    return (
        <SecurityNavigateToPath path={PATH_APP_PAGE_GUEST_ERROR_404}/>
    )
}
