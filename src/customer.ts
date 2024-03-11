import {REGULAR_MOVIE, CHILDRENS_MOVIE, NEW_RELEASE_MOVIE} from './movie';
import { Rental } from './rental';

class Customer {
	public name: string;
	public rentals: Array<Rental>;
    private moviePriceMap: { [key: number]: (days: number) => number } = {
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
      frequentRenterPoints = this.updateRenterPoints(rental, frequentRenterPoints);
      //result = this.updateResults(rental, thisAmount, frequentRenterPoints, result, totalAmount);

          result += "\t" + rental.getMovie().getTitle() + "\t" +
                  thisAmount + "\n";
          totalAmount += thisAmount;

      }
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
    frequentRenterPoints++
    if ((rental.getMovie().getPriceCode() == NEW_RELEASE_MOVIE) &&
        rental.getDaysRented() > 1) frequentRenterPoints++;
    return frequentRenterPoints;
  }

  private updateResults(rental: Rental, thisAmount: number, frequentRenterPoints: number, result: string, totalAmount: number){
    // result += "\t" + rental.getMovie().getTitle() + "\t" +
    //               thisAmount + "\n";
    //       totalAmount += thisAmount;
    //     return result;
  }

  private regularMovie(days: number) {
    let amount = 2;
    if (days > 2) {
        amount += (days -2) * 1.5;
    }
    return amount;
}

private newReleaseMovie(days: number) {
    return days * 3 
}

private childrensMovie(days: number) {
    let amount = 1.5;
    if(days > 3){
    amount += (days - 3) * 1.5;
    }
    return amount;
}

private priceCodeThree(days: number){
    return days * 0
}


}
export { Customer };
