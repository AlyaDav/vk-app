import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData():Observable<any>{
   return this.http.jsonp('https://api.vk.com/method/newsfeed.get?v=5.52&access_token=8e95886ac33b098c8cde460221f71c6a4fc288d907eedf4a2fce0d71f66029490b288240da7bb84579e49',
      'callback')
  }
}
