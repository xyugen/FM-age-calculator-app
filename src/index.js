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
const getInputAlert = (inputElement) => {
    switch (inputElement) {
        case dayInput:
            return dayAlert;
        case monthInput:
            return monthAlert;
        case yearInput:
            return yearAlert;
    }
    return null;
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
        yearAlert.innerHTML = "Must be in the past";
    }
};
const validateInput = (inputElement) => {
    const alertElement = getInputAlert(inputElement);
    const inputData = getInputData(inputElement);
    if (hasEmptyValue(inputElement)) {
        if (alertElement) {
            alertElement.innerHTML = "This field is required";
            return;
        }
    }
    else {
        if (alertElement) {
            alertElement.innerHTML = "";
        }
    }
    if (!isValidValue(inputElement)) {
        if (alertElement) {
            alertElement.innerHTML = "Must be a valid " + inputData;
            return;
        }
    }
    else {
        if (alertElement) {
            alertElement.innerHTML = "";
        }
    }
    if (inputElement === yearInput) {
        validateYear();
    }
};
const handleInputValidation = (event) => {
    const inputElement = event.target;
    validateInput(inputElement);
};
const validateAllInput = () => {
    const inputElements = document.getElementsByClassName('data-input');
    const inputArray = Array.from(inputElements);
    inputArray.forEach((inputElement) => {
        validateInput(inputElement);
    });
};
const calculate = () => {
    validateAllInput();
};
dayInput.addEventListener('change', handleInputValidation);
monthInput.addEventListener('change', handleInputValidation);
yearInput.addEventListener('change', handleInputValidation);
submitButton.addEventListener('click', calculate);
