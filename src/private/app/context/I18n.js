import React from "react"
import {IntlProvider} from "react-intl"
import {Message as I18nMessageDict} from "../../setting/i18n/app"

const LOCAL_STORAGE_KEY = "locale"
const LOCAL_STORAGE_VALUE_DEFAULT = "en"

const checkLocale = (locale) => {
    for (const messageFor in I18nMessageDict) {
        if (messageFor === locale) {
            return locale
        }
    }
    return LOCAL_STORAGE_VALUE_DEFAULT
}

export const Context = React.createContext({})

export const Wrapper = React.memo(
    ({children}) => {
        const [locale, setLocale] = React.useState(checkLocale(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || LOCAL_STORAGE_VALUE_DEFAULT))
        const [message, setMessage] = React.useState(I18nMessageDict[locale])

        const getLocaleList = () => {
            const messageList = []
            for (const messageFor in I18nMessageDict) {
                messageList.push(messageFor)
            }
            return messageList
        }

        const getLocale = () => {
            return locale
        }

        const changeLocale = (locale) => {
            locale = checkLocale(locale)
            setLocale(locale)
            setMessage(I18nMessageDict[locale])
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locale))
        }

        return (
            <Context.Provider value={{getLocaleList: getLocaleList, getLocale: getLocale, changeLocale: changeLocale}}>
                <IntlProvider locale={locale} messages={message}>
                    {children}
                </IntlProvider>
            </Context.Provider>
        )
    }
)
