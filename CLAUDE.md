# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application with Material-UI components. The project follows modern React development practices with strict ESLint rules configured for production.

## Development Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint with production-grade rules
- `npm run preview` - Preview production build locally

## Code Architecture

### Technology Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite with React plugin
- **UI Library**: Material-UI (@mui/material) with Emotion for styling
- **Linting**: ESLint with type-aware rules and React-specific plugins

### Project Structure
- `src/` - Source code
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point
  - `assets/` - Static assets (images, icons)
  - `*.css` - Styling files
- `public/` - Public assets served directly
- `dist/` - Build output (ignored by git)

### ESLint Configuration
The project uses production-grade ESLint configuration with:
- TypeScript type-aware rules (`tseslint.configs.recommendedTypeChecked`)
- React-specific linting (`eslint-plugin-react-x`, `eslint-plugin-react-dom`)
- React Hooks rules and React Refresh integration
- Security rules (e.g., requiring `rel="noreferrer noopener"` for external links)

### TypeScript Configuration
- `tsconfig.app.json` - Application TypeScript config
- `tsconfig.node.json` - Node.js/build tools TypeScript config
- `tsconfig.json` - Base TypeScript config

## Important Notes

- This project is configured for production deployment with strict linting rules
- ESLint is configured to catch security issues and React best practices
- All external links must include `rel="noreferrer noopener"` for security
- Buttons must have explicit `type` attribute
- The project uses React 19 features and modern TypeScript