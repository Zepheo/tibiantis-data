import { Injectable } from '@angular/core';
import { monsters } from 'src/assets/data/monsters';
import { Monster } from 'src/types/monster';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  private _monsters = monsters as Monster[];
  constructor() {}

  getMonsters() {
    return this._monsters;
  }
}
