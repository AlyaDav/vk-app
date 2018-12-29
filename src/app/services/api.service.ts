import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string = 'a27f19e85179d348471c6db560a4aaf03cf155bc04a0e82f182b6e34d605d848b60897046d1c63ae6ae3c';
  response: Observable<any>;
  constructor(private http: HttpClient) { }

  getData(nextNews: string): Observable<any> {
    return this.http.jsonp('https://api.vk.com/method/newsfeed.get?v=5.52&access_token=' + this.token + '&access_start_from=' + nextNews + '&count=10',
      'callback')
  }

  getIdGroup(groupId: string): Observable<any> {
    const responce = this.http.jsonp('https://api.vk.com/method/groups.getById?v=5.52&access_token=' + this.token + '&group_ids=' + groupId,
      'callback');
    return responce;
  }
}
