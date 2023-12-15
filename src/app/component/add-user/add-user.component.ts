import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

interface Application {
  application_uuid: string;
  application_title: string;
}

interface Role {
  role_uuid: string;
  role_title: string;
}

interface Division {
  division_uuid: string;
  division_title: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  form!: FormGroup;
  dataListApplication: Application[] = [];
  dataListRole: Role[] = [];
  dataListDivision: Division[] = [];
  
  user_name: string = '';
  user_email: string = '';
  user_password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  application_uuid: string = '';
  role_uuid: string = '';
  division_uuid: string = '';

  constructor(private cookieService: CookieService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      application_uuid: '',
      role_uuid: '',
      division_uuid: '',
    });

    this.appData();
    this.roleData();
    this.divisionData();
  }

  onAddUser() {
    const token = this.cookieService.get('userToken');

    axios.post(`http://localhost:8080/superadmin/user/add`,
    { user_name: this.user_name, user_email: this.user_email, user_password: this.user_password }, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data.message);
      Swal.fire({
        title: 'Success',
        text: response.data.message,  
        icon: 'success'
      });
    })
    .catch((error) => {
      if(error.response.status === 400) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else if(error.response.status === 422) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else if(error.response.status === 500) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      }
    })
  }
  
  appData() {
    axios.get('http://localhost:8080/application/all')
    .then((response) => {
      this.dataListApplication = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }
  
  roleData() {
    axios.get('http://localhost:8080/role/all')
    .then((response) => {
      this.dataListRole = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }
  
  divisionData() {
    axios.get('http://localhost:8080/division/all')
    .then((response) => {
      this.dataListDivision = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }

}