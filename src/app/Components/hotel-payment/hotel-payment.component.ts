import { Component, OnInit } from '@angular/core';
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
  imports: [FormsModule, CommonModule],
  templateUrl: './hotel-payment.component.html',
  styleUrls: ['./hotel-payment.component.css']
})
export class HotelPaymentComponent implements OnInit {
  bookingData: CreateBookingDTO = {} as CreateBookingDTO;
  bookingDate = new Date();
  paymentMethod = 'cash';
  validationMessage: string = '';
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

  validatePayment(): boolean {
    if (!this.bookingData.bookingDate || !this.bookingData.status || !this.bookingData.totalPrice ||
        !this.bookingData.checkInDate || !this.bookingData.checkOutDate) {
      this.validationMessage = 'All booking details must be filled out.';
      return false;
    }
    if (this.paymentMethod === 'paypal' && !this.dropinInstance) {
      this.validationMessage = 'Payment method must be selected.';
      return false;
    }
    this.validationMessage = '';
    return true;
  }

  submitPayment(): void {
    if (!this.validatePayment()) {
      return;
    }

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
            this.validationMessage = 'Payment error. Please try again.';
          }
        });
      });
    } else {
      this.braintreeService.checkoutCash(this.bookingData.totalPrice, this.bookingData).subscribe({
        next: (response: any) => {
          console.log('Payment successful:', response);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.error('Payment error:', error);
          this.validationMessage = 'Payment error. Please try again.';
        }
      });
    }
  }
}
