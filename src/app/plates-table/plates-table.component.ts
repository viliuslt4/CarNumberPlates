import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatesService } from '../plates.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'; 
import { Plate } from '../models/plate.model';
import { MatSort } from '@angular/material/sort'
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-plates-table',
  templateUrl: './plates-table.component.html',
  styleUrls: ['./plates-table.component.scss']
})

export class PlatesTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'plateNumber', 'edit', 'remove'];
  dataSource: MatTableDataSource<any>;
  newPlate: Plate;

  constructor(private plateService: PlatesService, private dialog: MatDialog){}

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;

  ngOnInit() {
    this.loadAllPlates();
  }
  openDialog(plate:Plate) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      plate:plate,
      plates:this.dataSource.data
    };
    this.dialog.open(EditComponent, dialogConfig);
  }
  openDialog2(plate:Plate) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = plate;
    this.dialog.open(DeleteComponent, dialogConfig);
  }
  loadAllPlates(){
    this.plateService.getAllPlates().subscribe(plates=>{ 
      this.dataSource = new MatTableDataSource (plates); 
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.sort;
    });
  }
}