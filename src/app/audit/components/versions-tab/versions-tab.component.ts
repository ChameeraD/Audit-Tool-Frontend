import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvidenceApiService } from '@shared/services/api/evidence.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-versions-tab',
  templateUrl: './versions-tab.component.html',
  styleUrls: ['./versions-tab.component.scss'],
})
export class VersionsTabComponent implements OnInit {
  constructor(private evidenceApiService: EvidenceApiService, private route: ActivatedRoute) {}

  versionDates: any[];
  sub: any;
  @Input() productId: number;
  @Input() questionId: number;
  dates = [];

  async ngOnInit() {
    this.versionDates = await this.evidenceApiService.getEvidenceVersions(this.productId, this.questionId);
    this.versionDates.map(date => {
      const newDate = moment(date.createdDate)
        .locale('en')
        .calendar(new Date(), {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: function callback(now) {
            const x = moment(date.createdDate).fromNow();
            return '[' + x + ']';
          },
        });
      let obj = null;
      for (let i = 0; i < this.dates.length; i++) {
        if (this.dates[i].name === newDate) {
          obj = i;
          break;
        }
      }
      if (obj === null) {
        this.dates.push({
          name: newDate,
          value: [date.createdDate],
        });
      } else {
        this.dates[obj].value.push(date.createdDate);
      }
    });
    return true;
  }

}

// async ngOnInit() {
//   this.sub = this.route.params.subscribe(async params => {
//     this.productId = +params['product-id'];
//     this.questionId = +params['question-id'];
//   });
//   this.versionDates = await this.evidenceApiService.getEvidenceVersions(this.productId, this.questionId);
//   const previousDay = this.versionDates.map( date => {
//     return moment(date.createdDate).calendar(new Date() , {
//       sameDay: '[Today]',
//       nextDay: '[Tomorrow]',
//       nextWeek: 'dddd',
//       lastDay: '[Yesterday]',
//       lastWeek: '[Last] dddd',
//       sameElse:   () => {
//         const x =  moment(date.createdDate).fromNow();
//         console.log(x);
//         return x;
//       }
//   });
//   });
//   console.log(previousDay);
// }