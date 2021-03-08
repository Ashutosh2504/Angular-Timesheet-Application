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
  tokens :'',
  leaveStatus:""
}

 

  isLoginUserOrAdmin = true; // True for user, false for admin

  
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    
    this.isLoggedIn();
  }

  emailAndPassword = new FormGroup({
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
    get password(){
      return this.emailAndPassword.get('password');
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
      
      //console.log(this.loginUserData.tokens);
      
     
      
      
      if(result.status === "SUCCESS"){
        console.log("Login success");
        this._router.navigate(['/add-task']); // User component
        this.loginUserData.tokens = result.jwt;
        console.log(result.leaveStatus);
        sessionStorage.setItem("tokenUser",this.loginUserData.tokens);
        sessionStorage.setItem("emailUser",this.loginUserData.email);
      }
      else{
        alert("Please Verify your Credentials");
      }
      console.dir(result);

  
    }else{
      // admin login
      let result = await this._auth.loginAdmin(this.loginUserData).toPromise();
      this.loginUserData.tokens = result.jwt;
      sessionStorage.setItem("tokenAdmin",this.loginUserData.tokens);
      console.log(result.jwt+": ashu");
      if(result.status === "SUCCESS"){
        console.log("Login success");
        // alert("Logged In Successfully");

        this._router.navigate(['/allUsers']); // admin component
      }
      else{
        alert("Please Verify your Credentials");
      }
      console.dir(result);
      console.log("Yash")

    }

   
  }
  isLoggedIn(){
    if(this._auth.loggedInUser())
    {
      // alert("login hai ye");
      this._router.navigate(['/add-task']);

    }
    else{
      if (this._auth.loggedInAdmin()) {
        this._router.navigate(['/allUsers']);
      }
    } 
  }


}