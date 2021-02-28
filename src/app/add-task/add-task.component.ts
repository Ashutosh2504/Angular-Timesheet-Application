
// add-task.component.ts

import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  duration = "9";
  id = 1;
  taskDetails: Task[];
  constructor(private taskService:TaskService) { }

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

}
