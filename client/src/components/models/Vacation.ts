export interface Vacation {
    vacationId?:number;
    destination?:string;
    price?:number;
    startDate?:number;
    endDate?:number;
    description?:string;
    image?:string;
    numOfFollowers?:number
    userId:number | boolean;
};
