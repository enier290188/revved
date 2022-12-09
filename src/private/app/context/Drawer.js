import React from "react"

const LOCAL_STORAGE_KEY = "drawer"
const LOCAL_STORAGE_VALUE_DEFAULT = false

export const Context = React.createContext({})

export const Wrapper = React.memo(
    ({children}) => {
        const [drawer, setDrawer] = React.useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || LOCAL_STORAGE_VALUE_DEFAULT)

        const getDrawer = () => {
            return drawer
        }

        const changeDrawer = (drawer) => {
            setDrawer(drawer)
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drawer))
        }

        const changeDrawerOpen = () => {
            changeDrawer(true)
        }

        const changeDrawerClose = () => {
            changeDrawer(false)
        }

        return (
            <Context.Provider value={{getDrawer: getDrawer, changeDrawerOpen: changeDrawerOpen, changeDrawerClose: changeDrawerClose}}>
                {children}
            </Context.Provider>
        )
    }
)
