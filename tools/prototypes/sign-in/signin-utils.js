const VALID_USERNAME = 'demo.user@example.com';
const VALID_PASSWORD = 'Prototype1!';

export function setupTwoStep({ step1, step2, backBtn, titleBackBtn, primaryBtn, errorBanner, readonlyInput, onSuccess }) {
  const step1Input = step1.querySelector('ui5-input');
  const step2Inputs = () => [...step2.querySelectorAll('ui5-input:not([readonly])')];

  function updateCta() {
    if (!step2.classList.contains('hidden')) {
      primaryBtn.disabled = step2Inputs().some(i => !i.value.trim());
    } else {
      primaryBtn.disabled = !step1Input.value.trim();
    }
  }

  primaryBtn.disabled = true;
  step1Input.addEventListener('input', updateCta);
  step2Inputs().forEach(i => i.addEventListener('input', updateCta));

  primaryBtn.addEventListener('click', () => {
    if (!step2.classList.contains('hidden')) {
      if (!validateStep(step2)) return;
      const username = document.getElementById('username')?.value ?? '';
      const password = step2.querySelector('ui5-input[type="Password"]')?.value ?? '';
      if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
        if (errorBanner) errorBanner.classList.remove('hidden');
        return;
      }
      if (errorBanner) errorBanner.classList.add('hidden');
      if (onSuccess) onSuccess();
      return;
    }
    const field = step1Input;
    if (!field.value.trim()) { field.setAttribute('value-state', 'Error'); return; }
    field.setAttribute('value-state', 'None');
    if (readonlyInput) readonlyInput.value = field.value;
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    if (backBtn) backBtn.classList.remove('hidden');
    if (titleBackBtn) titleBackBtn.classList.remove('hidden');
    primaryBtn.textContent = 'Sign In';
    updateCta();
  });

  const goBack = () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    if (backBtn) backBtn.classList.add('hidden');
    if (titleBackBtn) titleBackBtn.classList.add('hidden');
    primaryBtn.textContent = 'Continue';
    if (errorBanner) errorBanner.classList.add('hidden');
    step1Input.focus();
    updateCta();
  };

  if (backBtn) backBtn.addEventListener('click', goBack);
  if (titleBackBtn) titleBackBtn.addEventListener('click', goBack);
}

export function setupSingleStep({ formArea, primaryBtn, errorBanner, onSuccess }) {
  const inputs = () => [...formArea.querySelectorAll('ui5-input:not([readonly])')];

  function updateCta() {
    primaryBtn.disabled = inputs().some(i => !i.value.trim());
  }

  primaryBtn.disabled = true;
  inputs().forEach(i => i.addEventListener('input', updateCta));

  primaryBtn.addEventListener('click', () => {
    if (!validateStep(formArea)) return;
    const username = formArea.querySelector('ui5-input[type="Email"]')?.value ?? '';
    const password = formArea.querySelector('ui5-input[type="Password"]')?.value ?? '';
    if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
      if (errorBanner) errorBanner.classList.remove('hidden');
      return;
    }
    if (errorBanner) errorBanner.classList.add('hidden');
    if (onSuccess) onSuccess();
  });
}

function validateStep(container) {
  const inputs = [...container.querySelectorAll('ui5-input:not([readonly])')];
  let valid = true;
  inputs.forEach(inp => {
    if (!inp.value.trim()) { inp.setAttribute('value-state', 'Error'); valid = false; }
    else { inp.setAttribute('value-state', 'None'); }
  });
  return valid;
}
