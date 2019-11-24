export class Producto {
    id?: string;
    name:string;
    description:string;
    ingredients:any =[];
    no_ingredients:any =[];
    nutritional_values:boolean;
    fat:string;
    carbohydrates:number;
    protein:number;
    total_calories:number;
    price_with_iva:string;
    iva:number;
    eat_in_restaurant:boolean;
    wear:boolean;
    delivery:boolean;
    status:boolean;
    images:any =[];
}
