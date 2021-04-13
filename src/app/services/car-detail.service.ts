import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetailDto } from '../models/carDetailDto';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = "https://localhost:44390/api/";

  constructor(private httpClient: HttpClient) {}

  getCarsDetails():Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarDetailById(id:number):Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "cars/getcardetailsbyid?id=" + id ;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  
    }

  getCarsByBrand(brand: string):Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl + 'cars/getcarsbybrandname/?brand=' + brand;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByColor(color: string):Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl + 'cars/getcarsbycolorname/?color=' + color;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
}