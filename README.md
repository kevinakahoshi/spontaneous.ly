# Spontaneous.ly
Sponatenous.ly is an app that is designed for users that want to partake in a spontaneous adventure.

### Figma
- https://www.figma.com/file/EjwaZdxQ74QSmY26RoPJ01/Spontaneous.ly?node-id=84%3A25

### DB Designer
- https://dbdesigner.page.link/iDbu

### Meistertask
- https://www.meistertask.com/app/project/eOadHQQN/final-project-spontaneous-ly

### Naming Convention
- File Structure: kebab-case
-- Example: example-component.jsx

- SQL Table Names: camelCase
-- Example: SELECT * FROM `exampleTable`;

- SQL Column Names: camelCase
-- Example: SELECT `messageId`, `sentAt` FROM `messages`;

- SQL Primary Keys: Avoid just using `id`
-- Example: `u`.`userId` instead of `u`.`id`

- SQL Boolean Flag: Use `is` prefix
-- Example: `isAccepted`

- SQL Strings: Indent the strings
-- Example: SELECT `userId`
              FROM `users`
             WHERE `userId` = $user_id

- PHP: snake_case
-- Example: function example_function() // $example_variable

- CSS Classes: kebab-case
-- Example: .example-class

- CSS IDs: kebab-case
-- Example: #example-id

# Live Demo
Link: https://spontaneouslyapp.com/

# Features
- User can by zip code
- User can filter results based on level of adventure, cost, and distance from their zipcode
- User can select an activity to commit to in their area
- User can reserve a spot at that activity
- User can gain points for completing the activity
- User can meet new people at the activity
- User can request to be a friend of other guests at that activity
- User can view ther Spontaneity Points
- User can view their friends list
- User can view their pending friend requests
- User can send and receive messages from friends
- User can view past activities
- User can log into their account

# Preview
![spontaneously](https://user-images.githubusercontent.com/53406674/70954210-14036d80-2021-11ea-9367-cf96cdc1f93e.gif)
