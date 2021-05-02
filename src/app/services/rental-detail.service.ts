import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { RentalDetailDto } from '../models/rentalDetailDto';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {

  apiUrl = "https://localhost:44390/api/";

  constructor(private httpClient: HttpClient) {}

  getRentalsDetails():Observable<ListResponseModel<RentalDetailDto>> {
    let newPath=this.apiUrl + "rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }

  getRentalsById(carId:number):Observable<ListResponseModel<RentalDetailDto>>{
    let newPath=this.apiUrl + "rentals/getrentaldetailsbyid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }

  checkCar(carId:number){
    let newPath = this.apiUrl + "rentals/checkcar?carId=" + carId;
    return this.httpClient.get<boolean>(newPath);
  }
}
