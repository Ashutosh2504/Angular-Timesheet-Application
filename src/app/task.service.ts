//task.service.ts

import { Task } from './task.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskDetails: Task[] = [
    {
      id:1,
      taskName: "Project Discussion", 
      date: "10/02/2021"
    },
    {
      id:2,
      taskName: "Project Planning", 
      date: "12/02/2021"
    },
    {
      id:3,
      taskName: "Coding", 
      date: "15/02/2021"
    },
    {
      id:4,
      taskName: "Code Integration", 
      date: "17/02/2021"
    }
  ];

  constructor() { }

  onGet(){
    return this.taskDetails;
  }

  onAdd(task: Task){
    this.taskDetails.push(task);
  }

  onCopy()
  {
    this.taskDetails.push(this.taskDetails[0]);
  }
}