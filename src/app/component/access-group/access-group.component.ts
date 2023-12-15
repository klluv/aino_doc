import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

declare var $: any;

interface Role {
  role_uuid: string;
  role_order: number;
  role_code: string;
  role_title: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

@Component({
  selector: 'app-access-group',
  templateUrl: './access-group.component.html',
  styleUrls: ['./access-group.component.scss']
})
export class AccessGroupComponent implements OnInit {

  role_code: string = '';
  role_title: string = '';

  constructor(private cookieService: CookieService) {}

  dataListRole: Role[] = [];

  ngOnInit(): void {
    this.fetchDataRoleGroup();
  }

  fetchDataRoleGroup(): void {
    axios.get('http://localhost:8080/role/all')
    .then((response) => {
      this.dataListRole = response.data;
      console.log(response.data)
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }

  addRoleModal() {
    $('#addRoleModal').modal('show');
  }

  addApplication() {
    const token = this.cookieService.get('userToken');

    axios.post(`http://localhost:8080/superadmin/role/add`,
    { role_code: this.role_code, role_title: this.role_title }, 
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
      } else if (error.response.status === 500) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Terjadi kesalahan',
          icon: 'error'
        });
      }
    });
  }
}