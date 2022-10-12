export interface ComplexSearch {
    results: Result[];
    step: Step[];
    
}


 interface Result {
    vegetarian:               boolean;
    vegan:                    boolean;
    glutenFree:               boolean;
    dairyFree:                boolean;
    veryHealthy:              boolean;
    cheap:                    boolean;
    veryPopular:              boolean;
    sustainable:              boolean;
    lowFodmap:                boolean;
    weightWatcherSmartPoints: number;
    gaps:                     Gaps;
    preparationMinutes:       number;
    cookingMinutes:           number;
    aggregateLikes:           number;
    healthScore:              number;
    creditsText:              string;
    license?:                 string;
    sourceName:               string; //el nombre
    pricePerServing:          number;
    id:                       number;
    title:                    string;
    readyInMinutes:           number;
    servings:                 number;
    sourceUrl:                string;
    image:                    string;
    imageType:                ImageType;
    summary:                  string;
    cuisines:                 string[];
    dishTypes:                string[];
    diets:                    string[];
    occasions:                string[];
    analyzedInstructions:     AnalyzedInstruction[];
    spoonacularSourceUrl:     string;
   
}

interface AnalyzedInstruction {
    name:  string;
    steps: Step[];
}

interface Step {
    number:      number;
    step:        string;
    ingredients: Ent[];
    equipment:   Ent[];
    length?:     Length;
}

export interface Ent {
    id:            number;
    name:          string;
    localizedName: string;
    image:         string;
}

export interface Length {
    number: number;
    unit:   Unit;
}

export enum Unit {
    Minutes = "minutes",
}

export enum Gaps {
    No = "no",
}

export enum ImageType {
    Jpg = "jpg",
}
