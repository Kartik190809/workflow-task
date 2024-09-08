import { toast } from "@/components/ui/use-toast";

export const saveWorkflow = async (workflowName, nodes, edges) => {
  try {
    const response = await fetch('/api/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: workflowName, nodes, edges }),
    });
    if (!response.ok) throw new Error('Failed to save workflow');
    return response.json();
  } catch (error) {
    console.error('Error saving workflow:', error);
    throw error;
  }
};

export const loadWorkflow = async (workflowId) => {
  try {
    const response = await fetch(`/api/workflows/${workflowId}`);
    if (!response.ok) throw new Error('Failed to load workflow');
    return response.json();
  } catch (error) {
    console.error('Error loading workflow:', error);
    throw error;
  }
};

export const executeWorkflow = async (workflowId) => {
  try {
    const response = await fetch(`/api/execute-workflow/${workflowId}`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to execute workflow');
    return response.json();
  } catch (error) {
    console.error('Error executing workflow:', error);
    throw error;
  }
};

export const uploadCSV = async (file, workflowId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('workflowId', workflowId);

    const response = await fetch('/api/upload-csv', { method: 'POST', body: formData });
    if (!response.ok) throw new Error('Failed to upload CSV');
    
    toast({ title: "Success", description: "CSV file uploaded successfully" });
    return response.json();
  } catch (error) {
    console.error('Error uploading CSV:', error);
    toast({ title: "Error", description: "Failed to upload CSV file", variant: "destructive" });
    throw error;
  }
};