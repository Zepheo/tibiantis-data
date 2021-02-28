import { Pipe, PipeTransform } from '@angular/core';
import { Monster } from 'src/types/monster';

@Pipe({
  name: 'MonsterFilter',
})
export class MonsterFilterPipe implements PipeTransform {
  transform(value: Monster[], input: string): Monster[] {
    if (!input || input === '') {
      return value;
    }
    return value.filter((m) => m.name.includes(input.toLowerCase()));
  }
}
