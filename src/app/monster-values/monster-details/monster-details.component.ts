import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { LootTableItem } from 'src/types/lootTable';
import { Monster } from 'src/types/monster';

@Component({
  selector: 'app-monster-details',
  templateUrl: './monster-details.component.html',
  styleUrls: ['./monster-details.component.scss'],
})
export class MonsterDetailsComponent {
  @Input() monster: Monster;
  @Input() loot: LootTableItem[];

  displayedColumns: string[] = [
    'name',
    'value',
    'amount',
    'dropChance',
    'vendors',
    'exclude',
  ];

  get averageValue(): string {
    console.log(this.monster);
    const averageValueForItems: number[] = this.loot
      .filter((i) => !i.exclude)
      .map((i) => {
        return ((1 + i.amount) / 2) * i.sell.value * i.dropChance;
      });
    return averageValueForItems.reduce((a, b) => a + b).toFixed(3);
  }

  get hitpoints(): number {
    return (
      this.monster.skills.find((skill) => skill.skill === 'hitpoints')?.value ||
      0
    );
  }

  constructor() {}

  toggleExcluded(event: MatCheckboxChange, item: LootTableItem) {
    const itemIndex = this.loot.findIndex((i) => i == item);
    this.loot[itemIndex].exclude = event.checked;
  }
}
