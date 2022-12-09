import React from "react"

const LOCAL_STORAGE_KEY = "alert"
const LOCAL_STORAGE_VALUE_DEFAULT = []

export const Context = React.createContext({})

export const Wrapper = React.memo(
    ({children}) => {
        const [alertList, setAlertList] = React.useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || LOCAL_STORAGE_VALUE_DEFAULT)
        const timeoutRef = React.useRef(null)

        const createTimeout = () => {
            if (0 < alertList.length) {
                timeoutRef.current = setTimeout(
                    () => {
                        setAlertList(
                            (oldAlertList) => {
                                const newAlertList = oldAlertList.filter((alertFilter) => alertFilter.step < 5).map((alertMap) => ({...alertMap, step: alertMap.step + 1}))
                                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...newAlertList]))
                                return [...newAlertList]
                            }
                        )
                    }
                    , 1000
                )
            }
        }

        const deleteTimeout = () => {
            clearTimeout(timeoutRef.current)
        }

        const getAlertList = () => {
            return [...alertList]
        }

        const addAlert = (alertToAdd) => {
            deleteTimeout()
            setAlertList(
                (oldAlertList) => {
                    const alert = {...alertToAdd, step: 0}
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...oldAlertList, alert]))
                    return [...oldAlertList, alert]
                }
            )
        }

        const deleteAlert = (alertToDelete) => {
            deleteTimeout()
            setAlertList(
                (oldAlertList) => {
                    const newAlertList = oldAlertList.filter((alertFilter) => !(alertFilter.type === alertToDelete.type && alertFilter.message === alertToDelete.message && alertFilter.step === alertToDelete.step))
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...newAlertList]))
                    return [...newAlertList]
                }
            )
        }

        const cleanAlertList = () => {
            for (const alertFor of alertList) {
                deleteAlert(alertFor)
            }
        }

        return (
            <Context.Provider value={{getAlertList: getAlertList, addAlert: addAlert, deleteAlert: deleteAlert, createTimeout: createTimeout, cleanAlertList: cleanAlertList}}>
                {children}
            </Context.Provider>
        )
    }
)
