import { Component, OnInit, Inject } from '@angular/core';
import { Plate } from '../models/plate.model';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PlatesService } from "../plates.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  plate: Plate;
  newPlate: Plate;
  error: string;
  mainError: boolean = false;
  plates: Plate[];
  changed: boolean = false;
  constructor(private dialogRef: MatDialogRef<EditComponent>, private platesService:PlatesService,
    @Inject(MAT_DIALOG_DATA) data){
      this.plate = data.plate;
      this.newPlate = Object.assign({}, data.plate);
      this.plates = data.plates;
    }

  ngOnInit() {

  }
  close() {
    this.dialogRef.close();
  }
  save(){
    let regexPlate = /^[a-zA-Z]{3}-{1}?\d{3}$/i;
    let regexOwner = /[a-zA-Z]+/g;
    this.mainError = false;
    this.error = "";
    this.newPlate.plateNumber = this.newPlate.plateNumber.toUpperCase();
    if(!regexPlate.test(this.newPlate.plateNumber)){
      this.error = "Invalid car plate number, it should folow XXX-123 example!";
      this.mainError = true;
    }
    if(!regexOwner.test(this.newPlate.name)){
      this.error = "Owner name should contain only letters!";
      this.mainError = true;
    }
    if(this.newPlate.name === '' || this.newPlate.name === undefined){
      this.error = "Owner name couldn't be empty";
      this.mainError = true;
    }
    if(this.plates.findIndex(x=>x.plateNumber === this.newPlate.plateNumber) > -1){
      this.error = "This car plate number already exists!";
      this.mainError = true;
    }
    if(!this.mainError){
      this.platesService.editRecord(this.plate, this.newPlate).subscribe(response=>{
        if(response === "Failed"){
          this.error === "Something went wrong, please try again!";
        }else{
          this.changed = true;
          setTimeout(()=>{
            this.dialogRef.close();
            location.reload();
          }, 3000);
        }
      });  
    }
  }
}
