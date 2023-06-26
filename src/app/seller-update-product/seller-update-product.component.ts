import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import {  product } from '../data-type'

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  productData: undefined | product;
  productMessage:undefined | string;


  constructor(private route:ActivatedRoute, private product:ProductService){

  }


  ngOnInit():void{
    let productId = this.route.snapshot.paramMap.get('id')
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn("data", data);
      
      this.productData = data;
    })
    
  }

  submit(data:any){
    console.warn('UPDATE DATA', data);

    if(this.productData){
      data.id = this.productData.id
    }

    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage = "Product has been updated!"
      }

    });

    setTimeout(( )=>{
      this.productMessage=undefined;
    }, 3000);
    
  }

}
