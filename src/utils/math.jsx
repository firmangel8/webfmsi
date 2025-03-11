export const formatCurrency = (value, options = {}) => {
  // Default options
  const defaultOptions = {
    currencySymbol: "IDR", // You can change this to your desired currency symbol
    decimalPlaces: 2, // You can change this to your desired number of decimal places
    thousandsSeparator: ",", // You can change this to your desired thousands separator (if applicable)
  };

  // Merge user options with defaults
  const mergedOptions = { ...defaultOptions, ...options };

  // Check if value is a valid number
  if (isNaN(value)) {
    return value; // Return the original value if not a number
  }

  // Format the number with options
  const formatter = new Intl.NumberFormat("en-US", mergedOptions);
  const formattedValue = formatter.format(value);

  return formattedValue;
};
