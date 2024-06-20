export const fetchTasksQuery = `
query {
  tasks {
    id
    name
    description
    type
    startDate
    tags
    createdAt
    updatedAt
  }
}
`;

export const createTaskMutation = `
mutation CreateTask($input: CreateTaskInput!) {
  createTask(createTaskInput: $input) {
    id
    name
    description
    type
    startDate
    tags
  }
}
`;

export const updateTaskMutation = `
mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(updateTaskInput: $input) {
    id
    name
    description
    type
    startDate
    tags
  }
}
`;

export const deleteTaskMutation = `
mutation removeTask($id: String!) {
  removeTask(id: $id) {
    id
  }
}
`;
