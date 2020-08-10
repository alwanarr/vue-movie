import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
import { getField, updateField } from "vuex-map-fields";

const API_KEY = "04ff38168fe3dfe8fdf6585c81f5c4a9";
const BASE_URL = "https://api.themoviedb.org/3/";
export default new Vuex.Store({
  state: {
    page_number: 1,
    search: "",
    movies: [],
    detail_movies: [],
    refCount: 0,
    isLoading: false,
  } /* eslint-disable */,
  mutations: {
    /* eslint-disable */
    /* eslint-disable */
    SET_MOVIES: (state, payload) => {
      state.movies = payload;
    },
    RESET_MOVIES: (state, payload) => {
      console.log(payload);
      state.movies = payload;
    },
    SET_DETAIL_MOVIES: (state, payload) => {
      state.detail_movies = payload;
    },
    SET_TOP_RATE: (state, payload) => {
      state.movies = payload;
    },
    nextPage(state) {
      state.page_number += 1;
    },
    lastPage(state) {
      state.page_number -= 1;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },

    RESET_DETAIL_MOVIE(state, payload) {
      state.detail_movies = payload;
    },

    loading(state, payload) {
      if (payload) {
        state.refCount++;
        state.isLoading = true;
      } else if (state.refCount > 0) {
        state.refCount--;
        state.isLoading = state.refCount > 0;
      }
    },
    updateField,
  },
  actions: {
    async searchMovie(context, query) {
      let page = context.state.page_number;

      if (query) {
        try {
          const response = await axios.get(
            `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
          );
          context.commit("SET_MOVIES", response.data.results);
          context.commit("SET_LOADING", false);
          return response;
        } catch (e) {
          console.log(e);
        }
      } else {
        context.dispatch("topMovie");
      }
    },
    async getDetailMovies(context, id) {
      try {
        const response = await axios.get(
          `${BASE_URL}movie/${id}?api_key=${API_KEY}`
        );
        if (response.status == 200)
          context.commit("SET_DETAIL_MOVIES", response.data);

        return response;
      } catch (err) {
        console.log(err);
      }
    },

    async topMovie(context) {
      try {
        const response = await axios.get(
          `${BASE_URL}movie/top_rated?api_key=${API_KEY}&page=${context.state.page_number}`
        );
        if (response.status == 200)
          context.commit("SET_TOP_RATE", response.data.results);

        return response;
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    input(state) {
      return state.input;
    },
    getMovies(state) {
      return state.movies;
    },
    getDetailMovie(state) {
      return state.detail_movies;
    },

    getField,
  },
});
