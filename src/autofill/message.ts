import type { Profile } from '../profile/storage';
import { normalizeProfile } from '../profile/storage';

export const AUTO_FILL_PROFILE_MESSAGE_TYPE = 'AUTO_FILL_PROFILE';

export type AutoFillProfileMessage = {
  profile: Profile;
  type: typeof AUTO_FILL_PROFILE_MESSAGE_TYPE;
};

export type AutoFillProfileResponse = {
  filledFieldCount: number;
  success: boolean;
};

const isObjectRecord = (value: unknown): value is object => {
  if (typeof value !== 'object' || value == null) {
    return false;
  }

  return true;
};

export const isAutoFillProfileMessage = (value: unknown): value is AutoFillProfileMessage => {
  if (isObjectRecord(value) === false) {
    return false;
  }

  if ('type' in value === false || value.type !== AUTO_FILL_PROFILE_MESSAGE_TYPE) {
    return false;
  }

  if ('profile' in value === false) {
    return false;
  }

  const normalizedProfile = normalizeProfile(value.profile);

  if (typeof normalizedProfile.name !== 'string') {
    return false;
  }

  if (typeof normalizedProfile.birthDate !== 'string') {
    return false;
  }

  if (typeof normalizedProfile.phoneNumber !== 'string') {
    return false;
  }

  return true;
};

export const isAutoFillProfileResponse = (value: unknown): value is AutoFillProfileResponse => {
  if (isObjectRecord(value) === false) {
    return false;
  }

  if ('success' in value === false || typeof value.success !== 'boolean') {
    return false;
  }

  if ('filledFieldCount' in value === false || typeof value.filledFieldCount !== 'number') {
    return false;
  }

  return true;
};
