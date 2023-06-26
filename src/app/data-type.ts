export interface SignUp{
    name:String,
    email:String, 
    password:String
}

export interface login{
    email: String,
    password: String
}

export interface product{
    id:number,
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    quantity:undefined | number,
    productId: undefined | number
}

export interface cart{
    id:number | undefined,
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    quantity:undefined | number,
    productId:number,
    userId:number
}

export interface priceSummary{
    price:number,
    discount:number, 
    tax:number,
    delivery:number,
    total:number
}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number | undefined
}