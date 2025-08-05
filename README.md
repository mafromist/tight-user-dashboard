# User Dashboard

A modern, responsive Vue.js application for managing users and their posts with multi-language support.

## Features

- **User Management**: Browse users with advanced filtering and search capabilities
- **Post Management**: Create, view, and delete user posts with rich text interface
- **Internationalization**: Full i18n support for English, Turkish, and German
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: PrimeVue components with Aura theme
- **State Management**: Pinia for efficient state handling
- **Toast Notifications**: User feedback for all operations
- **Confirmation Dialogs**: Safe deletion with user confirmation
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **UI Library**: PrimeVue with Aura theme
- **Styling**: Tailwind CSS + SCSS
- **Internationalization**: Vue I18n
- **HTTP Client**: Axios
- **Routing**: Vue Router 4
- **Icons**: PrimeIcons

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd user-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Header/         # Header components
│   ├── layout/         # Layout components (Sidebar, etc.)
│   ├── posts/          # Post-related components
│   └── table/          # Data table components
├── layouts/            # Page layouts
├── plugins/            # Vue plugins configuration
│   └── i18n/          # Internationalization setup
│       └── locales/   # Translation files
├── router/             # Vue Router configuration
├── services/           # API service layer
├── stores/             # Pinia stores
├── utils/              # Utility functions
├── views/              # Page components
└── assets/             # Static assets
```

## API Integration

The application integrates with JSONPlaceholder API:

- **Users**: `https://jsonplaceholder.typicode.com/users`
- **Posts**: `https://jsonplaceholder.typicode.com/posts`

## UI Components

### Key Components:

- **UserTable**: Advanced data table with filtering and search
- **PostSlider**: Interactive post carousel with pagination
- **AddPost**: Rich post creation form
- **SidebarLayout**: Responsive navigation sidebar
- **LanguageSelector**: Multi-language support

## Internationalization

Supported languages:

- **English** (en)
- **Turkish** (tr)
- **German** (de)

Language files located in `src/plugins/i18n/locales/`

## Responsive Design

- **Mobile**: Stacked layout, dropdown language selector
- **Tablet**: Hybrid layout with collapsible sidebar
- **Desktop**: Full sidebar with button language selector

## 🔧 Configuration

### Environment Variables

```env
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

### Vite Configuration

- Port: 3000 (configurable in `vite.config.js`)
- Auto-import for PrimeVue components
- Path aliases configured for clean imports

## 🎯 Key Features Implementation

### State Management

- **User Store**: Manages user data and current user state
- **Posts Store**: Handles post CRUD operations
- **Locale Store**: Manages language preferences

### Routing

- Locale-based routing (`/:locale/dashboard`, `/:locale/user-details/:id`)
- Route guards for locale validation
- Dynamic title updates

### Error Handling

- Toast notifications for user feedback
- Confirmation dialogs for destructive actions
- Graceful API error handling

## Development Guidelines

### Code Style

- ESLint + Prettier configuration
- Composition API preferred
- TypeScript-ready structure
- Component naming: PascalCase
- File naming: kebab-case

### Best Practices

- Reactive data with `ref()` and `reactive()`
- Computed properties for derived state
- Proper component composition
- Efficient re-rendering with `v-memo` where needed
- Accessibility-compliant markup

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## License

This project is licensed under the MIT License.
