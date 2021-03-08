import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrls: ['./approve-leave.component.css']
})
export class ApproveLeaveComponent implements OnInit {
  adminToken = {
    token: "",
    

  }
  leaveData = {
    token:"",
    email:"",
    approveOrReject:""

  }

  leaveStatus:string;
  Users: [];

  approvedUsers: [];

  approveRejectButtonEnabled:boolean = true;

  constructor(private _auth: AuthService) { }
  
  ngOnInit(): void {
    this.approveLeave();
  }


  async approveLeave() {
    console.log(this.adminToken);
    this.adminToken.token = sessionStorage.getItem("tokenAdmin");
    //this.adminLeave.email = sessionStorage.getItem("emailUser");
    

    console.log("Ashu");
    console.log(this.adminToken);


    try {
      const response = await this._auth.appliedLeaveUser(this.adminToken).toPromise();
      if (response.status === "SUCCESS") {
        this.Users = response.users;
        console.log(response);
        console.log("AAAAAAAAAAAAAAAAAA");
        console.dir(response);
        // alert("Leave Approve Successfully");
      }
      else {
        alert("No one is on Leave");
      }
    } catch (error) {
      console.log(error);
    }

  }

  getApproveValue(user){
     this.leaveStatus = "APPROVED";
     this.approveOrRejectLeave(user);
     console.log("in getAppr");
     
  }
  getRejectValue(user){
     this.leaveStatus = "REJECT";
     this.approveOrRejectLeave(user);
     console.log("in getReje");

  }
  
  async approveOrRejectLeave(user) {
    console.log(this.leaveData);
    this.leaveData.token = sessionStorage.getItem("tokenAdmin");
    console.log("Ashu");
    // console.log(this.leaveData);
    console.log(this.leaveStatus);
    this.leaveData.approveOrReject = this.leaveStatus;
    this.leaveData.email = user.email;
    console.log(user.email);
    try {
      const response = await this._auth.approveLeave(this.leaveData).toPromise();
      if (response.status === "SUCCESS") {
        this.approvedUsers = response.user;
        console.log(response.status+"Ashutosh");
        console.dir(response);

        
        if (response.user.leaveStatus==="APPROVED"){
        alert("Leave Approved");
        
        
        console.log(response.user);
        }
        else if  (response.user.leaveStatus==="REJECTED") {
          alert("Leave Rejected");
          this.approvedUsers = response.user;
        console.log(this.approvedUsers+"Pranay");
        console.log(response.user.leaveStatus+"Pranay");

        }
      }
      else {
        alert("Failed to Approve Leave");
      }
    } catch (error) {
      console.log(error);
    }

  }

}
