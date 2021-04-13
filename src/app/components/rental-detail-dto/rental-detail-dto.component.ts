import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalDetailService } from 'src/app/services/rental-detail.service';

@Component({
  selector: 'app-rental-detail-dto',
  templateUrl: './rental-detail-dto.component.html',
  styleUrls: ['./rental-detail-dto.component.css']
})
export class RentalDetailDtoComponent implements OnInit {
  rentalDetails:RentalDetailDto[]=[];
  dataLoaded = false;

  constructor(private rentalDetailService:RentalDetailService) { }

  ngOnInit(): void {
    this.getRentalDetail();
  }

  getRentalDetail() {
    this.rentalDetailService.getRentalsDetails().subscribe((response) => {
      this.rentalDetails = response.data
      this.dataLoaded = true;
    });
  }

}
