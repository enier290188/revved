import en from "./en.json"
import es from "./es.json"
import {Message as MessageInfo} from "./info"
import {Message as MessagePassword} from "./password"
import {Message as MessagePicture} from "./picture"
import {Message as MessageSignOut} from "./sign-out"

export const Message = {
    "en": {
        ...en,
        ...MessageInfo.en,
        ...MessagePassword.en,
        ...MessagePicture.en,
        ...MessageSignOut.en
    },
    "es": {
        ...es,
        ...MessageInfo.es,
        ...MessagePassword.es,
        ...MessagePicture.es,
        ...MessageSignOut.es
    }
}
