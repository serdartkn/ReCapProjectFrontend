// import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';

import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  // providers: [DatePipe],
})
export class RentalAddComponent implements OnInit {
  @Input() carDetailDto: CarDetailDto;
  customerId: number;
  customers: Customer[];
  rentalAddForm : FormGroup
  currentDate:Date=new Date()

  rentDate: Date;
  returnDate: Date;
  firstDateSelected: boolean = false;
  dateAvailable: ResponseModel;
  

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private formBuilder :FormBuilder,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.createRentalAddForm();
    this.getCustomer();
  }

  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group(
      {
        carId: [this.carDetailDto.carId, Validators.required],
        customerId:["",Validators.required],
        rentDate:["",Validators.required],
        returnDate:["", Validators.required]
      }
    )
  }

  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

    checkDate(rental:Rental){
    let rentDate = new Date(rental.rentDate);
    let returnDate = new Date(rental.returnDate);
    if (rentDate<this.currentDate){
      this.toastrService.error("Hata","Minimum Bugünün Tarihi Girilmelidir.");
    }

    if(returnDate < rentDate){
      this.toastrService.error("Hata","Araç Teslim Tarihi Kiralama Tarihinden Önce Olamaz. ");
    }
  }

  calculatePayment(rental:Rental){
    
    let calculateDay = rental.returnDate.getTime() - 
    rental.rentDate.getTime() == 0 ? 1 : 
    rental.returnDate.getTime() - rental.rentDate.getTime()
    let formul = calculateDay * this.carDetailDto.dailyPrice
  }

  add(){
    if(this.rentalAddForm.valid)
    {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      this.checkDate(rentalModel)
      this.calculatePayment(rentalModel)
      this.router.navigate(['payment', JSON.stringify(rentalModel)])
      this.toastrService.info("Ödeme Sayfasına Yönlendiriliyorsunuz.")
    }
  }

}