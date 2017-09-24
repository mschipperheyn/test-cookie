export default featureName =>
  `Attempted to use '${featureName}' but DB type '${process.env.DB_TYPE}' doesn't support it`;
