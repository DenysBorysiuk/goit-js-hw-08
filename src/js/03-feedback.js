import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formRefs = document.querySelector('.feedback-form');
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

formRefs.addEventListener('submit', onFormSubmit);
formRefs.addEventListener('input', throttle(onFormInput, 500));
populateFormData();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormData() {
  formRefs.elements.email.value = formData.email || '';
  formRefs.elements.message.value = formData.message || '';
}

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}
