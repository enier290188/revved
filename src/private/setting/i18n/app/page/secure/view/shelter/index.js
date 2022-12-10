import en from "./en.json"
import es from "./es.json"
import {Message as MessageAdopter} from "./adopter"
import {Message as MessageDashboard} from "./dashboard"
import {Message as MessagePet} from "./pet"

export const Message = {
    "en": {
        ...en,
        ...MessageAdopter.en,
        ...MessageDashboard.en,
        ...MessagePet.en
    },
    "es": {
        ...es,
        ...MessageAdopter.es,
        ...MessageDashboard.es,
        ...MessagePet.es
    }
}
