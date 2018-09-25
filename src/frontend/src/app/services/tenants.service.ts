import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  constructor(private http: Http) {
    //super('https://api.github.com/users/mosh-hamedani/followers', http);
  }

  getAll() {
    return [
      {
        login: 'nfoata',
        id: 123456,
        avatar_url: 'https://avatars3.githubusercontent.com/u/10586972?v=4'
      },
      {
        login: 'ntaquet',
        id: 100255,
        avatar_url: 'https://avatars2.githubusercontent.com/u/5821497?v=4'
      },
      {
        login: 'hdouailly',
        id: 106549,
        avatar_url: 'https://avatars1.githubusercontent.com/u/11283191?v=4'
      }
    ];
  }
}
