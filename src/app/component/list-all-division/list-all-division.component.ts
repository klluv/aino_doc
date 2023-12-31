import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

interface Division {
  division_uuid: string;
  division_order: number;
  division_code: string;
  division_title: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

@Component({
  selector: 'app-list-all-division',
  templateUrl: './list-all-division.component.html',
  styleUrls: ['./list-all-division.component.scss']
})
export class ListAllDivisionComponent implements OnInit{

  private apiUrl: string;

  constructor(private router: Router, @Inject('apiUrl') apiUrl: string) {

    this.apiUrl = apiUrl;
  }

  dataListDivision: Division[] = [];

  ngOnInit(): void {
    this.fetchDataDivision()
  }

  fetchDataDivision(): void {
    axios.get(`${this.apiUrl}/division/all`)
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