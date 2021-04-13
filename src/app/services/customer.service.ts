import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44390/api/customers/getall";

  constructor(private httpClient: HttpClient) {}

  getCustomers():Observable<ListResponseModel<Customer>> {

    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);

  }
}