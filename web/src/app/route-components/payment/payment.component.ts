import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from 'src/app/utils-components/base/base.component';
import { FoiRequest } from 'src/app/models/FoiRequest';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { WindowRefService } from 'src/app/services/window-ref.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {  
  @ViewChild(BaseComponent) base: BaseComponent;
  fee= null;
  foiRequest: FoiRequest;  
  authToken = '';
  feeCode = 'FOI010'
  isBusy = true;
  returnUrl = '';
  payBusy = false;
  continueText = "Proceed to payment"

  ministryKey = "ministry"

  constructor(private dataService: DataService, private keycloakService: KeycloakService, private windowRefService: WindowRefService) { }

  ngOnInit() {
    this.foiRequest = this.dataService.getCurrentState();

    const feeDetails = {
      selectedMinistry: this.foiRequest.requestData[this.ministryKey].ministry
    }

    this.dataService.getFeeDetails(this.feeCode, feeDetails).subscribe(result => {
      this.fee = result.fee;
      this.isBusy = false;
    }, error => {
      this.isBusy = false;
      console.log('Submission failed: ', error);
      alert('Temporary unable to fetch fee details. Please try again in a few minutes.');
      this.base.goFoiBack();
    })
  }

  doGoBack() {
    this.dataService.setCurrentState(this.foiRequest);
    this.base.goFoiBack();
  }

  doContinue() {
    this.payBusy = true;
    const response = this.doCreateTransaction();
    response.subscribe(transactionDetails => {
      if(transactionDetails.paySystemUrl) {
        this.windowRefService.goToUrl(transactionDetails.paySystemUr)
      }
      else {
        // error handling
      }
    })
  }

  getReturnUrl() {
    const nextRoute = this.dataService.getRoute(this.base.getCurrentRoute()).forward ||
      this.base.getCurrentRoute() + "-return";
    const fullUrl = window.location.origin + "/" + nextRoute; 
    return fullUrl
  }

  private doCreateTransaction () {
    return this.dataService.createTransaction({
      feeCode: this.feeCode,
      redirectUrl: this.getReturnUrl()
    })
  }
}
