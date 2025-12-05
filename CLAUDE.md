# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **French political polling tracker** application for the 2027 presidential election, visualizing survey results using three voting methods:
- **Jugement Majoritaire (Majority Judgment)** - Primary focus
- **Vote par Approbation (Approval Voting)**
- **Scrutin Uninominal (First-past-the-post)**

Built with React 19 + TypeScript + Vite, featuring responsive design for both desktop and mobile.

## Development Commands

- `npm run dev` - Start development server with HMR (automatically runs with `--host` for network access)
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint with production-grade rules
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages (builds then publishes to gh-pages branch)

## Code Architecture

### Technology Stack
- **Frontend**: React 19 with TypeScript
- **State Management**: Redux Toolkit (@reduxjs/toolkit) with Immer (enableMapSet for Set support)
- **Routing**: TanStack Router (@tanstack/react-router) with hash history
- **Build Tool**: Vite with React plugin and SVGR for SVG imports
- **UI Library**: Material-UI (@mui/material) with Emotion for styling
- **Charts**: ECharts (echarts-for-react) and Plotly (react-plotly.js)
- **Linting**: ESLint with type-aware rules and React-specific plugins

### Application Structure

The app uses a **responsive architecture** that renders different layouts based on screen size:

- **Entry Point**: `src/main.tsx` → `src/router.tsx` → `src/application/App.tsx`
- **Responsive Split**: `App.tsx` detects mobile/desktop and renders `Mobile.tsx` or `Web.tsx`
- **Data Loading**: App component dispatches Redux thunks to load survey data on mount

### Routing Architecture

Uses TanStack Router with **hash history** (for GitHub Pages compatibility):

- `/` → redirects to `/majoritaire`
- `/majoritaire` - Majority Judgment voting system (main section)
  - `/evolution-classement` - Ranking evolution chart
  - `/profile-merite-sondage` - Single poll merit profile
  - `/grille-profile-merite` - Merit profile grid over time
  - `/profile-merite-candidate/:candidateId` - Individual candidate merit profile
- `/approbation` - Approval voting results
- `/uninominal` - First-past-the-post results (currently under construction)

### State Management

Redux store located in `src/store/`:

- **Global Slice**: Language and error state
- **Majority Judgment Slice** (`jm-slice/`): Loads and manages survey data via `loadMajorityJugmentData` async thunk
- **Approval Slice** (`approval-slice/`): Loads approval voting data via `loadApprovalData` async thunk

**Data Services**:
- `src/services/MjServices.ts` - Fetches Majority Judgment data from GitHub releases via CORS proxy
- `src/services/ApprovalServices.ts` - Fetches Approval voting data

### Chart Architecture

**Three main chart types** (all in `src/application/chart/echart/`):

1. **MjRankingChart** (`mj-ranking-chart/`) - Candidate ranking evolution over time
   - Config: `rankingChartConfig.ts` (with animations: 1500ms cubicOut)
   - Series hook: `useCandidateRankingSeries.ts` (handles candidate selection/highlighting)
   - Interactive: Click candidates to highlight, shows reset button when selection active

2. **MjMeritChart** (`mj-merit-chart/`) - Merit profile comparison for single poll
   - Config: `meritChatConfig.ts`

3. **MjTimeMerit** (`mj-time-merit-chart/`) - Merit profile evolution over time
   - Config: `timeMeritConfig.ts`

**Shared Chart Components** (`src/share/component/`):
- `Chart.tsx` - ECharts wrapper with event handling
- `ChartTitle.tsx` - Standardized chart titles with source attribution
- `ChartCard.tsx` - Card wrapper for charts
- `Thumbnail.tsx` - Thumbnail previews

### Color System

Defined in `src/colors.ts`:
- **Theme colors**: Primary (`#003d8a`) and Secondary (`#f50057`)
- **Grade scale**: 5-point scale colors for Majority Judgment grades (very satisfied → very unsatisfied)
- **Candidate colors**: Political party colors mapped to each candidate by name

### Directory Structure

```
src/
├── application/          # Main application code
│   ├── chart/           # Chart components
│   │   ├── echart/     # ECharts-based visualizations
│   │   └── plotly/     # Plotly-based (experimental)
│   ├── mobile/         # Mobile-specific layouts
│   ├── web/            # Desktop layouts
│   │   └── chart-page/ # Full-page chart views
│   ├── App.tsx         # Root app with data loading
│   ├── Majoritaire.tsx # Majority Judgment main page
│   └── Approbation.tsx # Approval voting main page
├── share/              # Shared/reusable components
│   ├── component/      # UI components
│   ├── hooks/          # Custom hooks (useIsMobile, useElementSize)
│   └── layout/         # Layout components (BorderLayout)
├── store/              # Redux state management
│   ├── jm-slice/       # Majority Judgment state
│   ├── approval-slice/ # Approval voting state
│   └── store.ts        # Store configuration
├── services/           # Data fetching services
├── types/              # TypeScript type definitions
├── colors.ts           # Color constants
├── router.tsx          # Route configuration
└── main.tsx            # App entry point
```

### ESLint Configuration

Production-grade rules:
- TypeScript type-aware rules (`tseslint.configs.recommendedTypeChecked`)
- React-specific linting (`eslint-plugin-react-x`, `eslint-plugin-react-dom`)
- React Hooks rules and React Refresh integration
- Security rules (e.g., requiring `rel="noreferrer noopener"` for external links)
- All buttons must have explicit `type` attribute

### Deployment

- **Base Path**: `/sondages2027/` (configured in `vite.config.ts`)
- **GitHub Pages**: Deployed via `gh-pages` package to gh-pages branch
- **Data Source**: Survey data fetched from `MieuxVoter/mj-tracker-2027` GitHub releases via CORS proxy