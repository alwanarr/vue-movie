import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

import { getField, updateField } from 'vuex-map-fields';

// CONFIG
const API_KEY = '04ff38168fe3dfe8fdf6585c81f5c4a9';
const BASE_URL = 'https://api.themoviedb.org/3/';


export default new Vuex.Store({
  state: {
    page_number: 1,
    search: "",

    movies: [],
    detail_movies: [],
  },
  mutations: {
    SET_MOVIES: (state, payload) => {
      state.movies = payload;
    },
    RESET_MOVIES : (state, payload) => {
        console.log(payload);
        state.movies = payload;
    },
    SET_DETAIL_MOVIES: (state, payload) => {
        state.detail_movies = payload
    },
    SET_TOP_RATE: (state, payload) => {
        state.movies = payload
    },
    nextPage(state){
        state.page_number += 1;
    },
    lastPage(state){
        state.page_number -= 1;
    },
    SET_LOADING(state, payload){
        state.isLoading = payload;
    },

    RESET_DETAIL_MOVIE(state, payload){
        state.detail_movies = payload;
    },
    updateField
  },
  actions: {
    async searchMovie(context, query){  
      let page = context.state.page_number;
     
      if(query ) {
        
        const response = await axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
        
        if(response.status) {
          context.commit('SET_MOVIES', response.data.results) ;
          context.commit('SET_LOADING', false);
        } 
      //   return response;
      
      }else{
          context.dispatch('topMovie');
      }
    },
    async getDetailMovies(context, id){
        const response = await axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
        if(response.status == 200) context.commit('SET_DETAIL_MOVIES', response.data);
    },

    async topMovie(context){
        const response = await axios.get(`${BASE_URL}movie/top_rated?api_key=${API_KEY}&page=${context.state.page_number}`);
        if(response.status == 200) context.commit('SET_TOP_RATE', response.data.results);
        
    }
  },
  getters: {
    input(state){
      return state.input;
    },
    getMovies(state){
        return state.movies;
    },
    getDetailMovie(state){
        return state.detail_movies;
    },
    
    getField
  }
});
