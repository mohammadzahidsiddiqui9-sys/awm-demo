const fs = require('node:fs');
const path = require('node:path');

const projectRoot = __dirname;
const outputDirectory = path.join(projectRoot, 'dist');

fs.mkdirSync(outputDirectory, { recursive: true });

for (const filename of ['index.html', 'app.js', 'styles.css']) {
  fs.copyFileSync(
    path.join(projectRoot, filename),
    path.join(outputDirectory, filename),
  );
}

fs.cpSync(
  path.join(projectRoot, 'public', 'assets'),
  path.join(outputDirectory, 'assets'),
  { recursive: true },
);
