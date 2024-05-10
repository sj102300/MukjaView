import { useDraggable } from '@dnd-kit/core';

interface DraggableItemProps {
    id: string;
    value: string;
  }
  
  export const DraggableItem = ({ id, value }: DraggableItemProps) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: id,
    });
  
    return (
      <div ref={setNodeRef} {...listeners} {...attributes}>
        {value}
      </div>
    );
  };