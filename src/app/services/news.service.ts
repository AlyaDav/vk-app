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
  paramSrc: [] = [];

  getFavoriteNews(allNews: News[]): News[] {
    let favoriteNews: News[] = [];
    let IdsLikeItems = JSON.parse(localStorage.getItem('likeItem'))

    allNews.filter(function (elem) {
      return IdsLikeItems.some(function (element) {
        if (elem.source_id == element)
          return favoriteNews.push(elem);
      }
      )
    });
    return favoriteNews;
  }

  getUnFavoriteNews(allNews: News[]): News[] {
    let unFavoriteNews: News[] = [];
    let IdsLikeItems = JSON.parse(localStorage.getItem('likeItem'))
    if (IdsLikeItems.length === 0) return allNews;

    allNews.filter(function (elem) {
      return IdsLikeItems.some(function (element) {
        if (elem.source_id != element && IdsLikeItems.indexOf(elem.source_id) < 0 && unFavoriteNews.indexOf(elem) < 0) {
          return unFavoriteNews.push(elem);
        }
      })
    })
    return unFavoriteNews;
  }

  changeFavoriteNews(sourceIdNews: number) {
    let IdsLikeItems = [];

    if (JSON.parse(localStorage.getItem('likeItem'))) {
      IdsLikeItems = JSON.parse(localStorage.getItem('likeItem'));
    }
    if (IdsLikeItems.indexOf(sourceIdNews) === -1) {
      IdsLikeItems.push(sourceIdNews)
      localStorage.setItem('likeItem', JSON.stringify(IdsLikeItems));
      return true;
    }
    else {
      IdsLikeItems.splice(IdsLikeItems.indexOf(sourceIdNews), 1);
      localStorage.setItem('likeItem', JSON.stringify(IdsLikeItems));
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

    switch (news['type']) {
      case 'post':
        if (news.attachments) {
          this.getNewsAttachments(news);
          news.src = this.newsSrc;
          news.srcAudio = this.srcAudio;
        };
        if ((news['copy_history']) && (news['copy_history']['attachments'])) {
          this.getCopyHistoryAttachments(news);
          news.srcAudio = this.srcAudio;
          news.src = this.newsSrc;
        }
        break;
      case 'wall_photo':
        this.getNewsWallPhoto(news);
        news.src = this.newsSrc;
        break;
      case 'video':
        this.getNewsVideo(news);
        news.src = this.newsSrc;
        break;
      case 'audio':
        this.getNewsAudio(news);
        news.srcAudio = this.srcAudio;
    }
    return news;
  }

  getNewsAttachments(news: News) {
    this.newsSrc = [];
    news.attachments.forEach(elem => {
      
      if ((elem.link) && (elem.link['url'])) {
        this.newsSrc.push(elem.link['url'], elem.link.photo['title'])
        news.text += elem.link.title;
      }

      switch (elem.type) {
        case 'photo':
          if (elem.photo) {
            this.newsSrc.push(elem.photo['photo_130'])
          }
          if (elem.video) {
            if (elem.video['first_frame_160']) {
              this.newsSrc.push(elem.video['first_frame_160']);
            }
            if (elem.video['photo_130']) {
              this.newsSrc.push(elem.video['photo_130']);
            }
          }
          if (elem.doc) {
            this.newsSrc.push(elem.doc['url'])
          }
          if ((elem.link) && (elem.link.photo['photo_130'])) {
            this.newsSrc.push(elem.link.photo['photo_130'])
            news.text += elem.link.title;
          }
          break;
        case 'video':
          if (elem['video']['first_frame_160']) {
            this.newsSrc.push(elem['video']['first_frame_160'])
            news.text += elem.video.title;
          }
          break;
        case 'audio':
        if (elem['audio']) {
          this.srcAudio.push({ url: elem['audio']['url'], title: elem['audio']['title'] })
          break;
        }
        case 'doc':
        if (elem.doc) {
          this.newsSrc.push(elem.doc['url'])
        }
      }
    })
  }

  getCopyHistoryAttachments(news: News) {
    this.newsSrc = [];
    news['copy_history']['attachments'].forEach(elem => {
      if ((elem.type = 'photo') && (elem.photo)) {
        this.newsSrc.push(elem.photo['photo_130'])
      }
      if ((elem.type = 'audio') && (elem.audio)) {
        this.srcAudio.push({ url: elem['audio']['url'], title: elem['audio']['title'] })
      }
    })
  }

  getNewsWallPhoto(news: News) {
    this.newsSrc = [];
    news.src = [];
    news['photos']['items'].forEach(element => {
      if ((element)) {
        this.newsSrc.push(element['photo_130'])
        if (element.text != '') news.text += element.text;
      }
    });
  }

  getNewsVideo(news: News) {
    news.src = [];
    news['video']['items'].forEach(element => {
      if ((element)) {
        this.newsSrc.push(element['photo_130'])
      }
    });
  }
  getNewsAudio(news: News) {
    news['audio']['items'].forEach(element => {
      if (element) {
        this.srcAudio.push({ url: element['url'], title: element.title })
      }
    });
  }
}

