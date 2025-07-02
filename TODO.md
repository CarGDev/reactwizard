# TODO: React Crafter Roadmap & Fixes

## ❗ Known Issues / Bugs

### 🔧 Core Architecture Issues
- [ ] 🔁 **Dual CLI Entry Points**: The project has two different CLI implementations (`index.js` and `bin/cli.js`) with conflicting logic. `index.js` uses `create-react-app` while `bin/cli.js` uses `create-vite`.
- [ ] 🧠 **Language Selection Inconsistency**: The CLI asks for **JavaScript or TypeScript**, but the implementation in `index.js` always uses `--template typescript` regardless of user choice.
- [ ] 📁 **Template System Confusion**: The project has both `pre-files/` (static templates) and `src/templates/` (dynamic templates), creating confusion about which system is active.

### 🎨 Styling & UI Issues
- [ ] 🎨 **Styling Selection Broken**: In `index.js`, `setupSass()` is called unconditionally, ignoring user's styling choice. The `src/setup/styles.js` has proper logic but isn't being used.
- [ ] 🧩 **CSS Modules Logic Missing**: The prompts ask about CSS Modules/styled-components/emotion but there's no implementation for this choice.
- [ ] 🎯 **UI Framework Integration**: UI framework selection works in `src/setup/dependencies.js` but the actual component setup is missing.

### 🧪 Testing Issues
- [ ] 🧪 **Testing Framework Setup Incomplete**: `src/setup/testing.js` only supports Jest and Mocha, but the main `index.js` has hardcoded test scripts that don't match.
- [ ] 🧩 **Test Package Installation**: The implementation always installs all test-related packages regardless of user selection.
- [ ] 🧪 **Limited Testing Options**: No support for Cypress, Playwright, or Vitest as mentioned in original TODO.

### 🗃️ State Management Issues
- [ ] 🔁 **Redux TypeScript Support**: `src/setup/redux.js` has proper TypeScript logic but `index.js` doesn't use it. Store files are always created in JavaScript.
- [ ] 🧬 **Store File Language Mismatch**: Store files are created with wrong extensions regardless of selected language.

### 🐚 Git & Hooks Issues
- [ ] 🐚 **Husky Configuration Incomplete**: `src/setup/husky.js` sets up pre-commit hooks but `index.js` deletes them with `deletePreCommitHook()`.
- [ ] 🔧 **Git Setup Logic**: `src/setup/gitInit.js` exists but isn't being used in the main flow.

### 📦 Package Management Issues
- [ ] 📦 **Dependency Installation Logic**: `src/setup/dependencies.js` and `src/setup/devDependencies.js` exist but aren't used in `index.js`.
- [ ] 🔄 **Package.json Scripts**: The main `index.js` has hardcoded package.json updates that conflict with the modular approach.

### 🏗️ Project Structure Issues
- [ ] 📁 **Atomic Design Implementation**: `src/templates/atomicStructure.js` exists but the main flow doesn't use it properly.
- [ ] 🧩 **Module Federation**: `src/setup/moduleFederation.js` exists but integration is incomplete.
- [ ] ❌ **React Native Support**: No detection or blocking for React Native projects as mentioned in original TODO.

---

## 🧠 Suggested Improvements / Roadmap Features

### 🔧 Architecture & Code Quality
- [ ] 🔧 **Consolidate CLI Entry Points**: Choose between `index.js` (CRA) or `bin/cli.js` (Vite) and remove the unused one. Vite is recommended for modern React development.
- [ ] 🔧 **Fix Language Selection**: Ensure TypeScript/JavaScript choice is properly passed to the template system and respected throughout the setup.
- [ ] 🔧 **Unify Template System**: Decide between static (`pre-files/`) vs dynamic (`src/templates/`) templates and implement consistently.
- [ ] 🧼 **Replace Legacy Commands**: Update package.json scripts to use Vite instead of Webpack:
  - `npm run start` → `vite`
  - `npm run build` → `vite build`

### 🎨 Enhanced UI & Styling
- [ ] 🎨 **Implement CSS Modules Logic**: Add support for CSS Modules, styled-components, and emotion based on user selection.
- [ ] 🎯 **UI Framework Integration**: Create actual component templates and setup for Ant Design, Material UI, Chakra UI, and Radix UI.
- [ ] 🎨 **Dynamic Style Generation**: Generate appropriate style files and imports based on user's styling choice.

### 🧪 Comprehensive Testing
- [ ] 🧪 **Expand Testing Framework Support**: Add support for:
  - ✅ Jest (unit testing)
  - ✅ Cypress (E2E testing)
  - ✅ Playwright (E2E testing)
  - ✅ Vitest (unit testing)
  - ✅ None
- [ ] 🧪 **Test Configuration**: Generate proper Jest/Vitest config files and sample tests.
- [ ] 🧪 **Selective Package Installation**: Only install test packages for the selected framework.

### 🗃️ State Management
- [ ] 🔁 **Fix Redux TypeScript Support**: Ensure Redux store and slices are properly typed when TypeScript is selected.
- [ ] 🧬 **Language-Aware File Generation**: Generate store files with correct extensions (.ts/.js) based on language choice.
- [ ] 🗃️ **Enhanced State Setup**: Add sample reducers, actions, and selectors for Redux/Zustand.

### 🐚 Git & Development Tools
- [ ] 🐚 **Complete Husky Setup**: Fix pre-commit and pre-push hooks configuration.
- [ ] 🔧 **Git Integration**: Properly integrate `src/setup/gitInit.js` into the main flow.
- [ ] 🧹 **Linting & Formatting**: Ensure ESLint, Prettier, and commitlint are properly configured.

### 📦 Package Management
- [ ] 📦 **Modular Dependency Installation**: Use the existing `src/setup/dependencies.js` and `src/setup/devDependencies.js` in the main flow.
- [ ] 📦 **Dynamic Package.json Updates**: Use `src/templates/packageJson.js` instead of hardcoded updates.

### 🏗️ Project Structure & Features
- [ ] 📁 **Atomic Design Implementation**: Properly integrate `src/templates/atomicStructure.js` with sample components.
- [ ] 🧩 **Module Federation**: Complete the integration of `src/setup/moduleFederation.js`.
- [ ] 🧰 **Config-Driven Setup**: Add support for YAML/JSON configuration files:
  ```bash
  react-crafter create-wizard --config stack.yaml
  ```
  Example stack.yaml:
  ```yaml
  ui: chakra
  language: typescript
  styling: scss
  testing: jest
  router: react-router
  ```
- [ ] 📦 **Plugin System**: Add a plugin system for optional features like Auth, Firebase, CI setup, etc.

### 📚 Documentation & Community
- [ ] 📜 **Dynamic README Generation**: Generate project-specific README based on selected stack.
- [ ] 🚀 **Demo Repository**: Create a demo repo using react-crafter to showcase production-quality setup.
- [ ] 🌐 **Online Demos**: Launch StackBlitz or Codespaces instant demos.
- [ ] 📢 **Community Outreach**: Write launch blog post and submit to:
  - awesome-react
  - awesome-nodejs
  - Reddit /r/reactjs or Hacker News

### 🛠️ CLI Generator Commands
- [ ] 🧩 **Component Generator**: Create a CLI subcommand `g` or `generate` for structured file generation:
  ```bash
  # Create a new atom component
  react-crafter g atom Button
  
  # Create a new API handler (REST GET)
  react-crafter g api get /users
  ```
  
  **Behavior:**
  - `g atom Button` generates:
    - `src/components/atoms/Button/Button.tsx` (or .jsx based on project language)
    - `src/components/atoms/Button/Button.module.scss` (or chosen styling)
    - `src/components/atoms/Button/index.ts` for exports
    - `src/components/atoms/Button/Button.test.tsx` (if testing is enabled)
    - Respects atomic structure (atoms, molecules, organisms)
  
  - `g api get /users` generates:
    - `src/api/getUsers.ts` (or .js)
    - Exports `getUsers()` method using Axios or Fetch
    - Optionally types the response if TypeScript is enabled
    - Infers function name from HTTP method + path
  
  **File Structure:**
  ```
  src/
    components/
      atoms/
        Button/
          Button.tsx
          Button.module.scss
          Button.test.tsx
          index.ts
    api/
      getUsers.ts
  ```
  
  **Requirements:**
  - Respect language (JS/TS), styling (SCSS/CSS/etc), and testing setup
  - Add friendly error message if structure is not found (e.g., project not initialized)
  - Should work both from project root and subfolders (optional, nice to have)
  
  **Optional Bonuses:**
  - Support `--dry-run` to preview file output
  - Add `g context` or `g hook` generators
  - Use template strings or external files to allow community-generated scaffolds

### 🔍 Code Analysis Findings
Based on my analysis of the codebase, here are the specific technical issues found:

#### File Structure Issues:
- **Dual CLI Implementation**: `index.js` (496 lines) uses `create-react-app` while `bin/cli.js` (28 lines) uses `create-vite`
- **Unused Modular Code**: `src/setup/` contains well-structured modules that aren't being used by the main flow
- **Template Confusion**: Both static (`pre-files/`) and dynamic (`src/templates/`) template systems exist

#### Logic Flow Problems:
- **Hardcoded vs Modular**: `index.js` has hardcoded logic while `src/setup/init.js` has proper modular structure
- **Missing Integration**: Many setup functions exist but aren't called in the main flow
- **Inconsistent Language Handling**: TypeScript/JavaScript choice isn't properly propagated

#### Specific Technical Debt:
- **Package.json Scripts**: Hardcoded scripts in `index.js` conflict with modular approach
- **Dependency Installation**: `src/setup/dependencies.js` has proper logic but isn't used
- **Testing Setup**: `src/setup/testing.js` only supports Jest/Mocha, missing modern alternatives
- **Husky Configuration**: Setup and deletion logic conflict with each other 