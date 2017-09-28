export class Day {
  sqlDate: string;
  year: number;
  month: number;
  day: number;
  occupancyRate: number;
  eventsCount: number;
  minimumStayAlert: number;
  recommendedPrice: number;
  actualPrice: number;
  minimumStay: number;
  visibility: number;
  position: number;
  index: number;
  date: Date;
  dayOfTheWeek: number;
  free: boolean;
  past: boolean;
  risePrice: boolean;
  lowerPrice: boolean;
  positionSymbol: string | number;

  constructor(day: any, index: number) {
    this.sqlDate = day.dia;
    this.year = parseInt(day.dia.slice(0, 4));
    this.month = parseInt(day.dia.slice(4, 6)) - 1;
    this.day = parseInt(day.dia.slice(6));
    this.occupancyRate = day.oc;
    this.eventsCount = day.ne;
    this.minimumStayAlert = day.edi;
    this.recommendedPrice = day.pp;
    this.actualPrice = day.pr;
    this.minimumStay = day.ms;
    this.visibility = day.buscable;
    this.position = day.paginaMedia;
    this.index = index;
    this.date = new Date(this.year, this.month, this.day);
    this.dayOfTheWeek = this.date.getDay();
    this.free = this.visibility !== 0;
    this.checkDayIsPast();
    this.risePrice = this.actualPrice < this.recommendedPrice;
    this.lowerPrice = this.actualPrice > this.recommendedPrice;
    this.getPositionSymbol();
  }

  checkDayIsPast(){
    this.date.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);
    this.past = this.date < today;
  }

  getPositionSymbol(){
    if (this.past || !this.free){
      this.positionSymbol = this.day;
    }
    else if (this.visibility === 1 && this.position > 0){
      this.positionSymbol = this.position;
    }
    else if (this.visibility === 2){
      this.positionSymbol = '-';
    }
    else if (this.visibility === 3){
      this.positionSymbol = '!';
    }
    else if (this.visibility === 4 || (this.visibility === 1 && this.position === 0)){
      this.positionSymbol = '&infin;';
    }

  }

}
