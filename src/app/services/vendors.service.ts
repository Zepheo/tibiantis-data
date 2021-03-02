import { Injectable } from '@angular/core';
import { Vendor, VendorWithLocation, VendorWithPrice } from 'src/types/vendors';
import { vendors } from 'src/assets/data/vendors';
import { locations } from 'src/assets/data/locations';
import { StorageService } from './storage.service';

interface Point {
  x: number;
  y: number;
}
@Injectable({
  providedIn: 'root',
})
export class VendorsService {
  private _vendors = vendors;

  constructor(private storageService: StorageService) {}

  getVendors(): VendorWithLocation[] {
    return this._vendors.map((v) => ({
      ...v,
      closestLocation: this._getClosestLocationForVendor(v),
    }));
  }

  getVendorsBuyingItem(itemId: string): VendorWithPrice[] {
    return this.getVendors()
      .filter((v) => v.buying.some((i) => i.id === itemId))
      .map((v) => ({
        ...v,
        price: v.buying.find((i) => i.id === itemId)?.value || 0,
      }));
  }

  getVendorsBuyingAtBestValue(
    itemId: string
  ): { value: number; vendors: string[] } {
    const excludedCities = this.storageService.getExcludedCities();
    const vendorsBuyingItem = this.getVendorsBuyingItem(itemId).filter(
      (v) => !excludedCities.includes(v.closestLocation)
    );
    const bestValue = Math.max(...vendorsBuyingItem.map((v) => v.price));
    const vendorsBuyingAtBestValue = vendorsBuyingItem
      .filter((v) => v.price >= bestValue)
      .filter((v) => !excludedCities.includes(v.closestLocation));
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

  private _getClosestLocationForVendor(vendor: Vendor): string {
    let closestLocation = locations[0].name;
    let shortestDistance: number = this._getDistance(
      vendor.location,
      locations[0]
    );
    locations.slice(1).forEach((l) => {
      const distance = this._getDistance(vendor.location, l);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestLocation = l.name;
      }
    });
    return closestLocation;
  }

  private _getDistance(pointA: Point, pointB: Point): number {
    const xDistance = Math.abs(pointA.x - pointB.x);
    const yDistance = Math.abs(pointA.y - pointB.y);
    return Math.sqrt(xDistance + yDistance);
  }
}
