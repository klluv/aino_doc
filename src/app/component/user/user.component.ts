import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { UserService } from '../component-service/user-service/user-service.service';


declare var $: any;

interface Users {
  user_uuid: string;
  user_application_role_uuid: string;
  user_name: string;
  user_email: string;
  role_title: string;
  application_title: string;
  division_title: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
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
  
  constructor(
    private cookieService: CookieService,
    @Inject('apiUrl') private apiUrl: string,
    private fb: FormBuilder,
    public userService: UserService,
    ) {
    this.apiUrl = apiUrl;
  }

  userList: Users[] = [];

  ngOnInit(): void {
    this.fetchDataUser();
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
  
  fetchDataUser(): void {
    const token = this.cookieService.get('userToken');
    axios.get(`${this.apiUrl}/superadmin/user/all`,  
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      this.userList = response.data;
      this.userService.updateDataListUsers(this.userList);
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      } else {
        console.log(error)
      }
    })
  }

  onDeleteUser(user_application_role_uuid: string): void {
    Swal.fire({
      title: "Konfirmasi",
        text: "Anda yakin ingin menghapus kategori ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          this.performDeleteUser(user_application_role_uuid);
        }
    })
  }

  performDeleteUser(user_application_role_uuid: string): void {
    const token = this.cookieService.get('userToken');
    axios.put(`${this.apiUrl}/superadmin/user/delete/${user_application_role_uuid}`,
    {},
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
        icon: 'success',
      });
      this.fetchDataUser();
    })
    .catch((error) => {
      if(error.response.status === 500 || error.response.status === 400) {
        console.log(error.response.data.message)
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
        })
      } else {
        console.log(error)
      }
    })
  }

  openModalAdd() {
    $('#addUserModal').modal('show');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
        $('#addUserModal').modal('hide');
        this.fetchDataUser();
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

  editUser(user: Users) {
    
  }

}

export { Users };