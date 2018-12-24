import { Injectable } from '@angular/core';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getFavoriteNews(allNews: News[]): News[] {
    let favoriteNews: News[] = [];
    let likeItems = JSON.parse(localStorage.getItem('likeItem'))
    allNews.forEach(elem => {
      likeItems.forEach(item => {
        if (elem.source_id == item) {
          favoriteNews.push(elem);
        }
      })
    })
    return favoriteNews;
  }

  getUnFavoriteNews(allNews: News[]): News[] {
    let unFavoriteNews: News[] = [];
    let likeItems = JSON.parse(localStorage.getItem('likeItem'))
    allNews.forEach((elem) => {
      likeItems.forEach(item => {
        if (elem.source_id != item && likeItems.indexOf(elem.source_id) < 0 && unFavoriteNews.indexOf(elem) < 0) {
          unFavoriteNews.push(elem);
        }
      })
    })
    return unFavoriteNews;
  }

  changeFavoriteNews(listNews: News[], index: number) {
    let favoriteItems = [];

    if (JSON.parse(localStorage.getItem('likeItem'))) {
      favoriteItems = JSON.parse(localStorage.getItem('likeItem'));
    }
    if (favoriteItems.indexOf(listNews[index].source_id) === -1) {
      favoriteItems.push(listNews[index].source_id)
      localStorage.setItem('likeItem', JSON.stringify(favoriteItems));
      return true;
    }
    else {
      favoriteItems.splice(favoriteItems.indexOf(listNews[index].source_id), 1);
      localStorage.setItem('likeItem', JSON.stringify(favoriteItems));
      return false;
    }

  }
}
