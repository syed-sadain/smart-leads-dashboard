# Contributing to Smart Leads Dashboard

First off, thank you for considering contributing to Smart Leads Dashboard! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style
4. Update the documentation
5. Write a clear commit message

## Development Setup

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

## Style Guidelines

### TypeScript Style Guide

- Use TypeScript for all new code
- Avoid `any` type unless absolutely necessary
- Define proper interfaces and types
- Use meaningful variable names
- Add comments for complex logic

### Commit Messages

Follow the conventional commits specification:

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(leads): add email validation
fix(auth): resolve token expiration issue
docs(api): update authentication endpoints
```

### Code Style

**Backend (Node.js/TypeScript):**
- Use ES6+ features
- Use async/await over callbacks
- Handle errors properly
- Use meaningful variable names
- Follow REST API conventions

**Frontend (React/TypeScript):**
- Use functional components
- Use hooks appropriately
- Keep components focused and reusable
- Use TypeScript interfaces
- Follow React best practices

## Project Structure

```
backend/
  src/
    config/       - Configuration files
    controllers/  - Request handlers
    middleware/   - Express middleware
    models/       - Database models
    routes/       - API routes
    services/     - Business logic
    types/        - TypeScript types
    utils/        - Utility functions
    validators/   - Request validation

frontend/
  src/
    components/   - Reusable components
    hooks/        - Custom React hooks
    pages/        - Page components
    services/     - API services
    store/        - State management
    types/        - TypeScript types
    utils/        - Utility functions
```

## Testing

### Running Tests

Backend:
```bash
cd backend
npm test
```

Frontend:
```bash
cd frontend
npm test
```

## Documentation

- Update README.md if you change functionality
- Update API_DOCUMENTATION.md if you change API
- Add JSDoc comments for functions
- Update SETUP_GUIDE.md if you change setup process

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
