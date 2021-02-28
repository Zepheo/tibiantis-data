import { Component, Input } from '@angular/core';
import { Monster } from 'src/types/monster';
import { MonsterService } from '../services/monster.service';

@Component({
  selector: 'app-monster-values',
  templateUrl: './monster-values.component.html',
  styleUrls: ['./monster-values.component.scss'],
})
export class MonsterValuesComponent {
  @Input() search: any;
  monsters: Monster[];
  selectedMonster: Monster | undefined;

  constructor(private monsterService: MonsterService) {
    this.monsters = this.monsterService.getMonsters();
  }

  setSelectedMonster(name: string) {
    this.selectedMonster = this.monsters.find((m) => m.name === name);
  }
}
