import { useDroppable } from '@dnd-kit/core';

interface DroppableItemProps {
  id: string;
  children: React.ReactNode;
}

export const DroppableItem = ({ id, children }: DroppableItemProps) => {
  const { setNodeRef } = useDroppable({
    id: id
  });

  return <div ref={setNodeRef}>{children}</div>;
};
