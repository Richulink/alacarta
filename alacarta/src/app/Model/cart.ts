import { ItemDetails } from "./item-details";

export interface Cart {
    items: ItemDetails;
    totalAmt: number;
    esvegano: boolean;
    
}

