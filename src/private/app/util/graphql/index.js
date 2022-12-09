import {API, Auth} from "aws-amplify"
import * as AmplifyGraphqlQuery from "../../../../graphql/queries"
import * as AmplifyGraphqlMutation from "../../../../graphql/mutations"

const AUTH_MODE_AMAZON_COGNITO_USER_POOLS = "AMAZON_COGNITO_USER_POOLS"
const AUTH_MODE_AWS_IAM = "AWS_IAM"

const MODEL_ITEM_ID = "id"
const MODEL_ITEM_CREATE_AT = "createdAt"
const MODEL_ITEM_UPDATE_AT = "updatedAt"
const MODEL_ITEM__LAST_CHANGED_AT = "_lastChangedAt"
const MODEL_ITEM__VERSION = "_version"
const MODEL_ITEM__DELETED = "_deleted"

export const QUERY_ITEM_TYPE_MODEL = "Model"
export const QUERY_ITEM_TYPE_ID = "Id"
export const QUERY_ITEM_TYPE_LIST = "List"
export const QUERY_ITEM_TYPE_DICTIONARY = "Dictionary"
export const QUERY_ITEM_TYPE_STRING = "String"
export const QUERY_ITEM_TYPE_FLOAT = "Float"
export const QUERY_ITEM_TYPE_INTEGER = "Integer"
export const QUERY_ITEM_TYPE_BOOLEAN = "Boolean"
export const QUERY_TOTAL = 10000
export const QUERY_LIMIT = 1000

export const SORT_ORDER_ASC = "ASC"
export const SORT_ORDER_DES = "DES"

export const ERROR_INTERNET_DISCONNECTED = "ERR_INTERNET_DISCONNECTED"
export const ERROR_UNAUTHORIZED = "Unauthorized"


const _getOptionAuthDict = async ({authMode = null}) => {
    const optionAuth = {
        mode: authMode ? authMode : AUTH_MODE_AMAZON_COGNITO_USER_POOLS,
        token: null
    }
    if (optionAuth.mode === AUTH_MODE_AWS_IAM) {
        try {
            optionAuth.token = (await Auth.currentSession()).getIdToken().getJwtToken()
        } catch (error) {
        }
    }
    return optionAuth
}

const _getModelItemTypeModelDict = async ({modelDict, itemKey, itemType, itemDefault, itemItemList, responseDataQueryItem}) => {
    if (itemType === QUERY_ITEM_TYPE_MODEL) {
        const responseDataQueryItemModelItemList = (
            responseDataQueryItem[itemKey] !== null &&
            responseDataQueryItem[itemKey] !== undefined &&
            responseDataQueryItem[itemKey].items !== null &&
            responseDataQueryItem[itemKey].items !== undefined
        )
            ? responseDataQueryItem[itemKey].items
            : itemDefault
                ? itemDefault.value
                : []
        const responseDataQueryItemModelItemFilterList = [...responseDataQueryItemModelItemList].filter(responseDataQueryItemModelItemFilter => responseDataQueryItemModelItemFilter[MODEL_ITEM_ID] && !responseDataQueryItemModelItemFilter[MODEL_ITEM__DELETED])
        if (0 < responseDataQueryItemModelItemFilterList.length) {
            const responseDataQueryItemModelItemList = []
            for (const responseDataQueryItemModelItemFilterForOf of responseDataQueryItemModelItemFilterList) {
                const modelItemModelDict = await _getModelDict({responseDataQueryItem: responseDataQueryItemModelItemFilterForOf, itemList: itemItemList})
                if (modelItemModelDict !== null) {
                    responseDataQueryItemModelItemList.push(modelItemModelDict)
                }
            }
            modelDict[itemKey] = responseDataQueryItemModelItemList
        } else {
            modelDict[itemKey] = responseDataQueryItemModelItemFilterList
        }
    }
}

const _getModelItemTypeIdDict = async ({modelDict, itemKey, itemType, itemDefault, responseDataQueryItem}) => {
    if (itemType === QUERY_ITEM_TYPE_ID) {
        modelDict[itemKey] = responseDataQueryItem[itemKey] !== null && responseDataQueryItem[itemKey] !== undefined
            ? responseDataQueryItem[itemKey]
            : itemDefault
                ? itemDefault.value
                : null
    }
}

const _getModelItemTypeListDict = async ({modelDict, itemKey, itemType, itemDefault, responseDataQueryItem}) => {
    if (itemType === QUERY_ITEM_TYPE_LIST) {
        modelDict[itemKey] = responseDataQueryItem[itemKey] !== null && responseDataQueryItem[itemKey] !== undefined
            ? responseDataQueryItem[itemKey]
            : itemDefault
                ? itemDefault.value
                : []
    }
}

const _getModelItemTypeDictionaryDict = async ({modelDict, itemKey, itemType, itemDefault, responseDataQueryItem}) => {
    if (itemType === QUERY_ITEM_TYPE_DICTIONARY) {
        modelDict[itemKey] = responseDataQueryItem[itemKey] !== null && responseDataQueryItem[itemKey] !== undefined
            ? responseDataQueryItem[itemKey]
            : itemDefault
                ? itemDefault.value
                : {}
    }
}

const _getModelItemTypeStringDict = async ({modelDict, itemKey, itemType, itemDefault, responseDataQueryItem}) => {
    if (itemType === QUERY_ITEM_TYPE_STRING) {
        modelDict[itemKey] = responseDataQueryItem[itemKey] !== null && responseDataQueryItem[itemKey] !== undefined
            ? responseDataQueryItem[itemKey]
            : itemDefault
                ? itemDefault.value
                : ""
    }
}

const _getModelItemTypeFloatDict = async ({modelDict, itemKey, itemType, itemDefault, responseDataQueryItem}) => {
    if (itemType === QUERY_ITEM_TYPE_FLOAT) {
        modelDict[itemKey] = responseDataQueryItem[itemKey] !== null && responseDataQueryItem[itemKey] !== undefined
            ? responseDataQueryItem[itemKey]
            : itemDefault
                ? itemDefault.value
                : 0
    }
}

const _getModelItemTypeIntegerDict = async ({modelDict, itemKey, itemType, itemDefault, responseDataQueryItem}) => {
    if (itemType === QUERY_ITEM_TYPE_INTEGER) {
        modelDict[itemKey] = responseDataQueryItem[itemKey] !== null && responseDataQueryItem[itemKey] !== undefined
            ? responseDataQueryItem[itemKey]
            : itemDefault
                ? itemDefault.value
                : 0
    }
}

const _getModelItemTypeBooleanDict = async ({modelDict, itemKey, itemType, itemDefault, responseDataQueryItem}) => {
    if (itemType === QUERY_ITEM_TYPE_BOOLEAN) {
        modelDict[itemKey] = responseDataQueryItem[itemKey] !== null && responseDataQueryItem[itemKey] !== undefined
            ? responseDataQueryItem[itemKey]
            : itemDefault
                ? itemDefault.value
                : false
    }
}

const _getModelDict = async ({responseDataQueryItem, itemList = []}) => {
    const modelDict = {}
    if (responseDataQueryItem[MODEL_ITEM_ID]) {
        modelDict[MODEL_ITEM_ID] = responseDataQueryItem[MODEL_ITEM_ID]
    } else {
        return null
    }
    for (const itemForOf of itemList) {
        if (
            (itemForOf.key) &&
            (itemForOf.type) &&
            (itemForOf.type === QUERY_ITEM_TYPE_MODEL || itemForOf.type === QUERY_ITEM_TYPE_ID || itemForOf.type === QUERY_ITEM_TYPE_LIST || itemForOf.type === QUERY_ITEM_TYPE_DICTIONARY || itemForOf.type === QUERY_ITEM_TYPE_STRING || itemForOf.type === QUERY_ITEM_TYPE_FLOAT || itemForOf.type === QUERY_ITEM_TYPE_INTEGER || itemForOf.type === QUERY_ITEM_TYPE_BOOLEAN)
        ) {
            const itemKey = itemForOf.key
            const itemType = itemForOf.type
            const itemDefault = itemForOf.hasOwnProperty("default") ? {value: itemForOf.default} : null

            switch (itemType) {
                case QUERY_ITEM_TYPE_MODEL:
                    const itemItemList = itemForOf.itemList
                    await _getModelItemTypeModelDict({modelDict: modelDict, itemKey: itemKey, itemType: itemType, itemDefault: itemDefault, itemItemList: itemItemList, responseDataQueryItem: responseDataQueryItem})
                    break
                case QUERY_ITEM_TYPE_ID:
                    await _getModelItemTypeIdDict({modelDict: modelDict, itemKey: itemKey, itemType: itemType, itemDefault: itemDefault, responseDataQueryItem: responseDataQueryItem})
                    break
                case QUERY_ITEM_TYPE_LIST:
                    await _getModelItemTypeListDict({modelDict: modelDict, itemKey: itemKey, itemType: itemType, itemDefault: itemDefault, responseDataQueryItem: responseDataQueryItem})
                    break
                case QUERY_ITEM_TYPE_DICTIONARY:
                    await _getModelItemTypeDictionaryDict({modelDict: modelDict, itemKey: itemKey, itemType: itemType, itemDefault: itemDefault, responseDataQueryItem: responseDataQueryItem})
                    break
                case QUERY_ITEM_TYPE_STRING:
                    await _getModelItemTypeStringDict({modelDict: modelDict, itemKey: itemKey, itemType: itemType, itemDefault: itemDefault, responseDataQueryItem: responseDataQueryItem})
                    break
                case QUERY_ITEM_TYPE_FLOAT:
                    await _getModelItemTypeFloatDict({modelDict: modelDict, itemKey: itemKey, itemType: itemType, itemDefault: itemDefault, responseDataQueryItem: responseDataQueryItem})
                    break
                case QUERY_ITEM_TYPE_INTEGER:
                    await _getModelItemTypeIntegerDict({modelDict: modelDict, itemKey: itemKey, itemType: itemType, itemDefault: itemDefault, responseDataQueryItem: responseDataQueryItem})
                    break
                case QUERY_ITEM_TYPE_BOOLEAN:
                    await _getModelItemTypeBooleanDict({modelDict: modelDict, itemKey: itemKey, itemType: itemType, itemDefault: itemDefault, responseDataQueryItem: responseDataQueryItem})
                    break
                default:
                    break
            }
        }
    }
    modelDict[MODEL_ITEM_CREATE_AT] = responseDataQueryItem[MODEL_ITEM_CREATE_AT] ? responseDataQueryItem[MODEL_ITEM_CREATE_AT] : null
    modelDict[MODEL_ITEM_UPDATE_AT] = responseDataQueryItem[MODEL_ITEM_UPDATE_AT] ? responseDataQueryItem[MODEL_ITEM_UPDATE_AT] : null
    modelDict[MODEL_ITEM__LAST_CHANGED_AT] = responseDataQueryItem[MODEL_ITEM__LAST_CHANGED_AT] ? responseDataQueryItem[MODEL_ITEM__LAST_CHANGED_AT] : null
    modelDict[MODEL_ITEM__VERSION] = responseDataQueryItem[MODEL_ITEM__VERSION] ? responseDataQueryItem[MODEL_ITEM__VERSION] : null
    return modelDict
}

export const getModelListSortByItemTypeString = async ({item = "", order = SORT_ORDER_ASC}) => {
    return (a, b) => {
        const aItem = a[item] ? a[item] : null
        const bItem = b[item] ? b[item] : null
        // equal items sort equally, to handle the case where the value is the same, we order by a secondary property, the `id` property.
        if (aItem === bItem) {
            return a[MODEL_ITEM_ID] > b[MODEL_ITEM_ID] ? 1 : a[MODEL_ITEM_ID] === b[MODEL_ITEM_ID] ? 0 : -1
        } else {
            // nulls sort after anything else.
            if (aItem === null) {
                return 1
            } else {
                if (bItem === null) {
                    return -1
                } else {
                    // if we're ascending, the lowest sorts first.
                    if (order === SORT_ORDER_ASC) {
                        return aItem < bItem ? -1 : 1
                    } else {
                        // if we're descending, the highest sorts first.
                        if (order === SORT_ORDER_DES) {
                            return aItem < bItem ? 1 : -1
                        } else {
                            return 0
                        }
                    }
                }
            }
        }
    }
}

export const getModelListSortByItemTypeInteger = async ({item = "", order = SORT_ORDER_ASC}) => {
    return (a, b) => {
        const aItem = a[item] ? a[item] : null
        const bItem = b[item] ? b[item] : null
        // equal items sort equally, to handle the case where the value is the same, we order by a secondary property, the `id` property.
        if (aItem === bItem) {
            return a[MODEL_ITEM_ID] > b[MODEL_ITEM_ID] ? 1 : a[MODEL_ITEM_ID] === b[MODEL_ITEM_ID] ? 0 : -1
        } else {
            // nulls sort after anything else.
            if (aItem === null) {
                return 1
            } else {
                if (bItem === null) {
                    return -1
                } else {
                    // if we're ascending, the lowest sorts first.
                    if (order === SORT_ORDER_ASC) {
                        return aItem < bItem ? -1 : 1
                    } else {
                        // if we're descending, the highest sorts first.
                        if (order === SORT_ORDER_DES) {
                            return aItem < bItem ? 1 : -1
                        } else {
                            return 0
                        }
                    }
                }
            }
        }
    }
}

export const getModelListSortByItemTypeBoolean = async ({item = "", order = SORT_ORDER_ASC}) => {
    return (a, b) => {
        const aItem = a[item] !== null ? a[item] : null
        const bItem = b[item] !== null ? b[item] : null
        // equal items sort equally, to handle the case where the value is the same, we order by a secondary property, the `id` property.
        if (aItem === bItem) {
            return a[MODEL_ITEM_ID] > b[MODEL_ITEM_ID] ? 1 : a[MODEL_ITEM_ID] === b[MODEL_ITEM_ID] ? 0 : -1
        } else {
            // nulls sort after anything else.
            if (aItem === null) {
                return 1
            } else {
                if (bItem === null) {
                    return -1
                } else {
                    // if we're ascending, the true values sorts first.
                    if (order === SORT_ORDER_ASC) {
                        return aItem < bItem ? 1 : -1
                    } else {
                        // if we're descending, the false values sorts first.
                        if (order === SORT_ORDER_ASC) {
                            return aItem < bItem ? -1 : 1
                        } else {
                            return 0
                        }
                    }
                }
            }
        }
    }
}

export const getModelList = async ({query}) => {
    try {
        if (query && query.name) {
            query.itemList = query.itemList ? [...query.itemList] : []
            query.total = query.total ? parseInt(`${query.total}`) : QUERY_TOTAL
            query.limit = query.limit ? parseInt(`${query.limit}`) : QUERY_LIMIT
            query.filter = query.filter ? {...query.filter} : {}
        } else {
            return {
                _response: {
                    error: true
                },
                instanceList: []
            }
        }
        const modelList = []
        const option = {
            query: AmplifyGraphqlQuery[query.name],
            variables: {
                nextToken: null,
                limit: query.limit,
                filter: query.filter
            }
        }
        const optionAuth = await _getOptionAuthDict({authMode: query.authMode})
        if (optionAuth.mode === AUTH_MODE_AWS_IAM) {
            option.authMode = optionAuth.mode
            option.authToken = optionAuth.token
        }
        do {
            const response = await API.graphql(option)
            if (response && response.data && response.data[query.name]) {
                const responseDataQuery = response.data[query.name]
                const responseDataQueryItemFilterList = responseDataQuery.items ? [...responseDataQuery.items].filter(responseDataQueryItemFilter => responseDataQueryItemFilter[MODEL_ITEM_ID] && !responseDataQueryItemFilter[MODEL_ITEM__DELETED]) : []
                const responseDataQueryItemList = []
                for (const responseDataQueryItemFilterForOf of responseDataQueryItemFilterList) {
                    const modelDict = await _getModelDict({responseDataQueryItem: responseDataQueryItemFilterForOf, itemList: query.itemList})
                    if (modelDict !== null) {
                        responseDataQueryItemList.push(modelDict)
                    }
                }
                for (const responseDataQueryItemForOf of responseDataQueryItemList) {
                    modelList.push({...responseDataQueryItemForOf})
                    if (!(modelList.length < query.total)) {
                        break
                    }
                }
                option.variables.nextToken = responseDataQuery.nextToken ? responseDataQuery.nextToken : null
            } else {
                option.variables.nextToken = null
            }
        } while (option.variables.nextToken && modelList.length < query.total)
        return {
            _response: {
                success: true
            },
            instanceList: modelList
        }
    } catch (error) {
        if (error && error.errors) {
            for (const errorForOf of error.errors) {
                if (errorForOf && errorForOf.errorType && errorForOf.errorType) {
                    return {
                        _response: {
                            error: true,
                            errorType: ERROR_UNAUTHORIZED
                        },
                        instance: null
                    }
                }
            }
        }
        return {
            _response: {
                error: true,
                errorType: ERROR_INTERNET_DISCONNECTED
            },
            instanceList: []
        }
    }
}

export const getModel = async ({query}) => {
    try {
        if (query && query.name && query[MODEL_ITEM_ID]) {
            query.itemList = query.itemList ? [...query.itemList] : []
        } else {
            return {
                _response: {
                    error: true
                },
                instance: null
            }
        }
        const option = {
            query: AmplifyGraphqlQuery[query.name],
            variables: {
                [MODEL_ITEM_ID]: query[MODEL_ITEM_ID]
            }
        }
        const optionAuth = await _getOptionAuthDict({authMode: query.authMode})
        if (optionAuth.mode === AUTH_MODE_AWS_IAM) {
            option.authMode = optionAuth.mode
            option.authToken = optionAuth.token
        }
        const response = await API.graphql(option)
        if (response && response.data && response.data[query.name]) {
            const responseDataQuery = response.data[query.name]
            const responseDataQueryItemFilter = responseDataQuery[MODEL_ITEM_ID] && !responseDataQuery[MODEL_ITEM__DELETED] ? responseDataQuery : null
            if (responseDataQueryItemFilter !== null) {
                const modelDict = await _getModelDict({responseDataQueryItem: responseDataQueryItemFilter, itemList: query.itemList})
                if (modelDict !== null) {
                    return {
                        _response: {
                            success: true
                        },
                        instance: modelDict
                    }
                } else {
                    return {
                        _response: {
                            error: true
                        },
                        instance: null
                    }
                }
            } else {
                return {
                    _response: {
                        error: true
                    },
                    instance: null
                }
            }
        } else {
            return {
                _response: {
                    error: true
                },
                instance: null
            }
        }
    } catch (error) {
        if (error && error.errors) {
            for (const errorForOf of error.errors) {
                if (errorForOf && errorForOf.errorType && errorForOf.errorType) {
                    return {
                        _response: {
                            error: true,
                            errorType: ERROR_UNAUTHORIZED
                        },
                        instance: null
                    }
                }
            }
        }
        return {
            _response: {
                error: true,
                errorType: ERROR_INTERNET_DISCONNECTED
            },
            instance: null
        }
    }
}

export const createModel = async ({query}) => {
    try {
        if (query && query.name) {
            query.itemList = query.itemList ? [...query.itemList] : []
            query.input = query.input ? {...query.input} : {}
        } else {
            return {
                _response: {
                    error: true
                },
                instance: null
            }
        }
        const option = {
            query: AmplifyGraphqlMutation[query.name],
            variables: {
                input: {
                    ...query.input
                }
            }
        }
        const optionAuth = await _getOptionAuthDict({authMode: query.authMode})
        if (optionAuth.mode === AUTH_MODE_AWS_IAM) {
            option.authMode = optionAuth.mode
            option.authToken = optionAuth.token
        }
        const response = await API.graphql(option)
        if (response && response.data && response.data[query.name]) {
            const responseDataQuery = response.data[query.name]
            const responseDataQueryItemFilter = responseDataQuery[MODEL_ITEM_ID] && !responseDataQuery[MODEL_ITEM__DELETED] ? responseDataQuery : null
            if (responseDataQueryItemFilter !== null) {
                const modelDict = await _getModelDict({responseDataQueryItem: responseDataQueryItemFilter, itemList: query.itemList})
                if (modelDict !== null) {
                    return {
                        _response: {
                            success: true
                        },
                        instance: modelDict
                    }
                } else {
                    return {
                        _response: {
                            error: true
                        },
                        instance: null
                    }
                }
            } else {
                return {
                    _response: {
                        error: true
                    },
                    instance: null
                }
            }
        } else {
            return {
                _response: {
                    error: true
                },
                instance: null
            }
        }
    } catch (error) {
        if (error && error.errors) {
            for (const errorForOf of error.errors) {
                if (errorForOf && errorForOf.errorType && errorForOf.errorType) {
                    return {
                        _response: {
                            error: true,
                            errorType: ERROR_UNAUTHORIZED
                        },
                        instance: null
                    }
                }
            }
        }
        return {
            _response: {
                error: true,
                errorType: ERROR_INTERNET_DISCONNECTED
            },
            instance: null
        }
    }
}

export const updateModel = async ({query}) => {
    try {
        if (query && query.name && query[MODEL_ITEM_ID]) {
            query.itemList = query.itemList ? [...query.itemList] : []
            query.input = query.input ? {...query.input} : {}
        } else {
            return {
                _response: {
                    error: true
                },
                instance: null
            }
        }
        const option = {
            query: AmplifyGraphqlMutation[query.name],
            variables: {
                input: {
                    [MODEL_ITEM_ID]: query[MODEL_ITEM_ID],
                    ...query.input
                }
            }
        }
        const optionAuth = await _getOptionAuthDict({authMode: query.authMode})
        if (optionAuth.mode === AUTH_MODE_AWS_IAM) {
            option.authMode = optionAuth.mode
            option.authToken = optionAuth.token
        }
        const response = await API.graphql(option)
        if (response && response.data && response.data[query.name]) {
            const responseDataQuery = response.data[query.name]
            const responseDataQueryItemFilter = responseDataQuery[MODEL_ITEM_ID] && !responseDataQuery[MODEL_ITEM__DELETED] ? responseDataQuery : null
            if (responseDataQueryItemFilter !== null) {
                const modelDict = await _getModelDict({responseDataQueryItem: responseDataQueryItemFilter, itemList: query.itemList})
                if (modelDict !== null) {
                    return {
                        _response: {
                            success: true
                        },
                        instance: modelDict
                    }
                } else {
                    return {
                        _response: {
                            error: true
                        },
                        instance: null
                    }
                }
            } else {
                return {
                    _response: {
                        error: true
                    },
                    instance: null
                }
            }
        } else {
            return {
                _response: {
                    error: true
                },
                instance: null
            }
        }
    } catch (error) {
        if (error && error.errors) {
            for (const errorForOf of error.errors) {
                if (errorForOf && errorForOf.errorType && errorForOf.errorType) {
                    return {
                        _response: {
                            error: true,
                            errorType: ERROR_UNAUTHORIZED
                        },
                        instance: null
                    }
                }
            }
        }
        return {
            _response: {
                error: true,
                errorType: ERROR_INTERNET_DISCONNECTED
            },
            instance: null
        }
    }
}

export const deleteModel = async ({query}) => {
    try {
        if (query && query.name && query[MODEL_ITEM_ID]) {
            query.itemList = query.itemList ? [...query.itemList] : []
            query.input = query.input ? {...query.input} : {}
        } else {
            return {
                _response: {
                    error: true
                },
                instance: null
            }
        }
        const option = {
            query: AmplifyGraphqlMutation[query.name],
            variables: {
                input: {
                    [MODEL_ITEM_ID]: query[MODEL_ITEM_ID],
                    ...query.input
                }
            }
        }
        const optionAuth = await _getOptionAuthDict({authMode: query.authMode})
        if (optionAuth.mode === AUTH_MODE_AWS_IAM) {
            option.authMode = optionAuth.mode
            option.authToken = optionAuth.token
        }
        const response = await API.graphql(option)
        if (response && response.data && response.data[query.name]) {
            const responseDataQuery = response.data[query.name]
            const responseDataQueryItemFilter = responseDataQuery[MODEL_ITEM_ID] && responseDataQuery[MODEL_ITEM__DELETED] ? responseDataQuery : null
            if (responseDataQueryItemFilter !== null) {
                const modelDict = await _getModelDict({responseDataQueryItem: responseDataQueryItemFilter, itemList: query.itemList})
                if (modelDict !== null) {
                    return {
                        _response: {
                            success: true
                        },
                        instance: modelDict
                    }
                } else {
                    return {
                        _response: {
                            error: true
                        },
                        instance: null
                    }
                }
            } else {
                return {
                    _response: {
                        error: true
                    },
                    instance: null
                }
            }
        } else {
            return {
                _response: {
                    error: true
                },
                instance: null
            }
        }
    } catch (error) {
        if (error && error.errors) {
            for (const errorForOf of error.errors) {
                if (errorForOf && errorForOf.errorType && errorForOf.errorType) {
                    return {
                        _response: {
                            error: true,
                            errorType: ERROR_UNAUTHORIZED
                        },
                        instance: null
                    }
                }
            }
        }
        return {
            _response: {
                error: true,
                errorType: ERROR_INTERNET_DISCONNECTED
            },
            instance: null
        }
    }
}
