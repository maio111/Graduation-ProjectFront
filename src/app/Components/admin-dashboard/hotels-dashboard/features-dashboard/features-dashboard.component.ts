import { Component, OnInit } from '@angular/core';
import { IHotelFeature } from '../../../../models/IHotelFeature';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../../Services/hotel.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavBarComponent } from "../../../nav-bar/nav-bar.component";

@Component({
    selector: 'app-features-dashboard',
    standalone: true,
    templateUrl: './features-dashboard.component.html',
    styleUrl: './features-dashboard.component.css',
    imports: [FormsModule, CommonModule, NgxPaginationModule, NavBarComponent]
})
export class FeaturesDashboardComponent implements OnInit {
  Features!: IHotelFeature[];
  currentHotelId!: number;
  currentFeature!: IHotelFeature;
  page:any;
  total:any;

  constructor(private router: Router, private hotelService: HotelService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.currentHotelId = params['Id'];
    })
   }
  ngOnInit(): void {
    this.getAllFeatures();
  }
  ngOnChange() {
    this.getAllFeatures();
  }
  getAllFeatures() {
    this.hotelService.getHotelFeatures(this.currentHotelId).subscribe(
      {
        next: (res) => this.Features = res.data,
        error: (error) => console.log(error)
      }
    )
  }
  goToAddPage() {
    this.router.navigate(["dashboard/addFeature/", this.currentHotelId]);
  }
  navigateToEdit(id:number, feature:IHotelFeature) {
    this.router.navigate(['dashboard/editFeature', this.currentHotelId], {
      queryParams: { feature: JSON.stringify(feature) }
    });
  }
  deleteFeature(id: number) {
    this.hotelService.deleteHotelFeature(this.currentHotelId, id).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error)
    })
    window.location.reload();
  }
  changePage(event: any) {
    this.page = event;
    this.getAllFeatures();
  }
}
