import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._basket = [];
    makeAutoObservable(this);
  }
  setBasket(basket) {
    this._basket = basket;
  }

  get basket() {
    return this._basket;
  }
}
