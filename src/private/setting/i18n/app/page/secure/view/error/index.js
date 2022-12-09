import en from "./en.json"
import es from "./es.json"
import {Message as Message404} from "./404"

export const Message = {
    "en": {
        ...en,
        ...Message404.en
    },
    "es": {
        ...es,
        ...Message404.es
    }
}
