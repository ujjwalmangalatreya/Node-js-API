const { loginUser } = require("../src/controllers/user.controller.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { describe, beforeEach, it, expect } = require("@jest/globals");
const Users = require("../src/models/users.models.js");

// Mock user model
jest.mock("../src/models/users.models.js", () => ({
     findOne: jest.fn()
}));

// Mock bcrypt
jest.mock('bcrypt', () => ({
     compare: jest.fn(),
}));

// Mock jwt
jest.mock('jsonwebtoken', () => ({
     sign: jest.fn(),
}));

describe("::LOGIN TEST::", () => {
     beforeEach(() => {
          jest.clearAllMocks();
     });

     it("Should return 200 when user enters valid username and password", async () => {
          const mockUser = { id: 1, username: "XXXX", password: "XXXX" };
          Users.findOne.mockResolvedValue(mockUser);
          bcrypt.compare.mockResolvedValue(true);
          jwt.sign.mockReturnValue('mockToken');

          const req = { body: { username: 'testuser', password: 'password' } };
          const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

          await loginUser(req, res);

          expect(res.status).toHaveBeenCalledWith(200);
         
          expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
               data: expect.arrayContaining([
                    expect.objectContaining({ token: 'mockToken' })
               ]),
               message: 'Login Successful',
               statusCode: 200,
               success: true
          }));
     });

     it("Should return 400 when user enters invalid username and password", async () => {
          Users.findOne.mockResolvedValue(null);
          const req = { body: { username: 'invaliduser', password: 'invalidpassword' } };
          const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

          await loginUser(req, res);

          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
               message: 'Username did not match..',
               statusCode: 400,
               success: false
          }));
        
     });
});
