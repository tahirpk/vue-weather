<template>
  <div>

  

      <div class="row">
              <input type="text" v-model="postBody" @change="getInfo()"/> <button id="btn" class="" @click="getInfo()">Get Weather State</button>
              <ul v-if="errors && errors.length">
              <li v-for="error of errors">
              {{error.message}}
              </li>
              </ul>
      </div>
             
      

   <div class="container">
      <div class="row">
        
         
              <div v-for="city in cities" :key="city.id">
                <div class="col-md-4 cards">
                                            
                      <div class="col-sm-2">Temperature : {{ city.the_temp | numFormat('0.00') }} </div>
                      <div class="col-sm-2">Max Temperature: {{ city.max_temp | numFormat('0.00') }}</div>
                      <div class="col-sm-2">Min Temperature: {{ city.min_temp | numFormat('0.00') }}</div>
                      
                      <div class="col-sm-2"> {{city.weather_state_name}}:{{ city.weather_state_abbr }} 
                      <img v-bind:src="city.weather_state_abbr" width="25" v-bind:alt="city.weather_state_abbr" /> 
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
      cities: [],
      postBody: '',
      woeid: '',
      errors: [],
      loading: false,
      weather_state_abbr:'',
      alt:'',
    }
  }, 
  methods: {

  getInfo() {
    axios.get('https://www.metaweather.com/api/location/search/?query='+this.postBody)
    .then(response => {
      this.citydata = response.data
      this.woeid=response.data[0].woeid
      
                  axios
                  .get('https://www.metaweather.com/api/location/'+response.data[0].woeid)
                  .then(response => {
                    this.cities = response.data.consolidated_weather
                                
                    
                  })
                  .catch(error => {
                  console.log(error)
                  this.errored = true
                  })
                  .finally(() => this.loading = false)
      
    })
    .catch(e => {
      this.errors.push(e)
    })
    },
    
    
  },
    mounted () {

        
        
  },
    created() {
    
    HTTP.get(`query`)
    .then(response => {
      this.citydata = response.data

    })
    .catch(e => {
      this.errors.push(e)
    })
  },
   watch: {

    
  }

}
</script>

<style>
</style>
