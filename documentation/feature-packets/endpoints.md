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
- Session
  - POST /session
  - DELETE /session
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
