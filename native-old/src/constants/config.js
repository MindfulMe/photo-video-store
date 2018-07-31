const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // App Details
  appName: 'Baby',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  gaTrackingId: (devMode) ? 'UA-84284256-2' : 'UA-84284256-1',
};
