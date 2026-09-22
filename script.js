const appInfo = {
  name: 'Animal Sounds',
  version: '2.0',
  platform: 'iOS',
  minimumOS: 'iOS 3.1',
  bundleId: 'com.smartbabyapps.animalsounds',
  fileName: 'Animal Sounds 2.0.ipa',
  path: 'Payload/Animal Sounds.app',
  size: '19.8 MB'
};

const SAVE_KEY = 'savedAnimalSoundsApp';
const saveAppBtn = document.getElementById('saveAppBtn');
const previewBtn = document.getElementById('previewBtn');
const previewModal = document.getElementById('previewModal');
const closeModalBtn = document.getElementById('closeModal');
const installPreviewBtn = document.getElementById('installPreviewBtn');

const setSaveState = (saved) => {
  const button = saveAppBtn;
  button.textContent = saved ? 'Saved to App Collection' : 'Save the App';
  button.setAttribute('aria-pressed', String(saved));
  button.classList.toggle('saved', saved);
};

const persistSaveState = () => {
  const saved = localStorage.getItem(SAVE_KEY) === 'true';
  setSaveState(saved);
};

if (saveAppBtn) {
  saveAppBtn.addEventListener('click', () => {
    const isSaved = localStorage.getItem(SAVE_KEY) === 'true';
    const nextState = !isSaved;
    localStorage.setItem(SAVE_KEY, String(nextState));
    setSaveState(nextState);
  });

  persistSaveState();
}

const openModal = () => {
  previewModal.classList.remove('hidden');
  previewModal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  previewModal.classList.add('hidden');
  previewModal.setAttribute('aria-hidden', 'true');
};

if (previewBtn) {
  previewBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (previewModal) {
  previewModal.addEventListener('click', (event) => {
    if (event.target === previewModal) {
      closeModal();
    }
  });
}

if (installPreviewBtn) {
  installPreviewBtn.addEventListener('click', () => {
    const downloadLink = document.querySelector('.download-btn');
    if (downloadLink) {
      window.location.href = downloadLink.href;
    }
    closeModal();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && previewModal && !previewModal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log('App Store prepared for:', appInfo);
