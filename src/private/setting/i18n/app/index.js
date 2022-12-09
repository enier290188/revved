import {Message as MessagePage} from "./page"
import {Message as MessageUtil} from "./util"

export const Message = {
    "en": {
        ...MessagePage.en,
        ...MessageUtil.en
    },
    "es": {
        ...MessagePage.es,
        ...MessageUtil.es
    }
}
