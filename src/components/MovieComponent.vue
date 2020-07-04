<template>
  <div>
    <div class="container">
      <template v-for="result in getMovies"   >
        <div class="card" style="width: 18rem;" :key="result.id">
          <img v-bind:src="poster(result.poster_path)" width='100px' :alt="result.title">
          
          <div class="container flex__card">
            <h5 class="card-title">{{result.title}}</h5>
            <p class="card-text">{{`${result.overview.substring(0, 60)}...`}}</p>
            <button  @click="modal(result.id)">See</button>
          </div>
        </div>
        </template>
    </div>
    <footer v-if="getMovies.length" style="display: flex; justify-content: center;" >
          <button @click="lastpage" style="margin-right: 10px;" :disabled="page == 1">last page</button>
          <button @click="nextpage">next page</button>
    </footer>

   <modal v-if="isOpen"
          @close="closeModal">
      <template v-slot:header>
      </template>

      <template v-slot:body>
       <img v-bind:src="poster(getDetailMovie.poster_path)"  :alt="getDetailMovie.title">
                <h1>{{ getDetailMovie.title }}</h1>
                <p style="background-color: greenyellow; display: inline-block; padding: 10px 5px;">{{ getDetailMovie.release_date | dateFormat}}</p>

                <div class="genres" >
                  <template v-for="(genre,index) in getDetailMovie.genres" >
                    <span class="genre" :key="index">{{genre.name}}</span>

                  </template>
                </div>
                
                <p>{{ getDetailMovie.overview }}</p>
      </template>
    </modal>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import kekeyi from '../assets/kekeyi.png';
import { mapGetters } from 'vuex';
import { mapFields } from "vuex-map-fields";
import modal from './ModalComponent';
export default {
  components: {
    modal,
  },
  computed: {
    ...mapGetters([
      'getMovies' ,
      'getDetailMovie'
    ]),
    ...mapFields({
          search: "search", 
          page: "page_number",
          
        })
  },
  data () {
    return {
     image: kekeyi,
     isOpen: false,
    }
  },
  filters: {
    dateFormat(date){
      return dayjs(date).format('DD-MMMM-YYYY');
    }
  },
  created(){
    this.getTopMovie();
  },
  methods: {
    getTopMovie(){
      this.$store.dispatch('topMovie');
    },
    poster(image){
      if(image){
        return 'http://image.tmdb.org/t/p/original/' +   image;
      }else{
        return this.image;
      }
    },
    modal(id){
      this.isOpen = true;
      this.$store.dispatch('getDetailMovies', id);
    },
    nextpage(){
      this.$store.commit('nextPage');
      this.$store.dispatch('searchMovie', this.search);
    },
    lastpage(){
      if(this.page !== 1) {
        this.$store.commit('lastPage');
        this.$store.dispatch('searchMovie', this.search);
      }
    },
    closeModal(){
      this.$store.commit('RESET_DETAIL_MOVIE', []);
      this.isOpen = false;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 20px;
}

.flex__card{
  display: flex;
  flex-direction: column;
}

.container > .card{
  
  margin: 1rem;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
}
.card-title{
  align-self: center;
  text-align: center;
}
.card-text{
  text-align: center;
}

.card:hover {
  box-shadow: 0 16px 16px 0 rgba(0,0,0,0.2);
}

img {
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: 60%;
  object-fit: cover;
  object-position: center;
}

.card > .container {
  padding: 2px 16px;
}

.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.modal > .content > img{
  width: 500px;
  height: 370px;
 
  object-position: top center ;
  margin: 2rem auto 0 auto;
  
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
button {
  padding: 16px 32px;
  margin-top: 10px;
  background-color: darkgreen;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.5;
}
button:focus{
  outline: none;
  border: none;
}
button:hover{
  
  box-shadow: 5px 16px 16px 0 rgba(0,0,0,0.2);
  background-color: limegreen;
}

button:disabled,
button[disabled]{
  color: #666666;
  cursor: not-allowed;
  border: 1px solid #999999;
  background-color: #cccccc;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}

.genres{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.genre{
  background-color: green;
  color: #fff;
  border-radius: 4px;
  padding: 8px;
  margin-left: 4px;
  margin-top: 5px;
}
</style>
