const INVALIDCLASS = 'invalid';
const VALIDCLASS = 'valid';
  
import * as z from 'zod';

const nameSchema = z.string().max(25).min(2, "The name must have at least 2 chars");
const passwordSchema = z.string().min(6, {
    message: "The password must be minimum 6 chars length"
  }).refine((password) => /[A-Z]/.test(password), {
    message: "The password must have at least one capital letter"
  }).refine((password) => /[a-z]/.test(password), {
    message: "The password must have at least one non capital letter"
  }).refine((password) => /[0-9]/.test(password), {
    message: "The password must have at least one number"
  }).refine((password) => /[!@#$%^&*]/.test(password), {
    message: "The password must have at least one special character (!@#$%^&*)"
  });
const notEmptySchema = z.string().min(1, {
    message: "The password cannot be empty"
  });
const passwordConfirmationSchema = z.object({ password: passwordSchema, repassword: notEmptySchema}).refine((data) => data.password === data.repassword, {
    message: "The password confirmation is incorrect"
  });
const emailSchema = z.email("The email is not in the correct format").min(5).max(50);

const validateConfirmPassword = () => {
  const feedbackElement = document.querySelector('.repassword__feedback');
  const passwordElement = document.getElementById('password') as HTMLInputElement;
  const repasswordElement = document.getElementById('repassword') as HTMLInputElement;
  const result = z.safeParse(passwordConfirmationSchema, {
    password: passwordElement.value,
    repassword: repasswordElement.value
    });

  generateUIfeedback(result, feedbackElement, repasswordElement);

  return result.success;
}

const validateInput = (feedbackSelector: string, elementId: string, value: string, schema: z.ZodString | z.ZodEmail | z.ZodObject) => {
  const feedbackElement = document.querySelector(feedbackSelector);
  const element = document.getElementById(elementId);
  const result = z.safeParse(schema, value);

  generateUIfeedback(result, feedbackElement, element);

  return result.success;
}

const generateUIfeedback = (result: z.ZodSafeParseResult<string | Record<string, unknown>>, feedbackElement: Element | null, element: Element | null) => {
  if (!result.success && feedbackElement && element) {
    feedbackElement.textContent = result.error.issues[0].message;
    element.classList.add(INVALIDCLASS);
    element.classList.remove(VALIDCLASS);
  } else if (result.success && feedbackElement && element) {
    feedbackElement.textContent = '';
    element.classList.remove(INVALIDCLASS);
    element.classList.add(VALIDCLASS);
  }
}

const setAndValidate = (setFunction: React.Dispatch<React.SetStateAction<string>>, elementId: string, schema: z.ZodString | z.ZodEmail | z.ZodObject) => {
    const value = (document.getElementById(elementId) as HTMLInputElement).value;

    setFunction(value);
    validateInput(`.${elementId}__feedback`, elementId, value, schema);
}


const cleanErrorsOnSubmit = () => {
  const nameFeedbackElement = document.querySelector('.name__feedback');
  const passwordFeedbackElement = document.querySelector('.password__feedback');
  const repasswordFeedbackElement = document.querySelector('.repassword__feedback');
  const emailFeedbackElement = document.querySelector('.email__feedback');
  const nameElement = document.getElementById('name');
  const passwordElement = document.getElementById('password');
  const repasswordElement = document.getElementById('repassword');
  const emailElement = document.getElementById('email');

  if (nameFeedbackElement && nameElement) {
    nameFeedbackElement.textContent = '';
    nameElement.classList.remove(INVALIDCLASS);
    nameElement.classList.remove(VALIDCLASS);
  }
  if (passwordFeedbackElement && passwordElement) {
    passwordFeedbackElement.textContent = '';
    passwordElement.classList.remove(INVALIDCLASS);
    passwordElement.classList.remove(VALIDCLASS);
  }
  if (repasswordFeedbackElement && repasswordElement) {
    repasswordFeedbackElement.textContent = '';
    repasswordElement.classList.remove(INVALIDCLASS);
    repasswordElement.classList.remove(VALIDCLASS);
  }
  if (emailFeedbackElement && emailElement) {
    emailFeedbackElement.textContent = '';
    emailElement.classList.remove(INVALIDCLASS);
    emailElement.classList.remove(VALIDCLASS);
  }
}

const registerFormValidates = (formData: FormData) => { 
  const nameValidates = validateInput('.name__feedback', 'name', formData.get('name') as string || '', nameSchema);
  const passwordValidates = validateInput('.password__feedback', 'password', formData.get('password') as string || '', passwordSchema);
  const repasswordValidates = validateInput('.repassword__feedback', 'repassword', formData.get('repassword') as string || '', notEmptySchema) && 
    validateConfirmPassword();
  const emailValidates = validateInput('.email__feedback', 'name', formData.get('email') as string || '', emailSchema);

  if (nameValidates && passwordValidates && repasswordValidates && emailValidates) {
    cleanErrorsOnSubmit();

    return true;
  } else {
    return false;
  }
}

const loginFormValidates = (formData: FormData) => { 
  const passwordValidates = validateInput('.password__feedback', 'password', formData.get('password') as string || '', notEmptySchema);
  const emailValidates = validateInput('.email__feedback', 'name', formData.get('email') as string || '', emailSchema);

  if (passwordValidates && emailValidates) {
    cleanErrorsOnSubmit();

    return true;
  } else {
    return false;
  }
}
export { validateInput, registerFormValidates, loginFormValidates, setAndValidate, validateConfirmPassword, nameSchema, passwordSchema, notEmptySchema, passwordConfirmationSchema, emailSchema };