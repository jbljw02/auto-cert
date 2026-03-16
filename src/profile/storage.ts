export type Profile = {
  birthDate: string;
  name: string;
  phoneNumber: string;
};

export const PROFILE_STORAGE_KEY = 'profile';
export const BIRTH_DATE_LENGTH = 8;

export const createEmptyProfile = (): Profile => {
  return {
    birthDate: '',
    name: '',
    phoneNumber: '',
  };
};

let fallbackProfile = createEmptyProfile();

const normalizeName = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
};

const normalizeBirthDate = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  const birthDate = value.replaceAll(/\D/g, '').slice(0, BIRTH_DATE_LENGTH);

  return birthDate;
};

const normalizePhoneNumber = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replaceAll(/\D/g, '');
};

const isProfileRecord = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value == null) {
    return false;
  }

  return true;
};

export const normalizeProfile = (value: unknown): Profile => {
  if (isProfileRecord(value) === false) {
    return createEmptyProfile();
  }

  return {
    birthDate: normalizeBirthDate(value.birthDate),
    name: normalizeName(value.name),
    phoneNumber: normalizePhoneNumber(value.phoneNumber),
  };
};

const canUseChromeStorage = () => {
  if (typeof chrome === 'undefined') {
    return false;
  }

  if (chrome.storage == null || chrome.storage.local == null) {
    return false;
  }

  return true;
};

export const loadProfile = async () => {
  if (canUseChromeStorage() === false) {
    return fallbackProfile;
  }

  const storageResult = await chrome.storage.local.get(PROFILE_STORAGE_KEY);
  return normalizeProfile(storageResult[PROFILE_STORAGE_KEY]);
};

export const saveProfile = async (profile: Profile) => {
  const normalizedProfile = normalizeProfile(profile);

  if (canUseChromeStorage() === false) {
    fallbackProfile = normalizedProfile;
    return normalizedProfile;
  }

  await chrome.storage.local.set({
    [PROFILE_STORAGE_KEY]: normalizedProfile,
  });

  return normalizedProfile;
};
