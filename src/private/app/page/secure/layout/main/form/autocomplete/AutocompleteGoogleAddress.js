import {Autocomplete as MuiAutocomplete, Box as MuiBox, FormHelperText as MuiFormHelperText, Icon as MuiIcon, TextField as MuiTextField, Typography as MuiTypography} from "@mui/material"
import parse from "autosuggest-highlight/parse"
import React from "react"
import {FormattedMessage} from "react-intl"
import {HelperTextError as LayoutHelperTextError, HelperTextHelp as LayoutHelperTextHelp} from "../helper-text/HelperText"

const STEP_RETURN_INITIAL = "step-return-initial"
const STEP_RETURN_LOADING = "step-return-loading"
const STEP_RETURN_SUCCESS = "step-return-success"

const STEP_EFFECT_INITIAL = "step-effect-initial"
const STEP_EFFECT_SEARCH = "step-effect-search"
const STEP_EFFECT_UPDATE = "step-effect-update"
const STEP_EFFECT_DEFAULT = "step-effect-default"

export const AutocompleteGoogleAddress = React.memo(
    ({disabled = false, required = false, fullWidth = true, autoComplete = "", iconFont = "", label = "", field = {value: {}, valueList: [], error: null, help: null}, handleSearch = null, handleChanged = null}) => {
        const [
            {
                stepReturn,
                stepEffect,
                search,
                option
            },
            setState
        ] = React.useState(
            {
                stepReturn: STEP_RETURN_INITIAL,
                stepEffect: STEP_EFFECT_INITIAL,
                search: null,
                option: null
            }
        )
        const isComponentMountedRef = React.useRef(true)
        const SxContainer = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2, 0, 0, 0)
        }
        const SxMuiAutocomplete = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
            "& .MuiOutlinedInput-root": {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "flex-start",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                margin: theme => `${theme.spacing(0)} !important`,
                padding: theme => `${theme.spacing(0, 14, 0, 0)} !important`,
                "& .MuiAutocomplete-input": {
                    margin: theme => theme.spacing(0),
                    padding: theme => `${theme.spacing(2, 0)} !important`
                }
            },
            "& .MuiFormHelperText-root": {
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0)
            }
        }
        const SxMuiTextField = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0),
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
                    margin: theme => theme.spacing(0),
                    padding: theme => theme.spacing(2, 2, 2, 0)
                }
            },
            "& .MuiFormHelperText-root": {
                margin: theme => theme.spacing(0),
                padding: theme => theme.spacing(0)
            }
        }
        const SxMuiTextFieldInputPropsStartAdornment = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(2)
        }

        const handleStepEffectSearch = React.useCallback(
            async () => {
                if (stepEffect === STEP_EFFECT_SEARCH) {
                    try {
                        await handleSearch(search)
                            .then(
                                () => {
                                    if (isComponentMountedRef.current === true) {
                                        setState(
                                            (oldState) => (
                                                {
                                                    ...oldState,
                                                    stepReturn: STEP_RETURN_SUCCESS,
                                                    stepEffect: STEP_EFFECT_DEFAULT
                                                }
                                            )
                                        )
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
                                                    stepReturn: STEP_RETURN_INITIAL,
                                                    stepEffect: STEP_EFFECT_INITIAL
                                                }
                                            )
                                        )
                                    }
                                }
                            )
                    } catch (e) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepReturn: STEP_RETURN_INITIAL,
                                        stepEffect: STEP_EFFECT_INITIAL
                                    }
                                )
                            )
                        }
                    }
                }
            },
            [
                stepEffect,
                search,
                handleSearch
            ]
        )

        const handleStepEffectUpdate = React.useCallback(
            async () => {
                if (stepEffect === STEP_EFFECT_UPDATE) {
                    try {
                        await handleChanged(option)
                            .then(
                                () => {
                                    if (isComponentMountedRef.current === true) {
                                        setState(
                                            (oldState) => (
                                                {
                                                    ...oldState,
                                                    stepReturn: STEP_RETURN_SUCCESS,
                                                    stepEffect: STEP_EFFECT_DEFAULT
                                                }
                                            )
                                        )
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
                                                    stepReturn: STEP_RETURN_INITIAL,
                                                    stepEffect: STEP_EFFECT_INITIAL
                                                }
                                            )
                                        )
                                    }
                                }
                            )
                    } catch (e) {
                        if (isComponentMountedRef.current === true) {
                            setState(
                                (oldState) => (
                                    {
                                        ...oldState,
                                        stepReturn: STEP_RETURN_INITIAL,
                                        stepEffect: STEP_EFFECT_INITIAL
                                    }
                                )
                            )
                        }
                    }
                }
            },
            [
                stepEffect,
                option,
                handleChanged
            ]
        )

        React.useEffect(
            () => {
                isComponentMountedRef.current = true

                switch (stepEffect) {
                    case STEP_EFFECT_INITIAL:
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
                    case STEP_EFFECT_SEARCH:
                        handleStepEffectSearch().then().catch().finally()
                        break
                    case STEP_EFFECT_UPDATE:
                        handleStepEffectUpdate().then().catch().finally()
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
                handleStepEffectSearch,
                handleStepEffectUpdate
            ]
        )

        switch (stepReturn) {
            case STEP_RETURN_LOADING:
            case STEP_RETURN_SUCCESS:
                return (
                    <MuiBox component={"div"} sx={SxContainer}>
                        <MuiAutocomplete
                            multiple={false}
                            disabled={disabled}
                            disablePortal={true}
                            disableCloseOnSelect={false}
                            autoHighlight={true}
                            clearText={""}
                            openText={""}
                            closeText={""}
                            noOptionsText={
                                <React.Fragment>
                                    <FormattedMessage id={"app.page.secure.layout.main.form.autocomplete.no-options"}/>
                                </React.Fragment>
                            }
                            value={
                                field.value && field.value.id
                                    ? field.value
                                    : null
                            }
                            options={
                                field.value && field.value.id
                                    ? field.valueList
                                        ? [...[...field.valueList].filter((optionFilter) => optionFilter && optionFilter.id && optionFilter.id !== field.value.id), field.value]
                                        : [field.value]
                                    : field.valueList
                                        ? [...field.valueList]
                                        : []
                            }
                            isOptionEqualToValue={
                                (optionSelected, optionTestSelected) => {
                                    return !!(optionSelected && optionSelected.id && optionTestSelected && optionTestSelected.id && optionSelected.id === optionTestSelected.id)
                                }
                            }
                            getOptionLabel={
                                (optionSelected) => {
                                    return optionSelected && optionSelected.label ? optionSelected.label : ""
                                }
                            }
                            filterOptions={
                                (optionSelectedList) => {
                                    return optionSelectedList ? [...optionSelectedList] : []
                                }
                            }
                            renderInput={
                                (params) => {
                                    return (
                                        <React.Fragment>
                                            <MuiTextField
                                                {...params}
                                                disabled={disabled}
                                                required={required}
                                                type={"text"}
                                                variant={"outlined"}
                                                margin={"none"}
                                                size={"small"}
                                                fullWidth={fullWidth}
                                                autoComplete={autoComplete}
                                                autoFocus={false}
                                                inputProps={
                                                    {
                                                        ...params.inputProps
                                                    }
                                                }
                                                InputProps={
                                                    {
                                                        ...params.InputProps,
                                                        readOnly: stepEffect === STEP_EFFECT_SEARCH || stepEffect === STEP_EFFECT_UPDATE || false,
                                                        startAdornment: (
                                                            <MuiBox component={"div"} sx={SxMuiTextFieldInputPropsStartAdornment}>
                                                                <MuiIcon component={"span"} color={disabled ? "disabled" : Boolean(field.error) ? "error" : "primary"} fontSize={"medium"}>
                                                                    {iconFont}
                                                                </MuiIcon>
                                                            </MuiBox>
                                                        )
                                                    }
                                                }
                                                label={label}
                                                error={Boolean(field.error)}
                                                helperText={
                                                    <LayoutHelperTextError messageList={field.error}/>
                                                }
                                                sx={SxMuiTextField}
                                            />
                                            {
                                                field.help
                                                    ? (
                                                        <MuiFormHelperText sx={{margin: theme => theme.spacing(0), padding: theme => theme.spacing(0)}}>
                                                            <LayoutHelperTextHelp messageList={field.help}/>
                                                        </MuiFormHelperText>
                                                    )
                                                    : null
                                            }
                                        </React.Fragment>
                                    )
                                }
                            }
                            renderOption={
                                (props, optionSelected) => {
                                    const mainText = optionSelected && optionSelected.mainText
                                        ? optionSelected.mainText
                                        : ""
                                    const secondaryText = optionSelected && optionSelected.secondaryText
                                        ? optionSelected.secondaryText
                                        : ""
                                    const mainTextMatchedList = optionSelected && optionSelected.mainTextMatchedSubstringList
                                        ? optionSelected.mainTextMatchedSubstringList
                                        : []
                                    const mainTextMatchedPartList = parse(mainText, mainTextMatchedList.map((match) => [match.offset, match.offset + match.length]))
                                    return (
                                        <li {...props}>
                                            <MuiBox
                                                component={"div"}
                                                sx={
                                                    {
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        flexWrap: "nowrap",
                                                        alignContent: "center",
                                                        justifyContent: "flex-start",
                                                        alignItems: "stretch"
                                                    }
                                                }
                                            >
                                                <MuiBox
                                                    component={"div"}
                                                    sx={
                                                        {
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            flexWrap: "nowrap",
                                                            alignContent: "center",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            margin: theme => theme.spacing(0, 2, 0, 0)
                                                        }
                                                    }
                                                >
                                                    <MuiIcon component={"span"} color={"primary"} fontSize={"medium"}>
                                                        {"pin_drop"}
                                                    </MuiIcon>
                                                </MuiBox>
                                                <MuiBox
                                                    component={"div"}
                                                    sx={
                                                        {
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            flexWrap: "nowrap",
                                                            alignContent: "flex-start",
                                                            justifyContent: "center",
                                                            alignItems: "flex-start"
                                                        }
                                                    }
                                                >
                                                    <MuiBox
                                                        component={"div"}
                                                        sx={
                                                            {
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                flexWrap: "nowrap",
                                                                alignContent: "center",
                                                                justifyContent: "flex-start",
                                                                alignItems: "stretch"
                                                            }
                                                        }
                                                    >
                                                        <MuiTypography component={"p"} variant={"body1"}>
                                                            {
                                                                mainTextMatchedPartList.map(
                                                                    (part, index) => (
                                                                        <span key={index} style={{fontWeight: part.highlight ? 900 : "inherit"}}>
                                                                            {part.text}
                                                                        </span>
                                                                    )
                                                                )
                                                            }
                                                        </MuiTypography>
                                                    </MuiBox>
                                                    <MuiBox
                                                        component={"div"}
                                                        sx={
                                                            {
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                flexWrap: "nowrap",
                                                                alignContent: "center",
                                                                justifyContent: "flex-start",
                                                                alignItems: "stretch"
                                                            }
                                                        }
                                                    >
                                                        <MuiTypography component={"p"} variant={"body2"}>
                                                            {secondaryText}
                                                        </MuiTypography>
                                                    </MuiBox>
                                                </MuiBox>
                                            </MuiBox>
                                        </li>
                                    )
                                }
                            }
                            onInputChange={
                                (event, searchSelected) => {
                                    if (event) {
                                        if (stepEffect === STEP_EFFECT_DEFAULT) {
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            stepReturn: STEP_RETURN_SUCCESS,
                                                            stepEffect: STEP_EFFECT_SEARCH,
                                                            search: searchSelected && typeof searchSelected === "string" && searchSelected.trim() !== "" ? searchSelected : ""
                                                        }
                                                    )
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                            onChange={
                                (event, autocompleteValue, autocompleteChangeReason, autocompleteChangeDetail) => {
                                    const optionSelected = autocompleteValue && autocompleteValue.id && autocompleteChangeDetail && autocompleteChangeDetail.option && autocompleteChangeDetail.option.id && autocompleteValue.id === autocompleteChangeDetail.option.id
                                        ? {...autocompleteChangeDetail.option}
                                        : null
                                    if (event) {
                                        if (stepEffect === STEP_EFFECT_DEFAULT) {
                                            let optionNew
                                            switch (autocompleteChangeReason) {
                                                case "clear":
                                                    optionNew = null
                                                    break
                                                default:
                                                    optionNew = optionSelected
                                            }
                                            if (isComponentMountedRef.current === true) {
                                                setState(
                                                    (oldState) => (
                                                        {
                                                            ...oldState,
                                                            stepReturn: STEP_RETURN_LOADING,
                                                            stepEffect: STEP_EFFECT_UPDATE,
                                                            option: optionNew,
                                                            search: optionNew && optionNew.label ? optionNew.label : ""
                                                        }
                                                    )
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                            sx={SxMuiAutocomplete}
                        />
                    </MuiBox>
                )
            default:
                return (
                    <MuiBox component={"div"} sx={SxContainer}>
                        <MuiTextField
                            disabled={true}
                            required={required}
                            type={"text"}
                            variant={"outlined"}
                            margin={"none"}
                            size={"small"}
                            fullWidth={fullWidth}
                            autoComplete={autoComplete}
                            autoFocus={false}
                            InputProps={
                                {
                                    readOnly: true,
                                    startAdornment: (
                                        <MuiBox component={"div"} sx={SxMuiTextFieldInputPropsStartAdornment}>
                                            <MuiIcon component={"span"} color={Boolean(field.error) ? "error" : "disabled"} fontSize={"medium"}>
                                                {iconFont}
                                            </MuiIcon>
                                        </MuiBox>
                                    )
                                }
                            }
                            label={label}
                            value={""}
                            onChange={null}
                            error={Boolean(field.error)}
                            helperText={
                                <LayoutHelperTextError messageList={field.error}/>
                            }
                            sx={SxMuiTextField}
                        />
                        {
                            field.help
                                ? (
                                    <MuiFormHelperText sx={{margin: theme => theme.spacing(0), padding: theme => theme.spacing(0)}}>
                                        <LayoutHelperTextHelp messageList={field.help}/>
                                    </MuiFormHelperText>
                                )
                                : null
                        }
                    </MuiBox>
                )
        }
    }
)
