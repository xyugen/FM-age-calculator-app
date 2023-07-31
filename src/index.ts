/**
 * HTML Elements
 */

// Label elements
const dayLabel: HTMLLabelElement = document.getElementById('day-label') as HTMLLabelElement;
const monthLabel: HTMLLabelElement = document.getElementById('month-label') as HTMLLabelElement;
const yearLabel: HTMLLabelElement = document.getElementById('year-label') as HTMLLabelElement;

// Input elements
const dayInput: HTMLInputElement = document.getElementById('input-day') as HTMLInputElement;
const monthInput: HTMLInputElement = document.getElementById('input-month') as HTMLInputElement;
const yearInput: HTMLInputElement = document.getElementById('input-year') as HTMLInputElement;

// Alert elements
const dayAlert: HTMLParagraphElement = document.getElementById('day-alert') as HTMLParagraphElement;
const monthAlert: HTMLParagraphElement = document.getElementById('month-alert') as HTMLParagraphElement;
const yearAlert: HTMLParagraphElement = document.getElementById('year-alert') as HTMLParagraphElement;

// Button element
const submitButton: HTMLButtonElement = document.getElementById('submit-btn') as HTMLButtonElement;

// Span element
const yearsResult: HTMLSpanElement = document.getElementById('data-years') as HTMLSpanElement;
const monthsResult: HTMLSpanElement = document.getElementById('data-months') as HTMLSpanElement;
const daysResult: HTMLSpanElement = document.getElementById('data-days') as HTMLSpanElement;

// Colors
const colorLightRed: string = "#FF5757";
const colorSmokeyGray: string = "#716F6F";

/**
 * Helper Functions
 */

/**
 * Returns the corresponding alert element for the given input element.
 * @param {HTMLInputElement} inputElement - The input element to get the alert for.
 * @returns {HTMLParagraphElement|null} The corresponding alert element or null if not found.
 */
const getInputAlert = (inputElement: HTMLInputElement) => {
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
}

/**
 * Returns the corresponding label element for the given input element.
 * @param {HTMLInputElement} inputElement - The input element to get the label for.
 * @returns {HTMLLabelElement|null} The corresponding label element or null if not found.
 */
const getInputLabel = (inputElement: HTMLInputElement) => {
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
}

/**
 * Returns the type of input data (day, month, or year) for the given input element.
 * @param {HTMLInputElement} inputElement - The input element to get the input data type for.
 * @returns {string} The type of input data (day, month, or year).
 */
const getInputData = (inputElement: HTMLInputElement) => {
    switch (inputElement) {
        case dayInput:
            return "day";
        case monthInput:
            return "month";
        case yearInput:
            return "year";
    }
}

/**
 * Checks if the input element has an empty value (value is 0).
 * @param {HTMLInputElement} inputElement - The input element to check.
 * @returns {boolean} True if the input element has an empty value, false otherwise.
 */
const hasEmptyValue = (inputElement: HTMLInputElement) => {
    const value: number = Number(inputElement.value);
    return value === 0;
}

/**
 * Checks if the input element value is within the valid range.
 * @param {HTMLInputElement} inputElement - The input element to check.
 * @returns {boolean} True if the input element value is within the valid range, false otherwise.
 */
const isValidValue = (inputElement: HTMLInputElement) => {
    const value: number = Number(inputElement.value);
    const max: number = Number(inputElement.max);
    const min: number = Number(inputElement.min);
    return value >= min && value <= max;
}

/**
 * Validates the year input to ensure it's not in the future.
 * @returns {boolean} True if the year input is valid, false otherwise.
 */
const validateYear = () => {
    const currentYear: number = new Date().getFullYear();
    const yearValue: number = Number(yearInput.value);
    if (yearValue > currentYear) {
        yearInput.style.borderColor = colorLightRed;
        yearLabel.style.color = colorLightRed
        yearAlert.innerHTML = "Must be in the past";
        return false;
    }
    return true;
}

/**
 * Sets valid style for input element and label.
 * @param {HTMLInputElement} inputElement - The input element to set the valid style for.
 * @param {HTMLLabelElement} inputLabel - The label element corresponding to the input element.
 */
const setValidStyle = (inputElement: HTMLInputElement, inputLabel: HTMLLabelElement) => {
    inputElement.style.borderColor = colorSmokeyGray;
    inputLabel.style.color = colorSmokeyGray;
}

/**
 * Sets invalid style for input element and label.
 * @param {HTMLInputElement} inputElement - The input element to set the invalid style for.
 * @param {HTMLLabelElement} inputLabel - The label element corresponding to the input element.
 */
const setInvalidStyle = (inputElement: HTMLInputElement, inputLabel: HTMLLabelElement) => {
    inputElement.style.borderColor = colorLightRed;
    inputLabel.style.color = colorLightRed;
}

/**
 * Updates alert element and applies corresponding style for input element and label.
 * @param {HTMLParagraphElement} alertElement - The alert element to update.
 * @param {HTMLInputElement} inputElement - The input element corresponding to the alert.
 * @param {HTMLLabelElement} inputLabel - The label element corresponding to the input element.
 * @param {string} message - The message to set in the alert element.
 */
const updateAlertAndStyle = (
        alertElement: HTMLParagraphElement,
        inputElement: HTMLInputElement,
        inputLabel: HTMLLabelElement,
        message: string
    ) => {
    if (alertElement && inputLabel) {
        alertElement.innerHTML = message;
        setInvalidStyle(inputElement, inputLabel);
    }
};

/**
 * Validates the input element and displays appropriate alert message and styles.
 * @param {HTMLInputElement} inputElement - The input element to validate.
 * @returns {boolean} True if the input is valid, false otherwise.
 */
const validateInput = (inputElement: HTMLInputElement) => {
    const alertElement = getInputAlert(inputElement);
    const inputData = getInputData(inputElement);
    const inputLabel = getInputLabel(inputElement);

    if (alertElement && inputLabel) {
        if (hasEmptyValue(inputElement)) {
            updateAlertAndStyle(alertElement, inputElement, inputLabel, "This field is required");
            return false;
        } else {
            alertElement.innerHTML = "";
            setValidStyle(inputElement, inputLabel);
        }

        if (!isValidValue(inputElement)) {
            updateAlertAndStyle(alertElement, inputElement, inputLabel, "Must be a valid " + inputData);
            return false;
        } else {
            alertElement.innerHTML = "";
            setValidStyle(inputElement, inputLabel);
        }
    }

    if (inputElement === yearInput) {
        return validateYear();
    }

    return true;
};

/**
 * Event listener callback for input change event.
 * @param {Event} event - The input change event.
 */
const handleInputValidation = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    validateInput(inputElement);
}

/**
 * Validates all input elements.
 * @returns {boolean} True if all inputs are valid, false if at least one is invalid.
 */
const validateAllInput = () => {
    const inputElements = document.getElementsByClassName('data-input');
    const inputArray = Array.from(inputElements) as HTMLInputElement[];

    let isValid = true;

    inputArray.forEach((inputElement) => {
        if (!validateInput(inputElement as HTMLInputElement)) {
            isValid = false;
        };
    });

    return isValid;
}

/**
 * Calculates the age based on the given birth date.
 * @param {string} birthDate - The birth date in the format "YYYY-MM-DD".
 * @returns {Object} An object containing the calculated age in years, months, and days.
 */
const calculateAge = (birthDate: string) => {
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
    }
}

/**
 * Helper function to get the number of days in a specific month and year.
 * @param {number} month - The month (0-based index: 0 for January, 1 for February, etc.).
 * @param {number} year - The year.
 * @returns {number} The number of days in the specified month and year.
 */
const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

/**
 * Calculates the result by validating all input elements and displays it.
 */
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
}

/**
 * Animates the number update from initial to final value over a specified duration.
 * @param {number} initialValue - The initial value.
 * @param {number} finalValue - The final value.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @param {HTMLElement} elementToUpdate - The HTML element to update with the animated number.
 */
const animateNumber = (
    initialValue: number,
    finalValue: number,
    duration: number,
    elementToUpdate: HTMLElement
) => {
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

/**
 * Sets the age calculation result to HTML.
 * @param {number} years - The calculated years.
 * @param {number} months - The calculated months.
 * @param {number} days - The calculated days.
 */
const setResult = (years: number, months: number, days: number) => {
    const duration: number = 750;
    animateNumber(0, years, duration, yearsResult);
    animateNumber(0, months, duration, monthsResult);
    animateNumber(0, days, duration, daysResult);
}

/**
 * Event Listeners
 */

// Event listeners for input change events
dayInput.addEventListener('change', handleInputValidation);
monthInput.addEventListener('change', handleInputValidation);
yearInput.addEventListener('change', handleInputValidation);

// Event listener for submit button click event
submitButton.addEventListener('click', calculate);
