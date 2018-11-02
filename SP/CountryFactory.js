
const lURL = 'http://localhost:3333/labels';
const cURL = 'http://localhost:3333/countries';

class CountryFactory {
 
    constructor() {
       this.labels = [];
       this.countries = [];
      }
   
      getLabels = async () => {
        const jsonData = await fetch(lURL, {method: 'GET'}) 
        const data = await jsonData.json();
        this.labels = data;
        return this.labels;
      }
      
      getCountries = async () => {
        const jsonData = await fetch(cURL, {method: 'GET'})
        const data = await jsonData.json();
        this.countries = data;
        console.log(this.countries)
        return this.countries;
      }
   }
   
   export default new CountryFactory();