export interface Item {
    id: string;
    title: string;
    total: number;
    description?: string;
    pricePerServing: number;
    category: string;
    imageUrl: string;
    addedOn: string;
    modifiedOn: string;
    isAvailable: boolean; 
}
