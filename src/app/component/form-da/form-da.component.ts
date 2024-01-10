import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-form-da',
  templateUrl: './form-da.component.html',
  styleUrls: ['./form-da.component.scss']
})
export class FormDaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchText: string = '';

  openModalAdd() {
    $('#addDAModal').modal('show');
  }
}
