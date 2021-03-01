export interface LootTableItem {
  name: string;
  dropChance: number;
  amount: number;
  exclude: boolean;
  sell: {
    value: number;
    vendors: string[];
  };
}
