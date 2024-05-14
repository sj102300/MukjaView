import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableItemProps {
    id: string;
    children: React.ReactNode
  }
  
  export const DraggableItem = ({ id, children }: DraggableItemProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: id,
    });

    const style = {
      touchAction: 'none', // Add touch-action: none here
      ...transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined
  };
  
    return (
      <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
        {children}
      </div>
    );
  };