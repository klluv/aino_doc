import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { RoleService } from '../component-service/role-service/role.service';


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

  role_uuid: string = '';
  role_code: string = '';
  role_title: string = '';

  constructor(
    private cookieService: CookieService,
    public roleService: RoleService
    ) {}

  dataListRole: Role[] = [];

  ngOnInit(): void {
    this.fetchDataRoleGroup();
  }

  fetchDataRoleGroup(): void {
    axios.get('http://localhost:8080/role/all')
    .then((response) => {
      this.dataListRole = response.data;
      this.roleService.updateDataListRole(this.dataListRole);
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }

  addRoleModal() {
    $('#addRoleModal').modal('show');
    this.role_code = '';
    this.role_title = '';
  }

  addRole() {
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
      $('#addRoleModal').modal('hide');
      this.role_code = '';
      this.role_title = '';
    })
    .catch((error) => {
      if(error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
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

  getSpecRole(roleUuid: string): void {
    axios.get(`http://localhost:8080/role/${roleUuid}`)
    .then((response) => {
      const roleData = response.data;
      this.role_uuid = roleData.role_uuid;
      this.role_code = roleData.role_code;
      this.role_title = roleData.role_title;

      $('#addRoleModal').modal('show');
    })
    .catch((error) => {
      if (error.response.status === 500 || error.response.status === 404) {
        console.log(error.response.data.message)
      }
    })
  }

  updateRole(): void {
    const token = this.cookieService.get('userToken');
    const roleUuid = this.role_uuid;

    axios.put(`http://localhost:8080/superadmin/role/update/${roleUuid}`,
    { role_code: this.role_code, role_title: this.role_title },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data.message);
      this.fetchDataRoleGroup();
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
      $('#addRoleModal').modal('hide');
    })
    .catch((error) => {
      if(error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
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
    })
  }
}

export { Role };