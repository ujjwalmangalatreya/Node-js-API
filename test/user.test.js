
const {describe,expect,test} = require("@jest/globals")
const { checkUserNameEmpty, checkPasswordEmpty,checkPasswordValidations} = require("../src/services/user.service.js");

describe('::TEST USER SERVICES:::', () => {
  test('Check if username is empty', async () => {
    const password = checkUserNameEmpty("");
    expect(password).toBe(false);
  });
  test('Check if username is  null', async () => {
    const password = checkUserNameEmpty(null);
    expect(password).toBe(false);
  });
  test('Check if password  is  null', async () => {
    const password = checkPasswordEmpty(null);
    expect(password).toBe(false);
  });
  test('Check if password  is  empty', async () => {
    const password = checkPasswordEmpty("");
    expect(password).toBe(false);
  });
  
});

describe("::TEST USER BUSINESS LOGIC::", () => {
  it("Test to verify password should be atleaset 7 char", () => {
    const password = checkPasswordValidations("kTest1!j");
    expect(password).toBe(true);
  });
  it("Test to verify password should not be greater than 15 char", () => {
    const password = checkPasswordValidations("dEeksnGbe1hd@g");
    expect(password).toBe(true);
  });
  it("Test to verify password should atleast contain a alphabet", () => {
    const password = checkPasswordValidations("Uhdsje1!");
    expect(password).toBe(true);
  });
  it("Test to verify password should atleast contain a capital letter", () => {
    const password = checkPasswordValidations("Ujjwalatrey@1");
    expect(password).toBe(true);
  });
  it("Test to verify password should stleat containt a special char", () => {
    const password = checkPasswordValidations("Ujjw#lAtrey1a");
    expect(password).toBe(true);
  });
})