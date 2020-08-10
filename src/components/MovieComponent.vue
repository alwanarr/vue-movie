<template>
  <div>
    <div class="container">
      <div v-if="movieNotFound" class="col-md-12">
        <h1 class="text-center">Not Found</h1>
      </div>

      <div class="row">
        <div
          class="col-md-4 d-flex justify-content-center"
          v-for="result in getMovies"
          :key="result.id"
        >
          <div class="card mt-3" style="width: 18rem;" :key="result.id">
            <img
              class="card-img-top"
              v-bind:src="poster(result.poster_path)"
              width="100px"
              :alt="result.title"
            />

            <div class="card-body">
              <h5
                class="card-title"
                @click="modal(result.id)"
                style="cursor: pointer"
              >
                {{ result.title }}
              </h5>
              <p class="card-text">
                {{ `${result.overview.substring(0, 60)}...` }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer
      class="m-3"
      v-if="getMovies.length"
      style="display: flex; justify-content: center;"
    >
      <button
        class="btn btn-light"
        @click="lastpage"
        style="margin-right: 10px;"
        :disabled="page == 1"
      >
        last page
      </button>
      <button class="btn btn-primary" @click="nextpage">next page</button>
    </footer>

    <modal
      v-if="isOpen"
      :showCloseButton="true"
      @close="closeModal"
      :width="90"
    >
      <h1 slot="header" class="text-center text-primary">
        <!-- <button
          type="button"
          class="close"
          @click="closeModal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button> -->
        {{ getDetailMovie.title }}
      </h1>
      <template v-slot:body>
        <loading
          v-if="isLoading"
          :active.sync="isLoading"
          :can-cancel="true"
          :is-full-page="fullPage"
        ></loading>
        <img
          class="img-fluid"
          v-bind:src="poster(getDetailMovie.poster_path)"
          :alt="getDetailMovie.title"
        />
        <h1></h1>
        <div class="row flex-wrap">
          <p
            style="background-color: greenyellow; display: inline-block; "
            class="mx-3 rounded"
          >
            {{ getDetailMovie.release_date | dateFormat }}
          </p>
          <template v-for="(genre, index) in getDetailMovie.genres">
            <p
              :key="index"
              class=" ml-2"
              style="background-color: greenyellow; display: inline-block; "
            >
              {{ genre.name }}
            </p>
          </template>
        </div>
        <!-- <div class="genres"></div> -->

        <p>{{ getDetailMovie.overview }}</p>
      </template>
    </modal>
  </div>
</template>

<script>
import dayjs from "dayjs";
import pic from "../assets/pic.svg";
import { mapGetters, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import modal from "./ModalComponent";
export default {
  components: {
    modal,
  },
  computed: {
    ...mapGetters(["getMovies", "getDetailMovie"]),
    ...mapState(["isLoading"]),

    ...mapFields({
      search: "search",
      page: "page_number",
    }),
    movieNotFound() {
      return this.getMovies.length == 0;
    },
  },
  data() {
    return {
      image: pic,
      isOpen: false,
      fullPage: true,
    };
  },
  filters: {
    dateFormat(date) {
      return dayjs(date).format("DD-MMMM-YYYY");
    },
  },
  created() {
    this.getTopMovie();
  },
  methods: {
    getTopMovie() {
      this.$store.dispatch("topMovie");
    },
    poster(image) {
      if (image) {
        return "http://image.tmdb.org/t/p/original/" + image;
      } else {
        return this.image;
      }
    },
    modal(id) {
      this.isOpen = true;
      this.$store.dispatch("getDetailMovies", id);
    },
    nextpage() {
      this.$store.commit("nextPage");
      this.$store.dispatch("searchMovie", this.search);
    },
    lastpage() {
      if (this.page !== 1) {
        this.$store.commit("lastPage");
        this.$store.dispatch("searchMovie", this.search);
      }
    },
    closeModal() {
      this.$store.commit("RESET_DETAIL_MOVIE", []);
      this.isOpen = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .container{
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
} */

.dark--green {
  background-color: darkgreen;
}
</style>
