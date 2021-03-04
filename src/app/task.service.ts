//task.service.ts

import { Task } from './task.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskDetails: Task[] = [];

  constructor() { }

  onGet(){
    return this.taskDetails;
  }

  onAdd(task: Task){
    this.taskDetails.push(task);
  }

 
}