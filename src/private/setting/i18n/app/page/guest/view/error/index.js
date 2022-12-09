import {Message as Message404} from "./404"
import en from "./en.json"
import es from "./es.json"

export const Message = {
    "en": {
        ...Message404.en,
        ...en
    },
    "es": {
        ...Message404.es,
        ...es
    }
}
