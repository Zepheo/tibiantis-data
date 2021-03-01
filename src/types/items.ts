export interface Items {
  [id: string]: Item;
}

export interface Item {
  name: string;
  flags?: string[];
  attributes?: { [attribute: string]: string };
  description?: string;
}
