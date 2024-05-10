
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styles from '../SignUp/pages.module.css'
import PrevNext from '../components/PrevNext';
import { useState } from 'react';


export default function FourthPage() {

    // https://velog.io/@gnoeyah/react-draggable-DragDrop-%EA%B5%AC%ED%98%84
    // https://velog.io/@deli-ght/react-beautiful-dnd-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95

    const [elementList, setElementList] = useState<Array<string>>(['맛', '분위기', '서비스']);
    const [orderList, setOrderList] = useState<Array<string>>(['','','']);

    let [isdragging, setIsDragging] = useState(false);

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;
        setIsDragging(false);

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Implement rearrangement logic here
    };

    const onDragStart = () => {
        setIsDragging(true);
        setOrderList(['',''])
    }

    return (
        <article className={styles.container}>
            <h3 className="text-lg font-bold w-9/10 break-keep">식당을 선택할 때 맛, 분위기, 서비스가 중요한 순서대로 배치해주세요.</h3>

            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable droppableId="elementList" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.elementList}
                        >
                            {elementList.map((item, index) => (
                                <Draggable key={item} draggableId={item} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="w-full"
                                        >
                                            <div className={styles.elementListItem}>{item}</div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="orderList" direction="vertical">
                    {(provided) => (
                        <div ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.orderList}
                        >
                            {orderList.map((item, index) => (
                                <Draggable key={item} draggableId={item} index={index}>
                                    {(provided) => (
                                        <div>
                                            <p>{index + 1}순위</p>
                                            <div ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={styles.tempPlace}>
                                                    {item}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>



            </DragDropContext>
            <PrevNext prev={"이전"} next={"다음"} />
        </article>
    )
}


{/* <div>
    <p>1순위</p>
    <div className={styles.tempPlace}>맛</div>
</div>
<div>
    <p>2순위</p>
    <div className={styles.tempPlace}></div>
</div>
<div>
    <p>3순위</p>
    <div className={styles.tempPlace}></div>
</div>
</div> */}