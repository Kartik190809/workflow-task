import { HomeIcon, GitBranchIcon, PlayIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import WorkflowBuilder from "./pages/WorkflowBuilder.jsx";
import ExecuteWorkflow from "./pages/ExecuteWorkflow.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Workflow Builder",
    to: "/workflow-builder",
    icon: <GitBranchIcon className="h-4 w-4" />,
    page: <WorkflowBuilder />,
  },
  {
    title: "Execute Workflow",
    to: "/execute-workflow",
    icon: <PlayIcon className="h-4 w-4" />,
    page: <ExecuteWorkflow />,
  },
];