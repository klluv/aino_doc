import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

declare var $: any;

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
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  form!: FormGroup;
  dataListApplication: Application[] = [];
  dataListRole: Role[] = [];
  dataListDivision: Division[] = [];

  user_name: string = '';
  user_email: string = '';
  user_password: string = '';
  division_uuid: string = '';
  role_uuid: string = '';
  application_uuid: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private cookieService: CookieService, private fb: FormBuilder, @Inject('apiUrl') private apiUrl: string) {
    this.apiUrl = apiUrl;
   }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      user_name: [''],
      user_email: [''],
      user_password: [''],
      application_uuid: [''],
      role_uuid: [''],
      division_uuid: [''],
    });
    
    this.appData();
    this.roleData();
    this.divisionData();
  }

  appData(): void {
    axios.get(`${this.apiUrl}/application/all`)
      .then((response) => {
        this.dataListApplication = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      })
  }

  roleData(): void {
    axios.get(`${this.apiUrl}/role/all`)
      .then((response) => {
        this.dataListRole = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      })
  }

  divisionData(): void {
    axios.get(`${this.apiUrl}/division/all`)
      .then((response) => {
        this.dataListDivision = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      })
  }
  AddUser() {
    const token = this.cookieService.get('userToken');
    const userFormValue = this.form.value;
    const user = {
      user_name: this.user_name,
      user_email: this.user_email,
      user_password: this.user_password,
      applicationRole: {
        application_uuid: userFormValue.application_uuid,
        role_uuid: userFormValue.role_uuid,
        division_uuid: userFormValue.division_uuid,        
      }
    }

    axios.post(`${this.apiUrl}/superadmin/user/add`, user,
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
        if (error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
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

  userAddModal() {
    $('#userAddModal').modal('show');
  }
}
