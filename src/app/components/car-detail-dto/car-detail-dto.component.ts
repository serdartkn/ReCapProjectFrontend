import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { ColorService } from 'src/app/services/color.service';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/models/color';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-detail-dto',
  templateUrl: './car-detail-dto.component.html',
  styleUrls: ['./car-detail-dto.component.css'],
})
export class CarDetailDtoComponent implements OnInit {
  carsDetails: CarDetailDto[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  currentCarDetail: CarDetailDto | null;
  dataLoaded = false;
  filterText = '';
  brandNameFilter: string;
  colorNameFilter: string;

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["brandName"] && params["colorName"]) {
        this.getCarsSelected(params["brandName"], params["colorName"]);
      } else if (params['color']) {
        this.getCarBycolor(params['color']);
      } else if (params['brand']) {
        this.getCarByBrand(params['brand']);
      } else {
        this.getCarDetail();
      }
    });
    this.getColor();
    this.getBrand();
  }

  getCarDetail() {
    this.carDetailService.getCarsDetails().subscribe((response) => {
      this.carsDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarByBrand(brand: string) {
    this.carDetailService.getCarsByBrand(brand).subscribe((response) => {
      this.carsDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarBycolor(color: string) {
    this.carDetailService.getCarsByColor(color).subscribe((response) => {
      this.carsDetails = response.data;
      this.dataLoaded = true;
      console.log(response.data);
    });
  }

  getCarDetailById(id: number) {
    this.carDetailService.getCarDetailById(id).subscribe((response) => {
      this.carsDetails = response.data;
      this.dataLoaded = true;
      console.log(response.data);
    });
  }

  setCurrentCarDetail(carDetail: CarDetailDto) {
    this.currentCarDetail = carDetail;
  }

  getColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  selectedColor(colorName: string) {
    if (this.colorNameFilter == colorName) {
      return true;
    } else {
      return false;
    }
  }

  selectedBrand(brandName: string) {
    if (this.brandNameFilter == brandName) {
      return true;
    } else {
      return false;
    }
  }

  getCarsSelected(brandName: string, colorName: string) {
    this.carDetailService
      .getCarsSelected(brandName, colorName)
      .subscribe((response) => {
        this.carsDetails = response.data;
        this.dataLoaded = true;
        if(this.carsDetails.length > 0){
          this.toastrService.success("Seçilen Kriterlerde "+this.carsDetails.length+" Araç Bulundu.")
          
        }else{
          this.toastrService.error("Seçilen Kriterlerde Araç Bulunamadı.")
        }
      })

  }
}
