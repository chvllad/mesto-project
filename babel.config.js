const presets = [
  ['@babel/preset-env', {
    targets: {
      firefox: '90',
      chrome: '90',
      safari: '14.1',
    },
    useBuiltIns: 'entry',
    corejs: {
      version: '3.27.1',
      proposals: true,
    },
  }],
];

export default { presets };
