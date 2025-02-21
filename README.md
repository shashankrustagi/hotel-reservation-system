# Hotel Room Reservation System

Welcome to the Hotel Room Reservation System, a React-based web application built using React 19 and Vite. This system allows users to book rooms in a hotel with 97 rooms across 10 floors, optimizing for minimal travel time between booked rooms and providing an interactive UI for managing bookings.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Functionality](#functionality)
- [System Design](#system-design)
- [What We Did](#what-we-did)
- [Styling](#styling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

The Hotel Room Reservation System simulates a hotel with 97 rooms across 10 floors, following specific room numbering and booking rules. Users can book up to 5 rooms at a time, prioritizing same-floor rooms and minimizing travel time (1 minute horizontally, 2 minutes per floor vertically).  The system includes a visual room grid, a booking interface, and options to generate random occupancy or reset bookings.

## Features

- Book up to 5 rooms at a time.
- Prioritize same-floor bookings.
- Minimize total travel time between booked rooms (horizontal: 1 minute, vertical: 2 minutes per floor).
- Visualize available (green) and booked (red) rooms across 10 floors.
- Generate random room occupancy for testing.
- Reset all bookings.
- Responsive and user-friendly interface built with React 19 and styled with CSS.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.17.0 or higher (recommended to use `nvm` for version management).
- **npm**: Version 10.x or higher (comes with Node.js).
- **Git** (optional, for version control).

You can check your versions with:

```
node -v
npm -v
```

## Project Structure

```
hotel-reservation-system/
├── node_modules/              # Dependencies installed via npm
├── public/                    # Public assets (e.g., favicon, index.html)
│   ├── vite.svg              # Vite logo (can be replaced)
│   └── index.html            # Main HTML file for the app
├── src/                      # Source code
│   ├── App.jsx               # Main App component with state and booking logic
│   ├── main.jsx             # Entry point for the React app
│   ├── HotelGrid.jsx        # Component for rendering the hotel room grid
│   ├── BookingInterface.jsx # Component for the booking interface (input and buttons)
│   └── index.css            # Global styles
├── .gitignore                # Git ignore file
├── package.json              # Project metadata and dependencies
├── README.md                 # This documentation
└── vite.config.js            # Vite configuration file
```

## Functionality

- Room Distribution: 97 rooms across 10 floors (Floors 1-8: 10 rooms each, Floor 9: 7 rooms, Floor 10: 3 rooms).

### Booking Rules:
- A single guest can book up to 5 rooms at a time.
- Priority is given to booking rooms on the same floor.
- If rooms on one floor are insufficient, the system books rooms across floors to minimize total travel time (1 minute horizontally between adjacent rooms, 2 minutes per floor vertically).
- Travel Time Calculation: Dynamically calculates the maximum travel time between any two booked rooms.
- Visualization: Rooms are displayed as green (available) or red (booked) boxes, organized by floor.


## System Design

- The Hotel Room Reservation System is designed as a single-page application (SPA) using React 19 for the frontend and Vite as the build tool. Here’s a detailed overview of the system design:

### Architecture

- **Frontend**: Built with React 19, utilizing functional components and hooks (e.g., useState, useEffect) for state management and side effects.
- **Build Tool**: Vite handles bundling, development server, and production builds, leveraging its fast ES modules and on-demand loading for optimal performance.
- **State Management**: The application maintains state in the App.jsx component using React’s useState to track bookedRooms and totalRooms. No external state management libraries (e.g., Redux) are used, as the state is simple and localized.

### Components:

- **App.jsx**: The top-level component managing the application state, booking logic, and rendering child components.
- **HotelGrid.jsx**: Renders the visual grid of rooms, displaying each floor’s rooms (10 per floor for floors 1-8, 7 for floor 9, 3 for floor 10) with colors indicating availability (green) or booking status (red).
- **BookingInterface.jsx**: Handles user input (number of rooms) and button interactions (Book, Reset, Random).

### Data Structure: 

- Rooms are represented as an array of numbers (e.g., 101-110 for Floor 1, 901-907 for Floor 9, 1001-1003 for Floor 10), stored in totalRooms. 
- Booked rooms are tracked in a Set for efficient lookup and updates.

## Booking Logic
- The system prioritizes booking rooms on the same floor if possible, using a greedy approach to select rooms with the smallest horizontal span (minimizing travel time within a floor).
- If insufficient rooms are available on one floor, it considers booking across two adjacent floors, optimizing for the minimum total travel time (1 minute per horizontal step, 2 minutes per floor vertically).
- Travel time is calculated dynamically using helper functions (getFloor, getPosition, travelTime, maxTravelTime) to ensure the maximum travel time between any two booked rooms is minimized.

## Performance Considerations

- Vite’s fast development server and production build ensure quick load times and hot module replacement for development.
- The React 19 components are optimized for rendering efficiency, with minimal re-renders using React’s virtual DOM.
- The room grid is rendered statically per floor, updating only when bookings change, minimizing performance overhead for 97 rooms.

## Scalability

- The current design is lightweight and suitable for a small-scale hotel reservation system. For larger systems, consider adding a backend (e.g., Node.js, Express) for persistent storage and user authentication, or integrating a state management library for complex state interactions.

## What We Did
Here’s a summary of the development process and key activities undertaken to build this system:

### Project Setup:
- Initially attempted to use create-react-app but switched to Vite due to its deprecation (as announced by React on February 14, 2025).
- Installed Node.js version 20.17.0 using nvm to ensure compatibility with modern tools and resolved npm permission issues (EACCES, EEXIST) on macOS.
- Created the project with npm create vite@latest hotel-reservation-system -- --template react to leverage React 19 and Vite’s fast build system.


## Development:
- Designed the UI with React components (App.jsx, HotelGrid.jsx, BookingInterface.jsx) to match the specified layout (title, input field, buttons, room grid per floor).
- Implemented booking logic in App.jsx to handle room allocation (up to 5 rooms), prioritize same-floor bookings, and minimize travel time using helper functions.
- Styled the application with CSS in index.css and App.css, using green for available rooms and red for booked rooms, ensuring a clean, responsive design.
- Added features for random occupancy generation and reset functionality, enhancing testing and usability.

## Testing and Debugging:
- Tested the UI and functionality locally using npm run dev, ensuring rooms update correctly (green to red) and travel time calculations work as expected.
- Resolved npm installation issues (e.g., permission errors, missing vite command) by clearing the npm cache, fixing permissions, and reinstalling dependencies.
- Verified the system works across all 10 floors, with correct room counts (10 per floor for 1-8, 7 for 9, 3 for 10).


## Version Control and Deployment:
- Initialized a Git repository with git init, committed the code, and pushed it to GitHub for version control (https://github.com/shashankrustagi/hotel-reservation-system.git).
- Deployed the project to Vercel for a live URL, enabling continuous deployment from GitHub and providing a public-facing version (https://hotel-reservation-system-sigma.vercel.app/)
- Ensured the deployment process used vite build to generate the dist/ folder, which Vercel hosts for production.

## Documentation:
- Created this README.md to document the project, including setup instructions, usage, system design, and development process.
Added comments in the code (e.g., App.jsx, HotelGrid.jsx) for clarity and maintainability.
- This documentation reflects the journey from setup to deployment, providing a roadmap for future enhancements or maintenance.


## Styling
- The UI is styled with CSS in src/index.css and src/App.css.
Available rooms are styled with a light green background (#90ee90).
- Booked rooms are styled with a tomato red background (#ff6347).
- The layout uses flexbox for the room grid, ensuring a clean, centered design.


## Deployment
- To deploy the application to a live URL (e.g., GitHub Pages, Netlify, Vercel):
- Build the production-ready app:
```
npm run build

```
- This generates a dist/ folder with optimized files.
- Deploy the contents of dist/ to your hosting service:

- GitHub Pages:
```
npm install --save-dev gh-pages
```

- Update package.json:
```
"homepage": "https://hotel-reservation-system-sigma.vercel.app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

```
- Then deploy:
```
npm run deploy
```
- Netlify or Vercel: Drag and drop the dist/ folder or use their CLI tools to deploy.


## Contributing
- Contributions are welcome! To contribute:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with descriptive messages.
- Push your changes and submit a pull request.
- Please ensure your code follows the existing style and includes tests (if applicable).

## Contact
- Author: Shashank Rustagi
- Email: mathisfunlike321@gmail.com
- GitHub: https://github.com/shashankrustagi