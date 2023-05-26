<template>
  <sidebar-menu v-model:collapsed="collapsed" :menu="menu" :show-one-child="true" />
  <div v-if="isOnMobile && !collapsed" class="sidebar-overlay" @click="collapsed = true" />
  <div id="resource-booking-hub" :class="[{ 'collapsed': collapsed }, { 'onmobile': isOnMobile }]">
    <div class="resource-booking-hub">
      <div>
        <h1>
          Governor Simcoe Resource Booking Hub
        </h1>
        <hr class="divider" style="margin: 50px 0px;border: 1px solid #e3e3e3;">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menu: [
        {
          header: 'Simcoe Resource Booking',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Home',
        },
      ],
      collapsed: false,
      isOnMobile: false
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    },
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}

#resource-booking-hub {
  padding-left: 290px;
  transition: 0.3s ease;
}

#resource-booking-hub.collapsed {
  padding-left: 65px;
}

#resource-booking-hub.onmobile {
  padding-left: 65px;
}

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}

.resource-booking-hub {
  padding: 50px;
}
</style>