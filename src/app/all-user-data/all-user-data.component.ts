import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-all-user-data',
  templateUrl: './all-user-data.component.html',
  styleUrls: ['./all-user-data.component.css']
})
export class AllUserDataComponent implements OnInit {

  constructor(private _auth : AuthService) { }

  ngOnInit(): void {
    this.getAllUserData();
  }
  allUserData = {
    token:"",
    
  }
  Users: [];
  

  async getAllUserData()
  {
    this.allUserData.token = sessionStorage.getItem("tokenAdmin");
    
    try {
      const response = await this._auth.getAllUserData(this.allUserData).toPromise();
     // console.log(response);
      if(response.status === "SUCCESS"){
        // 
        console.log(response);
        this.Users = response.users;
      }
      else{
        alert("No Employees in the Company");
      }
    } catch (error) {
      console.log(error);
      
    }
  }

 

}
