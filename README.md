
# React Crafter

**React Crafter** is a CLI tool designed to quickly scaffold a modern React application with TypeScript, Ant Design, Sass, Webpack, and essential development tools like Husky and linters pre-configured. This tool simplifies the initial setup, allowing developers to start coding with best practices from the get-go.

## Features

- **React with TypeScript**: Automatically sets up a React project using TypeScript.
- **Ant Design Integration**: Includes Ant Design (antd) for UI components, fully integrated with your project.
- **Sass Support**: Configures Sass for better styling with variables, mixins, and more.
- **Webpack Configuration**: Custom Webpack setup for development and production builds.
- **Husky & Linters**: Pre-configured Git hooks with Husky, Commitlint, and Prettier to enforce code quality and style.
- **Atomic Design Structure**: Creates an atomic design folder structure to organize your components.
- **Redux Setup**: Sets up Redux with slices, middleware, and selectors for state management.
- **Test Suite**: Installs Jest and Playwright for comprehensive testing.

## Installation

First, install the CLI globally via npm:

```bash
npm install -g react-crafter
```

Or use it directly with npx (no installation required):

```bash
npx react-crafter <project-directory>
```

## Usage

To create a new React project, simply run:

```bash
npx react-crafter my-new-app
```

Replace `my-new-app` with the name of your project.

### Example:

```bash
npx react-crafter awesome-project
```

## Commands

Here’s a summary of the commands you can use after setting up your project:

1. **Start Development Server**:
    ```bash
    npm start
    ```
    Starts the development server with Webpack. The project is served using Webpack Dev Server with the configuration specified in `webpack.config.js`.

2. **Build for Production**:
    ```bash
    npm run build
    ```
    Builds the project for production. Webpack compiles the project and outputs the optimized bundle in the `/dist` directory.

3. **Run Tests**:
    ```bash
    npm test
    ```
    Placeholder for running tests. Currently, it does not run any tests but can be customized to run Jest or other test suites.

4. **Run Tests in Watch Mode**:
    ```bash
    npm run test:dev
    ```
    Runs tests in watch mode using React Scripts. Suitable for a test-driven development approach.

5. **Format Staged Files**:
    ```bash
    npm run pretty-quick
    ```
    Formats all staged files using Prettier. Ensures that code is consistently formatted before committing.

6. **Lint Entire Codebase**:
    ```bash
    npm run lint:prettier
    ```
    Checks the format of the entire codebase using a custom script. It can be used to ensure that all files adhere to Prettier’s formatting rules.

7. **Format Entire Codebase**:
    ```bash
    npm run prettier
    ```
    Formats the entire codebase using Prettier based on the configuration in `.prettierrc`.

8. **Format & Commit**:
    ```bash
    npm run prettier:commit
    ```
    Applies Prettier formatting to staged files before committing. Ensures that committed code is properly formatted.

9. **Eject Project**:
    ```bash
    npm run eject
    ```
    Ejects the project from Create React App. This command exposes the underlying configuration files for full control but cannot be undone.

10. **Prepare Husky**:
    ```bash
    npm run prepare
    ```
    Installs Husky hooks. This script is automatically run after dependencies are installed, setting up Git hooks for the project.

## Customization

React Crafter provides a base setup for React projects, but it is also customizable to fit your specific needs:

- **Pre-configured files**: Files like `prettier-commit.js`, `check-format.js`, and others are copied during setup.
- **Package.json customization**: The CLI updates `package.json` with custom scripts tailored to your project’s needs.
- **Atomic design structure**: The tool creates a folder structure based on atomic design principles to help organize components.

## Post-Setup Options

After the project is set up, you’ll be prompted to choose how to open the project:

- **Terminal**
- **VSCode**
- **Neovim**
- **None**

This feature ensures you can start working in your preferred environment immediately after setup.

## Contributing

Contributions are welcome! If you have ideas, feature requests, or find bugs, please submit an issue or a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
