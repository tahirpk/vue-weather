<template>
  <div>

   <h2>Cities Weather Status!</h2>
     <div class="container">
      <div class="row">
        
         
              <div v-for="info in infos" :key="info.id">
                <div class="col-md-4 cards">
                      <h3>{{ info.city}}</h3>
                      
                      <div class="col-sm-2">Temperature : {{ info.the_temp | numFormat('0.00') }} </div>
                      <div class="col-sm-2">Max Temperature: {{ info.max_temp | numFormat('0.00') }}</div>
                      <div class="col-sm-2">Min Temperature: {{ info.min_temp | numFormat('0.00') }}</div>
                      
                      <div class="col-sm-2"> {{info.weather_state_name}}:
                      <img src="https://www.metaweather.com/static/img/weather/png/64/lc.png" width="25" /> 
                      </div>
                    
                  <div>
                 
                </div>
              </div>
            </div>

           
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import cors from 'cors';
export const HTTP = axios.create({
  baseURL: 'https://www.metaweather.com/api/location/search/?query=',
  
})

  
export default {
  name: 'app',
  data () {
    return {
      infos: [],      
      errors: [],
      loading: false
    }
  }, 
  methods: {

    
    
  },
    mounted () {

          
            //woids
                      
            let locations=[2344116,638242,44418,565346,560743,9807]

                for (let index = 0; index < locations.length; ++index) {
                  axios
                  .get('https://www.metaweather.com/api/location/'+locations[index])
                  .then(response => {
                    this.infos= response.data.consolidated_weather
                   
                    this.infos.push({city:response.data.title})                   
                    console.log(response.data.title);
                  })
                  .catch(error => {
                  console.log(error)
                  this.errored = true
                  })
                  .finally(() => this.loading = false)

                console.log(this.infos)
                }
            

        
  },
   

}
</script>
<style>
</style>
