import React from "react"

const LOCAL_STORAGE_KEY = "user"
const LOCAL_STORAGE_VALUE_DEFAULT = null

export const Context = React.createContext({})

export const Wrapper = React.memo(
    ({children}) => {
        const [user, setUser] = React.useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || LOCAL_STORAGE_VALUE_DEFAULT)

        const getUser = () => {
            return user
        }

        const changeUser = (user) => {
            setUser(user)
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
        }

        const changeUserToDefault = () => {
            changeUser(LOCAL_STORAGE_VALUE_DEFAULT)
        }

        return (
            <Context.Provider value={{getUser: getUser, changeUser: changeUser, changeUserToDefault: changeUserToDefault}}>
                {children}
            </Context.Provider>
        )
    }
)
