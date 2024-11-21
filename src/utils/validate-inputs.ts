export const checkLogin = (value: string):{isError: boolean, error: string, value: string} => {
  const validType = /^[a-zA-Z0-9_-]+$/;
  const onlyNumbers = /^\d+$/;
  if (value.length < 3) {
    return {
      isError: true,
      error: 'Минимальная длина логина 3 символа',
      value: value
    }
  }
  if (value.length > 20) {
    return {
      isError: true,
      error: 'Максимальная длина логина 20 символов',
      value: value
    }
  }
  if (!validType.test(value)) {
    return {
      isError: true,
      error: 'Логин может содержать только латиницу, цифры, дефис и нижнее подчеркивание',
      value: value
    }
  }
  if (onlyNumbers.test(value)) {
    return {
      isError: true,
      error: 'Логин не может состоять только из цифр',
      value: value
    }
  }
  return {isError: false, error: '', value: value};
}

export const checkPassword = (value: string): {isError: boolean, error: string, value: string} => {
  const upperCase = /[A-Z]/;
  const includeNumber = /\d/;
  if (value.length < 8) {
    return {
      isError: true,
      error: 'Минимальная длина пароля 8 символа',
      value: value
    }
  }
  if (value.length > 40) {
    return {
      isError: true,
      error: 'Максимальная длина пароля 40 символов',
      value: value
    }
  } if (!upperCase.test(value)) {
    return {
      isError: true,
      error: 'Пароль должен содержать хотя бы одну заглавную букву',
      value: value
    }
  }
  if (!includeNumber.test(value)) {
    return {
      isError: true,
      error: 'Пароль должен содержать хотя бы одну цифру',
      value: value
    }
  }
  return {isError: false, error: '', value: value};
}
