import {Message as MessageLayout} from "./layout"
import {Message as MessageSecurity} from "./security"
import {Message as MessageView} from "./view"

export const Message = {
    "en": {
        ...MessageLayout.en,
        ...MessageSecurity.en,
        ...MessageView.en
    },
    "es": {
        ...MessageLayout.es,
        ...MessageSecurity.es,
        ...MessageView.es
    }
}
