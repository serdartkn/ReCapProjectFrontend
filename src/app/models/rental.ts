export interface Rental{
    id:number;
    carName:string;
    customerName:string;
    rentDate:Date;
    returnDate?:Date;
}