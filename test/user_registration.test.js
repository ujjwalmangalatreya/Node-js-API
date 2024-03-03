
const {describe,expect,test} = require("@jest/globals")
const { checkUserNameEmpty,
  checkUserNameValidation,
  checkPasswordEmpty,
  checkPasswordValidations } = require("../src/services/user.service.js");

const { registerUser } = require("../src/controllers/user.controller.js")
const request = require("supertest");
const { app } = require("../src/app.js");


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
  test("jsadhjashd", () => {
    expect(1).toBe(0);
  })
  
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
  it("Test to verify username should be atleast 3 char long", () => {
    const username = checkUserNameValidation("abcs");
    expect(username).toBe(true);
  });
})



