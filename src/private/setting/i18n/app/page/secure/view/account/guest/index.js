import en from "./en.json"
import es from "./es.json"
import {Message as MessageForgotPassword} from "./forgot-password"
import {Message as MessageSignIn} from "./sign-in"

export const Message = {
    "en": {
        ...en,
        ...MessageForgotPassword.en,
        ...MessageSignIn.en
    },
    "es": {
        ...es,
        ...MessageForgotPassword.es,
        ...MessageSignIn.es
    }
}
