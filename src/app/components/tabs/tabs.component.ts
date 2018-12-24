import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from 'src/app/models/news';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Audio } from 'src/app/models/audio';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  listNews: News[];
  titleGroups: string[];
  newsSrc: string[] = [];
  tab: string;
  srcAudio: Audio[] = [];
  

  ngOnInit() {
    this.getData();
    localStorage.setItem('likeItem', '[]')
  }
  getData() {
    this.apiService.getData()
      .subscribe(data => {
        this.titleGroups = data['response']['groups']
        this.listNews = data['response']['items']
        this.listNews.forEach((news) => {
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
              if ((elem.type = 'photo') && (elem.link)) {
                this.newsSrc.push(elem.link.photo['photo_130'])
                news.text += elem.link.title;
              }
            })
            news.src = this.newsSrc;
          }

          if ((news['type'] === 'post') && (news['copy_history']) && (news['copy_history']['attachments'])) {
            this.newsSrc = [];
            news['copy_history']['attachments'].forEach(elem => {
              if ((elem.type = 'photo') && (elem.photo)) {
                this.newsSrc.push(elem.photo['photo_130'])
              }
              if ((elem.type = 'audio') && (elem.audio)) {
                this.newsSrc.push(elem.audio['url'])
              }
            })
            news.src = this.newsSrc;
          }
          if ((news['type'] === 'wall_photo') && (news['photos'])) {
            this.newsSrc = [];
            news.src = [];
            news['photos']['items'].forEach(element => {
              if ((element)) {
                this.newsSrc.push(element['photo_130'])
              }
            });
            news.src = this.newsSrc;
          }

          if ((news['type'] === 'video') && (news['video']['items'])) {
            this.newsSrc = [];
            news.src = [];
            news['video']['items'].forEach(element => {
              if ((element)) {
                this.newsSrc.push(element['photo_130'])
              }
            });
            news.src = this.newsSrc;
          }

          if ((news['type'] === 'audio') && (news['audio']['items'])) {
            this.srcAudio = [];
            news['audio']['items'].forEach(element => {
              if ((element)) {
                this.srcAudio.push({ url: element['url'], title: element.title })
              }
            });
            news.srcAudio = this.srcAudio;
          }

        })
      });
  }

  clickTab(event: MatTabChangeEvent) {
    this.tab = event.tab.textLabel;
  }
}
