import {Message as MessageGuest} from "./guest"
import {Message as MessageSecure} from "./secure"

export const Message = {
    "en": {
        ...MessageGuest.en,
        ...MessageSecure.en
    },
    "es": {
        ...MessageGuest.es,
        ...MessageSecure.es
    }
}
