
const checkUserNameEmpty = (username)=>{
  return !(username === "" || username === null);
}
const  checkPasswordEmpty =(password)=>{
  return !(password === "" || password === null);
}

module.exports = {checkUserNameEmpty,checkPasswordEmpty}