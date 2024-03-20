'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profile', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true, // Assuming each user can have only one profile
        references: {
          model: 'Users', // Make sure to use the correct model name here
          key: 'id',
        },
      },
      profileImage: {
        allowNull: true,
        type: Sequelize.STRING, // Assuming you will store the URL of the profile image
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT, // No default value in migration
      },
      genre: {
        allowNull: true,
        type: Sequelize.STRING, // No default value in migration
      },
      band: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING), // Assuming an array of strings
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profile');
  }
};
