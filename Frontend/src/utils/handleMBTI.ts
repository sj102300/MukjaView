
export interface MukbtiAttribute {
    name: string;       //SMF-F
    taste: string;      //달콤쌉싸름한 초콜릿 맛
    title: string;      //부드러운 맛의 에스코트형
    neutralImageUrl: string;
    sadImageUrl: string;
    smileImageUrl: string;
}

export const Mukbtis : Array<MukbtiAttribute>= [
    {
        name: "SFM-F",
        taste: "상큼한 딸기 맛",
        title: "친절한 맛의 열정가형",
        neutralImageUrl: "/MBTICharacters/SFM-F_neutral.png",
        sadImageUrl: "/MBTICharacters/SFM-F_sad.png",
        smileImageUrl: "/MBTICharacters/SFM-F_smile.png",
    },{
        name: "SMF-F",
        taste: "달콤쌉싸름한 초콜릿 맛",
        title: "부드러운 맛의 에스코트형",
        neutralImageUrl: "/MBTICharacters/SMF-F_neutral.png",
        sadImageUrl: "/MBTICharacters/SMF-F_sad.png",
        smileImageUrl: "/MBTICharacters/SMF-F_smile.png",
    },{
        name: "MSF-F",
        taste: "능글한 치즈 맛",
        title: "럭셔리 무드의 감성 미학가",
        neutralImageUrl: "/MBTICharacters/MSF-F_neutral.png",
        sadImageUrl: "/MBTICharacters/MSF-F_sad.png",
        smileImageUrl: "/MBTICharacters/MSF-F_smile.png",
    },{
        name: "MFS-F",
        taste: "부드러운 바닐라 맛",
        title: "무드 가득한 맛 탐험가",
        neutralImageUrl: "/MBTICharacters/MFS-F_neutral.png",
        sadImageUrl: "/MBTICharacters/MFS-F_sad.png",
        smileImageUrl: "/MBTICharacters/MFS-F_smile.png",
    },{
        name: "FMS-F",
        taste: "진한 에스프레소 맛",
        title: "품격있는 미식의 선구자",
        neutralImageUrl: "/MBTICharacters/FMS-F_neutral.png",
        sadImageUrl: "/MBTICharacters/FMS-F_sad.png",
        smileImageUrl: "/MBTICharacters/FMS-F_smile.png",
    },{
        name: "FSM-F",
        taste: "끈적달달한 꿀 맛",
        title: "미식 우선의 분위기 감상가형",
        neutralImageUrl: "/MBTICharacters/FSM-F_neutral.png",
        sadImageUrl: "/MBTICharacters/FSM-F_sad.png",
        smileImageUrl: "/MBTICharacters/FSM-F_smile.png",
    },{
        name: "SFM-R",
        taste: "아삭아삭한 사과 맛",
        title: "신선한 맛의 발견가형",
        neutralImageUrl: "/MBTICharacters/SFM-R_neutral.png",
        sadImageUrl: "/MBTICharacters/SFM-R_sad.png",
        smileImageUrl: "/MBTICharacters/SFM-R_smile.png",
    },{
        name: "SMF-R",
        taste: "새콤달콤한 라즈베리 맛",
        title: "사교미식의 예술가형",
        neutralImageUrl: "/MBTICharacters/SMF-R_neutral.png",
        sadImageUrl: "/MBTICharacters/SMF-R_sad.png",
        smileImageUrl: "/MBTICharacters/SMF-R_smile.png",
    },{
        name: "MSF-R",
        taste: "풍미를 더해줄 한조각의 레몬 맛",
        title: "감성 분위기의 맛 탐험가",
        neutralImageUrl: "/MBTICharacters/MSF-R_neutral.png",
        sadImageUrl: "/MBTICharacters/MSF-R_sad.png",
        smileImageUrl: "/MBTICharacters/MSF-R_smile.png",
    },{
        name: "MFS-R",
        taste: "독특한 향기의 허브 맛",
        title: "감성 충만한 맛객형",
        neutralImageUrl: "/MBTICharacters/MFS-R_neutral.png",
        sadImageUrl: "/MBTICharacters/MFS-R_sad.png",
        smileImageUrl: "/MBTICharacters/MFS-R_smile.png",
    },{
        name: "FMS-R",
        taste: "중독적인 갈릭 맛",
        title: "감성적인 미식 탐험가",
        neutralImageUrl: "/MBTICharacters/FMS-R_neutral.png",
        sadImageUrl: "/MBTICharacters/FMS-R_sad.png",
        smileImageUrl: "/MBTICharacters/FMS-R_smile.png",
    },{
        name: "FSM-R",
        taste: "고소한 아몬드 맛",
        title: "친절한 미식 추구형",
        neutralImageUrl: "/MBTICharacters/FSM-R_neutral.png",
        sadImageUrl: "/MBTICharacters/FSM-R_sad.png",
        smileImageUrl: "/MBTICharacters/FSM-R_smile.png",
    },
]

// export function getMukbtiAttribute (name: string){
//     let idx = Mukbtis.findIndex(e => e.name === name)
//     return Mukbtis[idx];
// }
export const getMukbtiAttribute = (name: string) =>{
    let idx = Mukbtis.findIndex(e => e.name === name)
    return Mukbtis[idx];
}
