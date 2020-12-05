import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeesData=[];
  page = 1;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.employeeService.getEmpList().subscribe(res => {
      if (this.dataService.empData.length === 0) {
        this.dataService.empData = res.data || [];
      }
      this.employeesData = this.dataService.empData;
    });
  }

  viewEmp(index) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        empId: index,
      }
    };
    this.router.navigate(['/add'], navigationExtras);
  }
}
