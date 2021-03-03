import { LootTableItem } from './lootTable';

export interface Monster {
  id?: string;
  name: string;
  exp: number;
  summonCost: number;
  atk: number;
  def: number;
  arm: number;
  skills: Skill[];
  loot?: MonsterLoot[];
}

export interface MonsterWithLootValue extends Monster {
  lootTable?: LootTableItem[];
}

interface Skill {
  skill: string;
  value: number;
}

interface MonsterLoot {
  id: string;
  amount: number;
  chance: number;
}
