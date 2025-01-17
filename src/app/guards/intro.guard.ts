import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})

export class IntroGuard implements CanActivate{
  constructor(private storage: Storage, private router: Router){}
  async canActivate(){
    const isIntroShowed = await this.storage.get('vilaIntro');
    if (isIntroShowed){
      return true;
    }else{
      this.router.navigateByUrl('/intro');
      return false;
    }
  }
}