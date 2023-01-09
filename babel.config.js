const presets = [
  ['@babel/preset-env', {
    targets: {
      edge: '17',
      firefox: '50',
      chrome: '64',
      safari: '11.1',
    },
    useBuiltIns: 'entry',
    corejs: {
      version: '3.27.1',
      proposals: true,
    },
  }],
];

export default { presets };
