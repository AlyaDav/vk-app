import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Response } from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token = environment.token;
  response: Observable<Response>;

  constructor(private http: HttpClient) { }

  getData(nextNews: string): Observable<Response> {
    return this.http.jsonp<Response>(`https://api.vk.com/method/newsfeed.get?v=5.52&access_token=${this.token}&access_start_from=${nextNews}&count=10`,
      'callback');
  }

  getIdGroup(groupId: string): Observable<Response> {
    const responce = this.http.jsonp<Response>(`https://api.vk.com/method/groups.getById?v=5.52&access_token=${this.token}&group_ids=${groupId}`,
      'callback');
    return responce;
  }
}
