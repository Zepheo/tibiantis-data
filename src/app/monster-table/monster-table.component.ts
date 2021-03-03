import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Monster, MonsterWithLootValue } from 'src/types/monster';
import { MonsterValuesSettingsComponent } from '../monster-values-settings/monster-values-settings.component';
import { MonsterService } from '../services/monster.service';

@Component({
  selector: 'app-monster-table',
  templateUrl: './monster-table.component.html',
  styleUrls: ['./monster-table.component.scss'],
})
export class MonsterTableComponent {
  monsters: MonsterWithLootValue[];
  sortedData: MonsterWithLootValue[];

  displayedColumns: string[] = ['name', 'hp', 'exp', 'value'];

  constructor(
    private monsterService: MonsterService,
    private settingsDialog: MatDialog
  ) {
    this.monsters = this.monsterService.getMonstersWithLootValues();
    this.sortedData = this.monsters.slice();
  }

  getHitpoints(monster: Monster): number {
    return (
      monster?.skills.find((skill) => skill.skill === 'hitpoints')?.value || 0
    );
  }

  getMonsterValue(monster: MonsterWithLootValue): number {
    const averageValueForItems: number[] = monster?.lootTable
      ?.filter((i) => !i.exclude)
      .map((i) => {
        return ((1 + i.amount) / 2) * i.sell.value * i.dropChance;
      }) || [0];
    return Number(averageValueForItems.reduce((a, b) => a + b).toFixed(3));
  }

  openSettings(): void {
    const settingsRef = this.settingsDialog.open(
      MonsterValuesSettingsComponent
    );

    settingsRef.afterClosed().subscribe(() => {
      console.log('closed');
    });
  }

  sortChange(event: Sort) {
    console.log(event);
  }

  sortData(sort: Sort) {
    const data = this.monsters.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'hp':
          return compare(this.getHitpoints(a), this.getHitpoints(b), isAsc);
        case 'exp':
          return compare(a.exp, b.exp, isAsc);
        case 'value':
          return compare(
            this.getMonsterValue(a),
            this.getMonsterValue(b),
            isAsc
          );
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
