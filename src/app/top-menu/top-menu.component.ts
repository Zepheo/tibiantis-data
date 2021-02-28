import { Component, OnInit } from '@angular/core';

export interface NavLink {
  title: string;
  path: string;
}

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  navLinks: NavLink[];

  constructor() {}

  ngOnInit(): void {
    this.navLinks = [
      {
        title: 'Monster Values',
        path: '/monster-values',
      },
    ];
  }
}
