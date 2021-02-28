import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/registeruser";
  private _loginUser = "http://localhost:3000/loginuser";
  private _loginAdmin = "http://localhost:3000/loginadmin";
  private _addTimesheetData = "http://localhost:3000/addtimesheetdata";

  constructor(private http: HttpClient, private _router: Router) { }
 
  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl,user);
  }

  loginUser(userNameAndPasswordObjectInBody) 
  {
    return this.http.post<any>(this._loginUser, userNameAndPasswordObjectInBody);
  }
  addTimesheetData(userDataOfTimesheet)
  {
    return this.http.post<any>(this._addTimesheetData,userDataOfTimesheet);
  }

  loginAdmin(userNameAndPasswordObjectInBody) 
  {
    return this.http.post<any>(this._loginAdmin, userNameAndPasswordObjectInBody);
  }
  
  loggedIn() {
    return !!localStorage.getItem('token') ;
      
  }
  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }
}
