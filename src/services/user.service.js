
const checkUserNameEmpty = (username)=>{
  return !(username === "" || username === null);
}
const  checkPasswordEmpty =(password)=>{
  return !(password === "" || password === null);
}
const checkUserNameValidation = (username) => { 
  if(username.length < 3){
    return false;
  }
  return true;
}

const checkPasswordValidations = (password) => { 
  if (password.length < 7 || password.length > 15) {
    return false;
  }
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (!hasLowercase || !hasUppercase || !hasNumber) {
    return false;
  }
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  if (!hasSpecialChar) {
    return false;
  }
  return true;
  
}

module.exports = {
  checkUserNameEmpty,
  checkPasswordEmpty,
  checkUserNameValidation,
  checkPasswordValidations
}