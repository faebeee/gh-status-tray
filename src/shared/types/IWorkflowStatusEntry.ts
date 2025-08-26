export type IWorkflowStatusEntry = {
  id: number
  name: string;
  description: string;
  repo: string;
  conclusion: string;
  status: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  event: string;
  branch: string
}
