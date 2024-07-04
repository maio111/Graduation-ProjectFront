import { Component } from '@angular/core';
import { BraintreeService } from '../../Services/braintree.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateBookingDTO } from '../../models/HotelBooking/CreateBookingDTO';
import { BookingStatus } from '../../models/Enums/BookingStatus';
declare var braintree: any;
@Component({
  selector: 'app-hotel-payment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './hotel-payment.component.html',
  styleUrl: './hotel-payment.component.css'
})
export class HotelPaymentComponent {
  bookingData: CreateBookingDTO = {} as CreateBookingDTO;
  bookingDate = new Date();
  paymentMethod = 'cash';
  private dropinInstance: any;
  constructor(
    private braintreeService: BraintreeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filterJson = params['booking'];
      if (filterJson) {
        try {
          this.bookingData = JSON.parse(decodeURIComponent(filterJson));
          console.log(this.bookingData)
        } catch (e) {
          console.error('Error parsing booking data JSON', e);
        }
      }
    });
    if (this.paymentMethod === 'paypal') {
      this.initializeBraintree();
    }
  }

  initializeBraintree(): void {
    this.braintreeService.getClientToken().subscribe({
      next: (response: { clientToken: any; }) => {
        braintree.dropin.create({
          authorization: response.clientToken,
          container: '#dropin-container'
        }, (createErr: any, instance: any) => {
          if (createErr) {
            console.error('Error creating Braintree Drop-in instance:', createErr);
            return;
          }
          this.dropinInstance = instance;
        });
      },
      error: err => {
        console.error('Error fetching client token:', err);
      }
    });
  }

  submitPayment(): void {
    if (this.paymentMethod === 'paypal') {
      if (!this.dropinInstance) {
        console.error('Braintree Drop-in instance is not initialized.');
        return;
      }

      this.dropinInstance.requestPaymentMethod((err: any, payload: any) => {
        if (err) {
          console.error('Error requesting payment method:', err);
          return;
        }
        this.braintreeService.checkout(payload.nonce, this.bookingData.totalPrice, this.bookingData).subscribe({
          next: (response: any) => {
            console.log('Payment successful:', response);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.error('Payment error:', error);
          }
        });
      });
    } else {
      this.braintreeService.checkoutCash(this.bookingData.totalPrice, this.bookingData).subscribe({
        next: (response: any) => {
          console.log('successful:', response);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.error('error:', error);
        }
      });
    }
  }
}
