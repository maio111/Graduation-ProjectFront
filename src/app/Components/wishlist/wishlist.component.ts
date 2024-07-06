import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListHotelService } from '../../Services/wish-list-hotel.service';
import { IWishlistHotelDTO } from '../../models/Hotel/IWishlistHotelDTO';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { IHotelPhotoF } from '../../models/Hotel/IHotelPhotoF';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishListHotels: IWishlistHotelDTO[] = [];
  userId: number = 0; // Initialize with appropriate default value
  baseUrl: string = environment.baseUrl;
  constructor(private wishListHotelService: WishListHotelService
    ,private auth:AuthenticationService
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
}
