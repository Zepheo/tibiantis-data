import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getExcludedCities(): string[] {
    return JSON.parse(localStorage.getItem('excludedCities') || '[]');
  }

  addExcludedCity(city: string): void {
    const excludedCities = this.getExcludedCities();
    excludedCities.push(city);
    localStorage.setItem('excludedCities', JSON.stringify(excludedCities));
  }

  removeExcludedCity(city: string): void {
    const oldExcludedCities = this.getExcludedCities();
    const newExcludedCities = oldExcludedCities.filter(
      (c) => c.toLowerCase() !== city.toLowerCase()
    );
    localStorage.setItem('excludedCities', JSON.stringify(newExcludedCities));
  }
}
