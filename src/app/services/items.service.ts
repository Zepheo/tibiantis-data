import { Injectable } from '@angular/core';
import { Items, Item } from 'src/types/items';
import { items } from '../../assets/data/items';
import { VendorsService } from './vendors.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _items: Items = items;
  constructor(private vendorService: VendorsService) {}

  getItems(): Items {
    return this._items;
  }

  getItem(id: string): Item {
    if (!this._items[id]) {
      return {
        name: 'Removed Item',
      };
    }
    return this._items[id];
  }

  getItemName(id: string): string {
    return this.getItem(id).name;
  }

  getItemValue(id: string): number {
    return this.vendorService.getVendorsBuyingAtBestValue(id).value;
  }
}
