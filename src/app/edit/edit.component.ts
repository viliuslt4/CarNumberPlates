import { Component, Inject } from '@angular/core';
import { Plate } from '../models/plate.model';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PlatesService } from "../plates.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  plate: Plate;
  newPlate: Plate;
  error: string;
  changed: boolean = false;
  editPlateForm: any;
  clicked = false;
  constructor(private dialogRef: MatDialogRef<EditComponent>, private platesService:PlatesService, private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) data){
      this.plate = data.plate;
      this.editPlateForm = this.formBuilder.group({
        owner: [this.plate.name, [Validators.required, ValidationService.onlyLetters]],
        plateNumber: [this.plate.plateNumber, [Validators.required, ValidationService.plateNumberMatch]],
        isSame: ''
      });
      this.editPlateForm.setValidators(ValidationService.checkIfSame(this.plate));
  }
  get owner() { return this.editPlateForm.get('owner'); }
  get plateNumber() { return this.editPlateForm.get('plateNumber'); }
  get matched() {return this.editPlateForm.get('isSame'); }
  close(){
    this.dialogRef.close();
  }
  save(){
    if(this.editPlateForm.status !== 'INVALID'){
      this.clicked = true;
      this.newPlate = new Plate();
      this.newPlate.name = this.capitalizeFirstLetter(this.owner.value);
      this.newPlate.plateNumber = this.plateNumber.value.toUpperCase();
      this.platesService.editRecord(this.plate, this.newPlate).subscribe(result=>{
        if(result.response === "Failed"){
          this.error = result.Message;
          this.clicked = false;
        }else{
          this.changed = true;
          this.clicked = false;
          setTimeout(()=>{
            this.close();
            location.reload();
          }, 3000);
        }
      });  
    }
  }
  capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
