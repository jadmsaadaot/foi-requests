import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  templateUrl: './proof-of-guardianship.component.html',
  styleUrls: ['./proof-of-guardianship.component.scss']
})
export class ProofOfGuardianshipComponent implements OnInit {

  @ViewChild(BaseComponent) base: BaseComponent;

  constructor() {}

  ngOnInit() {
  }

  doContinue() {
    this.base.goFoiForward();
  }
  doGoBack() {
    this.base.goFoiBack();
  }

}
