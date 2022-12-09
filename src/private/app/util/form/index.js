import React from "react"
import {FormattedMessage} from "react-intl"

const validateRules = {
    fieldTypeInteger(value) {
        const validate = {error: false, messageList: []}
        if (value) {
            if (!/^((-)?(0|([1-9][0-9]*))?)$/.test(value)) {
                validate.error = true
                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
            } else {
                if (0 < value.length) {
                    if (value[0] === "-" && 1 === value.length) {
                        validate.error = true
                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
                    } else {
                        if ((value[0] === "-" && 10 < value.length) || (value[0] !== "-" && 9 < value.length)) {
                            validate.error = true
                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.max-length"} values={{maxLength: 9}}/>)
                        }
                    }
                }
            }
        }
        return validate
    },
    fieldTypeIntegerPositive(value) {
        const validate = {error: false, messageList: []}
        if (value) {
            if (!/^((-)?(0|([1-9][0-9]*))?)$/.test(value)) {
                validate.error = true
                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
            } else {
                if (0 < value.length) {
                    if (value[0] === "-" && 1 === value.length) {
                        validate.error = true
                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
                    } else {
                        if (value[0] === "-") {
                            validate.error = true
                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.positive-required"}/>)
                        }
                        if ((value[0] === "-" && 10 < value.length) || (value[0] !== "-" && 9 < value.length)) {
                            validate.error = true
                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.max-length"} values={{maxLength: 9}}/>)
                        }
                    }
                }
            }
        }
        return validate
    },
    fieldTypeIntegerPositiveGreaterOrEqualThan(value, baseValue) {
        const validate = {error: false, messageList: []}
        if (value) {
            if (!/^((-)?(0|([1-9][0-9]*))?)$/.test(value)) {
                validate.error = true
                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
            } else {
                if (0 < value.length) {
                    if (value[0] === "-" && 1 === value.length) {
                        validate.error = true
                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
                    } else {
                        if (value[0] === "-") {
                            validate.error = true
                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.positive-required"}/>)
                        }
                        if ((value[0] === "-" && 10 < value.length) || (value[0] !== "-" && 9 < value.length)) {
                            validate.error = true
                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.max-length"} values={{maxLength: 9}}/>)
                        }
                        try {
                            if (parseInt(value) < parseInt(baseValue)) {
                                validate.error = true
                                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.positive-required-greater-or-equal-than"} values={{baseValue: baseValue}}/>)
                            }
                        } catch (error) {
                            validate.error = true
                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
                        }
                    }
                }
            }
        }
        return validate
    },
    fieldTypeIntegerPositiveLessOrEqualThan(value, baseValue) {
        const validate = {error: false, messageList: []}
        if (value) {
            if (!/^((-)?(0|([1-9][0-9]*))?)$/.test(value)) {
                validate.error = true
                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
            } else {
                if (0 < value.length) {
                    if (value[0] === "-" && 1 === value.length) {
                        validate.error = true
                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
                    } else {
                        if (value[0] === "-") {
                            validate.error = true
                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.positive-required"}/>)
                        }
                        if ((value[0] === "-" && 10 < value.length) || (value[0] !== "-" && 9 < value.length)) {
                            validate.error = true
                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.max-length"} values={{maxLength: 9}}/>)
                        }
                        try {
                            if (parseInt(value) > parseInt(baseValue)) {
                                validate.error = true
                                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.positive-required-less-or-equal-than"} values={{baseValue: baseValue}}/>)
                            }
                        } catch (error) {
                            validate.error = true
                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.invalid"}/>)
                        }
                    }
                }
            }
        }
        return validate
    },
    fieldTypeFloat(value) {
        const validate = {error: false, messageList: []}
        if (value) {
            if (!/^((-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/.test(value)) {
                validate.error = true
                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
            } else {
                if (0 < value.length) {
                    if (value[0] === "-" && 1 === value.length) {
                        validate.error = true
                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                    } else {
                        const valueSplitList = value.split(".")
                        if (0 < valueSplitList.length) {
                            if (2 < valueSplitList.length) {
                                validate.error = true
                                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                            } else {
                                if (valueSplitList[0][0] === "-" && 1 === valueSplitList[0].length) {
                                    validate.error = true
                                    validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                                } else {
                                    if ((valueSplitList[0][0] === "-" && 10 < valueSplitList[0].length) || (valueSplitList[0][0] !== "-" && 9 < valueSplitList[0].length)) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.integer-part.max-length"} values={{maxLength: 9}}/>)
                                    }
                                    if (1 < valueSplitList.length && 6 < valueSplitList[1].length) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.fractional-part.max-length"} values={{maxLength: 6}}/>)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return validate
    },
    fieldTypeFloatPositive(value) {
        const validate = {error: false, messageList: []}
        if (value) {
            if (!/^((-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/.test(value)) {
                validate.error = true
                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
            } else {
                if (0 < value.length) {
                    if (value[0] === "-" && 1 === value.length) {
                        validate.error = true
                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                    } else {
                        const valueSplitList = value.split(".")
                        if (0 < valueSplitList.length) {
                            if (2 < valueSplitList.length) {
                                validate.error = true
                                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                            } else {
                                if (valueSplitList[0][0] === "-" && 1 === valueSplitList[0].length) {
                                    validate.error = true
                                    validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                                } else {
                                    if (valueSplitList[0][0] === "-") {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.positive-required"}/>)
                                    }
                                    if ((valueSplitList[0][0] === "-" && 10 < valueSplitList[0].length) || (valueSplitList[0][0] !== "-" && 9 < valueSplitList[0].length)) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.integer-part.max-length"} values={{maxLength: 9}}/>)
                                    }
                                    if (1 < valueSplitList.length && 6 < valueSplitList[1].length) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.fractional-part.max-length"} values={{maxLength: 6}}/>)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return validate
    },
    fieldTypeFloatPositiveGreaterOrEqualThan(value, baseValue) {
        const validate = {error: false, messageList: []}
        if (value) {
            if (!/^((-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/.test(value)) {
                validate.error = true
                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
            } else {
                if (0 < value.length) {
                    if (value[0] === "-" && 1 === value.length) {
                        validate.error = true
                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                    } else {
                        const valueSplitList = value.split(".")
                        if (0 < valueSplitList.length) {
                            if (2 < valueSplitList.length) {
                                validate.error = true
                                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                            } else {
                                if (valueSplitList[0][0] === "-" && 1 === valueSplitList[0].length) {
                                    validate.error = true
                                    validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                                } else {
                                    if (valueSplitList[0][0] === "-") {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.positive-required"}/>)
                                    }
                                    if ((valueSplitList[0][0] === "-" && 10 < valueSplitList[0].length) || (valueSplitList[0][0] !== "-" && 9 < valueSplitList[0].length)) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.integer-part.max-length"} values={{maxLength: 9}}/>)
                                    }
                                    if (1 < valueSplitList.length && 6 < valueSplitList[1].length) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.fractional-part.max-length"} values={{maxLength: 6}}/>)
                                    }
                                    try {
                                        if (parseFloat(value) < parseFloat(baseValue)) {
                                            validate.error = true
                                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.positive-required-greater-or-equal-than"} values={{baseValue: baseValue}}/>)
                                        }
                                    } catch (error) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return validate
    },
    fieldTypeFloatPositiveLessOrEqualThan(value, baseValue) {
        const validate = {error: false, messageList: []}
        if (value) {
            if (!/^((-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/.test(value)) {
                validate.error = true
                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
            } else {
                if (0 < value.length) {
                    if (value[0] === "-" && 1 === value.length) {
                        validate.error = true
                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                    } else {
                        const valueSplitList = value.split(".")
                        if (0 < valueSplitList.length) {
                            if (2 < valueSplitList.length) {
                                validate.error = true
                                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                            } else {
                                if (valueSplitList[0][0] === "-" && 1 === valueSplitList[0].length) {
                                    validate.error = true
                                    validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                                } else {
                                    if (valueSplitList[0][0] === "-") {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.positive-required"}/>)
                                    }
                                    if ((valueSplitList[0][0] === "-" && 10 < valueSplitList[0].length) || (valueSplitList[0][0] !== "-" && 9 < valueSplitList[0].length)) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.integer-part.max-length"} values={{maxLength: 9}}/>)
                                    }
                                    if (1 < valueSplitList.length && 6 < valueSplitList[1].length) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.fractional-part.max-length"} values={{maxLength: 6}}/>)
                                    }
                                    try {
                                        if (parseFloat(value) > parseFloat(baseValue)) {
                                            validate.error = true
                                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.positive-required-less-or-equal-than"} values={{baseValue: baseValue}}/>)
                                        }
                                    } catch (error) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return validate
    },
    fieldTypePercentFloatPositive(value) {
        const validate = {error: false, messageList: []}
        if (value) {
            if (!/^((-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/.test(value)) {
                validate.error = true
                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
            } else {
                if (0 < value.length) {
                    if (value[0] === "-" && 1 === value.length) {
                        validate.error = true
                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                    } else {
                        const valueSplitList = value.split(".")
                        if (0 < valueSplitList.length) {
                            if (2 < valueSplitList.length) {
                                validate.error = true
                                validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                            } else {
                                if (valueSplitList[0][0] === "-" && 1 === valueSplitList[0].length) {
                                    validate.error = true
                                    validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                                } else {
                                    if (valueSplitList[0][0] === "-") {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-integer.positive-required"}/>)
                                    }
                                    if ((valueSplitList[0][0] === "-" && 10 < valueSplitList[0].length) || (valueSplitList[0][0] !== "-" && 9 < valueSplitList[0].length)) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.integer-part.max-length"} values={{maxLength: 9}}/>)
                                    }
                                    if (1 < valueSplitList.length && 6 < valueSplitList[1].length) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.fractional-part.max-length"} values={{maxLength: 6}}/>)
                                    }
                                    try {
                                        if (100 < parseFloat(value)) {
                                            validate.error = true
                                            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-percent.max-value"}/>)
                                        }
                                    } catch (error) {
                                        validate.error = true
                                        validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-float.invalid"}/>)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return validate
    },
    // done
    fieldTypeEmail(value, maxLength = 320) {
        const validate = {error: false, messageList: []}
        if (value && maxLength < value.length) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-email.max-length"} values={{maxLength: 320}}/>)
        }
        if (value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-email.invalid"}/>)
        }
        return validate
    },
    // done
    fieldTypePassword(value) {
        const validate = {error: false, messageList: []}
        if (value && value.length < 8) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-password.min-length"} values={{minLength: 8}}/>)
        }
        if (value && 32 < value.length) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-password.max-length"} values={{maxLength: 32}}/>)
        }
        if (value && !/(?=.*\d)/.test(value)) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-password.have-at-least-one-number"}/>)
        }
        if (value && !/(?=.*[a-z])/.test(value)) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-password.have-at-least-one-lowercase-letter"}/>)
        }
        if (value && !/(?=.*[A-Z])/.test(value)) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-password.have-at-least-one-uppercase-letter"}/>)
        }
        if (value && !/(?=.*[^a-zA-Z0-9])(?!.*\s)/.test(value)) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-password.have-at-least-one-symbol"}/>)
        }
        return validate
    },
    // done
    fieldTypePhone(value) {
        const validate = {error: false, messageList: []}
        if (value && 10 < value.length) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-phone.max-length"} values={{maxLength: 10}}/>)
        }
        if (value && !/^(\d{10})$/.test(value)) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-phone.invalid"}/>)
        }
        return validate
    },
    // done
    fieldTypeUrl(value) {
        const validate = {error: false, messageList: []}
        if (value && 128 < value.length) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-url.max-length"} values={{maxLength: 128}}/>)
        }
        if (value && !/^((http|https):\/\/)(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm.test(value)) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-url.invalid"}/>)
        }
        return validate
    },
    // done
    fieldTypeImage(value, maxSize = 0) {
        const validate = {error: false, messageList: []}
        if (value && maxSize < value.size) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-image.max-size"} values={{currentSize: (value.size / 1024).toFixed(2), maxSize: (maxSize / 1024).toFixed(2)}}/>)
        }
        return validate
    },
    fieldTypePdf(value, maxSize) {
        const validate = {error: false, messageList: []}
        if (value.size > maxSize) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-pdf.max-size"} values={{currentSize: (value.size / 1024).toFixed(2), maxSize: (maxSize / 1024).toFixed(2)}}/>)
        }
        return validate
    },
    fieldTypeAttachment(value, maxSize) {
        const validate = {error: false, messageList: []}
        if (value.size > maxSize) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-type-attachment.max-size"} values={{currentSize: (value.size / 1024).toFixed(2), maxSize: (maxSize / 1024).toFixed(2)}}/>)
        }
        return validate
    },
    // done
    fieldRequired(value) {
        const validate = {error: false, messageList: []}
        if (!value) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-required"}/>)
        }
        return validate
    },
    fieldUnique(value, valueList) {
        const validate = {error: false, messageList: []}
        if (valueList.includes(value)) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-unique"}/>)
        }
        return validate
    },
    fieldMinLength(value, minLength) {
        const validate = {error: false, messageList: []}
        if (value.length < minLength) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-min-length"} values={{minLength: minLength}}/>)
        }
        return validate
    },
    fieldMaxLength(value, maxLength) {
        const validate = {error: false, messageList: []}
        if (value.length > maxLength) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-max-length"} values={{maxLength: maxLength}}/>)
        }
        return validate
    },
    // done
    fieldEqualTo(value1, value2, fieldName1, fieldName2) {
        const validate = {error: false, messageList: []}
        if (value1 && value2 && value1 !== value2) {
            validate.error = true
            validate.messageList.push(<FormattedMessage id={"app.util.form.validate-field.field-equal-to"} values={{fieldName1: fieldName1, fieldName2: fieldName2}}/>)
        }
        return validate
    }
}

export const validateField = (value, ruleList) => {
    const validateFieldMessageList = ruleList
        .map(
            (rule) => {
                switch (rule[0]) {
                    case "fieldTypeInteger":
                        return validateRules.fieldTypeInteger(value ? value : "").messageList
                    case "fieldTypeIntegerPositive":
                        return validateRules.fieldTypeIntegerPositive(value ? value : "").messageList
                    case "fieldTypeIntegerPositiveGreaterOrEqualThan":
                        return validateRules.fieldTypeIntegerPositiveGreaterOrEqualThan(value ? value : "", rule[1]).messageList
                    case "fieldTypeIntegerPositiveLessOrEqualThan":
                        return validateRules.fieldTypeIntegerPositiveLessOrEqualThan(value ? value : "", rule[1]).messageList
                    case "fieldTypeFloat":
                        return validateRules.fieldTypeFloat(value ? value : "").messageList
                    case "fieldTypeFloatPositive":
                        return validateRules.fieldTypeFloatPositive(value ? value : "").messageList
                    case "fieldTypeFloatPositiveGreaterOrEqualThan":
                        return validateRules.fieldTypeFloatPositiveGreaterOrEqualThan(value ? value : "", rule[1]).messageList
                    case "fieldTypeFloatPositiveLessOrEqualThan":
                        return validateRules.fieldTypeFloatPositiveLessOrEqualThan(value ? value : "", rule[1]).messageList
                    case "fieldTypePercentFloatPositive":
                        return validateRules.fieldTypePercentFloatPositive(value ? value : "").messageList
                    // done
                    case "fieldTypeEmail":
                        return validateRules.fieldTypeEmail(value ? value : "").messageList
                    // done
                    case "fieldTypePassword":
                        return validateRules.fieldTypePassword(value ? value : "").messageList
                    // done
                    case "fieldTypePhone":
                        return validateRules.fieldTypePhone(value ? value : "").messageList
                    // done
                    case "fieldTypeUrl":
                        return validateRules.fieldTypeUrl(value ? value : "").messageList
                    // done
                    case "fieldTypeImage":
                        return validateRules.fieldTypeImage(value ? value : "", rule[1]).messageList
                    case "fieldTypePdf":
                        return validateRules.fieldTypePdf(value ? value : "", rule[1]).messageList
                    case "fieldTypeAttachment":
                        return validateRules.fieldTypeAttachment(value ? value : "", rule[1]).messageList
                    // done
                    case "fieldTypePicture":
                        return validateRules.fieldTypeImage(value ? value : "", 262144).messageList
                    // done
                    case "fieldTypeLogo":
                        return validateRules.fieldTypeImage(value ? value : "", 262144).messageList
                    // done
                    case "fieldTypeBanner":
                        return validateRules.fieldTypeImage(value ? value : "", 524288).messageList
                    // done
                    case "fieldTypeMaterialPicture":
                        return validateRules.fieldTypeImage(value ? value : "", 524288).messageList
                    case "fieldTypeMaterialSpecSheet":
                        return validateRules.fieldTypePdf(value ? value : "", 4194304).messageList
                    // done
                    case "fieldRequired":
                        return validateRules.fieldRequired(value ? value : "").messageList
                    case "fieldUnique":
                        return validateRules.fieldUnique(value ? value : "", rule[1]).messageList
                    case "fieldMinLength":
                        return validateRules.fieldMinLength(value ? value : "", rule[1]).messageList
                    case "fieldMaxLength":
                        return validateRules.fieldMaxLength(value ? value : "", rule[1]).messageList
                    // done
                    case "fieldEqualTo":
                        return validateRules.fieldEqualTo(value ? value : "", rule[1], rule[2], rule[3]).messageList
                    default:
                        return []
                }
            }
        )
        .filter(
            (messageList) => {
                return 0 < messageList.length
            }
        )
    return 0 < validateFieldMessageList.length ? validateFieldMessageList : null
}
