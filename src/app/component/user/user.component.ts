import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

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
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  
  constructor(private cookieService: CookieService){}

  userList: Users[] = [];

  ngOnInit(): void {
    this.fetchDataUser();
  }

  fetchDataUser(): void {
    const token = this.cookieService.get('userToken');
    axios.get(`http://localhost:8080/superadmin/user/all`,  
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      this.userList = response.data;
      console.log(response.data);
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
    axios.put(`http://localhost:8080/superadmin/user/delete/${user_application_role_uuid}`,
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
      if(error.response.status === 500) {
        console.log(error.response.data.message)
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
        })
      } else if (error.response.status === 404) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
        });
      } else {
        console.log(error)
      }
    })
  }

  addUser() {
    
  }

  editUser(user: Users) {
    
  }

}
