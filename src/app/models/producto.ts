export class Producto {
    id?: string;
    name:string;
    description:string;
    ingredients:string;
    no_ingredients:string;
    nutricional_values:boolean;
    fat:string;
    carbohyrates:number;
    protein:number;
    total_calories:number;
    price_with_iva:number;
    iva:number;
    eat_in_restaurant:boolean;
    wear:boolean;
    delivery:boolean;
    status:boolean;
    images:any =[];
}
