import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44390/api/rentals/getall";

  constructor(private httpClient: HttpClient) {}

  getRentals():Observable<ListResponseModel<Rental>> {

    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);

  }
}