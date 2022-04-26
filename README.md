# Before you pull to main

- firstly you need to create your own branch from latest version of main branch (git checkout -b <name-of-branch>)
- on newly created branch you can develop what you want
- when you are finished you need to create pull request
- then if there are no conflicts with main branch you can merge your branch with main

## BAD PRACTICE

- never merge your branch with main from command line only in github using pull requests

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
In this project we are using yarn package manager instead of npm

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

This script is used to control if all files developer changed are compatible with airbnb style guide.

- it will show you in which files there are errors or warnings
- it will automatically fix some easy errors or warnings
- to show you errors and warnings immidiatelly you need to install eslint and prettier in your IDE (prefer VS Code)

here is link if you have problem to setup eslint and prettier in your IDE (VSCode setup)

- [how to setup](https://overengineered.dev/prettier-and-eslint-setup-for-vscode)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
