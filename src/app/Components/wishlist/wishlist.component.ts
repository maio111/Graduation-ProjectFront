import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListHotelService } from '../../Services/wish-list-hotel.service';
import { IWishlistHotelDTO } from '../../models/Hotel/IWishlistHotelDTO';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { IHotelPhotoF } from '../../models/Hotel/IHotelPhotoF';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { IFilteredHotel } from '../../models/Hotel/IFilteredHotel';
import { Ihotel } from '../../models/Hotel/Ihotel';
import { HotelService } from '../../Services/hotel.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishListHotels: IWishlistHotelDTO[] = [];
  HotelDB: Ihotel = {} as Ihotel
  userId: number = 0; // Initialize with appropriate default value
  baseUrl: string = environment.baseUrl;
  filteredHotel: IFilteredHotel = {} as IFilteredHotel;
  constructor(private wishListHotelService: WishListHotelService
    ,private auth:AuthenticationService,
    private router: Router,
    private hotelService : HotelService 
  ) { }

  ngOnInit(): void {
    const token = this.auth.getToken();
    const decoded = this.auth.decodeToken(token);
    this.userId = this.auth.getUserIdFromToken(decoded);
    // Load wishlist hotels
    this.loadWishListHotels();
  }

  

  loadWishListHotels(): void {
    this.wishListHotelService.getWishListHotels(this.userId).subscribe(
      response => {
        this.wishListHotels = response.data;
      },
      error => {
        console.error('Error loading wishlist hotels:', error);
        // Handle error as needed
      }
    );
  }

  removeHotelFromWishList(hotelId: number): void {
    this.wishListHotelService.removeHotelFromWishList(this.userId, hotelId).subscribe(
      () => {
        // Remove hotel from local list
        this.wishListHotels = this.wishListHotels.filter(hotel => hotel.id !== hotelId);
      },
      error => {
        console.error('Error removing hotel from wishlist:', error);
        // Handle error as needed
      }
    );
  }

  getMainPhoto(hotel: IWishlistHotelDTO): IHotelPhotoF | undefined {
    return hotel.photos?.find((photo: IHotelPhotoF) => photo.category === 1);
  }

  // goHotelDetails(hotel: IWishlistHotelDTO): void {
  //   this.hotelService.getHotelById(hotel.id).subscribe(
  //     (res: any) => {
  //       this.HotelDB = res.data;
  //       console.log(this.HotelDB)
  //       // Map IHotel to IFilteredHotel
  //       this.filteredHotel = {
  //         id: this.HotelDB.id,
  //         name: this.HotelDB.name,
  //         description: this.HotelDB.description,
  //         rating: undefined, // Ensure rating is properly assigned
  //         cityName: '', // Assign cityName if available
  //         price: undefined, // Assign price if available
  //         longitude: this.HotelDB.longitude,
  //         latitude: this.HotelDB.latitude,
  //         photos: [], // Populate photos array with proper data
  //         rooms: [], // Populate rooms array with proper data
  //         features: [] // Populate features array with proper data
  //       };
  //       // Navigate to hotel details with filteredHotel as query parameter
  //       this.router.navigate(['hoteldetails'], {
  //         queryParams: {
  //           filterHotel: encodeURIComponent(JSON.stringify(this.filteredHotel)),
  //         }
  //       });debugger
  //     },
  //     error => {
  //       console.error('Error fetching hotel:', error);
  //       // Handle error as needed
  //     }
  //   );
  // }
}
