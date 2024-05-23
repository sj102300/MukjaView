
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
        neutralImageUrl: "../assets/images/MBTICharacters/SFM-F_netural",
        sadImageUrl: "../assets/images/MBTICharacters/SFM-F_sad",
        smileImageUrl: "../assets/images/MBTICharacters/SFM-F_smile",
    },{
        name: "SMF-F",
        taste: "달콤쌉싸름한 초콜릿 맛",
        title: "부드러운 맛의 에스코트형",
        neutralImageUrl: "../assets/images/MBTICharacters/SMF-F_netural",
        sadImageUrl: "../assets/images/MBTICharacters/SMF-F_sad",
        smileImageUrl: "../assets/images/MBTICharacters/SMF-F_smile",
    },{
        name: "MSF-F",
        taste: "능글한 치즈 맛",
        title: "럭셔리 무드의 감성 미학가",
        neutralImageUrl: "../assets/images/MBTICharacters/MSF-F_netural",
        sadImageUrl: "../assets/images/MBTICharacters/MSF-F_sad",
        smileImageUrl: "../assets/images/MBTICharacters/MSF-F_smile",
    },{
        name: "MFS-F",
        taste: "부드러운 바닐라 맛",
        title: "무드 가득한 맛 탐험가",
        neutralImageUrl: "../assets/images/MBTICharacters/MFS-F_netural",
        sadImageUrl: "../assets/images/MBTICharacters/MFS-F_sad",
        smileImageUrl: "../assets/images/MBTICharacters/MFS-F_smile",
    },{
        name: "FMS-F",
        taste: "진한 에스프레소 맛",
        title: "품격있는 미식의 선구자",
        neutralImageUrl: "../assets/images/MBTICharacters/FMS-F_netural",
        sadImageUrl: "../assets/images/MBTICharacters/FMS-F_sad",
        smileImageUrl: "../assets/images/MBTICharacters/FMS-F_smile",
    },{
        name: "FSM-F",
        taste: "끈적달달한 꿀 맛",
        title: "미식 우선의 분위기 감상가형",
        neutralImageUrl: "../assets/images/MBTICharacters/FSM-F_netural",
        sadImageUrl: "../assets/images/MBTICharacters/FSM-F_sad",
        smileImageUrl: "../assets/images/MBTICharacters/FSM-F_smile",
    },{
        name: "SFM-R",
        taste: "아삭아삭한 사과 맛",
        title: "신선한 맛의 발견가형",
        neutralImageUrl: "../assets/images/MBTICharacters/SFM-R_netural",
        sadImageUrl: "../assets/images/MBTICharacters/SFM-R_sad",
        smileImageUrl: "../assets/images/MBTICharacters/SFM-R_smile",
    },{
        name: "SMF-R",
        taste: "새콤달콤한 라즈베리 맛",
        title: "사교미식의 예술가형",
        neutralImageUrl: "../assets/images/MBTICharacters/SMF-R_netural",
        sadImageUrl: "../assets/images/MBTICharacters/SMF-R_sad",
        smileImageUrl: "../assets/images/MBTICharacters/SMF-R_smile",
    },{
        name: "MSF-R",
        taste: "풍미를 더해줄 한조각의 레몬 맛",
        title: "감성 분위기의 맛 탐험가",
        neutralImageUrl: "../assets/images/MBTICharacters/MSF-R_netural",
        sadImageUrl: "../assets/images/MBTICharacters/MSF-R_sad",
        smileImageUrl: "../assets/images/MBTICharacters/MSF-R_smile",
    },{
        name: "MFS-R",
        taste: "독특한 향기의 허브 맛",
        title: "감성 충만한 맛객형",
        neutralImageUrl: "../assets/images/MBTICharacters/MFS-R_netural",
        sadImageUrl: "../assets/images/MBTICharacters/MFS-R_sad",
        smileImageUrl: "../assets/images/MBTICharacters/MFS-R_smile",
    },{
        name: "FMS-R",
        taste: "중독적인 갈릭 맛",
        title: "감성적인 미식 탐험가",
        neutralImageUrl: "../assets/images/MBTICharacters/FMS-R_netural",
        sadImageUrl: "../assets/images/MBTICharacters/FMS-R_sad",
        smileImageUrl: "../assets/images/MBTICharacters/FMS-R_smile",
    },{
        name: "FSM-R",
        taste: "고소한 아몬드 맛",
        title: "친절한 미식 추구형",
        neutralImageUrl: "../assets/images/MBTICharacters/FSM-R_netural",
        sadImageUrl: "../assets/images/MBTICharacters/FSM-R_sad",
        smileImageUrl: "../assets/images/MBTICharacters/FSM-R_smile",
    },
]

export function getMukbtiAttribute (name: string){
    let idx = Mukbtis.findIndex(e => e.name === name)
    return Mukbtis[idx];
}
