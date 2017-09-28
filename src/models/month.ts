import {Day} from "./day";
export class Month {
  name: string;
  number: number;
  year: number;
  weeks: Day[][];

  constructor(number: number, year: number, recommendations: Day[]){
    this.number = number;
    this.year = year;
    this.getWeeks(recommendations);
    this.getMonthName();
  }

  private getWeeks(recommendations: Day[]){
    this.weeks = [];
    const mondaysOfMonth = recommendations.filter((day) => day.year === this.year && day.month === this.number &&  day.dayOfTheWeek === 1);
    let firstMondayOfMonth = mondaysOfMonth[0];

    if (firstMondayOfMonth.day !== 1){
      let firstWeek = recommendations.slice(firstMondayOfMonth.index - 7, firstMondayOfMonth.index);
      this.weeks.push(firstWeek);
    }

    for (let monday of mondaysOfMonth){
      this.weeks.push(recommendations.slice(monday.index, monday.index + 7));
    }
  }

  private getMonthName(){
    const monthsNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.name = monthsNames[this.number];
  }
}
