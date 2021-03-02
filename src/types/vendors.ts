import { Npc } from './npc';

export interface VendorWithPrice extends VendorWithLocation {
  price: number;
}
export interface VendorWithLocation extends Vendor {
  closestLocation: string;
}

export interface Vendor extends Npc {
  buying: ShopItem[];
}

export interface ShopItem {
  id: string;
  value: number;
}
