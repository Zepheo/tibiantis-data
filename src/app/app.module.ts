import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TopMenuComponent } from './top-menu/top-menu.component';
import { MonsterValuesComponent } from './monster-values/monster-values.component';
import { MonsterFilterPipe } from './pipes/monster-filter.pipe';
import { MonsterDetailsComponent } from './monster-values/monster-details/monster-details.component';
import { MonsterValuesSettingsComponent } from './monster-values-settings/monster-values-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    MonsterValuesComponent,
    MonsterFilterPipe,
    MonsterDetailsComponent,
    MonsterValuesSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
