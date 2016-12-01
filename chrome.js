require('shelljs/global')
cp('-R', 'src/manifest.json', './dist/')
cp('-R', 'src/icon.png', './dist/')
cp('-R', 'src/extension/jquery.min.js', './dist/')
