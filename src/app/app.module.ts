import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { PlatesTableComponent } from './plates-table/plates-table.component';

import { PlatesService } from './plates.service';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    AppComponent,
    PlatesTableComponent,
    EditComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [PlatesService, PlatesTableComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
