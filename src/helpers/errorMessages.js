const errors = {
  MISSING_FIELDS: 'Some required fields are missing',
  INVALID_FIELDS: 'Invalid fields',
  INVALID_DISPLAYNAME_LENGTH: '"displayName" length must be at least 8 characters long',
  INVALID_EMAIL: '"email" must be a valid email',
  INVALID_PASSWORD_LENGTH: '"password" length must be at least 6 characters long',
  USER_ALREADY_REGISTERED: 'User already registered',
};

module.exports = { errors };
