import { Component, OnInit, HostListener } from '@angular/core';
import { News } from 'src/app/models/news';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Audio } from 'src/app/models/audio';
import { ApiService } from 'src/app/services/api.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private newsService: NewsService
  ) { }

  listNews: News[] = [];
  newsSrc: string[] = [];
  tab: string;
  srcAudio: Audio[] = [];
  allIdGroups: string = '';
  newData: News[] = [];
  loadingData: boolean = false;
  nextNews: string = '';


  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    let a = event.srcElement['scrollingElement']['offsetHeight'];
    let b = event.srcElement['scrollingElement']['scrollTop'];
    if (a - b < (0.15 * a) && !this.loadingData) {
      this.getNewData(this.nextNews);
      this.loadingData = true;
    }
  }

  ngOnInit() {
    this.getNewData('');
    localStorage.setItem('likeItem', '[]');
  }

  clickTab(event: MatTabChangeEvent) {
    this.tab = event.tab.textLabel;
  }

  getGroup(listNews: News[]) {
    this.apiService.getIdGroup(this.allIdGroups).subscribe(data => {
      listNews.forEach((news) => {
        if (news.group_id) {
          data['response'].forEach(element => {
            if (news.group_id * (-1) === element['id']) {
              news.group_name = element['name'];
              news.group_img = element['photo_50'];
            }
          });
        }
        this.loadingData = false;
      });
    })
  }

  getNewData(next: string) {
    let newList: News[];
    this.apiService.getData(next)
      .subscribe(data => {
        newList = data['response']['items'];
        this.nextNews = data['response']['next_from'];
        newList.forEach((news) => {
          if (news.source_id < 0) {
            this.allIdGroups = this.allIdGroups + news.source_id * (-1) + ', ';
          }
          this.listNews.push(this.newsService.changeListNews(news));
        });
        if (this.allIdGroups) {
          this.getGroup(newList);
        }
      });
  }

}

