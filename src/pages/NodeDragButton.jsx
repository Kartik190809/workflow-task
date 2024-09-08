import React from 'react';
import { Button } from "@/components/ui/button"

export const NodeDragButton = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Button
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      className="cursor-move"
    >
      {label}
    </Button>
  );
};