
const {describe,expect,test} = require("@jest/globals")
const { checkUserNameEmpty, checkPasswordEmpty } = require("../src/services/user.service");

describe('::TEST USER SERVICES:::', () => {
  test('Check if username is empty', async () => {
    const password = checkUserNameEmpty("");
    expect(password).toBe(false);
  });
  test('Check id username is  null', async () => {
    const password = checkUserNameEmpty(null);
    expect(password).toBe(false);
  });
  test('Check id password  is  null', async () => {
    const password = checkPasswordEmpty(null);
    expect(password).toBe(false);
  });
  test('Check id password  is  empty', async () => {
    const password = checkPasswordEmpty("");
    expect(password).toBe(false);
  });

});