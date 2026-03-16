import { useState } from 'react';
import './App.css';
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
    const savedProfile = await saveProfile(profile);
    setProfile(savedProfile);
    setStatusMessage(SUCCESS_STATUS_MESSAGE);
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

        <p className="statusMessage">{statusMessage}</p>
      </section>
    </main>
  );
};

export default App;
