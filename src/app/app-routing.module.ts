import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';



const routes: Routes = [
  {path: '' , component:EmployeeListComponent},
  {path: 'list' , component:EmployeeListComponent},
  {path: 'add' , component:EmployeeAddComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
