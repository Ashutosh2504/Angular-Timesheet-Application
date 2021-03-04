
// add-task.component.ts

import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  duration = "9";
  id = 1;
  taskDetails: Task[];

  taskData = {
    token:"",
    date: "",
    taskName: "",
    taskCategory:"",
    won:"",
    duration:""
  }
  copiedTask = {
    token:"",
    date: "",
    taskName: "",
    taskCategory:"",
    won:"",
    duration:""
  }
  leaveData ={
    token:"",
     leaveType:""
    };
  leaveStatusToken ={
    token:""
    
    };
    leaveApproval:string;

  copyData = {
    token:""
  }
  showData = {
    token:""
  }

    timeSheetData :[] ;
    userData :[] ;
  constructor(private taskService:TaskService, private _auth: AuthService) { }

  ngOnInit(): void {
    this.taskDetails = this.taskService.onGet();
    this.getTodaysDate();
    //this.copyDataToToday();
    this.showAllTaskData();
  }

  getTodaysDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = String(today.getFullYear());

    let currentDate = dd + '/' + mm + '/' + yyyy;
    this.taskData.date  = currentDate;
    return(currentDate);
  }

 

  onSubmit(form: NgForm)
  {
    
    let task:Task = this.taskData;
    this.taskService.onAdd(task);

   
  }
  

  resetInfo(form: NgForm){
    form.reset();
    let elem = document.getElementById("alert2")
    elem.classList.remove("hidden")
    setTimeout(() => {
      elem.classList.add("hidden")
    }, 3000);

  }

  async showAllTaskData(){
    this.showData.token = sessionStorage.getItem("tokenUser");
    console.log("Ashu");
    

    try {
      const response = await this._auth.showData(this.showData).toPromise(); 
    
      if(response.status === "SUCCESS"){
       
        this.timeSheetData = response.user.timeSheetData;
        console.log(response.user);
        
      console.log(this.timeSheetData);

        
      }
      else{

        alert("Failed to add data"+response.status);
      }
    } catch (error) {
      console.log(error);
    }
    
  }


 async copyDataToToday(task: Task){
     // For deep copy of objects
     this.copiedTask=task;
    this.copiedTask.date = this.getTodaysDate();
    this.taskService.onAdd(this.copiedTask);
    console.log("Todays timesheet data");
    console.log(this.copiedTask);
    console.log("................................................");
    
    console.log(Object.entries(this.copiedTask));
    this.copiedTask.token = sessionStorage.getItem("tokenUser");

    try {
      const response = await this._auth.addTimesheetData(this.copiedTask).toPromise(); 
     
     // console.log(response.user.timeSheetData);
      this.timeSheetData = response.user.timeSheetData;
      console.log(this.timeSheetData);
     // this.copyDataToToday(this.timeSheetData); ///make new fn and put it in ngOnInit()
      if(response.status === "SUCCESS"){
        console.log("Successfully copied timesheet");
        
      }
      else{
        alert("Failed to copy data");
      }
    } catch (error) {
      console.log(error);
    }
    
    
  }

  async addTaskData(){
    console.log(this.taskData);
    this.taskData.token = sessionStorage.getItem("tokenUser");
    console.log("Ashu");
    

    try {
      const response = await this._auth.addTimesheetData(this.taskData).toPromise(); 
     
     
     
      
     // this.copyDataToToday(this.timeSheetData); ///make new fn and put it in ngOnInit()
      if(response.status === "SUCCESS"){
        alert("Timesheet Added Successfully");
        this.timeSheetData = response.user.timeSheetData;
      }
      else{
        alert("Failed to add data");
      }
    } catch (error) {
      console.log(error);
    }
    
  }


  
  async applyLeave(){
    console.log(this.taskData);
    this.leaveData.token = sessionStorage.getItem("tokenUser");
    console.log("Ashu--------------");
    console.log(this.leaveData);
    console.log("------------------------");
    try {
      const response = await this._auth.applyLeave(this.leaveData).toPromise(); 
      if(response.status === "SUCCESS"){
        alert("Leave Applied Successfully");
      }
      else{
        alert("Failed to apply Leave");
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  //----------to know the leave status--------//
  async leaveStatus(){
    console.log(this.taskData);
    this.leaveStatusToken.token = sessionStorage.getItem("tokenUser");
    console.log("Ashu--------------");
    console.log(this.leaveStatusToken);
    console.log("------------------------");
    try {
      const response = await this._auth.approvalofLeave(this.leaveStatusToken).toPromise(); 
      if(response.status === "SUCCESS"){
        
        this.leaveApproval= response.leaveStatus;
        console.log(this.leaveApproval+"Ashutosh Patil");

      }
      else{
        alert("leave Declined");
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  

}
