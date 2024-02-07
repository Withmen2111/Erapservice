import { FormContextType } from "@/context/FormContext.tsx";

export function isValidDate(dateString: string) {
  // Regular expression to match the mm/dd/yyyy format
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

  if (!dateRegex.test(dateString)) {
    // Invalid format
    return false;
  }

  // Parse the date components
  const [month, day, year] = dateString.split("/").map(Number);

  // Check if the date is valid
  const isValidMonth = month >= 1 && month <= 12;
  const isValidDay = day >= 1 && day <= 31;
  const isValidYear = year >= 1000 && year <= 9999;

  return isValidMonth && isValidDay && isValidYear;
}

export function isForm1Filled(formContext: FormContextType) {
  const {
    form1: { email, password },
  } = formContext;

  return email && password;
}

export function isForm2Filled(formContext: FormContextType) {
  const {
    form2: {
      zipCode,
      dateOfBirth,
      firstName,
      lastName,
      phone,
      ssn,
      homeAddress,
      city,
      state,
    },
  } = formContext;

  return (
    firstName &&
    lastName &&
    phone &&
    ssn &&
    homeAddress &&
    city &&
    state &&
    zipCode &&
    dateOfBirth
  );
}

export function isForm3Filled(formContext: FormContextType) {
  const {
    form3: { idFront, idBack },
  } = formContext;

  return idFront && idBack;
}

export function formatSSN(ssn: string) {
  // Remove non-numeric and excessive characters from input
  let numericValue = ssn.replace(/[^0-9]/g, "");
  if (numericValue.length > 9) numericValue = numericValue.substring(0, 9);

  // Format SSN with dashes
  let formattedSSN = "";
  for (let i = 0; i < numericValue.length; i++) {
    formattedSSN += numericValue[i];
    // Add dash if it's the appropriate place and not the last character in current input
    // Because if the user will try to remove the dash, it'll be re-added automatically
    if ((i === 2 || i === 4) && i !== numericValue.length - 1)
      formattedSSN += "-";
  }

  return formattedSSN;
}

export function formatDateOfBirth(dateOfBirth: string) {
  // Remove non-numeric and excessive characters from input
  let numericValue = dateOfBirth.replace(/[^0-9]/g, "");

  // Ensure the input is not longer than 8 digits (DDMMYYYY)
  if (numericValue.length > 8) numericValue = numericValue.substring(0, 8);

  // Format date of birth with slashes
  let formattedDateOfBirth = "";
  for (let i = 0; i < numericValue.length; i++) {
    formattedDateOfBirth += numericValue[i];
    // Add slash if it's the appropriate place and not the last character in the current input
    if ((i === 1 || i === 3) && i !== numericValue.length - 1)
      formattedDateOfBirth += "/";
  }

  return formattedDateOfBirth;
}
