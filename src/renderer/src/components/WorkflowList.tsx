import { Button } from "@renderer/components/ui/button";
import { WorkflowEntry } from "@renderer/components/WorkflowEntry";
import { IWorkflowStatusEntry } from "@shared/types/IWorkflowStatusEntry";
import { TrashIcon } from "lucide-react";
import { FC, Fragment, useEffect, useState } from "react";
import { useInterval } from "react-use";
import { Separator } from "./ui/separator";

export type WorkflowListProps = {
  owner: string;
  repo: string
  onDelete?: () => void;
}

export const WorkflowList: FC<WorkflowListProps> = ({ owner, repo, onDelete }) => {
  const [workflows, setWorkflows] = useState<IWorkflowStatusEntry[]>([]);

  const load = async () => {
    const response = await window.app.getWorkflowStatus({ owner, repo });
    setWorkflows(response);
  };

  useInterval(() => {
    load();
  }, 10000);

  useEffect(() => {
    load();
  }, [owner, repo]);

  return (
    <div className={"border p-4 rounded-sm"}>
      <div className="p-4">
        <div className={"flex flex-row justify-between mb-4"}>
          <h2 className="mb-4 text-2xl text-foreground leading-none font-medium">{owner}/{repo}</h2>
          {onDelete && <Button onClick={onDelete}>
            <TrashIcon />
          </Button>}
        </div>
        {workflows.map((workflow) => (
          <Fragment key={workflow.id}>
            <WorkflowEntry workflow={workflow} />
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
