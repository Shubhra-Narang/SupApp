# SupApp

A modern chat application built with React and Vite, featuring real-time messaging, group chats, and a sleek dark mode interface.

deployed link : https://sup-app-uiow.vercel.app/

## Features

- 💬 Real-time messaging
- 👥 Group chat creation and management
- 🌙 Dark mode support
- 📎 File and image sharing
- 🔔 Message status indicators (sent, delivered, read)
- ⭐ Message starring
- 🔐 User authentication
- ⚡ Fast and responsive UI

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shubhra-Narang/SupApp.git
   cd SupApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Running the Production Build Locally

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
├── Chat.tsx          # Chat component
├── Login.tsx         # Login component
├── NewGroupModal.tsx # Group creation modal
├── SettingsModal.tsx # Settings modal
└── Sidebar.tsx       # Sidebar navigation
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SOME_KEY=your-value
```

## Deployment

This project is configured for deployment on Vercel. The deployment configuration is handled through `vercel.json` and includes:

- Automatic builds on push to main branch
- SPA fallback routes
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
