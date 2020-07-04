<template>
  <div>
    <search-component/>
    <movie-component/>
  </div>
</template>

<script>
import Search from './components/SearchMovieComponent';
import Movie from './components/MovieComponent';
export default {
  name: "App",
  components: {
     'search-component' : Search,
    'movie-component': Movie,
  }
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
</style>
