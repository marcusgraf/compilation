import {Day} from "./day";
import {Month} from "./month";
export class Property {
  id: number;
  name: string;
  address: string;
  airbnbId: number;
  hostId: number;
  hostName: string;
  linkedToAccount: number;
  smallImage: string;
  largeImage: string;
  recommendations: Day[];
  yearRecommendations: Month[];
  recommendationsCount: number;
  minimumStayProblemsCount: number;
  income: number;
  areaIncome: number;
  incomeDifferencePropertyArea: number;
  averagePositionPage: number;
  areaBookingsCount: number;

  constructor(property: any) {
    this.id = property.idAlojamiento;
    this.name = property.nombre;
    this.address = property.direccion;
    this.hostId = property.idPropietario;
    this.hostName = property.nombrePropietario;
    this.airbnbId = property.idExterno;
    this.linkedToAccount = property.cuentaVinculada;
    this.getImageUrl(property.img);
  }

  private getImageUrl(imageName) {
    this.smallImage = 'https://a2.muscache.com/im/pictures/' + imageName + '.jpg?aki_policy=small';
    this.largeImage = 'https://a2.muscache.com/im/pictures/' + imageName + '.jpg?aki_policy=large';
  }

  private countRecommendations(){
    let daysWithRecommendations = this.recommendations.filter((day) => day.recommendedPrice !== day.actualPrice && day.free && !day.past );

    this.recommendationsCount = daysWithRecommendations.length;
  }

  private countMinimumStayProblems(){
    let daysWithMinimumStayProblems = this.recommendations.filter((day) => day.minimumStayAlert === 1);

    this.minimumStayProblemsCount = daysWithMinimumStayProblems.length;
  }

  processRecommendations(recommendations) {
    this.recommendations = recommendations.map((day, index) => new Day(day, index));
    this.countRecommendations();
    this.countMinimumStayProblems();
    this.getYearRecommendations()
  };

  getYearRecommendations(){
    let today = new Date();
    today.setHours(0,0,0,0);
    const currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let nextMonth = currentMonth;
    let monthsArray = [{number: nextMonth, year: currentYear}];
    this.yearRecommendations = [];

    for (let i = 0; i !== 2; i++){
      nextMonth++;
      if (nextMonth > 11) {
        nextMonth = 0;
        currentYear++;
      }
      monthsArray.push({number: nextMonth, year: currentYear});
    }

    for (let month of monthsArray){
      try{
        this.yearRecommendations.push(new Month(month.number, month.year, this.recommendations));
      }catch (error){

      }
    }

  }

  processPerformance(performanceData){
    let propertyIncome = performanceData.myPropertyIncome;
    let areaIncome = performanceData.myAreaIncome;

    let differencePropertyArea = (propertyIncome - areaIncome) / areaIncome * 100;
    if (areaIncome > propertyIncome) {
      differencePropertyArea = -differencePropertyArea;
    }

    let averagePositionPage = performanceData.scPg;
    if (averagePositionPage === 0) averagePositionPage = 30;


    this.income = propertyIncome;
    this.areaIncome = areaIncome;
    this.incomeDifferencePropertyArea = Math.round(differencePropertyArea);
    this.averagePositionPage = averagePositionPage;
  }

  processAreaBookings(areaBookingsData){
    this.areaBookingsCount = areaBookingsData.filter((booking) => booking.TuPrecio > 0).length;
  }
}
