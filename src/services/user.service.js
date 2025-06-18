const ApiError = require('../utils/ApiError');
const { status } = require('http-status');
const userRepository = require('../repositories/user.repository');
const { hashPassword } = require('../utils/password');

class UserService {
  /**
   * Create new user
   */
  async createUser(userData) {
    if (await userRepository.getUserByEmail(userData.email)) {
      throw new ApiError(status.BAD_REQUEST, 'Email already taken');
    }
    userData.password = await hashPassword(userData.password);
    return userRepository.createUser(userData);
  }

  /**
   * Get user by ID
   */
  async getUserById(id) {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new ApiError(status.NOT_FOUND, 'User not found');
    }
    return user;
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new ApiError(status.NOT_FOUND, 'User not found');
    }
    return user;
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email) {
    return userRepository.getUserByEmail(email);
  }

  /**
   * Update user by ID
   */
  async updateUser(id, updateData) {
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }
    const updatedUser = await userRepository.updateUser(id, updateData);
    if (!updatedUser) {
      throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    return updatedUser;
  }

  /**
   * Delete user by ID
   */
  async deleteUser(id) {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new ApiError(status.NOT_FOUND, 'User not found');
    }
    const deletedUser = await userRepository.deleteUser(id);

    return deletedUser;
  }

  /**
   * Query users with pagination
   */
  async queryUsers({ query = {}, sortBy = {}, skip = 0, limit = 10 }) {
    const result = await userRepository.queryUsers({ query, sortBy, skip, limit });

    return result;
  }
}

module.exports = new UserService();
