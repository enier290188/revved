import {Box as MuiBox, Collapse as MuiCollapse, Icon as MuiIcon, IconButton as MuiIconButton, Link as MuiLink, MenuItem as MuiMenuItem, Table as MuiTable, TableBody as MuiTableBody, TableCell as MuiTableCell, TableContainer as MuiTableContainer, TableFooter as MuiTableFooter, TableHead as MuiTableHead, TablePagination as MuiTablePagination, TableRow as MuiTableRow, TextField as MuiTextField, Typography as MuiTypography} from "@mui/material"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import React from "react"
import {FormattedMessage} from "react-intl"
import {NavLink} from "react-router-dom"
import {Avatar as LayoutAvatar} from "../avatar/Avatar"
import {DateTime as LayoutDateTime} from "../date/DateTime"
import {LoadingSecurity as LayoutLoadingSecurity} from "../loading/LoadingSecurity"
import {LoadingText as LayoutLoadingText} from "../loading/LoadingText"

export const TABLE_COLUMN_TYPE_STRING = "STRING"
export const TABLE_COLUMN_TYPE_BOOLEAN = "BOOLEAN"
export const TABLE_COLUMN_TYPE_BOOLEAN_TRUE = "YES"
export const TABLE_COLUMN_TYPE_BOOLEAN_FALSE = "NO"
export const TABLE_COLUMN_TYPE_DATETIME = "DATETIME"
export const TABLE_COLUMN_TYPE_TIME_MONTH = "TIME_MONTH"
export const TABLE_COLUMN_TYPE_AVATAR = "AVATAR"
export const TABLE_COLUMN_TYPE_AVATAR_NAME = "NAME"
export const TABLE_COLUMN_TYPE_AVATAR_NAME_SHOW = "NAME_SHOW"
export const TABLE_COLUMN_TYPE_AVATAR_STORAGE = "STORAGE"
export const TABLE_SORT_ORDER_ASC = "ASC"
export const TABLE_SORT_ORDER_DES = "DES"
export const TABLE_PAGINATION_PAGE = 0
export const TABLE_PAGINATION_ROWLIST_PER_PAGE = 10
export const TABLE_PAGINATION_ROWLIST_PER_PAGE_OPTIONLIST = [1, 3, 5, 10, 15, 20, 25]

const STEP_RETURN_INITIAL = "step-return-initial"
const STEP_RETURN_SUCCESS = "step-return-success"
const STEP_RETURN_ERROR = "step-return-error"
const STEP_EFFECT_INITIAL = "step-effect-initial"
const STEP_EFFECT_REFRESH = "step-effect-refresh"
const STEP_EFFECT_REFRESH_SUCCESS = "step-effect-refresh-success"
const STEP_EFFECT_REFRESH_ERROR = "step-effect-refresh-error"
const STEP_EFFECT_SEARCH = "step-effect-search"
const STEP_EFFECT_SEARCH_SUCCESS = "step-effect-search-success"
const STEP_EFFECT_SEARCH_ERROR = "step-effect-search-error"
const STEP_EFFECT_SORT = "step-effect-sort"
const STEP_EFFECT_SORT_SUCCESS = "step-effect-sort-success"
const STEP_EFFECT_SORT_ERROR = "step-effect-sort-error"
const STEP_EFFECT_PAGINATION = "step-effect-pagination"
const STEP_EFFECT_PAGINATION_SUCCESS = "step-effect-pagination-success"
const STEP_EFFECT_PAGINATION_ERROR = "step-effect-pagination-error"
const STEP_EFFECT_DEFAULT = "step-effect-default"

const LayoutTableIconButton = React.memo(
    ({iconFont, disabled, onClick}) => {
        return (
            <MuiIconButton component={"span"} disabled={disabled || false} color={"primary"} size={"medium"} onClick={onClick}>
                <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>{iconFont}</MuiIcon>
            </MuiIconButton>
        )
    }
)

const LayoutTableNavLinkIconButton = React.memo(
    ({url, target = "_self", iconFont}) => {
        return (
            <MuiLink component={NavLink} to={url} target={target} sx={{textDecoration: "none"}}>
                <LayoutTableIconButton iconFont={iconFont} onClick={null}/>
            </MuiLink>
        )
    }
)

const LayoutTableNavLinkText = React.memo(
    ({url, text}) => {
        return (
            <MuiLink component={NavLink} to={url} sx={{color: theme => theme.palette.primary.main, textDecoration: "none"}}>
                <MuiTypography component={"p"} variant={"body2"} noWrap={true}>{text}</MuiTypography>
            </MuiLink>
        )
    }
)

const LayoutTablePaginationAction = React.memo(
    ({count, page, rowsPerPage, onPageChange}) => {
        const SxTablePaginationAction = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center"
        }

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0)
        }

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1)
        }

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1)
        }

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
        }

        return (
            <MuiBox component={"div"} sx={SxTablePaginationAction}>
                <MuiIconButton
                    component={"span"}
                    disabled={page === 0}
                    color={"primary"}
                    size={"medium"}
                    onClick={handleFirstPageButtonClick}
                >
                    <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>{"first_page"}</MuiIcon>
                </MuiIconButton>
                <MuiIconButton
                    component={"span"}
                    disabled={page === 0}
                    color={"primary"}
                    size={"medium"}
                    onClick={handleBackButtonClick}
                >
                    <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>{"keyboard_arrow_left"}</MuiIcon>
                </MuiIconButton>
                <MuiIconButton
                    component={"span"}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    color={"primary"}
                    size={"medium"}
                    onClick={handleNextButtonClick}
                >
                    <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>{"keyboard_arrow_right"}</MuiIcon>
                </MuiIconButton>
                <MuiIconButton
                    component={"span"}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    color={"primary"}
                    size={"medium"}
                    onClick={handleLastPageButtonClick}
                >
                    <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>{"last_page"}</MuiIcon>
                </MuiIconButton>
            </MuiBox>
        )
    }
)

const LayoutTablePagination = React.memo(
    ({crud, handleChangedPaginationPage, handleChangedPaginationRowListPerPage}) => {
        const SxMuiTablePagination = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            borderBottom: 0,
            "& .MuiTablePagination-toolbar": {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignContent: "center",
                justifyContent: "flex-start",
                alignItems: "center",
                minHeight: theme => theme.spacing(0),
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0),
                "& .MuiTablePagination-spacer": {
                    display: {xs: "none", md: "block"}
                }
            },
            "& .MuiTablePagination-selectLabel": {
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0)
            },
            "& .MuiInputBase-root": {
                margin: theme => theme.spacing(0, 4, 0, 0),
                padding: theme => theme.spacing(0)
            },
            "& .MuiTablePagination-displayedRows": {
                margin: theme => theme.spacing(0, 5, 0, 0),
                padding: theme => theme.spacing(0)
            }
        }

        const pagination = {...crud.pagination}
        const newPaginationPage = Math.max(TABLE_PAGINATION_PAGE, Math.ceil(crud.rowSearchList.length / pagination.rowListPerPage) - 1)
        pagination["page"] = pagination.page <= newPaginationPage ? pagination.page : newPaginationPage

        return (
            <MuiTablePagination
                colSpan={crud.columnList.length + 1}
                count={crud.rowSearchList.length}
                page={pagination.page}
                rowsPerPage={pagination.rowListPerPage}
                rowsPerPageOptions={pagination.rowListPerPageOptionList}
                onPageChange={handleChangedPaginationPage}
                onRowsPerPageChange={handleChangedPaginationRowListPerPage}
                ActionsComponent={LayoutTablePaginationAction}
                labelRowsPerPage={<FormattedMessage id={"app.page.secure.layout.main.table.label-rows-per-page"}/>}
                labelDisplayedRows={({from, to, count}) => (<FormattedMessage id={"app.page.secure.layout.main.table.label-from-to-of-count"} values={{from: from, to: to, count: count}}/>)}
                sx={SxMuiTablePagination}
            />
        )
    }
)

const LayoutTablePaginationTop = React.memo(
    ({crud, handleChangedPaginationPage, handleChangedPaginationRowListPerPage}) => {
        return crud.pagination && crud.columnList.length > 0 && crud.rowSearchList.length > 0
            ? (
                <MuiTableHead>
                    <MuiTableRow>
                        <LayoutTablePagination crud={crud} handleChangedPaginationPage={handleChangedPaginationPage} handleChangedPaginationRowListPerPage={handleChangedPaginationRowListPerPage}/>
                    </MuiTableRow>
                </MuiTableHead>
            )
            : <React.Fragment/>
    }
)

const LayoutTablePaginationBottom = React.memo(
    ({crud, handleChangedPaginationPage, handleChangedPaginationRowListPerPage}) => {
        return crud.pagination && crud.columnList.length > 0 && crud.rowSearchList.length > 0
            ? (
                <MuiTableFooter>
                    <MuiTableRow>
                        <LayoutTablePagination crud={crud} handleChangedPaginationPage={handleChangedPaginationPage} handleChangedPaginationRowListPerPage={handleChangedPaginationRowListPerPage}/>
                    </MuiTableRow>
                </MuiTableFooter>
            )
            : <React.Fragment/>
    }
)

const LayoutTableSearchSelectColumn = React.memo(
    ({disabled, field, handleChanged}) => {
        const SxTableSearchSelect = {
            margin: theme => theme.spacing(2, 0),
            "& .MuiOutlinedInput-root": {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignContent: "flex-start",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0),
                "& .MuiOutlinedInput-input": {
                    padding: theme => theme.spacing(2, 2, 2, 0)
                }
            },
            "& .MuiFormHelperText-root": {
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0)
            }
        }
        const SxTableSearchSelectInputPropsStartAdornment = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2)
        }

        return (
            <MuiTextField
                select={true}
                disabled={false}
                required={false}
                type={"text"}
                variant={"outlined"}
                margin={"none"}
                size={"small"}
                fullWidth={true}
                autoComplete={""}
                autoFocus={false}
                InputProps={{
                    readOnly: false,
                    startAdornment: (
                        <MuiBox component={"div"} sx={SxTableSearchSelectInputPropsStartAdornment}>
                            <MuiIcon component={"span"} color={"primary"} fontSize={"small"}>{"filter_list"}</MuiIcon>
                        </MuiBox>
                    )
                }}
                // label={""}
                value={field.value}
                onChange={(event) => disabled ? null : handleChanged(event)}
                error={false}
                helperText={null}
                sx={SxTableSearchSelect}
            >
                {
                    field.optionList.map(
                        (optionMap, index) => {
                            return (
                                <MuiMenuItem key={index} value={optionMap.id}>
                                    {optionMap.label}
                                </MuiMenuItem>
                            )
                        }
                    )
                }
            </MuiTextField>
        )
    }
)

const LayoutTableSearchFindContent = React.memo(
    ({disabled, field, handleChanged}) => {
        const SxTableSearchTextField = {
            margin: theme => theme.spacing(2, 0),
            "& .MuiOutlinedInput-root": {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignContent: "flex-start",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0),
                "& .MuiOutlinedInput-input": {
                    padding: theme => theme.spacing(2, 2, 2, 0)
                }
            },
            "& .MuiFormHelperText-root": {
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0)
            }
        }
        const SxTableSearchTextFieldInputPropsStartAdornment = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2)
        }

        return (
            <MuiTextField
                disabled={false}
                required={false}
                type={"text"}
                variant={"outlined"}
                margin={"none"}
                size={"small"}
                fullWidth={true}
                autoComplete={""}
                autoFocus={false}
                InputProps={{
                    readOnly: false,
                    startAdornment: (
                        <MuiBox component={"div"} sx={SxTableSearchTextFieldInputPropsStartAdornment}>
                            <MuiIcon component={"span"} color={"primary"} fontSize={"small"}>{"search"}</MuiIcon>
                        </MuiBox>
                    )
                }}
                // label={""}
                value={field.value}
                onChange={(event) => disabled ? null : handleChanged(event)}
                error={false}
                helperText={null}
                sx={SxTableSearchTextField}
            />
        )
    }
)

const LayoutTableSearch = React.memo(
    ({crud, disabled, handleChangedSearchSelectColumn, handleChangedSearchFindContent}) => {
        const SxTableRowCellSearchSelect = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            borderBottom: 0
        }

        return crud.search && crud.columnList.length > 0
            ? (
                <MuiTableHead>
                    <MuiTableRow>
                        <MuiTableCell scope={"column"} colSpan={1 + crud.columnList.length} sx={SxTableRowCellSearchSelect}>
                            <MuiBox component={"div"} sx={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "center", justifyContent: "flex-start", alignItems: "center", width: "100%", maxWidth: "600px" || "100%"}}>
                                <LayoutTableSearchSelectColumn
                                    disabled={disabled}
                                    field={{...crud.search.selectColumn}}
                                    handleChanged={handleChangedSearchSelectColumn}
                                />
                                <MuiBox component={"div"} px={1} py={0}/>
                                <LayoutTableSearchFindContent
                                    disabled={disabled}
                                    field={{...crud.search.findContent}}
                                    handleChanged={handleChangedSearchFindContent}
                                />
                            </MuiBox>
                        </MuiTableCell>
                    </MuiTableRow>
                </MuiTableHead>
            )
            : <React.Fragment/>
    }
)

const LayoutTableHead = React.memo(
    ({crud, handleChangedSort}) => {
        const SxTableRowCellAction = {
            width: () => {
                let rowCellActionWidth = 38
                const actionHeadListLength = crud.action.headList.length
                const actionBodyListLength = crud.action.bodyList.length
                const actionListLengthMax = actionHeadListLength >= actionBodyListLength ? actionHeadListLength : actionBodyListLength
                const actionShowColumnExtraListLength = crud.columnExtraList.length > 0 ? 1 : 0
                rowCellActionWidth = actionListLengthMax + actionShowColumnExtraListLength > 1 ? (actionListLengthMax + actionShowColumnExtraListLength) * rowCellActionWidth : rowCellActionWidth
                return `${rowCellActionWidth + 8}px !important`
            },
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            borderTop: theme => (crud.action.headList.length > 0) || (crud.columnList.length > 0 && crud.rowSearchList.length > 0) ? `1px solid ${theme.palette.divider}` : 0,
            borderBottom: theme => crud.columnList.length > 0 && crud.rowSearchList.length > 0 ? `1px solid ${theme.palette.divider}` : 0
        }
        const SxTableRowCellData = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0, 2),
            borderTop: theme => `1px solid ${theme.palette.divider}`
        }

        return (
            <MuiTableHead>
                <MuiTableRow>
                    <MuiTableCell scope={"column"} sx={SxTableRowCellAction}>
                        <MuiBox component={"div"} sx={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "flex-start", justifyContent: "flex-start", alignItems: "stretch"}}>
                            {
                                crud.action.headList.map(
                                    (action, index) => {
                                        return (
                                            <LayoutTableNavLinkIconButton key={index} url={`${crud.url}${action.slug}`} iconFont={action.iconFont}/>
                                        )
                                    }
                                )
                            }
                        </MuiBox>
                    </MuiTableCell>
                    {
                        crud.columnList.length > 0 && crud.rowSearchList.length > 0
                            ? crud.columnList.map(
                                (column, index) => {
                                    return (
                                        <MuiTableCell key={index} scope={"column"} sx={{...SxTableRowCellData, width: `${column.width} !important`, minWidth: `${column.width} !important`, maxWidth: `${column.width} !important`}}>
                                            <MuiTypography component={"p"} variant={"body1"} noWrap={true}>
                                                <MuiBox component={"span"} sx={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "center", justifyContent: "flex-start", alignItems: "center"}}>
                                                    <MuiBox component={"span"}>
                                                        <strong>{column.label}</strong>
                                                    </MuiBox>
                                                    <MuiBox component={"span"}>
                                                        {
                                                            column.sort && column.sort.order && (column.sort.order === TABLE_SORT_ORDER_ASC || column.sort.order === TABLE_SORT_ORDER_DES)
                                                                ? (
                                                                    <MuiBox component={"span"} sx={{margin: theme => theme.spacing(0, 0, 0, 4)}}>
                                                                        <LayoutTableIconButton
                                                                            disabled={column.sort.active && column.sort.active === true && column.sort.order === TABLE_SORT_ORDER_ASC}
                                                                            iconFont={"arrow_circle_down"}
                                                                            onClick={(event) => handleChangedSort(event, column, TABLE_SORT_ORDER_ASC)}
                                                                        />
                                                                        <LayoutTableIconButton
                                                                            disabled={column.sort.active && column.sort.active === true && column.sort.order === TABLE_SORT_ORDER_DES}
                                                                            iconFont={"arrow_circle_up"}
                                                                            onClick={(event) => handleChangedSort(event, column, TABLE_SORT_ORDER_DES)}
                                                                        />
                                                                    </MuiBox>
                                                                )
                                                                : (
                                                                    <LayoutTableIconButton disabled={true} iconFont={null} onClick={null}/>
                                                                )
                                                        }
                                                    </MuiBox>
                                                </MuiBox>
                                            </MuiTypography>
                                        </MuiTableCell>
                                    )
                                }
                            )
                            : null
                    }
                </MuiTableRow>
            </MuiTableHead>
        )
    }
)

const LayoutTableBodyRow = React.memo(
    ({crud, row}) => {
        const [open, setOpen] = React.useState(false)
        const SxTableRow01 = {
            "& > td": {
                borderBottom: 0
            }
        }
        const SxTableRow02 = {}
        const SxTableRowCellAction = {
            width: () => {
                let rowCellActionWidth = 38
                const actionHeadListLength = crud.action.headList.length
                const actionBodyListLength = crud.action.bodyList.length
                const actionListLengthMax = actionHeadListLength >= actionBodyListLength ? actionHeadListLength : actionBodyListLength
                const actionShowColumnExtraListLength = crud.columnExtraList.length > 0 ? 1 : 0
                rowCellActionWidth = actionListLengthMax + actionShowColumnExtraListLength > 1 ? (actionListLengthMax + actionShowColumnExtraListLength) * rowCellActionWidth : rowCellActionWidth
                return `${rowCellActionWidth + 8}px !important`
            },
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0)
        }
        const SxTableRowCellData = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2)
        }
        const SxTableRowCellCollapse = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0, 0, 0, 2),
            "& .MuiCollapse-wrapperInner": {
                width: "auto"
            }
        }
        const SxTableRowCellCollapseContainer = {
            margin: theme => theme.spacing(1, 0, 2, 0),
            padding: theme => theme.spacing(0),
            borderRight: theme => `1px solid ${theme.palette.divider}`,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            borderLeft: theme => `1px solid ${theme.palette.divider}`
        }
        const SxTableRowCellCollapseContainerContent = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "stretch",
            borderTop: theme => `1px solid ${theme.palette.divider}`
        }
        const SxTableRowCellCollapseContainerContentKey = {
            minWidth: "150px",
            maxWidth: "150px",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(1),
            borderRight: theme => `1px solid ${theme.palette.divider}`
        }
        const SxTableRowCellCollapseContainerContentValue = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(1)
        }

        const getLayoutTableRowCellData = (column) => {
            if (column.action && column.action.slug) {
                return (
                    <LayoutTableNavLinkText
                        url={`${crud.url}${row.id}/${column.action.slug}`}
                        text={
                            row.highlight && row.highlight.id === column.id
                                ? row.highlight.partList.map((part, index) => (<span key={index} style={{fontWeight: part.highlight ? 900 : "inherit"}}>{part.text}</span>))
                                : row[column.id]
                        }
                    />
                )
            }
            switch (column.type) {
                case TABLE_COLUMN_TYPE_STRING:
                    return (
                        <MuiTypography component={"p"} variant={"body2"} noWrap={true} sx={{whiteSpace: "pre-line", wordBreak: "break-word"}}>
                            {
                                row.highlight && row.highlight.id === column.id
                                    ? row.highlight.partList.map((part, index) => (<span key={index} style={{fontWeight: part.highlight ? 900 : "inherit"}}>{part.text}</span>))
                                    : row[column.id] === null ? "" : String(row[column.id])
                            }
                        </MuiTypography>
                    )
                case TABLE_COLUMN_TYPE_BOOLEAN:
                    return (
                        <MuiBox component={"div"} sx={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "center", justifyContent: "flex-start", alignItems: "center"}}>
                            <MuiTypography component={"p"} variant={"body2"} noWrap={true} sx={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "center", justifyContent: "flex-start", alignItems: "center", marginRight: theme => theme.spacing(2)}}>
                                <MuiIcon component={"span"} color={"inherit"} fontSize={"medium"}>
                                    {row[column.id] ? "check_circle_outline" : "circle"}
                                </MuiIcon>
                            </MuiTypography>
                            <MuiTypography component={"p"} variant={"body2"} noWrap={true}>
                                {
                                    row.highlight && row.highlight.id === column.id
                                        ? row.highlight.partList.map((part, index) => (<span key={index} style={{fontWeight: part.highlight ? 900 : "inherit"}}>{String(part.text).toUpperCase()}</span>))
                                        : row[column.id] === null ? "" : row[column.id] ? TABLE_COLUMN_TYPE_BOOLEAN_TRUE : TABLE_COLUMN_TYPE_BOOLEAN_FALSE
                                }
                            </MuiTypography>
                        </MuiBox>
                    )
                case TABLE_COLUMN_TYPE_DATETIME:
                    return (
                        <LayoutDateTime component={"p"} variant={"body2"} noWrap={true} dateTime={row[column.id]}/>
                    )
                case TABLE_COLUMN_TYPE_TIME_MONTH:
                    return (
                        <MuiTypography component={"p"} variant={"body2"} noWrap={true}>
                            {
                                row[column.id] > 1
                                    ? <FormattedMessage id={"app.page.secure.layout.main.table.type.time-month.plural"} values={{value: row[column.id]}}/>
                                    : <FormattedMessage id={"app.page.secure.layout.main.table.type.time-month.single"} values={{value: row[column.id]}}/>
                            }
                        </MuiTypography>
                    )
                case TABLE_COLUMN_TYPE_AVATAR:
                    return (
                        <MuiBox
                            component={"div"}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                alignContent: "center",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}
                        >
                            <LayoutAvatar
                                component={"div"}
                                variant={"round"}
                                src={row[column.id][TABLE_COLUMN_TYPE_AVATAR_STORAGE] ? row[column.id][TABLE_COLUMN_TYPE_AVATAR_STORAGE] : null}
                                text={row[column.id][TABLE_COLUMN_TYPE_AVATAR_NAME] ? row[column.id][TABLE_COLUMN_TYPE_AVATAR_NAME] : ""}
                                sx={{
                                    width: theme => theme.spacing(8),
                                    height: theme => theme.spacing(8)
                                }}
                            />
                            {
                                row[column.id] && row[column.id][TABLE_COLUMN_TYPE_AVATAR_NAME_SHOW]
                                    ? (
                                        <MuiTypography component={"p"} variant={"body2"} noWrap={true} sx={{margin: theme => theme.spacing(0, 0, 0, 2)}}>
                                            {
                                                row.highlight && row.highlight.id === column.id
                                                    ? row.highlight.partList.map((part, index) => (<span key={index} style={{fontWeight: part.highlight ? 900 : "inherit"}}>{part.text}</span>))
                                                    : row[column.id] === null
                                                        ? ""
                                                        : row[column.id][TABLE_COLUMN_TYPE_AVATAR_NAME]
                                                            ? String(row[column.id][TABLE_COLUMN_TYPE_AVATAR_NAME])
                                                            : ""
                                            }
                                        </MuiTypography>
                                    )
                                    : null
                            }
                        </MuiBox>
                    )
                default:
                    return null
            }
        }

        return (
            <React.Fragment>
                <MuiTableRow sx={SxTableRow01}>
                    <MuiTableCell scope={"column"} sx={SxTableRowCellAction}>
                        <MuiBox component={"div"} sx={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "flex-start", justifyContent: "flex-start", alignItems: "stretch"}}>
                            {
                                crud.action.bodyList.map(
                                    (action, index) => {
                                        if (action.url) {
                                            return <LayoutTableNavLinkIconButton key={index} url={`${action.url}${row.id}/`} target={"_blank"} iconFont={action.iconFont}/>
                                        } else {
                                            if (action.slug) {
                                                return <LayoutTableNavLinkIconButton key={index} url={`${crud.url}${row.id}/${action.slug}`} iconFont={action.iconFont}/>
                                            } else {
                                                return null
                                            }
                                        }
                                    }
                                )
                            }
                            {
                                crud.columnExtraList.length > 0
                                    ? (
                                        <LayoutTableIconButton iconFont={open ? "keyboard_arrow_down" : "keyboard_arrow_right"} onClick={async () => await setOpen(!open)}/>
                                    )
                                    : null
                            }
                        </MuiBox>
                    </MuiTableCell>
                    {
                        crud.columnList.map(
                            (column, index) => {
                                return (
                                    <MuiTableCell key={index} scope={"column"} sx={SxTableRowCellData}>
                                        <MuiBox component={"div"} sx={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignContent: "flex-start", justifyContent: "flex-start", alignItems: "stretch"}}>
                                            {getLayoutTableRowCellData(column)}
                                        </MuiBox>
                                    </MuiTableCell>
                                )
                            }
                        )
                    }
                </MuiTableRow>
                <MuiTableRow sx={SxTableRow02}>
                    <MuiTableCell scope={"column"} sx={SxTableRowCellAction}/>
                    {
                        crud.columnList.length > 0
                            ? (
                                <MuiTableCell scope={"column"} sx={SxTableRowCellCollapse} colSpan={crud.columnList.length}>
                                    {
                                        crud.columnExtraList.length > 0
                                            ? (
                                                <MuiCollapse in={open} timeout={"auto"} unmountOnExit={true}>
                                                    <MuiBox component={"div"} sx={SxTableRowCellCollapseContainer}>
                                                        {
                                                            crud.columnExtraList.map(
                                                                (column, index) => {
                                                                    return (
                                                                        <MuiBox key={index} component={"div"} sx={SxTableRowCellCollapseContainerContent}>
                                                                            <MuiBox component={"div"} sx={SxTableRowCellCollapseContainerContentKey}>
                                                                                <MuiTypography component={"p"} variant={"body2"} noWrap={true}><strong>{column.label}</strong></MuiTypography>
                                                                            </MuiBox>
                                                                            <MuiBox component={"div"} sx={SxTableRowCellCollapseContainerContentValue}>
                                                                                {getLayoutTableRowCellData(column)}
                                                                            </MuiBox>
                                                                        </MuiBox>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    </MuiBox>
                                                </MuiCollapse>
                                            )
                                            : null
                                    }
                                </MuiTableCell>
                            )
                            : null
                    }
                </MuiTableRow>
            </React.Fragment>
        )
    }
)

const LayoutTableBody = React.memo(
    ({crud}) => {
        return crud.columnList.length > 0 && crud.rowSearchList.length > 0 && crud.rowPaginationPageList.length > 0
            ? (
                <MuiTableBody>
                    {
                        crud.rowPaginationPageList.map(
                            (row, index) => {
                                return (
                                    <LayoutTableBodyRow key={index} crud={crud} row={row}/>
                                )
                            }
                        )
                    }
                </MuiTableBody>
            )
            : <React.Fragment/>
    }
)

export const Table = React.memo(
    ({crud}) => {
        const [
            {
                stepReturn,
                stepEffect,
                crudTable
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL,
                crudTable: null
            }
        )
        const isComponentMountedRef = React.useRef(true)

        const searchData = React.useCallback(
            async () => {
                try {
                    const search = crudTable.search ? {...crudTable.search} : null
                    if (search === null) {
                        return {
                            rowSearchList: [...crudTable.rowAllList]
                        }
                    }
                    const searchSelectColumnValue = String(search.selectColumn.value) ? String(search.selectColumn.value) : ""
                    const searchFindContentValue = String(search.findContent.value) ? String(search.findContent.value) : ""
                    if (searchFindContentValue && searchFindContentValue.length > 0) {
                        const rowSearchList = [...crudTable.rowAllList]
                            .map((rowSearchMap) => {
                                const searchSelectColumnOptionTypeList = search.selectColumn.optionList.filter(optionFilter => optionFilter.id === searchSelectColumnValue).map(optionMap => optionMap.type)
                                const searchSelectColumnOptionType = searchSelectColumnOptionTypeList.length > 0 ? searchSelectColumnOptionTypeList[0] : TABLE_COLUMN_TYPE_STRING
                                let mainText
                                switch (searchSelectColumnOptionType) {
                                    case TABLE_COLUMN_TYPE_STRING:
                                        mainText = String(rowSearchMap[searchSelectColumnValue])
                                        break
                                    case TABLE_COLUMN_TYPE_BOOLEAN:
                                        mainText = rowSearchMap[searchSelectColumnValue] ? TABLE_COLUMN_TYPE_BOOLEAN_TRUE : TABLE_COLUMN_TYPE_BOOLEAN_FALSE
                                        break
                                    case TABLE_COLUMN_TYPE_DATETIME:
                                        mainText = String(rowSearchMap[searchSelectColumnValue])
                                        break
                                    case TABLE_COLUMN_TYPE_TIME_MONTH:
                                        mainText = String(rowSearchMap[searchSelectColumnValue])
                                        break
                                    case TABLE_COLUMN_TYPE_AVATAR:
                                        mainText = String(rowSearchMap[searchSelectColumnValue][TABLE_COLUMN_TYPE_AVATAR_NAME] ? rowSearchMap[searchSelectColumnValue][TABLE_COLUMN_TYPE_AVATAR_NAME] : "")
                                        break
                                    default:
                                        mainText = ""
                                }
                                const textMatchedList = match(mainText, searchFindContentValue, {findAllOccurrences: true, insideWords: true})
                                if (textMatchedList.length > 0) {
                                    const textMatchedPartList = parse(mainText, textMatchedList)
                                    return {
                                        ...rowSearchMap,
                                        highlight: {
                                            id: searchSelectColumnValue,
                                            partList: textMatchedPartList
                                        }
                                    }
                                } else {
                                    return {
                                        ...rowSearchMap,
                                        highlight: null
                                    }
                                }
                            })
                            .filter((rowSearchFilter) => {
                                return rowSearchFilter.highlight !== null
                            })
                        return {
                            rowSearchList: rowSearchList
                        }
                    } else {
                        const rowSearchList = [...crudTable.rowAllList]
                            .map((rowSearchMap) => {
                                return {
                                    ...rowSearchMap,
                                    highlight: null
                                }
                            })
                        return {
                            rowSearchList: rowSearchList
                        }
                    }
                } catch (error) {
                    return null
                }
            },
            [
                crudTable
            ]
        )

        const sortData = React.useCallback(
            async () => {
                try {
                    const rowSearchList = [...crudTable.rowSearchList]
                    const columnActiveList = [...crudTable.columnList].filter((columnFilter) => columnFilter.sort && columnFilter.sort.active && columnFilter.sort.active === true)
                    const columnActive = columnActiveList.length > 0 ? columnActiveList[0] : null
                    if (columnActive) {
                        switch (columnActive.type) {
                            case TABLE_COLUMN_TYPE_STRING:
                                const typeStringSorter = (order) => {
                                    return (a, b) => {
                                        const aColumnActiveId = a[columnActive.id] ? a[columnActive.id] : null
                                        const bColumnActiveId = b[columnActive.id] ? b[columnActive.id] : null
                                        // equal items sort equally
                                        // to handle the case where the value is the same, we order by a secondary property, the `id` property
                                        if (aColumnActiveId === bColumnActiveId) {
                                            return a.id > b.id ? 1 : a.id === b.id ? 0 : -1
                                        }
                                        // nulls sort after anything else
                                        else if (aColumnActiveId === null) {
                                            return 1
                                        } else if (bColumnActiveId === null) {
                                            return -1
                                        }
                                        // otherwise, if we're ascending, the lowest sorts first
                                        else if (order) {
                                            return aColumnActiveId < bColumnActiveId ? -1 : 1
                                        }
                                        // if descending, the highest sorts first
                                        else {
                                            return aColumnActiveId < bColumnActiveId ? 1 : -1
                                        }
                                    }
                                }
                                rowSearchList.sort(typeStringSorter(columnActive.sort.order === TABLE_SORT_ORDER_ASC))
                                break
                            case TABLE_COLUMN_TYPE_BOOLEAN:
                                const typeBooleanSorter = (order) => {
                                    return (a, b) => {
                                        const aColumnActiveId = a[columnActive.id] !== null ? a[columnActive.id] : null
                                        const bColumnActiveId = b[columnActive.id] !== null ? b[columnActive.id] : null
                                        // equal items sort equally
                                        // to handle the case where the value is the same, we order by a secondary property, the `id` property
                                        if (aColumnActiveId === bColumnActiveId) {
                                            return a.id > b.id ? 1 : a.id === b.id ? 0 : -1
                                        }
                                        // nulls sort after anything else
                                        else if (aColumnActiveId === null) {
                                            return 1
                                        } else if (bColumnActiveId === null) {
                                            return -1
                                        }
                                        // otherwise, if we're ascending, the true values sorts first
                                        else if (order) {
                                            return aColumnActiveId < bColumnActiveId ? 1 : -1
                                        }
                                        // if descending, the false values sorts first
                                        else {
                                            return aColumnActiveId < bColumnActiveId ? -1 : 1
                                        }
                                    }
                                }
                                rowSearchList.sort(typeBooleanSorter(columnActive.sort.order === TABLE_SORT_ORDER_ASC))
                                break
                            case TABLE_COLUMN_TYPE_DATETIME:
                                break
                            case TABLE_COLUMN_TYPE_TIME_MONTH:
                                break
                            case TABLE_COLUMN_TYPE_AVATAR:
                                const typeAvatarSorter = (order) => {
                                    return (a, b) => {
                                        const aColumnActiveId = a[columnActive.id] && a[columnActive.id][TABLE_COLUMN_TYPE_AVATAR_NAME] ? a[columnActive.id][TABLE_COLUMN_TYPE_AVATAR_NAME] : null
                                        const bColumnActiveId = b[columnActive.id] && b[columnActive.id][TABLE_COLUMN_TYPE_AVATAR_NAME] ? b[columnActive.id][TABLE_COLUMN_TYPE_AVATAR_NAME] : null
                                        // equal items sort equally
                                        // to handle the case where the value is the same, we order by a secondary property, the `id` property
                                        if (aColumnActiveId === bColumnActiveId) {
                                            return a.id > b.id ? 1 : a.id === b.id ? 0 : -1
                                        }
                                        // nulls sort after anything else
                                        else if (aColumnActiveId === null) {
                                            return 1
                                        } else if (bColumnActiveId === null) {
                                            return -1
                                        }
                                        // otherwise, if we're ascending, the lowest sorts first
                                        else if (order) {
                                            return aColumnActiveId < bColumnActiveId ? -1 : 1
                                        }
                                        // if descending, the highest sorts first
                                        else {
                                            return aColumnActiveId < bColumnActiveId ? 1 : -1
                                        }
                                    }
                                }
                                rowSearchList.sort(typeAvatarSorter(columnActive.sort.order === TABLE_SORT_ORDER_ASC))
                                break
                            default:
                                break
                        }
                        return {
                            rowSearchList: rowSearchList
                        }
                    } else {
                        return {
                            rowSearchList: rowSearchList
                        }
                    }
                } catch (error) {
                    return null
                }
            },
            [
                crudTable
            ]
        )

        const handleChangedSearchSelectColumn = React.useCallback(
            async (event) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => {
                                return {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_SEARCH,
                                    crudTable: {
                                        ...oldState.crudTable,
                                        search: {
                                            ...oldState.crudTable.search,
                                            selectColumn: {
                                                ...oldState.crudTable.search.selectColumn,
                                                value: event && event.target && event.target.value
                                                    ? event.target.value
                                                    : oldState.crudTable.search.selectColumn.value
                                            }
                                        }
                                    }
                                }
                            }
                        )
                    }
                } catch (error) {
                }
            },
            []
        )

        const handleChangedSearchFindContent = React.useCallback(
            async (event) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => {
                                return {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_SEARCH,
                                    crudTable: {
                                        ...oldState.crudTable,
                                        search: {
                                            ...oldState.crudTable.search,
                                            findContent: {
                                                ...oldState.crudTable.search.findContent,
                                                value: event && event.target && event.target.value
                                                    ? event.target.value
                                                    : ""
                                            }
                                        }
                                    }
                                }
                            }
                        )
                    }
                } catch (error) {
                }
            },
            []
        )

        const handleChangedSort = React.useCallback(
            async (event, column, newOrder) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => {
                                const columnList = [...oldState.crudTable.columnList].map((columnMap) => {
                                    columnMap["sort"] = {...columnMap.sort, active: false}
                                    if (column.id === columnMap.id) {
                                        columnMap["sort"]["order"] = newOrder
                                        columnMap["sort"]["active"] = true
                                    }
                                    return columnMap
                                })

                                return {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_SORT,
                                    crudTable: {
                                        ...oldState.crudTable,
                                        columnList: [...columnList]
                                    }
                                }
                            }
                        )
                    }
                } catch (error) {
                }
            },
            []
        )

        const handleChangedPaginationPage = React.useCallback(
            async (event, newPage) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => {
                                const pagination = {...oldState.crudTable.pagination}
                                pagination["page"] = newPage

                                return {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_PAGINATION,
                                    crudTable: {
                                        ...oldState.crudTable,
                                        pagination: {...pagination}
                                    }
                                }
                            }
                        )
                    }
                } catch (error) {
                }
            },
            []
        )

        const handleChangedPaginationRowListPerPage = React.useCallback(
            async (event) => {
                try {
                    if (isComponentMountedRef.current === true) {
                        setState(
                            (oldState) => {
                                const pagination = {...oldState.crudTable.pagination}
                                const newPaginationRowListPerPage = event && event.target && event.target.value ? parseInt(event.target.value, 10) : TABLE_PAGINATION_ROWLIST_PER_PAGE
                                const newPaginationPage = Math.max(TABLE_PAGINATION_PAGE, Math.ceil(oldState.crudTable.rowSearchList.length / newPaginationRowListPerPage) - 1)
                                pagination["page"] = pagination.page <= newPaginationPage ? pagination.page : newPaginationPage
                                pagination["rowListPerPage"] = newPaginationRowListPerPage

                                return {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_PAGINATION,
                                    crudTable: {
                                        ...oldState.crudTable,
                                        pagination: {...pagination}
                                    }
                                }
                            }
                        )
                    }
                } catch (error) {
                }
            },
            []
        )

        const handleStepEffectRefresh = React.useCallback(
            async () => {
                if (stepEffect === STEP_EFFECT_REFRESH) {
                    try {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => {
                                    if (oldState.crudTable) {
                                        const rowAllList = crud && crud.rowList ? crud.rowList : []

                                        return {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_REFRESH_SUCCESS,
                                            crudTable: {
                                                ...oldState.crudTable,
                                                rowAllList: rowAllList
                                            }
                                        }
                                    } else {
                                        const columnList = (crud && crud.columnList ? crud.columnList : []).map((columnMap) => {
                                            const column = {
                                                id: columnMap.id,
                                                label: columnMap.label,
                                                type: TABLE_COLUMN_TYPE_STRING,
                                                search: null,
                                                sort: null,
                                                action: null,
                                                width: "inherit"
                                            }
                                            if (columnMap.type) {
                                                column["type"] = columnMap.type === TABLE_COLUMN_TYPE_STRING || columnMap.type === TABLE_COLUMN_TYPE_BOOLEAN || columnMap.type === TABLE_COLUMN_TYPE_DATETIME || columnMap.type === TABLE_COLUMN_TYPE_TIME_MONTH || columnMap.type === TABLE_COLUMN_TYPE_AVATAR
                                                    ? columnMap.type
                                                    : column.type
                                            }
                                            if (columnMap.search) {
                                                column["search"] = true
                                            }
                                            if (columnMap.sort) {
                                                column["sort"] = {}
                                                column.sort["order"] = columnMap.sort.order ? columnMap.sort.order : TABLE_SORT_ORDER_ASC
                                                column.sort["active"] = columnMap.sort.active ? columnMap.sort.active : false
                                            }
                                            if (columnMap.action) {
                                                column["action"] = {}
                                                column.action["url"] = columnMap.action.url ? columnMap.action.url : null
                                                column.action["slug"] = columnMap.action.slug ? columnMap.action.slug : null
                                                column.action["iconFont"] = columnMap.action.iconFont ? columnMap.action.iconFont : null
                                            }
                                            if (columnMap.width) {
                                                column["width"] = columnMap.width
                                            }
                                            return column
                                        })
                                        const columnExtraList = (crud && crud.columnExtraList ? crud.columnExtraList : []).map((columnMap) => {
                                            const column = {
                                                id: columnMap.id,
                                                label: columnMap.label,
                                                type: TABLE_COLUMN_TYPE_STRING,
                                                search: null,
                                                action: null
                                            }
                                            if (columnMap.type) {
                                                column["type"] = columnMap.type === TABLE_COLUMN_TYPE_STRING || columnMap.type === TABLE_COLUMN_TYPE_BOOLEAN || columnMap.type === TABLE_COLUMN_TYPE_DATETIME || columnMap.type === TABLE_COLUMN_TYPE_TIME_MONTH || columnMap.type === TABLE_COLUMN_TYPE_AVATAR
                                                    ? columnMap.type
                                                    : column.type
                                            }
                                            if (columnMap.search) {
                                                column["search"] = true
                                            }
                                            if (columnMap.action) {
                                                column["action"] = {}
                                                column.action["url"] = columnMap.action.url ? columnMap.action.url : null
                                                column.action["slug"] = columnMap.action.slug ? columnMap.action.slug : null
                                                column.action["iconFont"] = columnMap.action.iconFont ? columnMap.action.iconFont : null
                                            }
                                            return column
                                        })
                                        const rowAllList = crud && crud.rowList ? crud.rowList : []

                                        const url = crud && crud && crud.url ? crud.url : ""
                                        const action = crud && crud.action ? crud.action : {}
                                        if (!action.headList) {
                                            action["headList"] = []
                                        }
                                        if (!action.bodyList) {
                                            action["bodyList"] = []
                                        }
                                        const columnSearchList = columnList
                                            .filter((columnFilter) => columnFilter.search)
                                            .map((columnMap) => {
                                                return {
                                                    id: columnMap.id,
                                                    label: columnMap.label,
                                                    type: columnMap.type
                                                }
                                            })
                                        const columnExtraSearchList = columnExtraList
                                            .filter((columnFilter) => columnFilter.search)
                                            .map((columnMap) => {
                                                return {
                                                    id: columnMap.id,
                                                    label: columnMap.label,
                                                    type: columnMap.type
                                                }
                                            })
                                        const searchList = [...columnSearchList, ...columnExtraSearchList]
                                        const search = searchList.length > 0
                                            ? {
                                                selectColumn: {
                                                    value: searchList[0].id,
                                                    optionList: searchList
                                                },
                                                findContent: {
                                                    value: ""
                                                }
                                            }
                                            : null
                                        const pagination = crud && crud.pagination
                                            ? crud.pagination === true
                                                ? {}
                                                : {...crud.pagination}
                                            : null
                                        if (pagination && !pagination.page) {
                                            pagination["page"] = TABLE_PAGINATION_PAGE
                                        }
                                        if (pagination && !pagination.rowListPerPage) {
                                            pagination["rowListPerPage"] = TABLE_PAGINATION_ROWLIST_PER_PAGE
                                        }
                                        if (pagination && !pagination.rowListPerPageOptionList) {
                                            pagination["rowListPerPageOptionList"] = TABLE_PAGINATION_ROWLIST_PER_PAGE_OPTIONLIST
                                        }

                                        return {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_REFRESH_SUCCESS,
                                            crudTable: {
                                                url: url,
                                                action: action,
                                                search: search,
                                                pagination: pagination,
                                                columnList: columnList,
                                                columnExtraList: columnExtraList,
                                                rowAllList: rowAllList
                                            }
                                        }
                                    }
                                }
                            )
                        }
                    } catch (error) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_REFRESH_ERROR
                                    }
                                )
                            )
                        }
                    }
                }
            },
            [
                stepEffect,
                crud
            ]
        )

        const handleStepEffectSearch = React.useCallback(
            async () => {
                if (stepEffect === STEP_EFFECT_SEARCH) {
                    try {
                        if (isComponentMountedRef.current === true) {
                            await searchData()
                                .then(
                                    (data) => {
                                        if (data) {
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => {
                                                        return {
                                                            ...oldState,
                                                            stepEffect: STEP_EFFECT_SEARCH_SUCCESS,
                                                            crudTable: {
                                                                ...oldState.crudTable,
                                                                rowSearchList: data.rowSearchList
                                                            }
                                                        }
                                                    }
                                                )
                                            }
                                        } else {
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            stepEffect: STEP_EFFECT_SEARCH_ERROR
                                                        }
                                                    )
                                                )
                                            }
                                        }
                                    }
                                )
                                .catch(
                                    () => {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_SEARCH_ERROR
                                                    }
                                                )
                                            )
                                        }
                                    }
                                )
                        }
                    } catch (error) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_SEARCH_ERROR
                                    }
                                )
                            )
                        }
                    }
                }
            },
            [
                stepEffect,
                searchData
            ]
        )

        const handleStepEffectSort = React.useCallback(
            async () => {
                if (stepEffect === STEP_EFFECT_SORT) {
                    try {
                        await sortData()
                            .then(
                                (data) => {
                                    if (data) {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => {
                                                    return {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_SORT_SUCCESS,
                                                        crudTable: {
                                                            ...oldState.crudTable,
                                                            rowSearchList: data.rowSearchList
                                                        }
                                                    }
                                                }
                                            )
                                        }
                                    } else {
                                        if (isComponentMountedRef.current === true) {
                                            setState(
                                                (oldState) => (
                                                    {
                                                        ...oldState,
                                                        stepEffect: STEP_EFFECT_SORT_ERROR
                                                    }
                                                )
                                            )
                                        }
                                    }
                                }
                            )
                            .catch(
                                () => {
                                    if (isComponentMountedRef.current === true) {
                                        setState(
                                            (oldState) => (
                                                {
                                                    ...oldState,
                                                    stepEffect: STEP_EFFECT_SORT_ERROR
                                                }
                                            )
                                        )
                                    }
                                }
                            )
                    } catch (error) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_SORT_ERROR
                                    }
                                )
                            )
                        }
                    }
                }
            },
            [
                stepEffect,
                sortData
            ]
        )

        const handleStepEffectPagination = React.useCallback(
            async () => {
                if (stepEffect === STEP_EFFECT_PAGINATION) {
                    try {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => {
                                    if (oldState.crudTable.pagination) {
                                        const pagination = {...oldState.crudTable.pagination}
                                        const newPaginationPage = Math.max(TABLE_PAGINATION_PAGE, Math.ceil(oldState.crudTable.rowSearchList.length / pagination.rowListPerPage) - 1)
                                        pagination["page"] = pagination.page <= newPaginationPage ? pagination.page : newPaginationPage

                                        return {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_PAGINATION_SUCCESS,
                                            crudTable: {
                                                ...oldState.crudTable,
                                                pagination: {...pagination},
                                                rowPaginationPageList: pagination.rowListPerPage > 0
                                                    ? [...oldState.crudTable.rowSearchList.slice(pagination.page * pagination.rowListPerPage, pagination.page * pagination.rowListPerPage + pagination.rowListPerPage)]
                                                    : [...oldState.crudTable.rowSearchList]
                                            }
                                        }
                                    } else {
                                        return {
                                            ...oldState,
                                            stepEffect: STEP_EFFECT_PAGINATION_SUCCESS,
                                            crudTable: {
                                                ...oldState.crudTable,
                                                rowPaginationPageList: [...oldState.crudTable.rowSearchList]
                                            }
                                        }
                                    }
                                }
                            )
                        }
                    } catch (error) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepEffect: STEP_EFFECT_PAGINATION_ERROR
                                    }
                                )
                            )
                        }
                    }
                }
            },
            [
                stepEffect
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                switch (stepEffect) {
                    case STEP_EFFECT_REFRESH:
                        handleStepEffectRefresh().then().catch().finally()
                        break
                    case STEP_EFFECT_REFRESH_SUCCESS:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_SEARCH
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_REFRESH_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_ERROR,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SEARCH:
                        handleStepEffectSearch().then().catch().finally()
                        break
                    case STEP_EFFECT_SEARCH_SUCCESS:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_SORT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SEARCH_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_REFRESH
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SORT:
                        handleStepEffectSort().then().catch().finally()
                        break
                    case STEP_EFFECT_SORT_SUCCESS:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_PAGINATION
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_SORT_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_REFRESH
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_PAGINATION:
                        handleStepEffectPagination().then().catch().finally()
                        break
                    case STEP_EFFECT_PAGINATION_SUCCESS:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepReturn: STEP_RETURN_SUCCESS,
                                    stepEffect: STEP_EFFECT_DEFAULT
                                }
                            )
                        )
                        break
                    case STEP_EFFECT_PAGINATION_ERROR:
                        setState(
                            (oldState) => (
                                {
                                    ...oldState,
                                    stepEffect: STEP_EFFECT_REFRESH
                                }
                            )
                        )
                        break
                    default:
                        break
                }

                return () => {
                    isComponentMountedRef.current = false
                }
            },
            [
                stepEffect,
                handleStepEffectRefresh,
                handleStepEffectSearch,
                handleStepEffectSort,
                handleStepEffectPagination
            ]
        )

        React.useEffect(
            () => {
                if (isComponentMountedRef.current === true) {
                    setState(
                        (oldState) => (
                            {
                                ...oldState,
                                stepEffect: STEP_EFFECT_REFRESH
                            }
                        )
                    )
                }
            },
            [
                crud
            ]
        )

        switch (stepReturn) {
            case STEP_RETURN_INITIAL:
                return (
                    <React.Fragment>
                        <LayoutLoadingSecurity/>
                        <LayoutLoadingText/>
                    </React.Fragment>
                )
            case STEP_RETURN_SUCCESS:
                return (
                    <React.Fragment>
                        {stepEffect !== STEP_EFFECT_DEFAULT ? <LayoutLoadingSecurity/> : null}
                        <MuiTableContainer component={"div"}>
                            <MuiTable size={"small"}>
                                <LayoutTablePaginationTop
                                    crud={crudTable}
                                    handleChangedPaginationPage={handleChangedPaginationPage}
                                    handleChangedPaginationRowListPerPage={handleChangedPaginationRowListPerPage}
                                />
                                <LayoutTableSearch
                                    crud={crudTable}
                                    disabled={stepEffect !== STEP_EFFECT_DEFAULT}
                                    handleChangedSearchSelectColumn={handleChangedSearchSelectColumn}
                                    handleChangedSearchFindContent={handleChangedSearchFindContent}
                                />
                                <LayoutTableHead
                                    crud={crudTable}
                                    handleChangedSort={handleChangedSort}
                                />
                                <LayoutTableBody
                                    crud={crudTable}
                                />
                                <LayoutTablePaginationBottom
                                    crud={crudTable}
                                    handleChangedPaginationPage={handleChangedPaginationPage}
                                    handleChangedPaginationRowListPerPage={handleChangedPaginationRowListPerPage}
                                />
                            </MuiTable>
                        </MuiTableContainer>
                    </React.Fragment>
                )
            default:
                return null
        }
    }
)
