import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp, login } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {


  showLogin = false;
  authError:String = "";

  constructor(private seller: SellerService, private router:Router){

  }

  // aafnai function define gareko form ko (html maa vayeko form ko)
  signUp(data:SignUp):void{
    this.seller.sellerSignUp(data)
  }

  login(data:login):void{
    this.authError = ""
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is not Correct"
      }
    })
  }

  ngOnInit():void{
    this.seller.reload()
  }

  openLogin(){
    this.showLogin = true
  }

  openSignUp(){
    this.showLogin = false
  }



}
