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

// Colors
const colorLightRed: string = "#FF5757";
const colorSmokeyGray: string = "#716F6F";

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
        default:
            return null;
    }
}

// Returns the corresponding label element for the given input element
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
        yearInput.style.borderColor = colorLightRed;
        yearLabel.style.color = colorLightRed
        yearAlert.innerHTML = "Must be in the past";
    }
}

// Sets valid style for input element and label
const setValidStyle = (inputElement: HTMLInputElement, inputLabel: HTMLLabelElement) => {
    inputElement.style.borderColor = colorSmokeyGray;
    inputLabel.style.color = colorSmokeyGray;
}

// Sets invalid style for input element and label
const setInvalidStyle = (inputElement: HTMLInputElement, inputLabel: HTMLLabelElement) => {
    inputElement.style.borderColor = colorLightRed;
    inputLabel.style.color = colorLightRed;
}

// Updates alert element and applies corresponding style for input element and label
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

// Validates the input element and displays appropriate alert message and styles
const validateInput = (inputElement: HTMLInputElement) => {
    const alertElement = getInputAlert(inputElement);
    const inputData = getInputData(inputElement);
    const inputLabel = getInputLabel(inputElement);

    if (alertElement && inputLabel) {
        if (hasEmptyValue(inputElement)) {
            updateAlertAndStyle(alertElement, inputElement, inputLabel, "This field is required");
            return;
        } else {
            alertElement.innerHTML = "";
            setValidStyle(inputElement, inputLabel);
        }

        if (!isValidValue(inputElement)) {
            updateAlertAndStyle(alertElement, inputElement, inputLabel, "Must be a valid " + inputData);
            return;
        } else {
            alertElement.innerHTML = "";
            setValidStyle(inputElement, inputLabel);
        }
    }

    if (inputElement === yearInput) {
        validateYear();
    }
};

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
