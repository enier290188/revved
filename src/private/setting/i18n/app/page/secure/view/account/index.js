import en from "./en.json"
import es from "./es.json"
import {Message as MessageCurrent} from "./current"
import {Message as MessageGuest} from "./guest"

export const Message = {
    "en": {
        ...en,
        ...MessageCurrent.en,
        ...MessageGuest.en
    },
    "es": {
        ...es,
        ...MessageCurrent.es,
        ...MessageGuest.es
    }
}
