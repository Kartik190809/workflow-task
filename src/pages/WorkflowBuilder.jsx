import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FilterDataNode, WaitNode, ConvertFormatNode, SendPostRequestNode } from './WorkflowNodes';
import { NodeDragButton } from './NodeDragButton';
import { WorkflowControls } from './WorkflowControls';
import { saveWorkflow, loadWorkflow, executeWorkflow, uploadCSV } from '../utils/workflowUtils';

const nodeTypes = {
  filterData: FilterDataNode,
  wait: WaitNode,
  convertFormat: ConvertFormatNode,
  sendPostRequest: SendPostRequestNode,
};

const initialNodes = [
  { id: 'start', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 0 } },
  { id: 'end', type: 'output', data: { label: 'End' }, position: { x: 250, y: 400 } },
];

const useStore = create((set) => ({
  workflowName: '',
  workflowId: '',
  csvFile: null,
  setWorkflowName: (name) => set({ workflowName: name }),
  setWorkflowId: (id) => set({ workflowId: id }),
  setCSVFile: (file) => set({ csvFile: file }),
}));

const WorkflowBuilderContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { workflowName, workflowId, csvFile, setWorkflowName, setWorkflowId, setCSVFile } = useStore();
  const { toast } = useToast();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const handleSaveWorkflow = async () => {
    if (!workflowName) {
      toast({ title: "Error", description: "Please enter a workflow name", variant: "destructive" });
      return;
    }
    try {
      const data = await saveWorkflow(workflowName, nodes, edges);
      setWorkflowId(data.id);
      toast({ title: "Success", description: `Workflow saved with ID: ${data.id}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save workflow", variant: "destructive" });
    }
  };

  const handleLoadWorkflow = async () => {
    if (!workflowId) {
      toast({ title: "Error", description: "Please enter a workflow ID", variant: "destructive" });
      return;
    }
    try {
      const { name, nodes: loadedNodes, edges: loadedEdges } = await loadWorkflow(workflowId);
      setWorkflowName(name);
      setNodes(loadedNodes);
      setEdges(loadedEdges);
      toast({ title: "Success", description: "Workflow loaded successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to load workflow", variant: "destructive" });
    }
  };

  const handleExecuteWorkflow = async () => {
    if (!workflowId) {
      toast({ title: "Error", description: "Please save the workflow before executing", variant: "destructive" });
      return;
    }
    if (!csvFile) {
      toast({ title: "Error", description: "Please upload a CSV file before executing", variant: "destructive" });
      return;
    }
    try {
      await uploadCSV(csvFile, workflowId);
      await executeWorkflow(workflowId);
      toast({ title: "Success", description: "Workflow execution started" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to execute workflow", variant: "destructive" });
    }
  };

  const handleFileChange = (event) => {
    setCSVFile(event.target.files[0]);
  };

  return (
    <div className="h-screen flex flex-col">
      <WorkflowControls
        workflowName={workflowName}
        workflowId={workflowId}
        setWorkflowName={setWorkflowName}
        setWorkflowId={setWorkflowId}
        handleSaveWorkflow={handleSaveWorkflow}
        handleLoadWorkflow={handleLoadWorkflow}
        handleExecuteWorkflow={handleExecuteWorkflow}
        handleFileChange={handleFileChange}
      />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <div className="p-4 flex justify-center space-x-4">
        <NodeDragButton type="filterData" label="Filter Data" />
        <NodeDragButton type="wait" label="Wait" />
        <NodeDragButton type="convertFormat" label="Convert Format" />
        <NodeDragButton type="sendPostRequest" label="Send POST Request" />
      </div>
    </div>
  );
};

const WorkflowBuilder = () => (
  <ReactFlowProvider>
    <WorkflowBuilderContent />
  </ReactFlowProvider>
);

export default WorkflowBuilder;