# Social-Network-API
An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.  The API uses NoSQLMongoDB database, Mongoose ODM and Express.js,

## Description

* the user can start the social network API by entering the following command to start the server and to sync the Mongoose models with the MongoDB database
* When the user opens API GET routes in Insomnia for users and thoughts then the data for each of these routes is displayed in a formatted JSON
* When the user tests API POST, PUT, and DELETE routes in Insomnia then they are able to successfully create, update, and delete users and thoughts in the database
* When the user tests API POST and DELETE routes in Insomnia, they are able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
* The Models is and API Routes are described below

### Models

**User**:

* `username`
  * String
  * Unique
  * Required
  * Trimmed

* `email`
  * String
  * Required
  * Unique
  * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
  * Array of `_id` values referencing the `Thought` model

* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)

**Schema Settings**:

A virtual called `friendCount` is provided that retrieves the length of the user's `friends` array field on query.

---

**Thought**:

* `thoughtText`
  * String
  * Required
  * Must be between 1 and 280 characters

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

* `username` (The user that created this thought)
  * String
  * Required

* `reactions` (These are like replies)
  * Array of nested documents created with the `reactionSchema`

**Schema Settings**:

A virtual called `reactionCount` is provided that retrieves the length of the thought's `reactions` array field on query.

---

**Reaction** (SCHEMA ONLY)

* `reactionId`
  * Use Mongoose's ObjectId data type
  * Default value is set to a new ObjectId

* `reactionBody`
  * String
  * Required
  * 280 character maximum

* `username`
  * String
  * Required

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

**Schema Settings**:

This is not be a model, but rather is used as the `reaction` field's subdocument schema in the `Thought` model.

### API Routes

**`/api/users`**

* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`

**BONUS**: Removing a user's associated thoughts when a user is deleted.

---

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list

* `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

* `GET` to get all thoughts

* `GET` to get a single thought by its `_id`

* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

* `PUT` to update a thought by its `_id`

* `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## Technology Used

* Uses the [express package](https://www.npmjs.com/package/express).
* Uses the [moonoose package](https://www.npmjs.com/package/mongoose) 
* Uses the MongoDB as database

## Installation

  To install necessary dependencies, run the following command:
  ```
  npm i
  ```
  To install MongoDB database locally:
  ```
  Follow the MongoDB installation guide on The Full-Stack Blog at https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb
  ```
  
  To create the seed data, do the following steps:
  ```
  npm run seed
  ```
  Run the server using the following command:
  ```
  npm run dev (to start with nodemon) OR

  npm start
  ```

## Mock Up

You can access the walkthrought video on Google Drive at: https://drive.google.com/file/d/1zcU-pfHcHx4elPuo2f8xFYOr64iVqdck/view?usp=sharing
The walkthrough video showsthe following:
* Seeding of the data in local MongoDB
* Starting of server with nodemon mode
* Examples of the application's API routes being tested in Insomnia.
  * GET(all & single), POST, PUT, and DELETE routes for users being tested in Insomnia.
    * Bonus: when you delete a user, associated thoughts are deleted too .  Please wait till end of the video to see this.
  * GET(all & single) , POST, PUT, and DELETE routes for thoughts being tested in Insomnia.
  * POST and DELETE routes for a user’s friend list being tested in Insomnia.
  * POST and DELETE routes for reactions to a thoughts being tested in Insomnia.

## Usage
1. You can access the file in GitHub repository: https://github.com/rbhumbla1/E-Commerce-Back-End
2. Run the application in the terminal using this command: 
```
npm server OR  npm run dev
```
3. You can access the routes using the insomnia using prefix http://localhost:3001

## License
None

## Contributing

Contact owner

## Questions

  If you have any questions about the repository and project, or would like to open an issue or would like to contact me for contributing or any other subject, you can do so at rima.bhumbla@gmail.com. You can welcome to see more of my work at https://github.com/rbhumbla1.


