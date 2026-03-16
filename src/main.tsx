import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { loadProfile } from './profile/storage';

const renderApp = async () => {
  const rootElement = document.getElementById('root');

  if (rootElement == null) {
    throw new Error('root element not found');
  }

  const initialProfile = await loadProfile();

  createRoot(rootElement).render(
    <StrictMode>
      <App initialProfile={initialProfile} />
    </StrictMode>,
  );
};

void renderApp();
