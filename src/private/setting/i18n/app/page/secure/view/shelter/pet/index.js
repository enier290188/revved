import en from "./en.json"
import es from "./es.json"
import {Message as MessageComment} from "./comment"
import {Message as MessageCreate} from "./create"
import {Message as MessageDelete} from "./delete"
import {Message as MessageUpdate} from "./update"

export const Message = {
    "en": {
        ...en,
        ...MessageComment.en,
        ...MessageCreate.en,
        ...MessageDelete.en,
        ...MessageUpdate.en
    },
    "es": {
        ...es,
        ...MessageComment.es,
        ...MessageCreate.es,
        ...MessageDelete.es,
        ...MessageUpdate.es
    }
}
