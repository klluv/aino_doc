import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { UserService } from '../component-service/user-service/user-service.service';
import { CommonModule, DatePipe } from '@angular/common';



declare var $: any;

interface Users {
  user_uuid: string;
  user_application_role_uuid: string;
  user_name: string;
  user_email: string;
  personal_name: string;
  personal_birthday: string;
  personal_gender: string;
  personal_phone: string;
  personal_address: string;
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
export class UserComponent implements OnInit {

  searchText: string = '';

  form!: FormGroup;
  dataListApplication: Application[] = [];
  dataListRole: Role[] = [];
  dataListDivision: Division[] = [];

  user_name: string = '';
  user_uuid: string = '';
  user_application_role_uuid: string = '';
  user_email: string = '';
  user_password: string = '';
  personal_name: string = '';
  personal_birthday: string = '';
  personal_gender: string = '';
  personal_phone: string = '';
  personal_address: string = '';
  division_uuid: string = '';
  division_title: string = '';
  role_uuid: string = '';
  role_title: string = '';
  application_uuid: string = '';
  application_title: string = '';
  showPassword: boolean = false;

  constructor(
    private cookieService: CookieService,
    @Inject('apiUrl') private apiUrl: string,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private formGroupDirective: FormGroupDirective,
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
      personal_name: [''],
      personal_birthday: [''],
      personal_gender: [''],
      personal_phone: [''],
      personal_address: [''],
      application_uuid: [''],
      role_uuid: [''],
      division_uuid: [''],
    });

    this.appData();
    this.roleData();
    this.divisionData();
  }

  matchesSearch(item: Users): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    return (
      item.user_name.toLowerCase().includes(searchLowerCase) ||
      item.user_email.toLowerCase().includes(searchLowerCase) ||
      item.personal_phone.toLowerCase().includes(searchLowerCase) ||
      item.division_title.toLowerCase().includes(searchLowerCase)
    );
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
        if (error.response.status === 500) {
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
        if (error.response.status === 500 || error.response.status === 400) {
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
    this.user_name = '';
    this.user_email = '';
    this.user_password = '';
    this.personal_name = '';
    this.personal_birthday = '';
    this.personal_gender = '';
    this.personal_phone = '';
    this.personal_address = '';
    this.division_uuid = '';
    this.role_uuid = '';
    this.application_uuid = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  appData(): void {
    axios.get(`${this.apiUrl}/application/all`)
      .then((response) => {
        this.dataListApplication = response.data;
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
      personal_name: this.personal_name,
      personal_birthday: this.personal_birthday,
      personal_gender: this.personal_gender,
      personal_phone: this.personal_phone,
      personal_address: this.personal_address,
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
        console.log(response.data.applicationRole.application_uuid)
        console.log(response.data.message);
        this.fetchDataUser();
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success'
        });
        $('#addUserModal').modal('hide');
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


  getSpecUser(user_application_role_uuid: string): void {
    axios.get(`${this.apiUrl}/user/` + user_application_role_uuid)
      .then((response) => {
        const userData = response.data;
        console.log(userData);

        userData.personal_birthday = this.datePipe.transform(userData.personal_birthday, 'yyyy-MM-dd');

        this.user_uuid = userData.user_uuid;
        this.user_application_role_uuid = userData.user_application_role_uuid;
        this.user_name = userData.user_name;
        this.user_email = userData.user_email;
        this.role_title = userData.role_title;
        this.division_title = userData.division_title;
        this.application_title = userData.application_title;
        this.personal_name = userData.personal_name;
        this.personal_birthday = userData.personal_birthday;
        this.personal_gender = userData.personal_gender;
        this.personal_phone = userData.personal_phone;
        this.personal_address = userData.personal_address;

        $('#editUserModal').modal('show');
      })
      .catch((error) => {
        if (error.response.status === 500 || error.response.status === 404) {
          console.log(error.response.data.message)
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            timer: 1500
          })
        } else {
          console.log(error)
          Swal.fire({
            title: 'Error',
            text: 'Terjadi kesalahan',
            icon: 'error',
            timer: 1500
          })
        }
      })
  }

  updateUser(): void {
    const token = this.cookieService.get('userToken');
    const userAppRoleUuid = this.user_application_role_uuid;
    const userFormValue = this.form.value;
    const updateData = {
        user_name: this.user_name, 
        user_email: this.user_email, 
        personal_name: this.personal_name, 
        personal_birthday: this.personal_birthday, 
        personal_gender: this.personal_gender, 
        personal_phone: this.personal_phone, 
        personal_address: this.personal_address,
        applicationRole: {
          application_uuid: userFormValue.application_uuid,
          role_uuid: userFormValue.role_uuid,
          division_uuid: userFormValue.division_uuid,
      }
    }

    axios.put(`${this.apiUrl}/superadmin/user/update/${userAppRoleUuid}`,
      updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data.message);
          this.fetchDataUser();
          this.form.reset();
          Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            timer: 1500
          })
          $('#editUserModal').modal('hide');
        })
        .catch((error) => {
          if(error.response.status === 400 || error.response.status === 422 || error.response.status === 404 || error.response.status === 500) {
            console.log(error.response.data.message)
            Swal.fire({
              title: 'Error',
              text: error.response.data.message,
              icon: 'error',
              timer: 1500
            })
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Terjadi kesalahan',
              icon: 'error',
              timer: 1500
            })
          }
        })

  }

}

export { Users };