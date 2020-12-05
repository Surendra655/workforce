import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employeeForm: FormGroup;
  // employee: any;
  isUpdate = false;
  isImage: any = '/assets/imgicon.png';
  index: any;
  submitted = false;
  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService) { }
             

  ngOnInit() {
    this.createEmployeeForm();
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (params.empId) {
          this.isUpdate = true;
          this.getEmpById(params.empId);
          this.index = params.empId;
        }
      });
  }

  getEmpById(index) {
    // this.employeeService.getSingleUser(empId).subscribe(res => {
    //   this.employee = res.data || [];
    // });
    if (this.dataService.empData[index].avatar) {
      this.isImage = this.dataService.empData[index].avatar;
    }
    this.employeeForm.patchValue(this.dataService.empData[index]);
  }

  createEmployeeForm() {
    this.employeeForm = this.fb.group({
      avatar: [''],
      email: [null, [Validators.required, Validators.email]],
      first_name: [null, [Validators.required]],
      id: [null],
      last_name: [null, [Validators.required]],
    });
  }

  get f() { return this.employeeForm.controls; }

  saveNewEmp() {
    this.submitted=true;
    const payload = this.employeeForm.value;
    payload.avatar = this.isImage;
    payload.id = this.dataService.empData.length + 1;
    if (this.employeeForm.valid) {
      this.dataService.empData.push(payload);
      this.router.navigate(['/list']);
    }
  }

  updateEmployee() {
    const payload = this.employeeForm.value;
    if (this.employeeForm.valid) {
      this.dataService.empData[this.index] = payload;
      this.router.navigate(['/list']);
    }
  }

  removeEmployee() {
    this.dataService.empData.splice(this.index, 1);
    this.router.navigate(['/list']);
  }

  addEmp() {
    this.isUpdate = false;
    this.employeeForm.reset();
    this.isImage = '/assets/imgicon.png';
  }

  onFileChanged(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      const file = reader.result;
      this.isImage = file;
    };
  }
}
