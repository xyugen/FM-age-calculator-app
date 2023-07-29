# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![](/assets/images/screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS (SASS)
- TypeScript
- Google Fonts API
- Flexbox

### What I learned

I managed to learn and use SASS and TypeScript for the first time and I've immediately loved it.

I also learned from this project:
1. Input Validation: I learned how to validate user inputs for the day, month, and year fields.
2. Date Calculations: It took a some time but I learned to calculate the age using the provided birth date.
3. Animation: The result is presented with animated counting of years, months, and days. It was achieved by using `requestAnimationFrame` and updating the displayed numbers over time.

### Useful resources

- [How to Calculate Age Manually](https://www.markcalculate.com/articles/how-to-calculate-age-manually) - This helped me for implementing the date calculations logic.

## Author

- Frontend Mentor - [@xyugen](https://www.frontendmentor.io/profile/xyugen)
- Twitter - [@_zygen](https://www.twitter.com/_zygen)
