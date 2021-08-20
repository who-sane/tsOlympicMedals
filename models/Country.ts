import { IResult } from './IResult';
import { Medals } from './Medals.enum';

export class Country {
  name: string;
  results: Array<IResult>;

  constructor(_name: string) {
    this.name = _name;
    this.results = new Array<IResult>();
  }
  // return the total number of medals
  totalMedals(): number {
    // Since they're already initiallised seperately into an array output array length.
    return this.results.length;
  }


  // given a medal type, return the amount of that type of medal
  totalMedalType(medal: Medals): number {

    let medalCount = 0;

    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].medal === medal) {
        medalCount++;
      }
    }
    return medalCount;
  }
}