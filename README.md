# React Crafter

**React Crafter** is a CLI tool designed to quickly scaffold a modern React application with your choice of JavaScript or TypeScript, optional UI libraries, Sass, Vite, and essential development tools like Husky and linters pre-configured. This tool simplifies the initial setup, allowing developers to start coding with best practices from the get-go.

## Features

- **React with JavaScript or TypeScript**: Choose your preferred language and the CLI sets up the project accordingly.
- **UI Library Options**: Choose between Ant Design, Material UI, Chakra UI, Radix UI, or none at all during setup.
- **Sass Support**: Configures Sass for better styling with variables, mixins, and more.
- **Vite Configuration**: Fast bundler setup for development and production builds.
- **Automatic Vite Template**: The CLI passes the correct template to `create-vite` based on your language choice, so no extra prompts appear.
- **Husky & Linters**: Pre-configured Git hooks with Husky, Commitlint, and Prettier to enforce code quality and style.
- **Atomic Design Structure**: Creates an atomic design folder structure to organize your components.
- **Redux Setup**: Sets up Redux with slices, middleware, and selectors for state management.
- **Test Suite**: Installs Jest and Playwright for comprehensive testing.
- **Automatic Git Initialization**: Initializes a Git repository for your project during setup.

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

The setup process automatically runs `git init` so your project starts with version control enabled.

### Example:

```bash
npx react-crafter awesome-project
```

During setup you'll select either JavaScript or TypeScript. React Crafter then calls `create-vite` with the matching template (`react` or `react-ts`) so you won't see any additional prompts.

## Commands

Here’s a summary of the commands you can use after setting up your project:

1. **Start Development Server**:

   ```bash
   npm run dev
   ```

   Starts the development server with Vite. The project is served using the Vite dev server.

2. **Build for Production**:

   ```bash
   npm run build
   ```

   Builds the project for production. Vite compiles the project and outputs the optimized bundle in the `dist` directory.

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

9. **Prepare Husky**:
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

We welcome contributions to React Crafter! If you have ideas, find bugs, or want to improve the project, please feel free to contribute. Here's how you can get involved:

### 1. Fork the Repository

Start by forking the repository to your own GitHub account:

1. Navigate to the [React Crafter GitHub repository](#).
2. Click the "Fork" button in the top right corner.

### 2. Clone Your Fork

Clone your forked repository to your local machine:

```bash
git clone https://github.com/your-username/react-crafter.git
cd react-crafter
```

### 3. Create a New Branch

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Changes

Make your changes or improvements in your new branch. Follow the existing code style and conventions.

### 5. Test Your Changes

Before submitting your changes, make sure everything works as expected:

```bash
npm run test
```

### 6. Commit and Push

Commit your changes with a descriptive commit message:

```bash
git add .
git commit -m "Add new feature: your-feature-name"
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

Go to the original repository and click on the "Pull Requests" tab. Click "New Pull Request" and select your branch. Provide a description of your changes and submit the pull request.

### 8. Review Process

Your pull request will be reviewed by the maintainers. You may be asked to make additional changes or clarifications before your code is merged.

### 9. Celebrate 🎉

Once your pull request is merged, you’ve officially contributed to React Crafter! Thank you for your contribution.

### Code of Conduct

Please note that we have a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [cargdev@gmail.com](mailto:cargdev@gmail.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
