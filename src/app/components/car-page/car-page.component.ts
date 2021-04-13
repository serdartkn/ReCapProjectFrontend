import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarDetailDto } from 'src/app/models/carDetailDto';

@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.css'],
})
export class CarPageComponent implements OnInit {
  carImages: CarImage[] = [];
  dataLoaded = false;
  index: number = 0;
  carDetail:CarDetailDto[] = [];

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarImagesById(params['carId']);
        this.getCarDetailById(params["carId"])
      }
    });
  }

  getCarImagesById(carId: number) {
    this.carImageService.getCarImagesById(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      console.log(response.data);
    });
  }

  getCarDetailById(carId: number) {
    this.carDetailService.getCarDetailById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
    });
}
}
