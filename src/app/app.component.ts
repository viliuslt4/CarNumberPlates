import { Component, OnInit} from '@angular/core';
import { PlatesService } from './plates.service';
import { Plate } from './models/plate.model';
import { environment } from './../environments/environment';
import { ValidationService } from './validation.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Car number plates';
  message: string = "";
  error: string = "";
  newPlate: Plate;
  createNewPlateForm: any;
  clicked: boolean = false;
  constructor (private platesService:PlatesService, private formBuilder: FormBuilder ) {}

  ngOnInit() {
    this.createNewPlateForm = this.formBuilder.group({
      owner: ['', [Validators.required, ValidationService.onlyLetters]],
      plateNumber: ['', [Validators.required, ValidationService.plateNumberMatch]]
    });
  }
  get owner() { return this.createNewPlateForm.get('owner'); }
  get plateNumber() { return this.createNewPlateForm.get('plateNumber'); }
  createNew(){
    if(this.createNewPlateForm !== "INVALID"){
      this.clicked = true;
      this.newPlate = new Plate();
      this.newPlate.name = this.capitalizeFirstLetter(this.owner.value);
      this.newPlate.plateNumber = this.plateNumber.value.toUpperCase();
      this.platesService.saveNewPlate(this.newPlate).subscribe(result=>{
        if(result.response === "Failed"){
          this.error = "This car plate number already exists";         
        } else{
          setTimeout(()=>{
            this.message = "You have successfully created new record";
            location.reload();
          },2000);
        }
      });
    }
    this.clearMessage();
  }
  clearMessage(){
    setTimeout(()=>{
      this.error = "";
      this.message = "";
      this.clicked = false;
    },3000);
  }
  capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
