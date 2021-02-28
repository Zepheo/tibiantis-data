import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonsterValuesComponent } from './monster-values/monster-values.component';

const routes: Routes = [
  { path: 'monster-values', component: MonsterValuesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
