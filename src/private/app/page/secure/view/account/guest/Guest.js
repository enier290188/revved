import React from "react"
import {Route, Routes} from "react-router"
import {SLUG_APP_PAGE_SECURE_ACCOUNT_GUEST_FORGOT_PASSWORD} from "../../../../../../setting/path/app/page/secure/account/guest/forgot-password"
import {SLUG_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN} from "../../../../../../setting/path/app/page/secure/account/guest/sign-in"
import {SecurityNavigateToPathError404} from "../../../security"
import {ForgotPassword as ViewForgotPassword} from "./forgot-password/ForgotPassword"
import {SignIn as ViewSignIn} from "./sign-in/SignIn"

export const Guest = React.memo(
    () => {
        return (
            <Routes>
                <Route path={`${SLUG_APP_PAGE_SECURE_ACCOUNT_GUEST_FORGOT_PASSWORD}*`} element={<ViewForgotPassword/>}/>
                <Route path={`${SLUG_APP_PAGE_SECURE_ACCOUNT_GUEST_SIGN_IN}*`} element={<ViewSignIn/>}/>
                <Route path={`*`} element={<SecurityNavigateToPathError404/>}/>
            </Routes>
        )
    }
)
