import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchUsersPage } from './search-users.page';

describe('SearchUsersPage', () => {
  let component: SearchUsersPage;
  let fixture: ComponentFixture<SearchUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
