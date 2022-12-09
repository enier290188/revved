import {Message as MessageAlert} from "./alert"
import {Message as MessageDrawer} from "./drawer"
import {Message as MessageHeader} from "./header"
import {Message as MessageMain} from "./main"

export const Message = {
    "en": {
        ...MessageAlert.en,
        ...MessageDrawer.en,
        ...MessageHeader.en,
        ...MessageMain.en
    },
    "es": {
        ...MessageAlert.es,
        ...MessageDrawer.es,
        ...MessageHeader.es,
        ...MessageMain.es
    }
}
