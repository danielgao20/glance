module.exports = {
  packagerConfig: {
    // Your packager options
    asar: true,
    // macOS specific options
    darwinDarkModeSupport: true,
    // icon: './path/to/your/icon.icns' // macOS icon needs .icns format
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        // DMG customization options
        format: 'ULFO', // Ultra-compressed
        // icon: './path/to/your/icon.icns',
        // background: './path/to/background.png', // Optional background image
        contents: (opts) => {
          return [
            {
              x: 448,
              y: 344,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 192,
              y: 344,
              type: 'file',
              path: opts.appPath
            }
          ];
        }
      }
    }
  ]
};