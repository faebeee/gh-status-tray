import { IWorkflowStatusEntry } from "@shared/types/IWorkflowStatusEntry";
import { AlertTriangle, Check } from "lucide-react";
import { FC, Fragment, useEffect, useState } from "react";
import { Separator } from "./ui/separator";

export type WorkflowListProps = {
  owner: string;
  repo: string
}

export const WorkflowList: FC<WorkflowListProps> = ({ owner, repo }) => {
  const [workflows, setWorkflows] = useState<IWorkflowStatusEntry[]>([]);

  const load = async () => {
    const response = await window.api.checkWorkflow(owner, repo);
    setWorkflows(response);
  };

  useEffect(() => {
    load();
  }, [owner, repo]);

  return (
    <div className={"border p-4 rounded-sm"}>
      <div className="p-4">
        <h2 className="mb-4 text-2xl text-foreground leading-none font-medium">{owner}/{repo}</h2>
        {workflows.map((workflow) => (
          <Fragment key={workflow.id}>
            <div className={`flex items-center ${workflow.conclusion === "success" ? "" : "text-red-600"}`}>
              <div>
                {workflow.conclusion === "success" ? <Check /> : <AlertTriangle />}
              </div>
              <a className={"block ml-2"} href={workflow.url} target="_blank">
                <div className="text-sm">
                  {workflow.name}
                </div>

                <div className="text-sm">
                  {workflow.status} - {workflow.conclusion}
                </div>
                <div className="text-sm">
                  {workflow.description}
                </div>

                <div className="text-sm">
                  {workflow.createdAt}
                </div>
              </a>
            </div>
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
