This is a self hosted app with a chat, notes, todos, shopping list and a watch list. All registered users under one instance get all the data. To separate the users, create another firebase project, set the credentials and deploy to another server.

Use the chat shortcuts, to directly create notes or todos, add to shopping and to watch list. 

### Self hosting

- Register on firebase
- Create a new project
- Get the credentials:
  - api key
  - auth domain
  - database url
  - project id
  - storage bucket
- Rename `env` to `.env` and insert the values.

### Install dependencies

`yarn`

### Start the app

`yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
