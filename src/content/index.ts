import {
  isAutoFillProfileMessage,
  type AutoFillProfileMessage,
  type AutoFillProfileResponse,
} from '../autofill/message';

const NAME_SELECTOR = '#oacx_name';
const BIRTH_DATE_SELECTOR = '#oacx_birth';
const PHONE_TAIL_SELECTOR = '#oacx_phone2';
const PHONE_TAIL_LENGTH = 8;

const findInputElement = (selector: string) => {
  const element = document.querySelector(selector);

  if (element instanceof HTMLInputElement === false) {
    return null;
  }

  return element;
};

const applyInputValue = (inputElement: HTMLInputElement, value: string) => {
  inputElement.focus();
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input', { bubbles: true }));
  inputElement.dispatchEvent(new Event('change', { bubbles: true }));
  inputElement.blur();
};

const autoFillProfile = (message: AutoFillProfileMessage): AutoFillProfileResponse => {
  const nameInput = findInputElement(NAME_SELECTOR);
  const birthDateInput = findInputElement(BIRTH_DATE_SELECTOR);
  const phoneTailInput = findInputElement(PHONE_TAIL_SELECTOR);
  let filledFieldCount = 0;

  if (nameInput != null && message.profile.name !== '') {
    applyInputValue(nameInput, message.profile.name);
    filledFieldCount += 1;
  }

  if (birthDateInput != null && message.profile.birthDate !== '') {
    applyInputValue(birthDateInput, message.profile.birthDate);
    filledFieldCount += 1;
  }

  if (phoneTailInput != null && message.profile.phoneNumber !== '') {
    applyInputValue(phoneTailInput, message.profile.phoneNumber.slice(-PHONE_TAIL_LENGTH));
    filledFieldCount += 1;
  }

  return {
    filledFieldCount,
    success: filledFieldCount > 0,
  };
};

chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
  if (isAutoFillProfileMessage(message) === false) {
    return false;
  }

  sendResponse(autoFillProfile(message));
  return true;
});
