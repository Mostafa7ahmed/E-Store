import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerpageComponent } from './bannerpage.component';

describe('BannerpageComponent', () => {
  let component: BannerpageComponent;
  let fixture: ComponentFixture<BannerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
