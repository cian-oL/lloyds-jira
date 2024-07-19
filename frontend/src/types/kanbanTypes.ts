export type Column = {
  columnId: string;
  title: string;
};

export type Task = {
  taskId: string;
  content: string;
  columnId: string;
};
