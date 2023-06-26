import { Component } from '@angular/core';
import { SignUp, cart, login, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean = true
  authError:string = ""
  constructor(private user:UserService, private product:ProductService){

  }

  ngOnInit():void{
    this.user.userAuthReload();
  }

  signUp(data:SignUp){
    this.user.userSignUp(data)
  }

  login(data:login){
    console.warn(data);
    this.user.userLogin(data)
    this.user.inValidUserAuth.subscribe((result)=>{
      console.warn("result:", result)
      if(result){
        this.authError="Please Enter Valid User Credentials"
      }else{
        this.localCartToRemoteCart()
      }

      setTimeout(()=>{
        this.authError = ""
      }, 3000);

    })
    

  }

  openLogin(){
    this.showLogin = true 
  }


  openSignUp(){
    this.showLogin =false
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);
      

      cartDataList.forEach((product:product, index)=>{
        let cartData:cart = {
          ...product,
          productId:product.id,
          userId,
        };

        delete cartData.id;
        setTimeout(()=>{
          this.product.addToCart(cartData).subscribe((result)=>{
            console.warn("Item stored in db")
          })
          if(cartDataList.length === index+1){
            localStorage.removeItem('localCart')
          }
        }, 500)
      })

    }
    setTimeout(() => {
    this.product.getCartList(userId);
      
    }, 2000);   
  }


}
