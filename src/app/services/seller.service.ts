import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUp, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router: Router) { }

  sellerSignUp(data:SignUp){
    let result = this.http.post('http://localhost:3000/seller'
    , data, {observe: 'response'}).subscribe((result)=>{
      this.isSellerLoggedIn.next(true)
      localStorage.setItem('seller', JSON.stringify(data))
      this.router.navigate(['seller-home'])
      console.warn("result", result)
    })

    return this.isSellerLoggedIn;
  }

  reload(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }


  userLogin(data:login){
    console.warn("login", data)
   this.http.get<any>(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe: 'response' }).subscribe((result)=>{
    console.warn('login:: ', result)

    if(result && result.body && result.body.length){
      localStorage.setItem('seller', JSON.stringify(data))
      this.router.navigate(['seller-home'])
    }else{
      console.warn("login failed...")
      this.isLoginError.emit(true)
    }

   })
  }


}
