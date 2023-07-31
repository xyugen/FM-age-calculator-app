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
const colorLightGray = "#DBDBDB";
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
        default:
            return "";
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
const validateDate = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const yearValue = Number(yearInput.value);
    let isDateValid = true;
    if (yearValue > currentYear) {
        yearInput.style.borderColor = colorLightRed;
        yearLabel.style.color = colorLightRed;
        yearAlert.innerHTML = "Must be in the past";
        return false;
    }
    else if (yearValue === currentYear) {
        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();
        const monthValue = Number(monthInput.value);
        const dayValue = Number(dayInput.value);
        if (monthValue > currentMonth) {
            monthInput.style.borderColor = colorLightRed;
            monthLabel.style.color = colorLightRed;
            monthAlert.innerHTML = "Must be in the past";
            console.log(currentMonth);
            isDateValid = false;
        }
        else if ((monthValue === currentMonth) && (dayValue > currentDay)) {
            dayInput.style.borderColor = colorLightRed;
            dayLabel.style.color = colorLightRed;
            dayAlert.innerHTML = "Must be in the past";
            isDateValid = false;
        }
    }
    else {
        resetAllStyle();
    }
    return isDateValid;
};
const setValidStyle = (inputElement) => {
    const inputLabel = getInputLabel(inputElement);
    const inputAlert = getInputAlert(inputElement);
    inputElement.style.borderColor = colorLightGray;
    if (inputLabel)
        inputLabel.style.color = colorSmokeyGray;
    if (inputAlert)
        inputAlert.innerHTML = "";
};
const resetAllStyle = () => {
    const inputArray = [dayInput, monthInput, yearInput];
    inputArray.forEach((inputElement) => {
        setValidStyle(inputElement);
    });
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
            setValidStyle(inputElement);
        }
        if (!isValidValue(inputElement)) {
            updateAlertAndStyle(alertElement, inputElement, inputLabel, "Must be a valid " + inputData);
            return false;
        }
        else {
            alertElement.innerHTML = "";
            setValidStyle(inputElement);
        }
    }
    return validateDate();
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
    const monthDiff = (today.getMonth() + 1) - (birthDateObj.getMonth() + 1);
    const dayDiff = today.getDate() - birthDateObj.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    let years = age;
    let months = monthDiff < 0 ? 12 + monthDiff : monthDiff;
    let days = dayDiff < 0 ? daysInMonth(today.getMonth() + 1, today.getFullYear()) + dayDiff : dayDiff;
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
const animateNumber = (initialValue, finalValue, duration, elementToUpdate) => {
    const startTime = new Date().getTime();
    const difference = finalValue - initialValue;
    const animate = () => {
        const currentTime = new Date().getTime();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentNumber = initialValue + difference * progress;
        elementToUpdate.innerHTML = Math.round(currentNumber).toString();
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    animate();
};
const setResult = (years, months, days) => {
    const duration = 750;
    animateNumber(0, years, duration, yearsResult);
    animateNumber(0, months, duration, monthsResult);
    animateNumber(0, days, duration, daysResult);
};
dayInput.addEventListener('change', handleInputValidation);
monthInput.addEventListener('change', handleInputValidation);
yearInput.addEventListener('change', handleInputValidation);
submitButton.addEventListener('click', calculate);
