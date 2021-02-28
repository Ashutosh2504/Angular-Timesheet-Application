import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    name:"",
    email: "",
    password: "",
    token:"ndhscjsbjksdbchjsbvhjsbavd"
  }
  constructor(private _auth: AuthService) { }


  ngOnInit(): void {
  }

  async registerUser() {
    console.log(this.registerUserData);
   // this.registerUserData.token = sessionStorage.getItem("token");
    console.log(this.registerUserData.token+": Ashutosh");
    try {
      const response = await this._auth.registerUser(this.registerUserData).toPromise();
      console.log(response);
      if(response.status === "SUCCESS"){
        alert("Success");
      }
      else{
        alert("Please Login with Admin Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
