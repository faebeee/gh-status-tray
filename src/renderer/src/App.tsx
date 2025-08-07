import { WorkflowList } from "@renderer/components/WorkflowList";

export const App = () => {

  return (
    <div className={"p-4 flex flex-col gap-4"}>
      <WorkflowList owner={"Konova-Ag"} repo={"emi-app"} />
      <WorkflowList owner={"Konova-Ag"} repo={"emi-ui"} />
      {/*<WorkflowList owner={"Konova-Ag"} repo={"emi-api"} />*/}
    </div>
  );
};
