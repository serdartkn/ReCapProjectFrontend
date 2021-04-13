import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {
carImages:CarImage[]=[];
dataLoaded = false;

  constructor() { }

  ngOnInit(): void {

  }


}
