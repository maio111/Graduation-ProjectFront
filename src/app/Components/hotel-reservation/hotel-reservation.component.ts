import { Component } from '@angular/core';
import { BraintreeService } from '../../Services/braintree.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var braintree: any;

@Component({
  selector: 'app-hotel-reservation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './hotel-reservation.component.html',
  styleUrl: './hotel-reservation.component.css'
})
export class HotelReservationComponent {
  bookingDate = new Date();  // Replace with actual data
  status = 'Confirmed';  // Replace with actual data
  totalPrice = 100.00;  // Replace with actual data
  notes = 'Some notes';  // Replace with actual data
  checkInDate = new Date();  // Replace with actual data
  checkOutDate = new Date();  // Replace with actual data
  paymentMethod = 'cash';
  private dropinInstance: any;
  constructor(private braintreeService: BraintreeService) { }

  ngOnInit(): void {
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

        this.braintreeService.checkout(payload.nonce, this.totalPrice).subscribe({
          next: (response: any) => {
            console.log('Payment successful:', response);
          },
          error: (error: any) => {
            console.error('Payment error:', error);
          }
        });
      });
    } else {
      console.log('Cash payment selected.');
      // Handle cash payment logic here
    }
  }
}
