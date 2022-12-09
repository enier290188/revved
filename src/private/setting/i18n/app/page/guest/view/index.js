import en from "./en.json"
import es from "./es.json"
import {Message as MessageError} from "./error"

export const Message = {
    "en": {
        ...en,
        ...MessageError.en
    },
    "es": {
        ...es,
        ...MessageError.es
    }
}
