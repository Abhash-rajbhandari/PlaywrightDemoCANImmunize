
export class Helper {

  static convertDateFormatToMatchPatientInfo(inputDate: string | null): string {
    
  if (inputDate === null) {
      return "Invalid date";
  }

  const [year, month, day] = inputDate.split("-").map(Number);

  // Parse the input date string into a JavaScript Date object
    const parsedInputDate = new Date(inputDate);

    // Calculate the age
    const currentYear = new Date().getFullYear();
    const age = currentYear - parsedInputDate.getFullYear();

    // Format the date string
    const formattedDate = `${parsedInputDate.toLocaleString('en-US', { month: 'long' })} ${day}, ${year} (${age} years old)`;

    return formattedDate;
  }

  static formatPhoneNumber(inputNumber: string): string{
    // Remove any non-digit characters from the input number
    const cleanedNumber = inputNumber.replace(/\D/g, '');

    // Extract the area code, exchange code, and subscriber number
    const areaCode = cleanedNumber.slice(0, 3);
    const exchangeCode = cleanedNumber.slice(3, 6);
    const subscriberNumber = cleanedNumber.slice(6);

    // Format the phone number
    const formattedNumber = `(${areaCode}) ${exchangeCode}-${subscriberNumber}`;
    return formattedNumber;
  }

}