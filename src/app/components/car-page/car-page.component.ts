import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { RentalDetailService } from 'src/app/services/rental-detail.service';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.css'],
})
export class CarPageComponent implements OnInit {
  carImages: CarImage[] = [];
  dataLoaded = false;
  index: number = 0;
  carDetailDto: CarDetailDto;
  checkCarDate:boolean

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private rentalDetailService: RentalDetailService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {    
    this.activatedRoute.params.subscribe((params) => {
      if ((params['carId'], params['carId'])) {
        this.getCarImagesById(params['carId']);
        this.getCarDetailById(params['carId']);
      }
      
      this.checkCar(params["carId"]);
    });
  }
  
  getCarImagesById(carId: number) {
    this.carImageService.getCarImagesById(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailById(carId: number) {
    this.carDetailService.getCarDetailById(carId).subscribe((response) => {
      this.carDetailDto = response.data[0];
      this.dataLoaded = true;
    });
  }

  checkCar(carId:number){
    this.rentalDetailService.checkCar(carId).subscribe((response) => {
      this.checkCarDate=response
    });
  }

}