import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { StorageService } from 'src/app/services/storage.service';
import { locations as _locations } from 'src/assets/data/locations';
import { Location } from 'src/types/location';
import { VendorsService } from '../services/vendors.service';

@Component({
  selector: 'app-monster-values-settings',
  templateUrl: './monster-values-settings.component.html',
  styleUrls: ['./monster-values-settings.component.scss'],
})
export class MonsterValuesSettingsComponent implements OnInit {
  excludedCities: string[];
  citiesWithVendor: string[];

  get locations(): Location[] {
    return _locations.filter((l) => this.citiesWithVendor.includes(l.name));
  }

  constructor(
    private storageService: StorageService,
    private vendorService: VendorsService
  ) {
    this.citiesWithVendor = this.vendorService
      .getVendors()
      .map((v) => v.closestLocation);
  }

  ngOnInit(): void {
    this.excludedCities = this.storageService.getExcludedCities();
  }

  getIsExcluded(city: Location): boolean {
    return this.excludedCities.includes(city.name);
  }

  toggleCity(event: MatCheckboxChange, city: Location): void {
    if (event.checked) {
      this.storageService.addExcludedCity(city.name);
    } else {
      this.storageService.removeExcludedCity(city.name);
    }
  }
}
