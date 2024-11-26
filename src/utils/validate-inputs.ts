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
  }
  if (!upperCase.test(value)) {
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

export const checkRepeatedPassword = (value: string, repeatedValue: string): {isError: boolean, error: string, value: string} => {
  if (repeatedValue.length === 0) {
    return {
      isError: true,
      error: 'Поле не может быть пустым',
      value: repeatedValue
    }
  }
  if(value !== repeatedValue) {
    return {
      isError: true,
      error: 'Пароли не совпадают',
      value: repeatedValue
    }
  }
  return {isError: false, error: '', value: repeatedValue};
}

export const checkEmail = (value: string):{isError: boolean, error: string, value: string} => {
  const validEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value.length === 0) {
    return {
      isError: true,
      error: 'Поле не может быть пустым',
      value: value
    }
  }
  if (!validEmail.test(value)) {
    return {
      isError: true,
      error: 'Введите корректный email',
      value: value
    }
  }
  return {isError: false, error: '', value: value};
}

export const checkName = (value: string, text: string):{isError: boolean, error: string, value: string} => {
  const validType = /^[A-ZА-Я][a-zа-яёA-ZА-Яё-]*$/;
  if (value.length === 0) {
    return {
      isError: true,
      error: 'Поле не может быть пустым',
      value: value
    }
  }
  if (!validType.test(value)) {
    return {
      isError: true,
      error: `${text} начинаться с заглавной буквы, не содержать пробелов, цифр и спецсимволов (допустим только дефис)`,
      value: value
    }
  }
  return {isError: false, error: '', value: value};
}

export const checkPhone = (value: string):{isError: boolean, error: string, value: string} => {
  const validPattern = /^\+?[0-9]+$/;
  if (!validPattern.test(value)) {
    return {
      isError: true,
      error: 'Телефон должен состоять только из цифр',
      value: value
    }
  }
  if (value.length < 10) {
    return {
      isError: true,
      error: 'Минимальная длина номера 10 символов',
      value: value
    }
  }
  if (value.length > 15) {
    return {
      isError: true,
      error: 'Максимальная длина номера 15 символов',
      value: value
    }
  }
  return {isError: false, error: '', value: value};
}

export const checkMessage = (value: string): {isError: boolean, error: string, value: string} => {
  if (value.length === 0) {
    console.log(value);
    return {
      isError: true,
      error: 'Поле не может быть пустым',
      value: value
    }
  }
  return {isError: false, error: '', value: value};
}
