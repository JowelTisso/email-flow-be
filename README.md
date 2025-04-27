# Email Flow Backend

This repository contains the backend services for the [Email Flow](https://github.com/JowelTisso/email-flow) application, an email marketing tool that enables users to design and visualize email campaign flowcharts. The backend is built using Node.js and Express, providing APIs for managing nodes for flowchart and scheduling a job for cold emailing leads.

## Features

- **Add nodes in the flow chart** : Endpoints to create and retrieve nodes for the flowchart.
- **Schedule** : Feature to schedule a job to send mail to the leads at a certain time.
- **Integration with Frontend**: Seamless communication with the [Email Flow frontend](https://github.com/JowelTisso/email-flow) for a smooth user experience.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/JowelTisso/email-flow-be.git

   ```

2. **Navigate to the Project Directory**:

   ```
   cd email-flow-be
   ```

3. **Install Dependencies**:

   ```
   npm install
   ```

4. Set Up Environment Variables:

   Create a .env file in the root directory and add the necessary environment variables:

   ```
     PORT=5000
     MONGO_URI=your_database_connection_string
     ETHEREAL_EMAIL=katelin.fritsch@ethereal.email
     ETHEREAL_PASS=hSegHyrQ3HAXP9nxe9
   ```

   Replace your_database_connection_string with actual database connection string and other variables respectively.

## Running the Application:

To start the development server:

```
  npm run dev
```

The server will run on http://localhost:5000 by default.

## Check Mail:

To check if the mail has been sent
Go to `https://ethereal.email/messages`
and login using below credentials:

> ETHEREAL_EMAIL=katelin.fritsch@ethereal.email
> ETHEREAL_PASS=hSegHyrQ3HAXP9nxe9

## API Endpoints

The backend provides the following main API endpoints:

Nodes :

`GET /api/nodes`: Retrieve all nodes.

`POST /api/node`: Save all nodes.

Schedule :

`POST /api/schedule`: Create a new schedule.
