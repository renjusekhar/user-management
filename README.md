# User Management Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

This project is a user management application developed using Angular. It showcases various features like user listing with details, search and sorting capabilities, and lazy loading of components, all while following best practices in Angular development.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Key Features

- **Signals**: Implemented Angular signals for improved reactivity.
- **User Service**: Created a user service for managing user data.
- **State Management**: Defined state management service to handle application state effectively.
- **Search and Sort**: Users can search and sort the user list, displaying results in a responsive card layout.
- **SCSS**: Utilized SCSS for styling, with separated mixins and variables for better organization.
- **Lazy Loading**: Employed lazy loading to enhance performance by loading components only when needed.
- **HTTP Interceptor**: Added an interceptor to handle HTTP requests and responses.
- **Change Detection**: Implemented OnPush change detection strategy for optimizing performance.

## Getting Started

To get started with this project, follow these steps:

1. **Clone this repository**:
   ```bash
   git clone https://github.com/renjusekhar/user-management.git
   
2. **Install dependencies: Navigate into the cloned directory and run**:
   npm install
   
2. **Start the development server: Run the following command to start the development server**:

   ng serve --open
   Open the application: Open your browser and navigate to http://localhost:4200 to view the application.

**Project Structure**
This project was generated with Angular CLI version 18.2.9.

**Build**
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

**Features Overview**
   User Management
   The application features a comprehensive user management system that allows users to view a sortable list of individuals. This functionality enables users to easily organize and access the information they need, enhancing the overall user         experience.

  Search
  Users can efficiently search through the data, allowing for quick access to specific entries. This search capability streamlines the process of finding relevant information within the application.
  
  Routing and Guards
  The application employs robust routing and authentication guards to effectively manage user sessions. These mechanisms ensure secure access to various sections of the application, safeguarding sensitive information and enhancing user security.
  
  State Management
  The application utilizes signals to detect and respond to changes in value across the user interface.

CSS Utility
The application uses Bootstrap specifications and styles.

Colors
Defined in the src/app/styles/_variables.scss file.

Mixins
Defined in the src/app/styles/_mixins.scss file.

Feel free to reach out for any questions or contributions!

