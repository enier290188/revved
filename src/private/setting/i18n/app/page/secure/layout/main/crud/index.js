import en from "./en.json"
import es from "./es.json"
import {Message as MessageCommentList} from "./commentList"

export const Message = {
    "en": {
        ...en,
        ...MessageCommentList.en
    },
    "es": {
        ...es,
        ...MessageCommentList.es
    }
}
