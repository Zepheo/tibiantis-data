import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LootTableItem } from 'src/types/lootTable';
import { Monster } from 'src/types/monster';
import { ItemsService } from '../services/items.service';
import { MonsterService } from '../services/monster.service';
import { VendorsService } from '../services/vendors.service';
import { MonsterValuesSettingsComponent } from '../monster-values-settings/monster-values-settings.component';

@Component({
  selector: 'app-monster-values',
  templateUrl: './monster-values.component.html',
  styleUrls: ['./monster-values.component.scss'],
})
export class MonsterValuesComponent {
  @Input() search: any;
  monsters: Monster[];
  selectedMonster?: Monster;
  lootTable?: LootTableItem[];

  constructor(
    private monsterService: MonsterService,
    private vendorService: VendorsService,
    private itemService: ItemsService,
    private settingsDialog: MatDialog
  ) {
    this.monsters = this.monsterService.getMonsters();
  }

  openSettings(): void {
    const settingsRef = this.settingsDialog.open(
      MonsterValuesSettingsComponent
    );

    settingsRef.afterClosed().subscribe(() => {
      console.log('closed');
    });
  }

  setSelectedMonster(name: string) {
    if (this.selectedMonster?.name === name) {
      this.selectedMonster = undefined;
      this.lootTable = undefined;
    } else {
      this.selectedMonster = this.monsters.find((m) => m.name === name);
      this.lootTable = this.selectedMonster?.loot?.map((item) => ({
        sell: this.vendorService.getVendorsBuyingAtBestValue(item.id),
        name: this.itemService.getItemName(item.id),
        dropChance: item.chance / 1000,
        amount: item.amount,
        exclude: false,
      }));
    }
  }
}
