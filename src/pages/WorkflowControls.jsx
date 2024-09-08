import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const WorkflowControls = ({
  workflowName,
  workflowId,
  setWorkflowName,
  setWorkflowId,
  handleSaveWorkflow,
  handleLoadWorkflow,
  handleExecuteWorkflow,
  handleFileChange,
}) => (
  <div className="p-4 flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <Label htmlFor="workflow-name">Workflow Name:</Label>
      <Input
        id="workflow-name"
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
        placeholder="Enter workflow name"
        className="max-w-sm"
      />
    </div>
    <div className="flex items-center space-x-4">
      <Input
        value={workflowId}
        onChange={(e) => setWorkflowId(e.target.value)}
        placeholder="Enter workflow ID"
        className="max-w-sm"
      />
      <Button onClick={handleSaveWorkflow}>Save Workflow</Button>
      <Button onClick={handleLoadWorkflow}>Load Workflow</Button>
      <Button onClick={handleExecuteWorkflow}>Execute Workflow</Button>
      <Input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  </div>
);