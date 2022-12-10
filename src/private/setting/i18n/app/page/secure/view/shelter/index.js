import en from "./en.json"
import es from "./es.json"
import {Message as MessageDashboard} from "./dashboard"
import {Message as MessagePet} from "./pet"

export const Message = {
    "en": {
        ...en,
        ...MessageDashboard.en,
        ...MessagePet.en
    },
    "es": {
        ...es,
        ...MessageDashboard.es,
        ...MessagePet.es
    }
}
