const errors = {
  MISSING_FIELDS: 'Some required fields are missing',
  INVALID_FIELDS: 'Invalid fields',
  INVALID_DISPLAYNAME_LENGTH: '"displayName" length must be at least 8 characters long',
  INVALID_EMAIL: '"email" must be a valid email',
  INVALID_PASSWORD_LENGTH: '"password" length must be at least 6 characters long',
  USER_ALREADY_REGISTERED: 'User already registered',
  USER_DOES_NOT_EXIST: 'User does not exist',
  TOKEN_NOT_FOUND: 'Token not found',
  INVALID_OR_EXPIRED_TOKEN: 'Expired or invalid token',
  NAME_IS_REQUIRED: '"name" is required',
  POST_DOES_NOT_EXIST: 'Post does not exist',
};

module.exports = { errors };
