//// HTML Elements
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

//// Helper Functions
// Returns the corresponding alert element for the given input element
const getInputAlert = (inputElement: HTMLInputElement) => {
    switch (inputElement) {
        case dayInput:
            return dayAlert;
        case monthInput:
            return monthAlert;
        case yearInput:
            return yearAlert;
    }
    return null;
}

// Returns the type of input data (day, month, or year) for the given input element
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

// Checks if the input element has an empty value (value is 0)
const hasEmptyValue = (inputElement: HTMLInputElement) => {
    const value: number = Number(inputElement.value);
    return value === 0;
}

// Checks if the input element value is within the valid range
const isValidValue = (inputElement: HTMLInputElement) => {
    const value: number = Number(inputElement.value);
    const max: number = Number(inputElement.max);
    const min: number = Number(inputElement.min);
    return value >= min && value <= max;
}

// Validates the year input to ensure it's not in the future
const validateYear = () => {
    const currentYear: number = new Date().getFullYear();
    const yearValue: number = Number(yearInput.value);
    if (yearValue > currentYear) {
        yearAlert.innerHTML = "Must be in the past";
    }
}

// Validates the input element and updates the corresponding alert message
const validateInput = (inputElement: HTMLInputElement) => {
    const alertElement = getInputAlert(inputElement);
    const inputData = getInputData(inputElement);

    if (hasEmptyValue(inputElement)) {
        if (alertElement) {
            alertElement.innerHTML = "This field is required";
            return;
        }
    } else {
        if (alertElement) {
            alertElement.innerHTML = "";
        }
    }

    if (!isValidValue(inputElement)) {
        if (alertElement) {
            alertElement.innerHTML = "Must be a valid " + inputData;
            return;
        }
    } else {
        if (alertElement) {
            alertElement.innerHTML = "";
        }
    }

    if (inputElement === yearInput) {
        validateYear();
    }
}

// Event listener callback for input change event
const handleInputValidation = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    validateInput(inputElement);
}

// Validates all input elements
const validateAllInput = () => {
    const inputElements = document.getElementsByClassName('data-input');
    const inputArray = Array.from(inputElements) as HTMLInputElement[];

    inputArray.forEach((inputElement) => {
        validateInput(inputElement as HTMLInputElement);
    });
}

// Calculates the result by validating all input elements
const calculate = () => {
    validateAllInput();
}

//// Event Listeners
// Add event listeners for input change events
dayInput.addEventListener('change', handleInputValidation);
monthInput.addEventListener('change', handleInputValidation);
yearInput.addEventListener('change', handleInputValidation);

// Add event listener for submit button click event
submitButton.addEventListener('click', calculate);
