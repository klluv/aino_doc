import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

interface Application {
  application_uuid: string;
  application_order: number;
  application_code: string;
  application_title: string;
  application_description: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

@Component({
  selector: 'app-list-all-app',
  templateUrl: './list-all-app.component.html',
  styleUrls: ['./list-all-app.component.css']
})
export class ListAllApplicationComponent {
  
 constructor(private router: Router) {}

  dataListApplication: Application[] = [];

  ngOnInit(): void {
    this.fetchDataApplication()
  }

  fetchDataApplication(): void {
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
}