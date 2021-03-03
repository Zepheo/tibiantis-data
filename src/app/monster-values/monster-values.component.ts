import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LootTableItem } from 'src/types/lootTable';
import { Monster, MonsterWithLootValue } from 'src/types/monster';
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
  monsters: MonsterWithLootValue[];
  selectedMonster?: MonsterWithLootValue;
  lootTable?: LootTableItem[];

  constructor(
    private monsterService: MonsterService,
    private settingsDialog: MatDialog
  ) {
    this.monsters = this.monsterService.getMonstersWithLootValues();
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
      this.lootTable = this.selectedMonster?.lootTable;
    }
  }
}
