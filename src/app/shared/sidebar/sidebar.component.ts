import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  showMenu = '';
  activeSubMenu: RouteInfo | null = null;
  public sidebarnavItems: RouteInfo[] = [];
  isDropdownOpen = false;
  

  // this is for the open close
  addExpandClass(element: string): void {
    if (element === this.showMenu) {
      this.showMenu = '';
    } else {
      this.showMenu = element;
    }
  }

  toggleSubMenu(sidebarnavItem: RouteInfo): void {
    if (this.activeSubMenu === sidebarnavItem) {
      this.activeSubMenu = null;
    } else {
      this.activeSubMenu = sidebarnavItem;
    }
  }

  isSubMenuActive(sidebarnavItem: RouteInfo): boolean {
    return this.activeSubMenu === sidebarnavItem;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // End open close
  ngOnInit(): void {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }
}
