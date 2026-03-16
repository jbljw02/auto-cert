import { useState } from 'react';
import './App.css';
import {
  AUTO_FILL_PROFILE_MESSAGE_TYPE,
  isAutoFillProfileResponse,
} from './autofill/message';
import {
  BIRTH_DATE_LENGTH,
  saveProfile,
  type Profile,
} from './profile/storage';

type AppProps = {
  initialProfile: Profile;
};

const DEFAULT_STATUS_MESSAGE = '인증 정보 입력 후 저장하세요.';
const SUCCESS_STATUS_MESSAGE = '인증 정보를 저장했습니다.';
const AUTO_FILL_FAILED_MESSAGE = '현재 페이지에서 자동입력을 실행하지 못했습니다.';
const AUTO_FILL_SUCCESS_MESSAGE = '민간인증 입력칸에 자동입력을 실행했습니다.';
const AUTO_FILL_EMPTY_MESSAGE = '자동입력 대상 입력칸을 찾지 못했습니다.';

const canUseChromeTabs = () => {
  if (typeof chrome === 'undefined') {
    return false;
  }

  if (chrome.tabs == null) {
    return false;
  }

  return true;
};

const sendAutoFillMessage = async (profile: Profile) => {
  if (canUseChromeTabs() === false) {
    return null;
  }

  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  const activeTab = tabs[0];

  if (activeTab == null || activeTab.id == null) {
    return null;
  }

  const response = await chrome.tabs.sendMessage(activeTab.id, {
    profile,
    type: AUTO_FILL_PROFILE_MESSAGE_TYPE,
  });

  if (isAutoFillProfileResponse(response) === false) {
    return null;
  }

  return response;
};

export const App = ({ initialProfile }: AppProps) => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [statusMessage, setStatusMessage] = useState(DEFAULT_STATUS_MESSAGE);

  const updateProfile = (fieldName: keyof Profile, fieldValue: string) => {
    setProfile((currentProfile) => {
      return {
        ...currentProfile,
        [fieldName]: fieldValue,
      };
    });
    setStatusMessage(DEFAULT_STATUS_MESSAGE);
  };

  const handleSave = async () => {
    const profileSnapshot = profile;
    const savedProfile = await saveProfile(profile);

    setProfile((currentProfile) => {
      if (currentProfile !== profileSnapshot) {
        return currentProfile;
      }

      return savedProfile;
    });

    setStatusMessage(SUCCESS_STATUS_MESSAGE);
  };

  const handleAutoFill = async () => {
    const savedProfile = await saveProfile(profile);

    setProfile((currentProfile) => {
      return {
        ...currentProfile,
        ...savedProfile,
      };
    });

    try {
      const response = await sendAutoFillMessage(savedProfile);

      if (response == null) {
        setStatusMessage(AUTO_FILL_FAILED_MESSAGE);
        return;
      }

      if (response.success === false || response.filledFieldCount === 0) {
        setStatusMessage(AUTO_FILL_EMPTY_MESSAGE);
        return;
      }

      setStatusMessage(`${AUTO_FILL_SUCCESS_MESSAGE} ${response.filledFieldCount}개 필드를 채웠습니다.`);
    } catch {
      setStatusMessage(AUTO_FILL_FAILED_MESSAGE);
    }
  };

  return (
    <main className="appShell">
      <section className="panel">
        <div className="panelHeader">
          <p className="panelEyebrow">AUTO CERT</p>
          <h1>인증 정보 저장</h1>
          <p className="panelDescription">민간인증 입력에 사용할 기본 정보를 저장합니다.</p>
        </div>

        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="name">
            이름
          </label>
          <input
            className="textField"
            id="name"
            onChange={(event) => {
              updateProfile('name', event.target.value);
            }}
            placeholder="홍길동"
            type="text"
            value={profile.name}
          />
        </div>

        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="birthDate">
            생년월일 8자리
          </label>
          <input
            className="textField"
            id="birthDate"
            inputMode="numeric"
            maxLength={BIRTH_DATE_LENGTH}
            onChange={(event) => {
              updateProfile('birthDate', event.target.value.replaceAll(/\D/g, '').slice(0, BIRTH_DATE_LENGTH));
            }}
            placeholder="19900101"
            type="text"
            value={profile.birthDate}
          />
        </div>

        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="phoneNumber">
            휴대폰 번호
          </label>
          <input
            className="textField"
            id="phoneNumber"
            inputMode="numeric"
            onChange={(event) => {
              updateProfile('phoneNumber', event.target.value.replaceAll(/\D/g, ''));
            }}
            placeholder="01012345678"
            type="text"
            value={profile.phoneNumber}
          />
        </div>

        <button className="saveButton" onClick={handleSave} type="button">
          저장
        </button>

        <button className="autoFillButton" onClick={handleAutoFill} type="button">
          자동입력 실행
        </button>

        <p className="statusMessage">{statusMessage}</p>
      </section>
    </main>
  );
};

export default App;
