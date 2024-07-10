
import styles from '../SignUp/pages.module.css'
import { DndContext } from '@dnd-kit/core';
import { DraggableItem } from './draggable';
import { DroppableItem } from './droppable';
import { useEffect, useState } from 'react';
import PrevNext from '../components/PrevNext';
import { useSwiper } from 'swiper/react';

interface FourthPageProps{
    setMBTIOrder: (MBTIOrder: string)=>void;
}

export default function FourthPage({ setMBTIOrder }: FourthPageProps) {

    const swiper = useSwiper();

    let [canNext, setCanNext] = useState<boolean>(false)
    let [보기, set보기] = useState<Set<string>>(new Set(['맛', '분위기', '서비스']))
    let [items, setItems] = useState<Array<string>>(['', '', '']);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            let copy = [...items]
            const activeIndex = copy.findIndex(item => item === active.id);
            const overIndex = Number(over.id);

            if (activeIndex < 0) {
                let 보기copy = new Set(보기);
                if (!copy[overIndex]) {
                    copy[overIndex] = active.id;
                }
                else{
                    보기copy.add(copy[overIndex]);
                    copy[overIndex] = active.id;
                }
                보기copy.delete(active.id);
                set보기(보기copy);
            }
            else {
                let tmp = copy[activeIndex];
                copy[activeIndex] = copy[overIndex];
                copy[overIndex] = tmp;
            }
            setItems(copy)
        }
    };

    const goNext = ()=>{
        let MBTIOrder = items.map((e)=> {
            if (e === '맛') { return 'F' }
            else if( e === '서비스' ) { return 'S'}
            else if( e === '분위기') { return 'M' }
        }).join('');
        setMBTIOrder(MBTIOrder)
        console.log(MBTIOrder);
        swiper.slideNext();
    }

    useEffect(() => {
        보기.size === 0 ? setCanNext(true) : null;
    }, [보기])

    return (

        <article className={styles.container}>
            <h3 className="text-lg font-bold w-9/10 break-keep">식당을 선택할 때 맛, 분위기, 서비스가 중요한 순서대로 배치해주세요.</h3>
            <DndContext
                onDragEnd={handleDragEnd}
            >
                <div className={styles.elementList}>
                    {
                        [...보기].map((e, i) => {
                            return (
                                e && <DraggableItem id={e}><div className={styles.elementListItem}>{e}</div></DraggableItem>
                            )
                        })
                    }
                </div>
                <div className={styles.orderList}>
                    {
                        items.map((e, i) => {
                            return (
                                <DroppableItem id={i.toString()}>
                                    <p>{i + 1}순위</p>
                                    {e ?
                                        <DraggableItem id={e}><div className={styles.realPlace}>{e}</div></DraggableItem>
                                        : <div className={styles.tempPlace}></div>}
                                </DroppableItem>
                            )
                        })
                    }

                </div>
            </DndContext>
            <PrevNext goNext={goNext} prev={""} next={canNext ? '다음' : ''} />
        </article>
    )
}
