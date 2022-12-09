import {Message as MessageForm} from "./form"
import {Message as MessageGraphql} from "./graphql"

export const Message = {
    "en": {
        ...MessageForm.en,
        ...MessageGraphql.en
    },
    "es": {
        ...MessageForm.es,
        ...MessageGraphql.es
    }
}
