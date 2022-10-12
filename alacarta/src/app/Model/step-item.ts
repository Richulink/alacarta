export interface StepItem {

    steps: Step[];
}

 interface Step {
    number:      number;
    step:        string;
   
}

interface Ent {
    id:            number;
    name:          string;
    localizedName: string;
    image:         string;
}
interface Length {  
    number: number;
    unit:   string;
}


