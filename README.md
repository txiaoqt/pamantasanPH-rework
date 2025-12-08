# PamantasanPH - Philippine Universities Platform

A comprehensive platform for exploring and discovering universities across the Philippines. Find detailed information about institutions, programs, admissions, rankings, and more.

## Features

- 🌟 **Featured Universities**: Top-rated institutions across the Philippines
- 📚 **Comprehensive University Data**: Detailed information including programs, admissions, rankings, and facilities
- 💾 **Save Universities**: Bookmark universities for later reference
- 🔍 **Advanced Search & Filtering**: Find universities by location, type, rating, and subjects
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🔄 **Real-time Data**: Powered by Supabase for live updates

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Routing**: React Router

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm or yarn
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/txiaoqt/pamantasanPH-rework.git
cd pamantasanPH-rework
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the database to be set up

#### Configure Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase project details:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   You can find these values in your Supabase project dashboard under Settings → API.

   Note: Vite requires client-side environment variables to be prefixed with `VITE_`.

#### Set up the Database Schema
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and execute the contents of `supabase-schema.sql`

This will create all the necessary tables and insert the sample university data.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Database Schema

The application uses the following main tables:

- **`universities`**: Main university information
- **`saved_universities`**: User bookmarks (requires authentication)
- **`user_preferences`**: User preferences and filters

See `supabase-schema.sql` for the complete schema definition.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API service functions
├── lib/               # Library configurations
└── components/data/    # Static fallback data
```

## Key Features Overview

### University Data
- Name, location, establishment year
- Type (Public, Private, State)
- Ratings and rankings
- Programs and subjects offered
- Admission information and requirements
- Facilities and achievements
- Contact details and website links

### Save Functionality
- Bookmark universities for later reference
- Works with local storage (unauthenticated) or Supabase (authenticated users)
- Persistent across sessions

### Search & Filtering
- Search by name or description
- Filter by location, type, rating, subjects
- Advanced filtering options

## API Services

The application provides the following services:

- **UniversityService**: Handles all university data operations
- **SavedUniversitiesService**: Manages user bookmarks

Both services include fallback mechanisms to local storage if Supabase is unavailable.

## Development

### Adding New Universities
1. Use the Supabase dashboard to add new records to the `universities` table
2. Or execute INSERT statements via the SQL Editor

### Updating Components
Components are designed to be modular and reusable. When adding new features:

1. Create/update services in `src/services/`
2. Add custom hooks in `src/hooks/` if needed
3. Update components to use the new services

### Supabase Integration
All data fetching includes error handling and fallback to local data. The application will continue to work even without a Supabase connection, using the data in `src/components/data/universities.ts`.

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify (recommended)
1. Connect your repository to Vercel or Netlify
2. Add environment variables in your deployment platform
3. Deploy automatically on push

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and test thoroughly
4. commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or support, please open an issue on GitHub or contact the maintainers.
