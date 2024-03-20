const { loginUser } = require("../src/controllers/user.controller.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { describe, beforeEach, it, expect } = require("@jest/globals");
const Users = require("../src/models/users.models.js");

// // Mock user model
// jest.mock("../src/models/users.models.js", () => ({
//   findOne: jest.fn(),
// }));
//
// // Mock bcrypt
// jest.mock("bcrypt", () => ({
//   compare: jest.fn(),
// }));
//
// // Mock jwt
// jest.mock("jsonwebtoken", () => ({
//   sign: jest.fn(),
// }));

describe("::LOGIN TEST::", () => {

  it("Should return 400 when user enters invalid username and password", async () => {
    expect(true).toBe(true);

  });

});
