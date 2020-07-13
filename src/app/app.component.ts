import { Component, OnInit} from '@angular/core';
import { PlatesService } from './plates.service';
import { Plate } from './models/plate.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Car number plates';
  mainError: boolean = false;
  message: string = "";
  error: string = "";
  newPlate = new Plate();
  constructor (private platesService:PlatesService ) {}

  ngOnInit() {

  }
  createNew(){
    let regexPlate = /^[a-zA-Z]{3}-{1}?\d{3}$/i;
    let regexOwner = /[a-zA-Z]+/g;
    this.mainError = false;
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
    if(!this.mainError){
      this.platesService.saveNewPlate(this.newPlate).subscribe(response=>{
        if(response.response === "Failed"){
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
    this.mainError = true;
    setTimeout(()=>{
      this.error = "";
      this.message = "";
    },3000);
  }
}
