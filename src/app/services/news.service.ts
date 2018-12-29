import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { Audio } from '../models/audio';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  listNews: News[] = [];
  newsSrc: string[] = [];
  tab: string;
  srcAudio: Audio[] = [];
  allIdGroups: string = '';
  newData: News[] = [];
  loadingData: boolean = false;
  nextNews: string = '';

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
    if (likeItems.length === 0) return allNews;
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

  changeListNews(news: News): News {
    this.srcAudio = [];
    this.newsSrc = [];
    if (news.source_id < 0) {
      this.allIdGroups = this.allIdGroups + news.source_id * (-1) + ', ';
      news.group_id = news.source_id;
    }
    if ((news['type'] === 'post') && (news.attachments)) {
      this.newsSrc = [];
      news.attachments.forEach(elem => {
        if ((elem.type = 'photo') && (elem.photo)) {
          this.newsSrc.push(elem.photo['photo_130'])
        }
        if ((elem.type = 'photo') && (elem.video)) {
          if (elem.video['first_frame_160']) {
            this.newsSrc.push(elem.video['first_frame_160']);
          }
          if (elem.video['photo_130']) {
            this.newsSrc.push(elem.video['photo_130']);
          }
        }
        if ((elem.type = 'photo') && (elem.doc)) {
          this.newsSrc.push(elem.doc['url'])
        }
        if ((elem.type = 'photo') && (elem.link) && (elem.link.photo['photo_130'])) {
          this.newsSrc.push(elem.link.photo['photo_130'])
          news.text += elem.link.title;
        }
        if ((elem.link) && (elem.link['url'])) {
          this.newsSrc.push(elem.link['url'],elem.link.photo['title'])
          news.text += elem.link.title;
        }

        if ((elem['type'] === 'video') && (elem['video']['first_frame_160'])) {
          this.newsSrc.push(elem['video']['first_frame_160'])
          news.text +=elem.video.title;
        }
        if ((elem.type = 'audio') && (elem['audio'])) {
          this.srcAudio.push( { url: elem['audio']['url'], title: elem['audio']['title'] })
        }
      })
      news.src = this.newsSrc;
      news.srcAudio=this.srcAudio;
    }

    if ((news['type'] === 'post') && (news['copy_history']) && (news['copy_history']['attachments'])) {
      this.newsSrc = [];
      news['copy_history']['attachments'].forEach(elem => {
        if ((elem.type = 'photo') && (elem.photo)) {
          this.newsSrc.push(elem.photo['photo_130'])
        }
        if ((elem.type = 'audio') && (elem.audio)) {
          this.srcAudio.push( { url: elem['audio']['url'], title: elem['audio']['title'] })
        }
      })
      news.srcAudio=this.srcAudio;
      news.src = this.newsSrc;
    }

    if ((news['type'] === 'wall_photo') && (news['photos'])) {
      this.newsSrc = [];
      news.src = [];
      news['photos']['items'].forEach(element => {
        if ((element)) {
          this.newsSrc.push(element['photo_130'])
          if (element.text!='') news.text += element.text;
        }
      });
      news.src = this.newsSrc;
    }

    if ((news['type'] === 'video') && (news['video']['items'])) {
      news.src = [];
      news['video']['items'].forEach(element => {
        if ((element)) {
          this.newsSrc.push(element['photo_130'])
        }
      });
      news.src = this.newsSrc;
    }

    if ((news['type'] === 'audio') && (news['audio']['items'])) {
      news['audio']['items'].forEach(element => {
        if ((element)) {
          this.srcAudio.push({ url: element['url'], title: element.title })
        }
      });
      news.srcAudio = this.srcAudio;
    }
    return news;
  }

}
