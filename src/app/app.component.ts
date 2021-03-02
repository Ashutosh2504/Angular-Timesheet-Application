import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login5-app';


  constructor(public _auth: AuthService, private _router: Router) { }
  logoutAll(){
    this._auth.logoutAll();
   // alert("logged out");
    this._router.navigate(['/login']);
  }
}
