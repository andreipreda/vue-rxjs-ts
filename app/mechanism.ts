import * as Rx from 'rxjs';
import * as data from './data';

type Gender = 'F' | 'M';

export interface IOrder {
  orderDate: string;
  deliveryCountry: string;
  manufacturer: string;
  gender: Gender;
  size: string;
  color: string;
  style: string;
  count: number;
}

export interface IQuery {
  type?: string;
  country?: string;
  gender?: string;
  location?: string;
}

export const selectType$ = new Rx.BehaviorSubject('manufacturers');
export const selectCountry$ = new Rx.BehaviorSubject('uk');
export const selectGender$ = new Rx.BehaviorSubject('f');
export const selectLocation$ = new Rx.BehaviorSubject('country');


// capture any change in the select options from the user
const filterChange$ =
  Rx.Observable
    .merge(selectType$, selectCountry$, selectGender$, selectLocation$)
    .distinctUntilChanged();

// transform the changes into a query object
const filterState$ =
  Rx.Observable
    .zip(selectType$, selectCountry$, selectGender$, selectLocation$,
      (type, country, gender, location): IQuery => ({ type, country, gender, location })
    );

const zipAll$ = filterChange$.switchMapTo(filterState$);

// filter only needed fields to query for
// open console tab to see how the query prepared for a possible api
const filterByType$ = zipAll$.switchMap((filters: IQuery): Rx.Observable<IQuery> => {

  switch (filters.type) {
    case 'manufacturers': { return Rx.Observable.of({ type: filters.type, country: filters.country, gender: filters.gender }); }
    case 'sizes': { return Rx.Observable.of({ type: filters.type, country: filters.country }); }
    case 'months': { return Rx.Observable.of({ type: filters.type, location: filters.location, country: filters.country }); }
    default: { return Rx.Observable.of(filters); }
  }
}).do((query: IQuery) => console.log('query for', query));

// query orders this will be a call to a server in a real app sending the right query
export const orders$ = filterByType$.switchMap((query: IQuery): Rx.Observable<IOrder[]> => {
  // this would be a real db query in a real case with a call to the server
  switch (query.type) {
    case 'manufacturers': {
      switch (query.gender) {
        case 'm': { return Rx.Observable.of(data.genderMOrders); }
        case 'f': { return Rx.Observable.of(data.genderFOrders); }
        default: { return Rx.Observable.of(data.manOrders); }
      };
    }
    case 'sizes': {
      switch (query.country) {
        case 'uk': { return Rx.Observable.of(data.ukOrders); }
        case 'austria': { return Rx.Observable.of(data.austriaOrders); }
        default: { return Rx.Observable.of(data.sizeOrders); }
      }
    }
    case 'months': {
      switch (query.location) {
        case 'globally': { return Rx.Observable.of(data.ukOrders); }
        case 'country': { return Rx.Observable.of(data.monthOrders); }
        default: { return Rx.Observable.of(data.monthOrders); }
      }
    }
    default: { return Rx.Observable.of(data.manOrders); }
  }
})
.do((orders: IOrder[]) => console.log('orders returned for query above', orders));
