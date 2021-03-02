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
  private _applyForLeave = "http://localhost:3000/applyforleave";
  private _allUserData = "http://localhost:3000/getalluserdata";
  private _approveLeave = "http://localhost:3000/approveorrejectleave";
  private _appliedLeaveUser = "http://localhost:3000/appliedleaveuser";



  constructor(private http: HttpClient, private _router: Router) { }
 
  

  loginUser(userNameAndPasswordObjectInBody) 
  {
    return this.http.post<any>(this._loginUser, userNameAndPasswordObjectInBody);
  }
  addTimesheetData(userDataOfTimesheet)
  {
    return this.http.post<any>(this._addTimesheetData,userDataOfTimesheet);
  }

  applyLeave(userLeave){
    return this.http.post<any>(this._applyForLeave,userLeave);
  }

  approveLeave(adminApproval){
    return this.http.post<any>(this._approveLeave,adminApproval);
  }
  
  appliedLeaveUser(adminApproval){
    return this.http.post<any>(this._appliedLeaveUser,adminApproval);
  }

  loginAdmin(userNameAndPasswordObjectInBody) 
  {
    return this.http.post<any>(this._loginAdmin, userNameAndPasswordObjectInBody);
  }

  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl,user);
  }

  getAllUserData(user){
    return this.http.post<any>(this._allUserData,user);
  }
  
  loggedInUser() {
    return !!sessionStorage.getItem('tokenUser') ;
      
  }
  loggedInAdmin() {
    return !!sessionStorage.getItem('tokenAdmin') ;
      
  }
  getTokenUser() {
    return sessionStorage.getItem('tokenUser');
  }
  getTokenAdmin() {
    return sessionStorage.getItem('tokenAdmin');
  }

  logoutAll() {
    sessionStorage.removeItem('tokenUser');
    sessionStorage.removeItem('tokenAdmin');
  }
}
