export default {
  HOME: '/',
  VERSION: '/version',
  FEATURE_FLAGS: '/features',

  //  EXAMPLE Route with values in url
  //  NOTE: the ? marks an optional value
  COLOR: (colorName: string | null = null): string =>
    colorName ? `/color/:${colorName}?` : '/color',

  REDIRECT: '/redirect',
  UNIVERSITIES: '/universities',
};
