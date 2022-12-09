import en from "./en.json"
import es from "./es.json"
import {Message as MessageDashboard} from "./dashboard"

export const Message = {
    "en": {
        ...en,
        ...MessageDashboard.en
    },
    "es": {
        ...es,
        ...MessageDashboard.es
    }
}
