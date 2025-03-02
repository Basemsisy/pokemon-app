# Pokemon App

A React application that retrieves and displays Pokemon data from the PokeAPI. The app allows users to browse a list of Pokemon, view detailed information about each Pokemon

## Features

- Browse a paginated list of Pokemon
- Search for Pokemon by name
- View detailed information about each Pokemon
- Responsive design for mobile and desktop

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit & RTK Query for state management
- React Router for navigation
- Tailwind CSS for styling
- Vitest & React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn (I use PNPM)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pokemon-app.git
   cd pokemon-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Environment Configuration

The application uses environment variables to configure the API base URL. Create a `.env` file in the root directory with the following content:

```
VITE_API_BASE_URL=https://pokeapi.co/api/v2
```

You can modify this URL to point to a different API if needed.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint the codebase

## Testing

The application includes comprehensive unit and integration tests for components and Redux state management. Tests are written using Vitest and React Testing Library.

To run the tests:

```bash
npm run test
```

To run tests with coverage report:

```bash
npm run test:coverage
```

The coverage report will be generated in the `coverage` directory.

## API

The application uses the [PokeAPI](https://pokeapi.co/) to fetch Pokemon data. The API base URL can be configured using the `VITE_API_BASE_URL` environment variable.
