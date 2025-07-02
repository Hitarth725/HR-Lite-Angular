import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpPageComponent } from './http-page.component';

describe('HttpPageComponent', () => {
  let component: HttpPageComponent;
  let fixture: ComponentFixture<HttpPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpPageComponent]
    });
    fixture = TestBed.createComponent(HttpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
