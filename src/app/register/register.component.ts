import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private _auth: AuthService, private _router: Router) { }


  ngOnInit(): void {
  }
  emailAndPassword = new FormGroup({
    name: new FormControl('',[
      Validators.required]),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[
        Validators.required,
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{4,}")])
    
    }); 


    get email(){
      return this.emailAndPassword.get('email');
      }
    get name(){
      return this.emailAndPassword.get('name');
      }
    get password(){
      return this.emailAndPassword.get('password');
      }

  async registerUser() {
    console.log(this.registerUserData);
    this.registerUserData.token = sessionStorage.getItem("tokenAdmin");
    console.log(this.registerUserData.token+": Ashutosh");
    try {
      const response = await this._auth.registerUser(this.registerUserData).toPromise();
      console.log(response);
      if(response.status === "SUCCESS"){
        this._router.navigate(['/allUsers']);
      }
      else{
        alert("Please Login with Admin Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
