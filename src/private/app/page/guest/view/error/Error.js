import {Box} from "@mui/material"
import React from "react"
import {Route, Routes} from "react-router"
import {SLUG_APP_PAGE_GUEST_ERROR_404} from "../../../../../setting/path/app/page/guest/error/404"
import {SecurityNavigateToPathError404} from "../../security"
import {Error404 as ViewError404} from "./404/Error404"

const Layout = React.memo(
    ({children}) => {
        console.log("Error")
        return (
            <Box component={"div"}>
                <h1>Layout Error</h1>
                {children}
            </Box>
        )
    }
)

export const Error = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`${SLUG_APP_PAGE_GUEST_ERROR_404}*`} element={<Layout><ViewError404/></Layout>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
