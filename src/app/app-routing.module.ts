import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AllUserDataComponent } from './all-user-data/all-user-data.component';
import { ApproveLeaveComponent } from './leave/approve-leave/approve-leave.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'special',
    component: SpecialEventsComponent
  },
  {
    path: 'allUsers',
    component: AllUserDataComponent
  },
  
  {
    path: 'add-task',
    component: AddTaskComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent

  },
  {
    path:'approve-leave',
    component: ApproveLeaveComponent

  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
