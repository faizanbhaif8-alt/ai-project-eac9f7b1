/**
 * Utility functions for general application use
 */

/**
 * Formats a date object into a readable string
 * @param {Date} date - Date object to format
 * @param {string} [format='YYYY-MM-DD'] - Format string
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error('Invalid date object provided');
  }

  const pad = num => num.toString().padStart(2, '0');
  
  const replacements = {
    'YYYY': date.getFullYear(),
    'MM': pad(date.getMonth() + 1),
    'DD': pad(date.getDate()),
    'HH': pad(date.getHours()),
    'mm': pad(date.getMinutes()),
    'ss': pad(date.getSeconds())
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => replacements[match]);
};

/**
 * Debounces a function to limit execution frequency
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Generates a unique ID
 * @param {number} [length=8] - Length of the ID
 * @returns {string} Unique ID string
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Deep clones an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Deep cloned object
 */
export const deepClone = obj => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Capitalizes the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = str => {
  if (typeof str !== 'string' || !str.length) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Sleeps for a given amount of time
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Checks if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if object is empty
 */
export const isEmpty = obj => {
  if (!obj) return true;
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Parses query parameters from URL
 * @param {string} url - URL string
 * @returns {Object} Parsed query parameters
 */
export const parseQueryParams = url => {
  const params = {};
  new URLSearchParams(url.split('?')[1]).forEach((value, key) => {
    params[key] = value;
  });
  return params;
};