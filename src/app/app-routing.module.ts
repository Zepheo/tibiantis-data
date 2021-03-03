import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonsterTableComponent } from './monster-table/monster-table.component';
import { MonsterValuesComponent } from './monster-values/monster-values.component';

const routes: Routes = [
  { path: 'monster-values', component: MonsterValuesComponent },
  { path: 'monster-table', component: MonsterTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
