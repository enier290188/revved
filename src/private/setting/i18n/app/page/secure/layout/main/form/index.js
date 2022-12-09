import en from "./en.json"
import es from "./es.json"
import {Message as MessageAutocomplete} from "./autocomplete"

export const Message = {
    "en": {
        ...en,
        ...MessageAutocomplete.en
    },
    "es": {
        ...es,
        ...MessageAutocomplete.es
    }
}
