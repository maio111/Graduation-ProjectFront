import { Component, OnInit } from '@angular/core';
import { BraintreeService } from '../../Services/braintree.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CarRentalDTO } from '../../models/CarRents/CarRentalDTO';
import { CarPaymentService } from '../../Services/car-payment.service';

declare var braintree: any;

@Component({
  selector: 'app-car-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './car-payment.component.html',
  styleUrls: ['./car-payment.component.css']
})
export class CarPaymentComponent implements OnInit {
  carRentalData: CarRentalDTO = {} as CarRentalDTO;
  paymentMethod = 'cash';
  validationMessage: string = '';
  private dropinInstance: any;

  constructor(
    private braintreeService: CarPaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const rentalJson = params['rental'];
      const priceJson = params['price'];
      if (rentalJson) {
        try {
          this.carRentalData = JSON.parse(decodeURIComponent(rentalJson));
          this.carRentalData.TotalPrice = JSON.parse(decodeURIComponent(priceJson));
          console.log(this.carRentalData);
        } catch (e) {
          console.error('Error parsing rental data JSON', e);
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
    if (!this.carRentalData.PickUpDate || !this.carRentalData.DropOffDate || !this.carRentalData.TotalPrice) {
      this.validationMessage = 'All rental details must be filled out.';
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

        const nonce = payload.nonce;
        const totalPrice = this.carRentalData.TotalPrice || 0; // Default to 0 if undefined

        this.braintreeService.checkout(nonce, totalPrice, this.carRentalData).subscribe({
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
      const totalPrice = this.carRentalData.TotalPrice || 0; // Default to 0 if undefined

      this.braintreeService.checkoutCash(totalPrice, this.carRentalData).subscribe({
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
