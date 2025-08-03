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

Make sure you have Node.js and Yarn installed. For AWS integration, Amplify configuration is currently stored in `amplify_outputs.json` so project can be runned locally.

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
