<template>
    <div class="input">
       <input type="text" 
              class="form-input" 
              v-model="search" 
              name="movie" 
              id="movie"
              placeholder="Search Your Movie"
              @keyup="setTime">
    </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { mapFields } from "vuex-map-fields";
export default {
    computed: {
        // ...mapGetters([
        //     'input'
        // ]),
        ...mapFields({
            search: "search",  
        })
    },
    data(){
        return{
       
        }
    },
    methods: {
        searchMovie(e){
        
        //   const response = await axios.get('https://www.omdbapi.com/', {
        //       params: {
        //           apikey: '32c61b96',
        //           s: e.target.value
        //       }
        //   });
        //   console.log(response.data);
          this.$store.dispatch('searchMovie', this.search);
         
        },
        setTime(){
            if(this.timer){
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => {
                this.searchMovie();
            }, 1000);
        }
  }
}
</script>

<style scoped>
    .form-input{
        width: 100%;
        height: 2.5rem;
        font-size: 18px;
        border-radius: 8px;
        outline: none;
        border: 1px solid black;
    }
    input[type=text]:focus{
        outline: yellowgreen;
        border: 2px solid yellowgreen;
        border-radius: 8px;
    }

    

    .input{
        width: 800px;
        margin: 0 auto;
        max-width: 100%;
    }
</style>