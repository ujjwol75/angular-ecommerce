import { EventEmitter, Injectable } from '@angular/core';
import { login } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  inValidUserAuth= new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(user: SignUp) {
    console.warn(user);
    this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  userLogin(data: login) {
    this.http
      .get<SignUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if(result && result.body?.length){
          this.inValidUserAuth.emit(false)
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        }else{
          this.inValidUserAuth.emit(true)
        }
        
      });
  }
}
