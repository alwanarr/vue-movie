<template>
  <div class="col-md-4 mx-auto m-2">
    <input
      type="text"
      class="form-control"
      v-model="search"
      name="movie"
      id="movie"
      placeholder="Search Your Movie"
      @keyup="debounceSearch"
    />
  </div>
</template>
<script>
export default {
  computed: {
    // ...mapGetters([
    //     'input'
    // ]),
    // ...mapFields({
    //   search: "search",
    // }),
  },
  data() {
    return {
      search: null,
    };
  },
  methods: {
    searchMovie() {
      this.$store.dispatch("searchMovie", this.search);
    },
    debounceSearch() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchMovie();
      }, 2000);
    },
  },
};
</script>

<style scoped>
</style>