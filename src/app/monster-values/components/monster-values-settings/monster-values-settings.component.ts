import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-monster-values-settings',
  templateUrl: './monster-values-settings.component.html',
  styleUrls: ['./monster-values-settings.component.scss'],
})
export class MonsterValuesSettingsComponent implements OnInit {
  excludedVendors: string[];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.storage.addExcludedVendor(["Al'dee"]);
    this.excludedVendors = this.storage.getExcludedVendors();
  }
}
