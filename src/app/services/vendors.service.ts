import { Injectable } from '@angular/core';
import { vendors } from 'src/assets/data/vendors';
import { Vendor, VendorWithPrice } from 'src/types/vendors';

@Injectable({
  providedIn: 'root',
})
export class VendorsService {
  private _vendors = vendors;

  constructor() {}

  getVendors(): Vendor[] {
    return this._vendors;
  }

  getVendorsBuyingItem(itemId: string): VendorWithPrice[] {
    return this._vendors
      .filter((v) => v.buying.some((i) => i.id === itemId))
      .map((v) => ({
        ...v,
        price: v.buying.find((i) => i.id === itemId)?.value || 0,
      }));
  }

  getVendorsBuyingAtBestValue(
    itemId: string
  ): { value: number; vendors: string[] } {
    const vendorsBuyingItem = this.getVendorsBuyingItem(itemId);
    const bestValue = Math.max(...vendorsBuyingItem.map((v) => v.price));
    const vendorsBuyingAtBestValue = vendorsBuyingItem.filter(
      (v) => v.price >= bestValue
    );
    if (bestValue < 0) {
      return {
        value: 0,
        vendors: [],
      };
    }
    return {
      value: bestValue,
      vendors: vendorsBuyingAtBestValue.map((v) => v.name),
    };
  }
}
