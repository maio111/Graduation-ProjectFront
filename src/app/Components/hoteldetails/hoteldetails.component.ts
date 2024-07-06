import { CommonModule } from '@angular/common';
import { Component, OnInit, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { HoteldetailsimgComponent } from '../hoteldetailsimg/hoteldetailsimg.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilteredHotel } from '../../models/Hotel/IFilteredHotel';
import { IHotelPhotoF } from '../../models/Hotel/IHotelPhotoF';
import { environment } from '../../../environments/environment';
import { HotelMapComponent } from "../admin-dashboard/hotels-dashboard/hotel-map/hotel-map.component";
import { getViewLabel, getViewsValues } from '../../utilities/getViews';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { IRoomType } from '../../models/IRoomType';
import { CreateBookingDTO } from '../../models/HotelBooking/CreateBookingDTO';
import { IFilteredRoomHotel } from '../../models/Hotel/IFilteredRoomHotel';
import { IHotelFilteredParams } from '../../models/Hotel/IHotelFilteredParams';
import { ReviewService } from '../../Services/review.service';
import { IDisplayHotelReviewDTO } from '../../models/Review/IDisplayHotelReviewDTO';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { IAddHotelReviewDTO } from '../../models/Review/IAddHotelReviewDTO';
import { WishListHotelService } from '../../Services/wish-list-hotel.service';


@Component({
  selector: 'app-hoteldetails',
  standalone: true,
  templateUrl: './hoteldetails.component.html',
  styleUrl: './hoteldetails.component.css',
  imports: [FormsModule, CommonModule, HoteldetailsimgComponent, KnobModule, HotelMapComponent, NavBarComponent]
})
export class HoteldetailsComponent implements OnInit {

  reviews: IDisplayHotelReviewDTO[] = [] as IDisplayHotelReviewDTO[];
  roomTypes: IRoomType[] = [] as IRoomType[];
  views!: { label: string, value: number }[];
  filteredHotel: IFilteredHotel = {} as IFilteredHotel;
  filterParams: IHotelFilteredParams = {} as IHotelFilteredParams
  baseUrl: string = environment.baseUrl;
  hotelCoordinates = { latitude: 0, longitude: 0 };
  booking!: CreateBookingDTO;
  newComment: string = '';

  userId: number = 0;
  isWishlist : boolean=false;

  getViewsValues = getViewsValues;
  getViewLabel = getViewLabel;
  featureIcons: { [key: string]: string } = {
    warehouse: 'fa-warehouse',
    pool: 'fa-swimming-pool',
    gym: 'fa-dumbbell',
    Wifi: 'fa-solid fa-wifi',
    spa: 'fa-solid fa-spa',
    parking: 'fa-solid fa-square-parking',
    bathroom: 'fa-solid fa-bath',
    shuttle: 'fa-solid fa-van-shuttle',
    balcony: 'fa-solid fa-torii-gate',
    bar: 'fa-solid fa-martini-glass-citrus',
    'kids area': 'fa-solid fa-children',
    'Facilities for disabled guests': 'fa-solid fa-wheelchair',
    'wellness care': 'fa-solid fa-staff-snake'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
<<<<<<< HEAD
    private auth: AuthenticationService
  ) {

   }
=======
    private auth: AuthenticationService,
    private wishListService: WishListHotelService,
  ) { }
>>>>>>> 600b3b8d6aba3dbbb17428ce247061c65ea35180


  
  ngOnInit(): void {
    if (this.auth.getToken() != '') {
      const token = this.auth.getToken();
      const decoded = this.auth.decodeToken(token);
      this.userId = this.auth.getUserIdFromToken(decoded);
    }
    this.views = getViewsValues();
    this.route.queryParams.subscribe(params => {
      const filterHotelJson = params['filterHotel'];
      const filterParams = params['filterParams'];
      const isInWishlist = params['isInWishlist'];
      if (filterHotelJson) {
        try {
          this.filteredHotel = JSON.parse(decodeURIComponent(filterHotelJson));
          this.hotelCoordinates.latitude = this.filteredHotel.latitude;
          this.hotelCoordinates.longitude = this.filteredHotel.longitude;

          this.isWishlist = JSON.parse(decodeURIComponent(isInWishlist));

          this.filterParams = JSON.parse(decodeURIComponent(filterParams));
          console.log(this.filterParams);
          this.getHotelReviews(this.filteredHotel.id);
        } catch (e) {
          console.error('Error parsing hotels JSON', e);
        }
      }

    });

    console.log(this.reviews)

  }
  getHotelReviews(hotelId: number): void {
    this.reviewService.getAllReviewsByHotelId(hotelId).subscribe({
      next: (res) => {
        this.reviews = res.data;
        console.log(res)
      },
      error: (err) => {
        console.error('Error fetching reviews', err);
      }
    });
  }
  value1!: number;
  value2!: number;
  value3!: number;
  value4!: number;
  value5!: number;
  modalImageSrc: string | null = null;
  openModal(imageSrc: string) {
    this.modalImageSrc = imageSrc;
  }
  getMainPhoto(hotel: IFilteredHotel) {
    return hotel.photos.find((photo: IHotelPhotoF) => photo.category === 1);
  }
  getStars(rating: number = 0): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return [
      ...Array(fullStars).fill('★'),
      ...Array(emptyStars).fill('☆')
    ];
  }
  getCategory2Photos() {
    return this.filteredHotel.photos
      .filter((photo: any) => photo.category === 2)
      .slice(0, 6);
  }
  createBooking(room: IFilteredRoomHotel) {
    this.router.navigate(['reservationDetails'], {
      queryParams: {
        room: JSON.stringify(room),
        hotel: JSON.stringify(this.filteredHotel),
        filterParams: JSON.stringify(this.filterParams)
      }
    });
  }
  addComment() {
    if (this.newComment.trim()) {
      const newReview: IAddHotelReviewDTO = {
        userId: this.userId,
        comment: this.newComment,
        hotelId: this.filteredHotel.id,
        reviewDate: new Date()
      };
      this.reviewService.addReview(newReview).subscribe(response => {
        this.getHotelReviews(this.filteredHotel.id);
        this.newComment = '';
      });
    }
  }
  defaultPhotoUrl: string = 'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png';

  toggleWishlist(hotel: IFilteredHotel ): void {
    if (this.isWishlist) {
      this.wishListService.removeHotelFromWishList(this.userId, hotel.id).subscribe({
        next: () => {
          this.isWishlist = false;
        },
        error: err => console.error(err)
      });
    } else {
      this.wishListService.addHotelToWishList(this.userId, hotel.id).subscribe({
        next: () => {
          this.isWishlist = true;
        },
        error: err => console.error(err)
      });
    }

   
  }

}
