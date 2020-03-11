import { User } from './user.model';

export class Drive {

    public id: number;
    public date: String;
    public price: Number;
    public driver: User;
    public passengers: User[];

    constructor(id: number, date: String, price: Number, driver: User, passengers: User[]){
        this.id = id;
        this.date = date;
        this.price = price;
        this.driver = driver;
        this.passengers = passengers;

    }

    

}
