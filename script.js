const dialog = document.getElementById('accountDialog');
const dialogTitle = document.getElementById('dialogTitle');
const nameLabel = document.getElementById('nameLabel');
const codeLabel = document.getElementById('codeLabel');
const fullName = document.getElementById('fullName');
const activationCode = document.getElementById('activationCode');
const formSubmit = document.getElementById('formSubmit');
const switchMode = document.getElementById('switchMode');
const formMessage = document.getElementById('formMessage');
let mode = 'signup';

document.getElementById('year').textContent = new Date().getFullYear();

function openAccount(nextMode) {
  mode = nextMode;
  const signingUp = mode === 'signup';
  dialogTitle.textContent = signingUp ? 'Create your account' : 'Welcome back';
  nameLabel.hidden = !signingUp;
  fullName.hidden = !signingUp;
  fullName.required = signingUp;
  codeLabel.hidden = !signingUp;
  activationCode.hidden = !signingUp;
  formSubmit.textContent = signingUp ? 'Preview registration' : 'Preview log in';
  switchMode.textContent = signingUp ? 'Already registered? Log in' : 'New here? Create an account';
  formMessage.textContent = '';
  if (!dialog.open) dialog.showModal();
}
document.getElementById('openSignup').addEventListener('click', () => openAccount('signup'));
document.getElementById('bannerSignup').addEventListener('click', () => openAccount('signup'));
document.getElementById('openLogin').addEventListener('click', () => openAccount('login'));
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
switchMode.addEventListener('click', () => openAccount(mode === 'signup' ? 'login' : 'signup'));

document.getElementById('demoForm').addEventListener('submit', event => {
  event.preventDefault();
  formMessage.textContent = mode === 'signup'
    ? 'Preview only: the form works visually, but no account was created. Secure registration will be connected in the next phase.'
    : 'Preview only: login is not connected yet. No account was checked.';
});

document.getElementById('menuToggle').addEventListener('click', () => {
  const nav = document.getElementById('navMenu');
  const open = nav.classList.toggle('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('#navMenu a').forEach(link => link.addEventListener('click', () => {
  document.getElementById('navMenu').classList.remove('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.course-action').forEach(button => {
  button.addEventListener('click', () => {
    const notice = document.getElementById('courseNotice');
    notice.hidden = false;
    notice.textContent = `${button.dataset.course}: course materials will appear here after the learning system is connected. This preview does not yet contain private lessons.`;
    notice.scrollIntoView({behavior:'smooth', block:'center'});
  });
});
