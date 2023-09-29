# Node CRUD Task 1

## Requirements of Task
- Sign Up - Email, Password, Profile Image.
- Log In - Email, Password - with JWT.
- Profile
- Update Profile

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/adarsh-2425/node-crud-task1.git
   cd node-crud-task1
   ```
2. Install dependencies:
    ```shell
    npm i
    ```

3. Configure your MongoDB connection in src/config/keys.ts.

4. Start the server
    ```shell
    npm start
    ```

## API Endpoints

### Authentication Routes

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Authenticate user and generate JWT token.

### Profile Routes

- `GET /api/profile/dashboard`: Profile
- `PUT /api/profile/update`: Update Profile

