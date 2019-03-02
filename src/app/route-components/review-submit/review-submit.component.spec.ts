import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSubmitComponent } from './review-submit.component';
import { BaseComponent } from '../base/base.component';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MockDataService, MockRouter, MockCaptchaDataService } from '../MockClasses';
import { CaptchaComponent } from '../captcha/captcha.component';
import { CaptchaDataService } from 'src/app/services/captcha-data.service';
import { of, Observable } from 'rxjs';

describe('ReviewSubmitComponent', () => {
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSubmitComponent, BaseComponent, CaptchaComponent ],
      providers: [
        {provide: DataService, useClass: MockDataService},
        {provide: Router, useClass: MockRouter},
        {provide: CaptchaDataService, useClass: MockCaptchaDataService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
