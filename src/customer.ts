import {REGULAR_MOVIE, CHILDRENS_MOVIE, NEW_RELEASE_MOVIE} from './movie';
import { Rental } from './rental';

class Customer {
	public name: string;
	public rentals: Array<Rental>;
    private moviePriceMap: { [key: number]: (daysRented: number) => number } = {
        [REGULAR_MOVIE]: this.regularMovie,
        [NEW_RELEASE_MOVIE]: this.newReleaseMovie,
        [CHILDRENS_MOVIE]: this.childrensMovie,
        [3]: this.priceCodeThree
    }

  constructor(name: string) {
      this.name = name;
      this.rentals = [];
  }

  addRental(rental: Rental) {
    this.rentals.push(rental);
  }

  createStatement(): string {
      let totalAmount: number = 0.0;
      let frequentRenterPoints: number = 0;
      let result: string = "Rental Record for " + this.name + "\n";
      for (const rental of this.rentals) {
          let thisAmount = 0;

      thisAmount = this.calculateCost(rental);
      totalAmount += thisAmount;
      frequentRenterPoints = this.updateRenterPoints(rental, frequentRenterPoints);
      result = this.appendResults(rental, thisAmount, result);
      }
    //   let finalResult = this.finalResults(result,totalAmount,frequentRenterPoints);
    //   finalResult = finalResult;
      result += "Amount owed is " + totalAmount + "\n";
      result += "You earned " + frequentRenterPoints +
              " frequent renter points";
      return result;
  }

  private calculateCost(rental: Rental): number {
    const priceCode = rental.getMovie().getPriceCode();
    return  this.moviePriceMap[priceCode](rental.getDaysRented());
  }

  private updateRenterPoints(rental: Rental, frequentRenterPoints: number){
    frequentRenterPoints++;
    if ((rental.getMovie().getPriceCode() == NEW_RELEASE_MOVIE) && rental.getDaysRented() > 1) 
        frequentRenterPoints++;
    return frequentRenterPoints;
  }

  private appendResults(rental: Rental, thisAmount: number, result: string){
    result += "\t" + rental.getMovie().getTitle() + "\t" + thisAmount + "\n";
    return result;
  }

  private regularMovie(daysRented: number) {
    let amount = 2;
    if (daysRented > 2) {
        amount += (daysRented -2) * 1.5;
    }
    return amount;
}

private newReleaseMovie(daysRented: number) {
    return daysRented * 3 
}

private childrensMovie(daysRented: number) {
    let amount = 1.5;
    if(daysRented > 3){
    amount += (daysRented - 3) * 1.5;
    }
    return amount;
}

private priceCodeThree(daysRented: number){
    return daysRented * 0
}


//   private finalResults(result: string,totalAmount: number,frequentRenterPoints: number){
//     result += "Amount owed is " + totalAmount + "\n";
//       result += "You earned " + frequentRenterPoints +
//               " frequent renter points";
//       return result;
//   }


}
export { Customer };
