import {Box} from "@mui/material"
import React from "react"
import {Route, Routes} from "react-router"
import {SecurityNavigateToPathError404} from "../../../security"

const View = React.memo(
    () => {
        console.log("Error404")
        return (
            <Box component={"div"}>
                <h1>View Error404</h1>
            </Box>
        )
    }
)

export const Error404 = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`/`} element={<View/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)

