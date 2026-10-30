const SUPABASE_URL = 'https://arnlcdpncwuruacaqjko.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_G8P0TF0s0GD-vTcvaghAOg_HtIzVxp-';

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY

const dialog = document.getElementById('accountDialog');
const nameLabel = document.getElementById('nameLabel');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const formSubmit = document.getElementById('formSubmit');
const switchMode = document.getElementById('switchMode');
const formMessage = document.getElementById('formMessage');
const togglePassword = document.getElementById('togglePassword');
const forgotPassword = document.getElementById('forgotPassword');
let mode = 'signup';

document.getElementById('year').textContent =
  new Date().getFullYear();

function openAccount(nextMode) {
  mode = nextMode;

  const signingUp = mode === 'signup';

  document.getElementById('dialogTitle').textContent =
    signingUp ? 'Create your account' : 'Welcome back';

  nameLabel.hidden = !signingUp;
  fullName.hidden = !signingUp;
  fullName.required = signingUp;

  formSubmit.textContent =
    signingUp ? 'Create account' : 'Log in';

  switchMode.textContent = signingUp
    ? 'Already registered? Log in'
    : 'New here? Create an account';

  formMessage.textContent = '';

  if (!dialog.open) dialog.showModal();
}

document.getElementById('openSignup')
  .addEventListener('click', () => openAccount('signup'));

document.getElementById('bannerSignup')
  .addEventListener('click', () => openAccount('signup'));

document.getElementById('openLogin')
  .addEventListener('click', () => openAccount('login'));

document.getElementById('closeDialog')
  .addEventListener('click', () => dialog.close());

switchMode.addEventListener('click', () => {
  openAccount(mode === 'signup' ? 'login' : 'signup');
});
togglePassword.addEventListener('click', () => {
  const showing = password.type === 'text';

  password.type = showing ? 'password' : 'text';
  togglePassword.textContent = showing ? 'Show' : 'Hide';
  togglePassword.setAttribute(
    'aria-label',
    showing ? 'Show password' : 'Hide password'
  );
});
forgotPassword.addEventListener('click', async () => {
  const userEmail = email.value.trim();

  if (!userEmail) {
    formMessage.textContent =
      'Please enter your email address first.';
    return;
  }

  forgotPassword.disabled = true;
  formMessage.textContent = 'Sending password reset request...';

  try {
    const { error } =
      await supabaseClient.auth.resetPasswordForEmail(userEmail, {
        redirectTo: 'https://jeanboscomunezero35-design.github.io/English-Proficiency-Learning-Academy-/reset-password.html'
      });

    if (error) throw error;

    formMessage.textContent =
      'If your account exists, a password reset email will be sent.';
  } catch (error) {
    formMessage.textContent =
      error.message || 'Unable to request password reset.';
  } finally {
    forgotPassword.disabled = false;
  }
});
document.getElementById('demoForm')
  .addEventListener('submit', async event => {

    event.preventDefault();

    formSubmit.disabled = true;
    formMessage.textContent = 'Please wait...';

    try {
      const userEmail = email.value.trim();
      const userPassword = password.value;

      if (mode === 'signup') {

        const userName = fullName.value.trim();

        if (!userName) {
          throw new Error('Please enter your full name.');
        }

        const { data, error } = await supabaseClient.auth.signUp({
          email: userEmail,
          password: userPassword,

          options: {
            data: {
              full_name: userName
            }
          }
        });

        if (error) throw error;

        formMessage.textContent = data.session
          ? 'Account created successfully! Welcome to the academy.'
          : 'Registration successful! Please check your email to confirm your account.';

      } else {

        const { error } =
          await supabaseClient.auth.signInWithPassword({
            email: userEmail,
            password: userPassword
          });

        if (error) throw error;

        formMessage.textContent =
          'Login successful! Welcome back to the academy.';

        window.location.href = 'dashboard.html';
      }

    } catch (error) {

      formMessage.textContent =
        error.message || 'Something went wrong. Please try again.';

    } finally {

      formSubmit.disabled = false;
forgotPassword.hidden = signingUp;
togglePassword.textContent = 'Show';
password.type = 'password';
    }
  });

document.getElementById('menuToggle')
  .addEventListener('click', () => {

    const nav = document.getElementById('navMenu');
    const isOpen = nav.classList.toggle('open');

    document.getElementById('menuToggle')
      .setAttribute('aria-expanded', String(isOpen));

  });

document.querySelectorAll('#navMenu a')
  .forEach(link => {

    link.addEventListener('click', () => {

      document.getElementById('navMenu')
        .classList.remove('open');

      document.getElementById('menuToggle')
        .setAttribute('aria-expanded', 'false');

    });

  });

document.querySelectorAll('.course-action')
  .forEach(button => {

    button.addEventListener('click', () => {

      const notice = document.getElementById('courseNotice');

      notice.hidden = false;

      notice.textContent =
        `${button.dataset.course}: course materials will appear here once the learning system is connected.`;

      notice.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

    });

  });
