import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productData:undefined | product
  productQuantity:number = 1;
  removeCart:boolean = false;
  // quantity:number = 1;
  cartData: product | undefined

  constructor(private activeRoute: ActivatedRoute, private product:ProductService){

  }

  ngOnInit():void{
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn("productId", productId)
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn("productDetails:", result)
      this.productData = result

      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        console.warn("items::", items)
        // console.warn("productId::", productId)

        items = items.filter((item:product)=>productId === item.id.toString());
        if(items.length){
          
          this.removeCart =true;
          
        }else{
          this.removeCart = false;
        }
      }

      
      let user = localStorage.getItem('user');

      if(user){
        let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          console.warn("result", result)
          console.warn("productId mathiko::", productId)
          this.product.cartData.subscribe((result)=>{
              let item = result.filter((item:product)=>{
                // productId?.toString == item.productId?.toString
                // console.warn("productId :: ",item.productId, productId?.toString == item.productId?.toString)
                console.warn("productId :: ", item.productId, productId?.toString(), item.productId?.toString() === productId?.toString());
                return item.productId?.toString() === productId?.toString();
              })
              // console.warn("id vitrako:", item.productId?.toString)
              console.warn("checking", result)
              console.warn("item::", item)
           if(item.length){
              this.cartData = item[0]
              this.removeCart = true
            }
          })
      }


    })
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='max'){
      this.productQuantity+=1;
    }else if (this.productQuantity > 1 && val==='min') {
      this.productQuantity-=1;
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
    
    if(!localStorage.getItem('user')){
      console.warn(this.productData)
      this.product.localAddToCart(this.productData)
      this.removeCart = true;
    }else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(userId)
      let cartData:cart = {
        ...this.productData,
        userId,
        productId:this.productData.id
      }
      delete cartData.id
      console.warn("hello world")

      this.product.addToCart(cartData).subscribe((result)=>{
        console.warn("if result aayo vaney: ", result)
        if(result){
          this.product.getCartList(userId)
          this.removeCart = true
        }
      })
    }

  
    }
  }

  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(productId);
      this.removeCart = false
    }else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn("cartData:", this.cartData)
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        
        if(result){
          this.product.getCartList(userId);
        }
      })
      this.removeCart = false;
    }
    
  }
  


}
