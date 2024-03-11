class Movie {
	public title: string;
	public priceCode: number;

  constructor(title: string, priceCode: number) {
    this.title = title;
    this.priceCode = priceCode;
  }

  getPriceCode(): number {
    return this.priceCode;
  }

  getTitle(): string {
    return this.title;
  };
}

const CHILDRENS_MOVIE = 2;
const REGULAR_MOVIE = 0;
const NEW_RELEASE_MOVIE = 1;

export {Movie, CHILDRENS_MOVIE, REGULAR_MOVIE, NEW_RELEASE_MOVIE};
