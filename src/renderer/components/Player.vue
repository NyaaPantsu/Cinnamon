<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
            <v-btn primary dark slot="activator" @click="stream($store.state.file)">Open Internal Player</v-btn>
            <v-card>
                <v-toolbar dark class="primary">
                    <v-btn icon @click.native="dialog = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Player</v-toolbar-title>
                </v-toolbar>
                <div class="video-player-box"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     @ready="playerReadied"
                     @statechanged="playerStateChanged($event)"
                     v-video-player:myVideoPlayer="playerOptions">
                </div>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>/* eslint-disable indent */
import WebTorrent from 'webtorrent'
export default {
  name: 'Player',
  data () {
    return {
      title: 'Player',
      dialog: false,
        playerOptions: {
        // videojs options
        muted: true,
        language: 'en',
        width: 1000,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: {
          src: ''
        }
      }
    }
  },
  mounted () {
    console.log('this is current videojs instance object', this.myVideoPlayer)
  },
  methods: {
    stream: function (magnetURI) {
      let client = new WebTorrent()
      console.log(magnetURI)
      client.add(magnetURI, {path: './'}, function (torrent) {
        let file = torrent.files.find(function (file) {
          return file.name.endsWith('.mp4')
        })
          this.playerOptions.sources.src = file
        console.log(file)
        torrent.on('done', function () {
          console.log('torrent download finished')
        })
      })
    },
    // listen event
    onPlayerPlay (player) {
      console.log('player play!', player)
    },
    onPlayerPause (player) {
      console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
    }
  }
}
</script>

<style scoped="">

</style>
