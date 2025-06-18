const bcrypt = require('bcryptjs');
const { status } = require('http-status');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const userService = require('./user.service');
const config = require('../config');
const constants = require('../utils/constants');

class AuthService {
  /**
   * Register new user
   */
  async register(userData) {
    if (await userService.findUserByEmail(userData.email)) {
      throw new ApiError(status.BAD_REQUEST, 'Email already taken');
    }
    return userService.createUser(userData);
  }

  /**
   * Login user
   */
  async login(email, password) {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(status.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
  }

  /**
   * Logout user
   */
  async logout(token) {
    if (!token) {
      throw new ApiError(status.NOT_FOUND, 'Token not found');
    }
    return token;
  }

  /**
   * Refresh auth tokens
   */
  async refreshAuthTokens(refreshToken) {
    try {
      const payload = verifyToken(refreshToken, 'refresh');

      const user = await userService.getUserById(payload.sub);
      if (!user) {
        throw new ApiError(status.UNAUTHORIZED, 'User not found');
      }

      return this.generateAuthTokens(user);
    } catch (error) {
      throw new ApiError(status.UNAUTHORIZED, 'Invalid refresh token');
    }
  }
  /**
   * Generate token
   */
  async generateToken(userId, role, expires, type, secret = config.jwt.secret) {
    const payload = {
      sub: userId,
      role: role,
      iat: moment().unix(),
      exp: expires.unix(),
      type
    };
    return jwt.sign(payload, secret);
  }

  /**
   * Generate auth tokens
   */
  async generateAuthTokens(user) {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = await this.generateToken(
      user.id,
      user.role,
      accessTokenExpires,
      constants.TOKEN_TYPES.ACCESS
    );

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = await this.generateToken(
      user.id,
      user.role,
      refreshTokenExpires,
      constants.TOKEN_TYPES.REFRESH
    );

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate()
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate()
      }
    };
  }

  /**
   * Verify token
   */
  async verifyToken(token, type) {
    const payload = jwt.verify(token, config.jwt.secret);
    if (payload.type !== type) {
      throw new ApiError(status.UNAUTHORIZED, 'Invalid token type');
    }
    return payload;
  }

  /**
   * Set token cookies in response
   */
  async setTokenCookies(res, tokens) {
    const cookieOptions = {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict'
    };

    // Access token cookie
    res.cookie('accessToken', tokens.access.token, {
      ...cookieOptions,
      maxAge: config.jwt.accessExpirationMinutes * 60 * 1000 // Convert minutes to ms
    });

    // Refresh token cookie
    res.cookie('refreshToken', tokens.refresh.token, {
      ...cookieOptions,
      maxAge: config.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000 // Convert days to ms
    });
  }

  /**
   * Clear token cookies from response
   */
  async clearTokenCookies(res) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }

  /**
   * Get token from cookies
   */
  async getTokenFromCookies(req, type) {
    return req.cookies[`${type}Token`];
  }
}

module.exports = new AuthService();
