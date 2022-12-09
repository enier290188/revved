import en from "./en.json"
import es from "./es.json"
import {Message as MessageAccount} from "./account"
import {Message as MessageError} from "./error"
import {Message as MessageShelter} from "./shelter"

export const Message = {
    "en": {
        ...en,
        ...MessageAccount.en,
        ...MessageError.en,
        ...MessageShelter.en
    },
    "es": {
        ...es,
        ...MessageAccount.es,
        ...MessageError.es,
        ...MessageShelter.es
    }
}
