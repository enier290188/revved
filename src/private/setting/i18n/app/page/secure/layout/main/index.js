import en from "./en.json"
import es from "./es.json"
import {Message as MessageCrud} from "./crud"
import {Message as MessageForm} from "./form"
import {Message as MessageLoading} from "./loading"
import {Message as MessageTable} from "./table"

export const Message = {
    "en": {
        ...en,
        ...MessageCrud.en,
        ...MessageForm.en,
        ...MessageLoading.en,
        ...MessageTable.en
    },
    "es": {
        ...es,
        ...MessageCrud.es,
        ...MessageForm.es,
        ...MessageLoading.es,
        ...MessageTable.es
    }
}
