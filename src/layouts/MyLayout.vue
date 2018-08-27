<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-layout-header
      q-toolbar(color="primary", :glossy="$q.theme === 'mat'", :inverted="$q.theme === 'ios'")
        q-btn(flat, dense, round, @click="leftDrawerOpen = !leftDrawerOpen", aria-label="Menu")
          q-icon(name="menu")

        q-toolbar-title(data-cy="title")
          | Quasar App
          div(slot="subtitle") Now Running on Quasar v{{ $q.version }}

    q-layout-drawer(v-model="leftDrawerOpen", :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null")
      q-list(no-border, link, inset-delimiter)
        q-list-header Essential Links
        q-item(@click.native="openURL('http://quasar-framework.org')")
          q-item-side(icon="school")
          q-item-main(label="Docs", sublabel="quasar-framework.org")
        q-item(@click.native="openURL('https://github.com/quasarframework/')")
          q-item-side(icon="code")
          q-item-main(label="GitHub", sublabel="github.com/quasarframework")
        q-item(@click.native="openURL('https://discord.gg/5TDhbDg')")
          q-item-side(icon="chat")
          q-item-main(label="Discord Chat Channel", sublabel="https://discord.gg/5TDhbDg")
        q-item(@click.native="openURL('http://forum.quasar-framework.org')")
          q-item-side(icon="record_voice_over")
          q-item-main(label="Forum", sublabel="forum.quasar-framework.org")
        q-item(@click.native="openURL('https://twitter.com/quasarframework')")
          q-item-side(icon="rss feed")
          q-item-main(label="Twitter", sublabel="@quasarframework")
        q-item(v-for="(link, index) in links" :key="index" @click.native="openURL(link.url)")
          q-item-side(:icon="link.icon")
          q-item-main(:label="link.name", :sublabel="link.url")

    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar'
import GET_LINKS from '../graphql/queries/links.gql'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      title: 'SSR starter with Jest and Cypress',
      description: 'A starter kit for building a testing rig'
    }
  },
  apollo: {
    links: {
      query: GET_LINKS
    }
  },
  methods: {
    openURL
  },
  meta () {
    return {
      title: this.title, // sets document title
      titleTemplate: title => `${title} - Quasar v0.17`, // optional; sets final title as "`{this.title}` - My Website", useful for multiple level meta
      meta: {
        description: {name: 'description', content: 'Landing Page'},
        keywords: {name: 'keywords', content: 'Quasar website'},
        equiv: {'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8'},
        ogTitle: {name: 'og-title', content: 'Landing page'}
      },
      link: {
        material: {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
      },
      script: {
        ldJson: {
          type: 'application/ld+json',
          innerHTML: `{ "@context": "http://schema.org" }`
        }
      },
      htmlAttr: {
        'xmlns:cc': 'http://creativecommons.org/ns#' // generates <html xmlns:cc="http://creativecommons.org/ns#">
      },
      bodyAttr: {
        'action-scope': 'xyz', // generates <body action-scope="xyz">
        empty: undefined // generates <body empty>
      },
      noscript: {
        default: 'Here is a where you should inform non-script pages that if they want to hydrate they should enable javascript-'
      }
    }
  }
}
</script>

<style>
</style>
