import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {email:"",
  password: "",
  tokens :''}

 

  isLoginUserOrAdmin = true; // True for user, false for admin

  
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

///checking the usertype
form = new FormGroup({
  user: new FormControl('', Validators.required)
});
 
get f(){
  return this.form.controls;
}
 
// submit(){
//   console.log(this.form.value);
//   if(this.form.value === "true")
//   {
//     this.isLoginUserOrAdmin = true; 
//   }
//     else{
//     this.isLoginUserOrAdmin = false; 

//     }
// }

changeUser(userOrAdmin) {
  if(userOrAdmin){
    this.isLoginUserOrAdmin = true;
    console.log(userOrAdmin);
  }else{
    this.isLoginUserOrAdmin = false;
    console.log(userOrAdmin);

  }
}



  async loginUserOrAdmin() {
    
    console.dir(this.loginUserData);
    if(this.isLoginUserOrAdmin){
      // user login
      let result = await this._auth.loginUser(this.loginUserData).toPromise();
      this.loginUserData.tokens = result.token;
      
      
      if(result.status === "SUCCESS"){
        console.log("Login success");
        this._router.navigate(['/add-task']); // User component

      }
      console.dir(result);

  
    }else{
      // admin login
      let result = await this._auth.loginAdmin(this.loginUserData).toPromise();
      this.loginUserData.tokens = result.jwt;
      sessionStorage.setItem("token",this.loginUserData.tokens);
      console.log(result.jwt+": ashu");
      if(result.status === "SUCCESS"){
        console.log("Login success");
        alert("Logged In Successfully");
        
        this._router.navigate(['/add-task']); // admin component
      }
      else{
        alert("Please Verify your Credentials");
      }
      console.dir(result);
      console.log("Yash")

    }

   
  }


}