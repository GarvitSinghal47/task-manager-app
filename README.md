[![My Skills](https://skillicons.dev/icons?i=typescript,react,redux,mui,nestjs,graphql,postgres,docker)](https://skillicons.dev)

# React Redux Material UI Nest JS Graphql Postgres

This project demonstrate on full stack app development with Frontend in React JS (Typescript), Redux, Backend in NestJS with Graphql and Postgres as DB.

## The Focus  🎯
In this repo we are focusing on following and practicing reasonable design pattern and implment clean code and coding best practices.
## Atomic design model / pattern

We shall practice atomic design model with properly arranging and aligning our components to atoms, molecules and organisms. Moreover, we can focus and emphasize on practicing writing clean code.

### What shall we have as features

We shall create task management page where user is able to create task, edit task and delete task. We shall use redux for state management and Material UI for styles.

We would also be having backend in NestJS using graphql and Postgres as our DB for data storage.

Here is glimpse of features we have implemented;

- Task Management
  - Task management CRUD operation using `react-hook-form`.
    - Edit task 
    - Delete task
  - Taks cards container (Trello 😎)
- File Management 
  - export a list of created tasks as JSON file
  - import a list of tasks as JSON file
- See the dashboard with insights about tasks
  - see the bar chart for tasks

### Installation

Once forked / cloned, spin up Postgres DB docker container;

```
docker-compose up -d
```

Now, install dependencies for frontend and backend apps by moving to respective folders and run below command.

```
npm i
```

### See project in action

Once installation is completed. Run below commands for Frontend and Backend.

**Frontend**

```
npm run start

```

**Backend**

```
npm run start:dev
```

### Testing

You can run below commands for testing Frontend and Backend.

```
npm run test
OR
npm run test:watch
```
