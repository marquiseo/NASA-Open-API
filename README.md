# NASA Astronomy Picture of the Day API Integration

## Overview

This project integrates with NASA's Astronomy Picture of the Day (APOD) API, offering a Spring Boot application that provides endpoints to fetch the APOD based on different query parameters such as date, start_date, end_date, count, and thumbs. It utilizes the Spring Framework's capabilities to create a RESTful service that interacts with external APIs.

## Features

- **Current Picture Endpoint**: Fetch the current day's astronomy picture along with detailed information.
- **Query Pictures Endpoint**: Retrieve pictures based on specific query parameters like date ranges, count, and thumbnail availability.
- **Dynamic Query Parameters**: All query parameters are optional, providing flexibility in fetching data according to the user's needs.

## Setup and Configuration

### Prerequisites

- JDK 17 or later
- Gradle 7 or later (for building the project)
- IntelliJ IDEA (Recommended IDE)

### Running the Application

1. **Clone the repository** to your local machine using `git clone <repository-url>`.
2. **Open the project** in IntelliJ IDEA or your preferred IDE.
3. **Configure the NASA API key** in `src/main/resources/application.properties`:

   ```properties
   nasa.api.key=your_nasa_api_key_here
   ```
   Replace **your_nasa_api_key_here** with your actual NASA API key.

4. **Build the project** using Gradle:

   ```properties
   ./gradlew build

5. **Run the application**:

   ```properties
   ./gradlew bootRun
   ```
   The application will start on `localhost:8080`.

## API Endpoints

### Current Astronomy Picture
- Endpoint: `/api/nasa/apod/current`
- Method: `GET`
- Description: Fetches the current day's astronomy picture along with its details.
- Query Parameters: None

### Query Astronomy Pictures
- Endpoint: `/api/nasa/apod/query`
- Method: `GET`
- Description: Fetches pictures based on provided query parameters.
- Query Parameters:
  - **`date`**: The date of the picture in YYYY-MM-DD format.
  - **`start_date`**: The start of a date range in YYYY-MM-DD format.
  - **`end_date`**: The end of a date range in YYYY-MM-DD format.
  - **`count`**: Number of random pictures to return (cannot be used with date or range parameters).
  - **`thumbs`**: Boolean to indicate if thumbnail URLs should be included for video types.

### Example Request
To fetch the astronomy picture for January 1, 2024:

   ```properties
   GET http://localhost:8080/api/nasa/apod/query?date=2024-01-01
   ```

## Testing the Application
You can test the application endpoints using tools like Postman or cURL:

- For the current picture:

   ```properties
   curl http://localhost:8080/api/nasa/apod/current
   ```
- For a picture on a specific date:

   ```properties
   curl "http://localhost:8080/api/nasa/apod/query?date=2024-01-01"
   ```

## Dependencies
- Spring Boot Starter Web
- Spring Boot Starter Test
- Lombok

## Contribution
Contributions are welcome. Please fork the repository and submit a pull request with your proposed changes or enhancements.

## License
This project is open-sourced under the MIT License. See the LICENSE file for more details.



For more information on NASA's APOD API, visit NASA API.