import { Component, OnInit } from '@angular/core';
import { BraintreeService } from '../../Services/braintree.service';
declare var braintree: any;
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  private dropinInstance: any;

  constructor(private braintreeService: BraintreeService){ }

  ngOnInit(): void {
    this.braintreeService.getClientToken().subscribe({
      next: response => {
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
    if (!this.dropinInstance) {
      console.error('Braintree Drop-in instance is not initialized.');
      return;
    }

    this.dropinInstance.requestPaymentMethod((err: any, payload: any) => {
      if (err) {
        console.error('Error requesting payment method:', err);
        return;
      }

      this.braintreeService.checkout(payload.nonce, 10.00).subscribe({
        next: response => {
          console.log('Payment successful:', response);
        },
        error: error => {
          console.error('Payment error:', error);
        }
      });
    });
  }
}
