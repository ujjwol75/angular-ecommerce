import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productList : undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  editIcon = faEdit;

  constructor(private product:ProductService){

  }

  ngOnInit():void{
    this.list()
  }

  deleteProduct(id:number){
    console.warn("id: ", id)
    return this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage = "Product is Deleted!";

        this.list()
      }
    })

    


    setTimeout(()=>{
      this.productMessage = undefined
    },3000)


  }


  list(){
    this.product.productList().subscribe((result)=>{
      console.warn("result: ", result)
      this.productList = result
    })
  }

}
