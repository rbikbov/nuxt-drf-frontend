// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';

// Add locale helper.
Validator.addLocale(ru);

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'ru',
  dictionary: null,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  // events: 'input',
  events: 'input|blur',
  inject: true,
  validity: true,
  aria: true
};

Vue.use(VeeValidate, config);
