import { Npc } from './npc';

export interface VendorWithPrice extends Vendor {
  price: number;
}

export interface Vendor extends Npc {
  buying: ShopItem[];
}

export interface ShopItem {
  id: string;
  value: number;
}
