import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { CloudUploadIcon } from 'lucide-react';

const ExecuteWorkflow = () => {
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [file, setFile] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const response = await fetch('/api/workflows');
      if (response.ok) {
        const data = await response.json();
        setWorkflows(data);
      } else {
        throw new Error('Failed to fetch workflows');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch workflows",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedWorkflow || !file) {
      toast({
        title: "Error",
        description: "Please select a workflow and upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('workflowId', selectedWorkflow);

    try {
      const response = await fetch('/api/execute-workflow', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Workflow execution started",
        });
      } else {
        throw new Error('Failed to execute workflow');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute workflow",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Run Workflow</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="workflow">Select Workflow</Label>
          <Select onValueChange={setSelectedWorkflow} value={selectedWorkflow}>
            <SelectTrigger>
              <SelectValue placeholder="Select a workflow" />
            </SelectTrigger>
            <SelectContent>
              {workflows.map((workflow) => (
                <SelectItem key={workflow.id} value={workflow.id}>
                  {workflow.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">Drag and drop Files Here to Upload</p>
          <p className="text-sm text-gray-500">Or Select Files to Upload</p>
          <Input
            id="file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <Label htmlFor="file" className="mt-2 inline-block cursor-pointer">
            <Button type="button" variant="outline">Select Files</Button>
          </Label>
        </div>
        {file && <p>Selected file: {file.name}</p>}
        <Button type="submit">Run Workflow</Button>
      </form>
    </div>
  );
};

export default ExecuteWorkflow;