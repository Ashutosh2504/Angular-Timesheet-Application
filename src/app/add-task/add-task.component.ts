
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
  leaveData ={
    token:"",
     leaveCategory:""
    };
  constructor(private taskService:TaskService, private _auth: AuthService) { }

  ngOnInit(): void {
    this.taskDetails = this.taskService.onGet();
  }

  getTodaysDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = String(today.getFullYear());

    let currentDate = dd + '/' + mm + '/' + yyyy;
    return(currentDate);
  }

  showAlert()
  {
    let elem = document.getElementById("alert1")
    elem.classList.remove("hidden")
    setTimeout(() => {
      elem.classList.add("hidden")
    }, 5000);
  }

  onSubmit(form: NgForm)
  {
    
    let task:Task = {
      id :this.id,
      taskName : form.value.name,
      date : this.getTodaysDate(),

    }
    this.id++;
    this.taskService.onAdd(task);

    this.showAlert();
  }
  

  resetInfo(form: NgForm){
    form.reset();
    let elem = document.getElementById("alert2")
    elem.classList.remove("hidden")
    setTimeout(() => {
      elem.classList.add("hidden")
    }, 3000);

  }

  copyDataToToday(task:Task){
    let todaysTask = Object.assign({},task); // For deep copy of objects
    todaysTask.date = this.getTodaysDate();
    this.taskService.onAdd(todaysTask);
    this.showAlert();
  }

  async addTaskData(){
    console.log(this.taskData);
    this.taskData.token = sessionStorage.getItem("tokenUser");
    console.log("Ashu");
    console.log(this.taskData);
    

    try {
      const response = await this._auth.addTimesheetData(this.taskData).toPromise(); 
      console.log(response+" Ashutosh");
      
      if(response.status === "SUCCESS"){
        alert("Timesheet Added Successfully");
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
    console.log("Ashu");
    console.log(this.leaveData);
    

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

  

}
