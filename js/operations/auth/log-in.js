import {
  checkIfHasErrors,
  showErrors
} from "../../utils.js";
import usersList from "../../users.js";
import currentUser from "../../current-user.js";
import { EMAIL_REGEX } from "../../constants.js";
import { navigateToUrl } from "../../routing.js";

export default function login(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const username = formData.get('username'),
        password = formData.get('password'),
        hashedPassword = CryptoJS.SHA3(password).toString();

  const user = usersList.getUserByUsername(username);

  const errors = validateLogin({
    username,
    password,
    user,
    hashedPassword
  });

  showErrors(errors);

  const hasErrors = checkIfHasErrors(errors);

  if (hasErrors) {
    return;
  }

  if (user.password === hashedPassword) {
    currentUser.login(user);
    sessionStorage.setItem('CurrentUser', JSON.stringify(user));

    navigateToUrl('/');
  }
}

function validateLogin({
  username,
  password,
  user,
  hashedPassword
}) {

  let errors = {
    username: [],
    password: [],
  };

  if (!username || !user) {
    errors = {
      ...errors,
      username: [...errors.username, 'Укажите email']
    };
  }

  if (!password) {
    errors = {
      ...errors,
      password: [...errors.password, 'Введите пароль']
    };
  }

  if (!user && EMAIL_REGEX.test(username)) {
    errors = {
      ...errors,
      username: [...errors.username, 'Пользователь не найден.']
    };
  }

  if (user && user.password !== hashedPassword && password) {
    errors = {
      ...errors,
      password: [...errors.password, 'Неверный пароль']
    };
  }

  return errors;
}