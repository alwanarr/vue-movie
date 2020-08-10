<template>
  <div>
    <!-- <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
      class="d-flex justify-content-center align-center"
    ></loading> -->
    <loading
      v-if="isLoading"
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <search-component />
    <movie-component />
  </div>
</template>

<script>
import Search from "./components/SearchMovieComponent";
import Movie from "./components/MovieComponent";
import { mapState } from "vuex";

import axios from "axios";
export default {
  name: "App",
  created() {
    axios.interceptors.request.use(
      (config) => {
        this.$store.commit("loading", true);
        return config;
      },
      (error) => {
        this.$store.commit("loading", false);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        this.$store.commit("loading", false);
        return response;
      },
      (error) => {
        this.$store.commit("loading", false);
        return Promise.reject(error);
      }
    );
  },
  components: {
    "search-component": Search,
    "movie-component": Movie,
  },
  data() {
    return {
      fullPage: true,
    };
  },
  computed: {
    ...mapState(["isLoading", "refCount"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ddd;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>
