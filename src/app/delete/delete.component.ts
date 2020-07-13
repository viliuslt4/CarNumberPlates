import { Component, OnInit, Inject } from '@angular/core';
import { Plate } from '../models/plate.model';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PlatesService } from "../plates.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  plate: Plate;
  changed: boolean = false;
  error: string;
  constructor(private dialogRef: MatDialogRef<DeleteComponent>, private platesService:PlatesService,
    @Inject(MAT_DIALOG_DATA) data){
      this.plate = data;
    }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  delete(){
    this.error = "";
    this.platesService.deleteRecord(this.plate).subscribe(response=>{
      if(response.response==="Success"){
        this.changed = true;
        setTimeout(()=>{
          location.reload();
        },2000);
      }else{
        this.error = "Something went wrong, please try again!";
      }
    });
  }
}
