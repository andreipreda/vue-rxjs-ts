import * as Vue from 'vue';
import { selectType$, selectCountry$, selectGender$, selectLocation$ } from './mechanism';

// sales person selector view
export const productFilter = new Vue({
  el: '#filter',
  data: {
    selectType: 'manufacturers',
    selectCountry: 'uk',
    selectGender: 'f',
    selectLocation: 'country'
  },
  watch: {
    selectType: (newVal) => selectType$.next(newVal),
    selectCountry: (newVal) => selectCountry$.next(newVal),
    selectGender: (newVal) => selectGender$.next(newVal),
    selectLocation: (newVal) => selectLocation$.next(newVal)
  },
  template: `<div class="selector">
     <p>Filter top selling<p/>
     <select v-model="selectType">
       <option value="manufacturers">Manufacturers</option>
       <option value="sizes">Sizes</option>
       <option value="months">Months</option>
     </select>
     <p>in<p/>
     <select v-if="selectType === 'manufacturers' || selectType === 'sizes'" v-model="selectCountry">
       <option value="uk">United Kingdom</option>
       <option value="austria">Austria</option>
       <option value="italy">Italy</option>
       <option value="japan">Japan</option>
     </select>
     <p v-if="selectType === 'manufacturers'">by </p>
     <select v-if="selectType === 'manufacturers'" v-model="selectGender">
       <option value="f">F</option>
       <option value="m">M</option>
     </select>
     <select v-if="selectType === 'months'" v-model="selectLocation">
       <option value="country">Country</option>
       <option value="globally">Globally</option>
     </select>
     <p v-if="selectType === 'months' && selectLocation === 'country'">choose country</p>
     <select v-if="selectType === 'months' && selectLocation === 'country'" v-model="selectCountry">
       <option value="uk">United Kingdom</option>
       <option value="austria">Austria</option>
       <option value="italy">Italy</option>
       <option value="japan">Japan</option>
     </select>
   </div>`
});

// orders table view
export const ordersTable = new Vue({
  el: '#orders',
  data: {
    orders: []
  },
  template: `
    <div class="orders-table">
      <table class="pure-table">
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Delivery Country</th>
            <th>Manufacturer</th>
            <th>Gender</th>
            <th>Size</th>
            <th>Color</th>
            <th>Style</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders">
            <td>{{ order.orderDate }}</td>
            <td>{{ order.deliveryCountry }}</td>
            <td>{{ order.manufacturer }}</td>
            <td>{{ order.gender }}</td>
            <td>{{ order.size }}</td>
            <td>{{ order.color }}</td>
            <td>{{ order.style }}</td>
            <td>{{ order.count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});
