export interface LootTableItem {
  name: string;
  dropChance: number;
  amount: number;
  sell: {
    value: number;
    vendors: string[];
  };
}
