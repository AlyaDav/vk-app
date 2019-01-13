import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @Input() listNews: News[];
  @Input() tab: string;

  allNews: News[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.tab) {
      if (this.tab === 'Избранное') {
        this.listNews = this.newsService.getFavoriteNews(this.allNews);
      }
      if (this.tab === 'Все новости') {
        this.listNews = this.allNews;
      }
      if (this.tab === 'Неизбранное') {
        this.listNews = this.newsService.getUnFavoriteNews(this.allNews);
      }
    } else {
      if (this.listNews) {
        this.allNews = this.listNews;
      }
    }
  }

  clickLike(i: number) {
    this.listNews[i].liked = this.newsService.changeFavoriteNews(this.listNews[i].source_id);
  }
}
