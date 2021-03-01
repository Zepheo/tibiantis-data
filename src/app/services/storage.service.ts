import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  addExcludedVendor(names: string[]) {
    localStorage.setItem('excludedVendors', JSON.stringify(names));
  }

  getExcludedVendors(): string[] {
    return JSON.parse(localStorage.getItem('excludedVendors') || '');
  }
}
