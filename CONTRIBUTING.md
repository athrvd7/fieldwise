# Contributing to FieldWise

Thank you for your interest in contributing to FieldWise! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- Familiarity with React, Next.js, and TypeScript

### Setup Development Environment

1. **Fork and clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/fieldwise-app.git
cd fieldwise-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env.local
# Add your OpenWeatherMap API key
```

4. **Start development server**
```bash
npm run dev
```

## 📝 Development Workflow

### Branch Naming Convention
- `feature/` - New features (e.g., `feature/crop-price-predictions`)
- `fix/` - Bug fixes (e.g., `fix/weather-api-error`)
- `docs/` - Documentation updates (e.g., `docs/api-guide`)
- `refactor/` - Code refactoring (e.g., `refactor/weather-service`)

### Commit Message Format
Follow conventional commits:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(weather): add 7-day forecast support

fix(location): handle geocoding errors gracefully

docs(readme): update installation instructions
```

## 🎨 Code Style

### TypeScript
- Use TypeScript for all new code
- Define interfaces for props and data structures
- Avoid `any` types

### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

### Naming Conventions
- Components: PascalCase (`WeatherDashboard.tsx`)
- Files: camelCase or kebab-case
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE

### Formatting
We use Prettier and ESLint:
```bash
npm run lint
```

## 🧪 Testing

### Before Submitting
1. Test your changes locally
2. Verify production build works: `npm run build`
3. Check for TypeScript errors: `npm run type-check`
4. Test multi-language support
5. Test responsive design (mobile, tablet, desktop)

## 📦 Pull Request Process

1. **Update documentation**
   - Update README.md if adding features
   - Add comments for complex logic
   - Update translations if adding UI text

2. **Create Pull Request**
   - Fill out the PR template
   - Link related issues
   - Add screenshots for UI changes
   - Describe testing performed

3. **Review Process**
   - Address reviewer feedback
   - Keep PR scope focused
   - Ensure CI passes

4. **After Merge**
   - Delete your feature branch
   - Pull latest main branch

## 🌍 Adding Translations

To add a new language:

1. Update `src/data/translations.ts`:
```typescript
export type Language = 'en' | 'hi' | 'mr' | 'YOUR_LANG';

export const TRANSLATIONS = {
  // ... existing translations
  YOUR_LANG: {
    appTitle: "Translation",
    // ... all other keys
  }
};
```

2. Update language selector in `Header.tsx`

3. Test all UI screens in the new language

## 🐛 Reporting Bugs

### Before Reporting
- Search existing issues
- Try latest version
- Collect error messages

### Bug Report Should Include
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, browser, Node version
- **Screenshots**: If applicable
- **Error messages**: Console logs, stack traces

## 💡 Suggesting Features

### Feature Request Template
```markdown
**Problem**: Describe the problem you're trying to solve

**Proposed Solution**: Your idea for solving it

**Alternative Solutions**: Other approaches considered

**Additional Context**: Screenshots, mockups, examples
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Mobile app (React Native)
- [ ] Historical weather data visualization
- [ ] Crop price prediction API integration
- [ ] Offline mode support

### Good First Issues
- [ ] Add more crop varieties to database
- [ ] Improve error messages
- [ ] Add more language translations
- [ ] Update documentation

### Help Wanted
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Accessibility (a11y)
- [ ] Testing coverage

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers
- Give constructive feedback
- Focus on what's best for the community

### Enforcement
Violations can be reported to the project maintainers. All reports will be reviewed and investigated.

## 📞 Getting Help

- **Discord**: [Join our community](#)
- **GitHub Issues**: For bugs and features
- **Email**: For private matters

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FieldWise! 🌾
