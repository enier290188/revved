import en from "./en.json"
import es from "./es.json"
import {Message as MessageAccount} from "./account"
import {Message as MessageError} from "./error"

export const Message = {
    "en": {
        ...en,
        ...MessageAccount.en,
        ...MessageError.en
    },
    "es": {
        ...es,
        ...MessageAccount.es,
        ...MessageError.es
    }
}
