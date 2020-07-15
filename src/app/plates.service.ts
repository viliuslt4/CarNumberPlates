import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plate } from './models/plate.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatesService {

  constructor(private http: HttpClient) { }

  public getAllPlates(){
    return this.http.get<any>(environment.host + 'plates/getPlates');
  }
  public saveNewPlate(plate: Plate){
    let headers = new HttpHeaders({'Content-type': 'application/json; charset=UTF-8'});
    let options = {headers: headers};
    return this.http.post<any>(environment.host + 'plates/savePlate', JSON.stringify(plate), options)
  }
  public deleteRecord(plate:Plate){
    let headers = new HttpHeaders({'Content-type': 'application/json; charset=UTF-8'});
    let options = {headers: headers};
    return this.http.post<any>(environment.host + 'plates/deletePlate', JSON.stringify(plate), options)
  }
  public editRecord(plate:Plate, newPlate:Plate){
    let headers = new HttpHeaders({'Content-type': 'application/json; charset=UTF-8'});
    let options = {headers: headers};
    return this.http.post<any>(environment.host + 'plates/editPlate', JSON.stringify({old : plate, new : newPlate}), options)
  }
}
