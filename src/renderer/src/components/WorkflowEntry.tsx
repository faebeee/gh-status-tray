import { IWorkflowStatusEntry } from "@shared/types/IWorkflowStatusEntry";
import { AlertTriangle, Check, Hourglass } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "./ui/badge";

export const WorkflowEntry = ({ workflow }: { workflow: IWorkflowStatusEntry }) => {
  const statusColor = useMemo(() => {
    if (workflow.conclusion === "success") {
      return "bg-green-50 text-green-800";
    }

    if (workflow.conclusion === "failure") {
      return "bg-red-50 text-red-800";
    }

    return "";
  }, [workflow.conclusion]);
  return <div
    className={`flex p-4 items-center rounded-2xl ${statusColor}`}>
    <div>
      {workflow.conclusion === "success" && <Check />}
      {workflow.conclusion === "failure" && <AlertTriangle />}
      {workflow.status === "in_progress" && <Hourglass />}
    </div>
    <a className={"block ml-2 flex-1"} href={workflow.url} target="_blank" rel="noreferrer">
      <div className="flex flex-row justify-between items-center">
        <div className="text-lg">
          {workflow.name}
        </div>
        <div className="text-sm">
          {new Date(workflow.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="text-sm">
        {workflow.description}
      </div>

      <div className={'flex flex-row gap-1 mt-2'}>
      <Badge variant={'outline'}>
        Event: {workflow.event}
      </Badge>

      <Badge variant={'outline'}>
        Branch: {workflow.branch}
      </Badge>
      </div>
    </a>
  </div>;
};
