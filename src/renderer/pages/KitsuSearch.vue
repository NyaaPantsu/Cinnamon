<template lang="pug">
  v-layout.row
    v-flex.xs12
      v-card(v-if="!torrentMode")
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
      v-card(v-else)
        v-toolbar.light-blue.darken-1
          v-toolbar-title Torrents
          v-spacer
          v-progress-circular.primary--text(indeterminate,v-if="loading")
          v-text-field(append-icon="search",label="Search",single-line,hide-details,v-model="search",v-on:change="searchAnime")
        v-list(two-line='')
          v-list-tile(v-for='item in results', v-bind:key='item.id')
            v-list-tile-content
              v-list-tile-title {{item.name}}                            
              v-list-tile-sub-title
                span.green--text.text--lighten-1 S: {{item.seeders}}
                span.red--text.text--lighten-1 L: {{item.leechers}}                     
            v-list-tile-action
              v-spacer                          
              v-dialog(width='800px')
                v-btn(icon='', ripple='', dark='', slot='activator')
                  v-icon.grey--text.text--lighten-1 info                               
                v-card
                  v-card-title
                    span.headline More info                                     
                    v-list-tile-action
                      v-spacer
                      //
                        <v-btn icon ripple v-clipboard="item.torrent" @click="snackbar = true">
                        <v-icon class="gray--text text--lighten-2">content_copy</v-icon>
                        </v-btn>                                 
                  v-card-text.disabled(v-html='item.description')                                                   
              v-spacer                        
            v-list-tile-action
              v-spacer                              
              v-btn(icon='', ripple='', dark='', slot='activator', @click.native='stream(item.magnet)')
                v-icon.purple--text.text--lighten-2 play_circle_filled                            
              v-spacer
</template>

<script>
import kitsu from 'node-kitsu'
import { mapGetters } from 'vuex'
import axios from 'axios'
import WebTorrent from 'webtorrent'
import MPV from 'node-mpv'
export default {
  data () {
    return {
      search: '',
      results: [],
      loading: false,
      torrentMode: false,
      mpv: new MPV(),
      videoServer: null
    }
  },
  mounted () {
    this.$store.commit('setQuery', '')
  },
  computed: mapGetters([
    'query',
    'limit',
    'online',
    'filePath'
  ]),
  methods: {
    searchAnime: function (event) {
      this.loading = true
      this.torrentMode = false
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
      // this.$router.push('/')
      let limit = 50
      axios.get('https://nyaa.pantsu.cat/api/search?c=3_&limit=' + limit + '&query=' + this.query)
      .then(response => {
        this.torrentMode = true
        this.results = response.data.torrents
      })
    },
    setMagnetURI: function (data) {
      this.$store.commit('setMagnetURI', data)
    },
    stream: function (magnetURI) {
      this.loading = true
      console.log('instructed to stream', magnetURI)
      let wt = new WebTorrent()
      let self = this
      wt.add(magnetURI, function (torrent) {
        self.videoServer = torrent.createServer()
        self.videoServer.listen(0)
        console.log('video server listening on http://localhost:' + self.videoServer.address().port)
        let file = torrent.files.find(function (file) {
          return file.name.endsWith('.mp4') || file.name.endsWith('.mkv') || file.name.endsWith('.avi')
        })
        self.$store.commit('setFilePath', file.path)
        self.mpv.loadStream('http://localhost' + ':' + self.videoServer.address().port + '/0/' + self.filePath)
      })
    }
  }
}
</script>

<style scoped="">
    .disabled {
        pointer-events: none;
        cursor: default;
    }
</style>
