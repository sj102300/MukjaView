
import styles from '../SignUp/pages.module.css'
import PrevNext from '../components/PrevNext';
import { DndContext } from '@dnd-kit/core';
import { DraggableItem } from './draggable';
import { DroppableItem } from './droppable';

export default function FourthPage() {

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            console.log(`Move ${active.id} over ${over.id}`);
            // Add your logic to rearrange items or handle the drop
        }
    };

    return (
        <article className={styles.container}>
            <h3 className="text-lg font-bold w-9/10 break-keep">식당을 선택할 때 맛, 분위기, 서비스가 중요한 순서대로 배치해주세요.</h3>
            <DndContext onDragEnd={handleDragEnd}>
                <div className={styles.elementList}>
                    <DraggableItem id={'elementListItem1'} value={'맛'}></DraggableItem>
                    <DraggableItem id={'elementListItem2'} value={"분위기"} ></DraggableItem>
                    <DraggableItem id={'elementListItem3'} value={"서비스"} ></DraggableItem>
                </div>
                <div className={styles.orderList}>
                    <DroppableItem id={"orderListItem1"}>
                        <p>1순위</p>
                        <div className={styles.tempPlace}></div>
                    </DroppableItem>

                    <DroppableItem id={"orderListItem2"}>
                        <p>2순위</p>
                        <div className={styles.tempPlace}></div>
                    </DroppableItem>
                    <DroppableItem id={"orderListItem3"}>
                        <p>3순위</p>
                        <div className={styles.tempPlace}></div>
                    </DroppableItem>
                </div>
            </DndContext>
            <PrevNext prev={"이전"} next={"다음"} />
        </article>
    )
}