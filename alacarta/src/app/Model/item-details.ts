export interface ItemDetails {

    [id: string]: {
        addedOn: string;
        total: number;
        itemId: string;
        category: string;
        title: string;
        pricePerServing: number;
        imageUrl: string
        cookingMinutes:number;
        vegan:boolean;
        fulldishes: number;
        healthScore: number;
      };
}
