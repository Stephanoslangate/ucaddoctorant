import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetdetailsComponent } from './getdetails.component';

describe('GetdetailsComponent', () => {
  let component: GetdetailsComponent;
  let fixture: ComponentFixture<GetdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
