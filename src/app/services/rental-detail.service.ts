import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { RentalDetailDto } from '../models/rentalDetailDto';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {

  apiUrl = "https://localhost:44390/api/rentals/getrentaldetails";

  constructor(private httpClient: HttpClient) {}

  getRentalsDetails():Observable<ListResponseModel<RentalDetailDto>> {

    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl);

  }
}
