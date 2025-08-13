# Find My Boat

Find My Boat is a web application built with Angular.js and AWS Amplify, designed to help users locate and manage boats efficiently. The project features seamless integration with AWS services for authentication, API management, and real-time data storage.

## Overview

This application provides a robust foundation for boat tracking and management, leveraging AWS Cognito for secure user authentication, AWS AppSync for scalable GraphQL APIs, and Amazon DynamoDB for fast, reliable data storage. It is optimized for scalability and ease of deployment, making it suitable for both individual developers and teams.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

# Getting Started

To start Find My Boat locally:

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Run the development server**

   ```bash
   yarn start
   ```

3. **Access the app**  
   Open [http://localhost:4200](http://localhost:4200) in your browser.

Make sure you have Node.js and Yarn installed. AWS Amplify configuration is currently stored in `amplify_outputs.json` so project can be started locally.

# Application Structure

This document provides an overview of the application's folder and file structure.

## Root Directory

- **.amplify/** — BE and AWS Amplify-related configuration and files.
- **.husky/** — Git hooks managed by Husky.
- **amplify/** — Backend resources and configuration for AWS Amplify.
- **instructions.md** — Ai Instructions for Copilot.
- **amplify_outputs.json** — AWS Amplify deployment outputs.
- **amplify.yml** — Amplify build configuration.
- **angular.json** — Angular CLI project configuration.
- **commitlint.config.js** — Commit message linting rules.
- **CONTRIBUTING.md** — Contribution guidelines.
- **LICENSE** — License information.
- **package.json** — NPM dependencies and project scripts.
- **README.md** — Project overview and instructions.
- **tsconfig.app.json** — TypeScript configuration for the application.
- **tsconfig.json** — Root TypeScript configuration.
- **tsconfig.spec.json** — TypeScript configuration for testing.
- **yarn.lock** — Dependency lock file for Yarn.

---

## **src/**

Contains the main application source code.

### **app/**

- **core/** — Core application services, interceptors, and configurations.
- **features/** — Feature-specific modules and components.
- **models/** — Data models and interfaces.
- **shared/components/** — Reusable shared components.
- **app.config.ts** — Application-level configuration.
- **app.css** — Global styles for the application.
- **app.html** — Root HTML template for the Angular app.
- **app.routes.ts** — Application routes definition.
- **app.spec.ts** — Root application tests.
- **app.ts** — Root application TypeScript file.

### **assets/**

- Static files such as images, icons, and other resources.

### Other files

- **favicon.ico** — Application favicon.
- **index.html** — Main HTML entry point.
- **main.ts** — Application bootstrap file.
- **styles.css** — Global styles.

---

## Notes

- This project is built with **Angular** and uses **AWS Amplify** for backend services.
- **Husky** and **Commitlint** are used to enforce Git commit message standards.
- The structure follows Angular's recommended modular architecture with `core`, `features`, and `shared` directories.

## Animations

Find My Boat leverages [@angular/animations](https://angular.io/guide/animations) to provide smooth transitions and interactive UI effects throughout the application. Angular Animations are used for modal dialogs, navigation transitions, and feedback elements, enhancing the overall user experience with responsive and visually appealing interactions.

## Map Integration

Find My Boat uses [Leaflet](https://leafletjs.com/) for interactive map functionality, providing users with a responsive and customizable mapping experience. For marine depth and navigation data, the application integrates [OpenSeaMap](https://www.openseamap.org/), allowing users to view nautical charts and depth information directly within the app. This combination enables efficient boat tracking and route planning with real-world marine data overlays.

## Error reporting

Error reporting in Find My Boat is managed using [BugSnag](https://www.bugsnag.com/), which automatically captures and reports errors to help maintain application reliability. Additionally, the application features an error modal that provides users with immediate feedback when an issue occurs, ensuring a smoother user experience and faster troubleshooting.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/angular/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Development Workflow

This project uses [Husky](https://typicode.github.io/husky/) to enforce Git hooks and [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages. Husky automatically checks commit messages and runs linting before code is committed, helping maintain code quality and a readable commit history.

- **Husky**: Prevents bad commits and enforces pre-commit checks.
- **Conventional Commits**: Standardizes commit messages for easier automation and changelog generation.

To get started, install dependencies and follow the commit message guidelines in the [Conventional Commits documentation](https://www.conventionalcommits.org/en/v1.0.0/).

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
