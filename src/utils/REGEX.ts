const arabicNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];

// change persian nummerics to english nummerics in order to pass to data base
const fixNumbers = (str: string) => {
  if (typeof str === 'string') {
    for (let i = 0; i < 10; i++) {
      str = str.replace(arabicNumbers[i], i.toString());
    }
  }
  return str;
};

// Define a function that takes a string with Arabic digits and returns a string with English digits
function convertArabicToEnglish(str: string) {
  // Use replace method with a regular expression to match Arabic digits
  // Use a callback function that returns the English digit by subtracting 1632 from the Arabic digit's char code
  return str.replace(/[\u0660-\u0669]/g, function (c) {
    return (c.charCodeAt(0) - 1632).toString();
  });
}

// adding comma between every 3 chars of numbers
const priceNumbersCommaSetter = (value: string | number) =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// change english nummeric to arabic nummeric
const e2a = (s: string | number) =>
  //  s.toString();
  s?.toString().replace(/\d/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'[d]);

// regex to detect only numbers include arabic nummerics and english nummerics
const onlynumerics_REGEX = /^[۱۲۳۴۵۶۷۸۹۰0-9]*$/;

// regex for only arabic and english chars
const onlyLetters_REGEX = /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیa-zA-Z]+$/;

// regex for username
const username_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

// regex for phone number start with 09 and followed by 9 digits
const phoneNumber_REGEX = /^(0|۰)(9|۹)[۱۲۳۴۵۶۷۸۹۰0-9]{9}$/;

// passport number regex
const passport_REGEX = /^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$/;

// password regex
var password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
// var password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export {
  onlynumerics_REGEX,
  username_REGEX,
  phoneNumber_REGEX,
  onlyLetters_REGEX,
  password_REGEX,
  passport_REGEX,
  priceNumbersCommaSetter,
  e2a,
  fixNumbers,
  convertArabicToEnglish,
};
