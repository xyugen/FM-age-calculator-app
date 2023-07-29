"use strict";
const dayLabel = document.getElementById('day-label');
const monthLabel = document.getElementById('month-label');
const yearLabel = document.getElementById('year-label');
const dayInput = document.getElementById('input-day');
const monthInput = document.getElementById('input-month');
const yearInput = document.getElementById('input-year');
const dayAlert = document.getElementById('day-alert');
const monthAlert = document.getElementById('month-alert');
const yearAlert = document.getElementById('year-alert');
const submitButton = document.getElementById('submit-btn');
const yearsResult = document.getElementById('data-years');
const monthsResult = document.getElementById('data-months');
const daysResult = document.getElementById('data-days');
const colorLightRed = "#FF5757";
const colorSmokeyGray = "#716F6F";
const getInputAlert = (inputElement) => {
    switch (inputElement) {
        case dayInput:
            return dayAlert;
        case monthInput:
            return monthAlert;
        case yearInput:
            return yearAlert;
        default:
            return null;
    }
};
const getInputLabel = (inputElement) => {
    switch (inputElement) {
        case dayInput:
            return dayLabel;
        case monthInput:
            return monthLabel;
        case yearInput:
            return yearLabel;
        default:
            return null;
    }
};
const getInputData = (inputElement) => {
    switch (inputElement) {
        case dayInput:
            return "day";
        case monthInput:
            return "month";
        case yearInput:
            return "year";
    }
};
const hasEmptyValue = (inputElement) => {
    const value = Number(inputElement.value);
    return value === 0;
};
const isValidValue = (inputElement) => {
    const value = Number(inputElement.value);
    const max = Number(inputElement.max);
    const min = Number(inputElement.min);
    return value >= min && value <= max;
};
const validateYear = () => {
    const currentYear = new Date().getFullYear();
    const yearValue = Number(yearInput.value);
    if (yearValue > currentYear) {
        yearInput.style.borderColor = colorLightRed;
        yearLabel.style.color = colorLightRed;
        yearAlert.innerHTML = "Must be in the past";
        return false;
    }
    return true;
};
const setValidStyle = (inputElement, inputLabel) => {
    inputElement.style.borderColor = colorSmokeyGray;
    inputLabel.style.color = colorSmokeyGray;
};
const setInvalidStyle = (inputElement, inputLabel) => {
    inputElement.style.borderColor = colorLightRed;
    inputLabel.style.color = colorLightRed;
};
const updateAlertAndStyle = (alertElement, inputElement, inputLabel, message) => {
    if (alertElement && inputLabel) {
        alertElement.innerHTML = message;
        setInvalidStyle(inputElement, inputLabel);
    }
};
const validateInput = (inputElement) => {
    const alertElement = getInputAlert(inputElement);
    const inputData = getInputData(inputElement);
    const inputLabel = getInputLabel(inputElement);
    if (alertElement && inputLabel) {
        if (hasEmptyValue(inputElement)) {
            updateAlertAndStyle(alertElement, inputElement, inputLabel, "This field is required");
            return false;
        }
        else {
            alertElement.innerHTML = "";
            setValidStyle(inputElement, inputLabel);
        }
        if (!isValidValue(inputElement)) {
            updateAlertAndStyle(alertElement, inputElement, inputLabel, "Must be a valid " + inputData);
            return false;
        }
        else {
            alertElement.innerHTML = "";
            setValidStyle(inputElement, inputLabel);
        }
    }
    if (inputElement === yearInput) {
        return validateYear();
    }
    return true;
};
const handleInputValidation = (event) => {
    const inputElement = event.target;
    validateInput(inputElement);
};
const validateAllInput = () => {
    const inputElements = document.getElementsByClassName('data-input');
    const inputArray = Array.from(inputElements);
    let isValid = true;
    inputArray.forEach((inputElement) => {
        if (!validateInput(inputElement)) {
            isValid = false;
        }
        ;
    });
    return isValid;
};
const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    let years = age;
    let months = monthDiff < 0 ? 12 + monthDiff : monthDiff;
    let days = dayDiff < 0 ? daysInMonth(today.getMonth(), today.getFullYear()) + dayDiff : dayDiff;
    return {
        years: years,
        months: months,
        days: days
    };
};
const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};
const calculate = () => {
    const isValid = validateAllInput();
    if (isValid) {
        const yearValue = Number(yearInput.value);
        const monthValue = Number(monthInput.value);
        const dayValue = Number(dayInput.value);
        const birthDate = `${yearValue}-${monthValue}-${dayValue}`;
        const age = calculateAge(birthDate);
        setResult(age.years, age.months, age.days);
    }
};
const setResult = (years, months, days) => {
    yearsResult.innerHTML = String(years);
    monthsResult.innerHTML = String(months);
    daysResult.innerHTML = String(days);
};
dayInput.addEventListener('change', handleInputValidation);
monthInput.addEventListener('change', handleInputValidation);
yearInput.addEventListener('change', handleInputValidation);
submitButton.addEventListener('click', calculate);
