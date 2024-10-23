import { onlyLetters_REGEX, onlynumerics_REGEX, password_REGEX, username_REGEX } from './REGEX';
import * as yup from 'yup';

// username
const usernameSchema = yup
  .string()
  .required('requiredError')
  .matches(username_REGEX, 'usernameError')
  .typeError('typeError');

// email
const emailSchema = yup
  .string()
  .email('emailError')
  .required('requiredError')
  .typeError('typeError');

// name
const nameSchema = yup
  .string()
  .required('requiredError')
  .matches(onlyLetters_REGEX, 'onlyNumberError')
  .typeError('typeError');

// surname
const SurnameSchema = yup
  .string()
  .required('requiredError')
  .matches(onlyLetters_REGEX, 'onlyNumberError')
  .typeError('typeError');

// coutry name code
const countryPhoneCodeSchema = yup.string().required('requiredError').typeError('typeError');

// company name
const companyNameSchema = yup.string().required('requiredError').typeError('typeError');

// vatnumber
const VATNumberSchema = yup.string().required('requiredError').typeError('typeError');

// date of birth
const dateOfBirthSchema = yup.string().required('requiredError').typeError('typeError');

// location
const locationSchema = yup.string().required('requiredError').typeError('typeError');

// gender
const genderSchema = yup.string().required('requiredError').typeError('typeError');

// phone
const phoneSchema = yup
  .string()
  .required('requiredError')
  .matches(onlynumerics_REGEX, 'onlyNumberError')
  .typeError('typeError');

// nationality
const nationalitySchema = (required: boolean = true) =>
  required
    ? yup.string().required('requiredError').typeError('typeError')
    : yup.string().typeError('typeError');

// job type
const jobTypeSchema = yup.string().required('requiredError').typeError('typeError');

// password
const passwordSchema = yup
  .string()
  .required('requiredError')
  .matches(password_REGEX, 'passwordError')
  .typeError('typeError');

// repassword
const rePasswordSchema = yup
  .string()
  .required('requiredError')
  .oneOf([yup.ref('password'), ''], 'rePasswordError');
// .oneOf([yup.ref('password'), null], 'rePasswordError');

// skills
const skillsSchema = (required: boolean = false) =>
  required ? yup.array().min(1, 'atleastOneLaguage') : yup.array();

// skills
const otherSkillsSchema = (required: boolean = false) =>
  required ? yup.array().min(1, 'atleastOneLaguage') : yup.array();

// languages
const languagesSchema = (required: boolean = false) =>
  required ? yup.array().min(1, 'atleastOneLaguage') : yup.array();

const passportNumberSchema = yup
  .string()
  // .matches(passport_REGEX, {
  //   message: 'Please provide a valid passport.',
  //   excludeEmptyString: true,
  // })
  .typeError('typeError');

// visa expiration date
const visaExpirationDateSchema = yup
  .string()
  // .required('requiredError')
  .typeError('typeError');

// bio
const bioSchema = yup
  .string()
  // .required('requiredError')
  .typeError('typeError');

// validate driving license
const validDrivingLicenseSchema = yup.string().required('requiredError').typeError('typeError');

// employed
const isEmployedSchema = yup.boolean();

// title job post
const titleSchema = yup.string().required('requiredError').typeError('typeError');

// introduction text job post
const introductionTextSchema = yup
  .string()
  // .required('requiredError')
  .typeError('typeError');

// salary job post
const salarySchema = yup.string().required('requiredError').typeError('typeError');

// religion job post
const religionSchema = (required: boolean = true) =>
  required
    ? yup.string().required('requiredError').typeError('typeError')
    : yup.string().typeError('typeError');

// years of experience job post
const yearsOfExperienceSchema = (required: boolean = false) =>
  required
    ? yup.string().required('requiredError').typeError('typeError')
    : yup.string().typeError('typeError');

// starting date job post
const startingDateSchema = (required: boolean = true) =>
  required
    ? yup.string().required('requiredError').typeError('typeError')
    : yup.string().typeError('typeError');

// min age job post
const minAgeSchema = yup
  .string()
  .test('min-age', 'minAgeMoreThanMaxAgeError', function (value) {
    const { maxAge } = this.parent; // access the value of maxAge using `this.parent`
    const minAge = parseInt(value || ''); // parse minAge to an integer

    if (maxAge && minAge && minAge > parseInt(maxAge)) {
      // check if minAge is greater than maxAge
      return this.createError({
        path: 'minAge',
        message: 'minAgeMoreThanMaxAgeError',
      });
    }

    return true;
  })
  .test('under-18', 'minAgeError', function (value) {
    const minAge = parseInt(value || ''); // parse minAge to an integer

    if (minAge && minAge < 18) {
      // check if minAge is greater than maxAge
      return this.createError({
        path: 'minAge',
        message: 'minAgeError',
      });
    }

    return true;
  })
  .required('requiredError')
  .matches(onlynumerics_REGEX, 'onlyNumberError')
  .typeError('typeError');

// max age job post
const maxAgeSchema = yup
  .string()
  .test('max-age', 'maxAgeLessThanMinAgeError', function (value) {
    const { minAge } = this.parent; // access the value of minAge using `this.parent`
    const maxAge = parseInt(value || ''); // parse maxAge to an integer

    if (minAge && maxAge && maxAge < parseInt(minAge)) {
      // check if maxAge is lower than minAge
      return this.createError({
        path: 'maxAge',
        message: 'maxAgeLessThanMinAgeError',
      });
    }

    return true;
  })
  .required('requiredError')
  .matches(onlynumerics_REGEX, 'onlyNumberError')
  .typeError('typeError');

// description job post
const descriptionSchema = yup.string().required('requiredError').typeError('typeError');

// rich text editor
const richTextEditorSchema = yup
  .string()
  .required('requiredError')
  .test({
    name: 'empty-check',
    message: 'requiredError',
    test: (value) => {
      return value?.trim() !== '<p><br></p>';
    },
  });

// description apply for job
const applicationDescriptionSchema = yup
  .string()
  // .required('requiredError')
  .typeError('typeError');
const documentPassportSchema = yup
  .mixed()
  // .required('requiredError')
  .typeError('typeError');
const documentFirstAidSchema = yup
  .mixed()
  // .required('requiredError')
  .typeError('typeError');
const documentDrivingLicenseSchema = yup
  .mixed()
  // .required('requiredError')
  .typeError('typeError');
const documentEmployStatusSchema = yup
  .mixed()
  // .required('requiredError')
  .typeError('typeError');

// number of children
const numberOfChildrenSchema = yup.string().typeError('typeError');

// number of adulsts
const numberOfAdultsSchema = yup.string().typeError('typeError');

const agreeTermsSchema = yup.boolean();

// city
const citySchema = yup.string().required('requiredError').typeError('typeError');

// country
const countrySchema = yup.string().required('requiredError').typeError('typeError');

// region
const regionSchema = yup.string().required('requiredError').typeError('typeError');

// attendee calendar
const attendeeSchema = yup.mixed().required('requiredError').typeError('typeError');

// start date
// const startDateSchema = yup
//   .string()
//   .required('requiredError')
//   .test('is-before-end-date', 'Start date should be before end date', function (startDate) {
//     const { endDate } = this.parent;
//     if (!startDate || !endDate) {
//       return true;
//     }
//     const startNumber = new Date(startDate).getTime();
//     const endNumber = new Date(endDate).getTime();
//     return startNumber <= endNumber;
//   })
//   .typeError('typeError');
const startDateSchema = yup.string().required('requiredError');

// end date
// const endDateSchema = yup
//   .string()
//   .required('requiredError')
//   .test('is-after-start-date', 'End date should be after start date', function (endDate) {
//     const { startDate } = this.parent;
//     if (!startDate || !endDate) {
//       return true;
//     }
//     const startNumber = new Date(startDate).getTime();
//     const endNumber = new Date(endDate).getTime();
//     return endNumber >= startNumber;
//   })
//   .typeError('typeError');

export {
  usernameSchema,
  emailSchema,
  nameSchema,
  SurnameSchema,
  countryPhoneCodeSchema,
  companyNameSchema,
  VATNumberSchema,
  dateOfBirthSchema,
  locationSchema,
  genderSchema,
  phoneSchema,
  nationalitySchema,
  citySchema,
  passwordSchema,
  rePasswordSchema,
  jobTypeSchema,
  validDrivingLicenseSchema,
  isEmployedSchema,
  bioSchema,
  skillsSchema,
  otherSkillsSchema,
  languagesSchema,
  passportNumberSchema,
  visaExpirationDateSchema,
  titleSchema,
  introductionTextSchema,
  salarySchema,
  religionSchema,
  yearsOfExperienceSchema,
  startingDateSchema,
  minAgeSchema,
  maxAgeSchema,
  descriptionSchema,
  applicationDescriptionSchema,
  documentPassportSchema,
  documentFirstAidSchema,
  documentDrivingLicenseSchema,
  documentEmployStatusSchema,
  agreeTermsSchema,
  regionSchema,
  countrySchema,
  numberOfAdultsSchema,
  numberOfChildrenSchema,
  attendeeSchema,
  startDateSchema,
  // endDateSchema,
  richTextEditorSchema,
};
