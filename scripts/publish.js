#!/usr/bin/env node

const childProcess = require('child_process')
const path = require('path')

const VERSIONINGS = ['major', 'minor', 'patch']

let [node, script, versioning] = process.argv

if (!versioning) {
  console.log('Versioning is not specified, it should be either "major", "minor", or "patch".')
  process.exit(1)
}
if (!VERSIONINGS.includes(versioning)) {
  console.log(`Invalid versioning "${versioning}"".`)
  process.exit(1)
}

console.log('>> Zettel > Frontend > Extension:')
console.log('Checking the git workspace to be clean...')

try {
  const stdout = childProcess.execSync('git status --porcelain', {
    cwd: path.join(__dirname, '..'),
    encoding: 'utf8',
    stdio: 'pipe',
  })
  if (stdout) {
    console.log('Git workspace is not clean, first commit all the changes.')
    process.exit(1)
  }
} catch ({ stderr }) {
  console.error(stderr)
  process.exit(1)
}

console.log(`Upgrading package version as "${versioning}"...`)

try {
  const stdout = childProcess.execSync(`npm version ${versioning}`, {
    cwd: path.join(__dirname, '..'),
    encoding: 'utf8',
    stdio: 'inherit',
  })
  // console.log(stdout)
} catch ({ stderr }) {
  console.error(stderr)
  process.exit(1)
}

const version = require(path.join(__dirname, '..', 'package.json')).version

console.log(`Version set to "${version}".`)
console.log('Building and publishing the package...')

try {
  const stdout = childProcess.execSync(
    'npm publish --registry https://gitlab.com/api/v4/projects/37538343/packages/npm/',
    {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      stdio: 'inherit',
    }
  )
  // console.log(stdout)
} catch ({ stderr }) {
  console.error(stderr)
  process.exit(1)
}

console.log('Committing current changes...')

try {
  const stdout = childProcess.execSync(
    `git add --all . && git commit --no-verify -m "build: publish extension core api ${version}"`,
    {
      cwd: path.join(__dirname, '..', '..'),
      encoding: 'utf8',
      stdio: 'inherit',
    }
  )
  // console.log(stdout)
} catch ({ stderr }) {
  console.error(stderr)
  process.exit(1)
}

console.log('Pushing the changes to the remote repository...')

try {
  const stdout = childProcess.execSync('git push', {
    cwd: path.join(__dirname, '..', '..'),
    encoding: 'utf8',
    stdio: 'inherit',
  })
  // console.log(stdout)
} catch ({ stderr }) {
  console.error(stderr)
  process.exit(1)
}

console.log(`Version ${version} is published successfully!`)
