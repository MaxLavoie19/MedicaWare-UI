import { Injectable } from '@angular/core';
import { ApacheScoreCalculator } from 'src/app/services/apache-4-calculator/ApacheScoreCalculator';
import { ApacheHealthInformation } from 'src/app/models/apache-health-information';

@Injectable({
  providedIn: 'root'
})
export class Apache4Service {
  private apacheScoreCalculator = new ApacheScoreCalculator();
  constructor() { }

  getApacheScore(apacheHealthInformation: ApacheHealthInformation) {
    Object.keys(apacheHealthInformation).forEach((key) => {
      this.apacheScoreCalculator[key] = apacheHealthInformation[key];
    });
    const score = this.apacheScoreCalculator.getScore();
    return score;
  }
}
