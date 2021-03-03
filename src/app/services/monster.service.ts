import { Injectable } from '@angular/core';
import { monsters } from 'src/assets/data/monsters';
import { Monster, MonsterWithLootValue } from 'src/types/monster';
import { ItemsService } from './items.service';
import { StorageService } from './storage.service';
import { VendorsService } from './vendors.service';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  private _monsters = monsters as Monster[];
  constructor(
    private vendorService: VendorsService,
    private itemsService: ItemsService,
    private storageService: StorageService
  ) {}

  getMonsters() {
    return this._monsters;
  }

  getMonstersWithLootValues(): MonsterWithLootValue[] {
    const monstersWithLoot = this.getMonsters().map((m) => {
      const lootTable = m?.loot?.map((i) => {
        return {
          sell: this.vendorService.getVendorsBuyingAtBestValue(i.id),
          name: this.itemsService.getItemName(i.id),
          dropChance: i.chance / 1000,
          amount: i.amount,
          exclude: false,
        };
      });
      return {
        ...m,
        lootTable,
      };
    });
    return monstersWithLoot;
  }
}
