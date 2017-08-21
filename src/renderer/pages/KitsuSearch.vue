<template lang="pug">
  v-layout.row
    v-flex.xs12
      v-card
        v-toolbar.light-blue.darken-1
          v-toolbar-title Kitsu anime
          v-spacer
          v-progress-circular.primary--text(indeterminate,v-if="loading")
          v-text-field(append-icon="search",label="Search",single-line,hide-details,v-model="search",v-on:change="searchAnime")
        v-list
          v-list-tile(v-for="result in results",v-bind:key="result.attributes.canonicalTitle",@click="setQuery(result.attributes.canonicalTitle)")
            v-list-tile-content
              v-list-tile-title(v-text="result.attributes.canonicalTitle")
            v-list-tile-action
              v-icon search
</template>

<script>
import kitsu from 'node-kitsu'
export default {
  data () {
    return {
      search: '',
      results: [],
      loading: false
    }
  },
  mounted () {
  },
  methods: {
    searchAnime: function (event) {
      this.loading = true
      let query = event.target.value
      console.log('received query', query)

      kitsu.searchAnime(event.target.value, 0)
        .then(results => {
          this.results = results
          this.loading = false
          console.log('received results', results)
        })
        .catch(err => {
          this.loading = false
          console.error(err)
        })
    },
    setQuery: function (query) {
      this.$store.commit('setQuery', query)
      this.$router.push('/')
    }
  }
}
</script>
