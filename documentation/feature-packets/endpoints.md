# Endpoints

## Front Endpoints

- "/"
  - Index of sketchbooks
- "/login"
  - Login form
- "/register"
  - Registration form
- "/sketchbook/:id"
  - View a sketchbook
- "/sketchbook/:id/:page"
  - View a specific page in a sketchbook
-  "/sketchbook/:id/timeline"
  - View a sketchbook timeline (only images posted by sketchbook owner along with timestamps)

## API Endpoints

- User
  - POST /users
    - Add user to users table
  - GET /users/:userId
    - Get user info, such as follows
  - PUT /users/:userId
    - Update user information, such as avatar
  - POST /users/:sketchbookId/follow
    - Add sketchbook to follows for current logged in user
  - DELETE /users/:sketchbookId/follow
    - Delete sketchbook from follows for current logged in user
- Sketchbook
  - GET /sketchbooks
    - Return basic data about sketchbooks to populate index
  - GET /sketchbooks/:sketchbookId
    - Return posts and graphs
  - POST /sketchbooks/:sketchbookID
    - Add new post
- Post
  - PUT /post/:postId
    - Update a post's body
- Goal
  - POST /goal/
    - Add a new goal for logged in user
  - POST /goal/:goalId/datapoint
    - Add datapoint for goal
  - PUT /goal/:goalId/
    - Update goal title, description, target, targetdate
