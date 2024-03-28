const { profileLists } = require('../src/controllers/profile.controller.js');
const { sequelize } = require('../src/db/db_connection.js');
const { Profile } = require('../src/models/profile.models.js');
jest.mock('../src/models/profile.models.js', () => ({
     Profile: {
          findAll: jest.fn(),
     },
}));

describe('profileLists', () => {
     let req, res;

     beforeEach(() => {
          req = {};
          res = {
               status: jest.fn().mockReturnThis(200),
               send: jest.fn(),
               json: jest.fn(),
          };
     });

     it('should return 204 when no profiles are found', async () => {
          Profile.findAll.mockResolvedValue([]);

          await profileLists(req, res);

          expect(res.status).toHaveBeenCalledWith(204);
          expect(res.send).toHaveBeenCalled();
     });

     // it('should return 200 when profiles are found', async () => {
     //      Profile.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);

     //      await profileLists(req, res);

     //      expect(res.status).toHaveBeenCalledWith(200);
     //      expect(res.send).toHaveBeenCalled();
     // });

     // it('should return 500 when an error occurs', async () => {
     //      Profile.findAll.mockRejectedValue(new Error('Internal Server Error'));

     //      await profileLists(req, res);

     //      expect(res.status).toHaveBeenCalledWith(500);
     //      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
     // });
});