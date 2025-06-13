<script setup>
import homeActive from '@/assets/icons/ic_mobile_navigarion_home_active@3x.png'
import homeInactive from '@/assets/icons/ic_mobile_navigarion_home@3x.png'
import aboutActive from '@/assets/icons/ic_mobile_navigarion_about_active@3x.png'
import aboutInactive from '@/assets/icons/ic_mobile_navigarion_about@3x.png'
</script>

<template>
  <footer class="footer">
    <ul class="footer-nav">
      <li class="footer-nav-item">
        <router-link to="/" class="footer-nav-link">
          <img :src="homeActive" alt="home" class="footer-nav-icon" v-if="$route.name === 'Home'" />
          <img :src="homeInactive" alt="home" class="footer-nav-icon" v-else />
        </router-link>
      </li>
      <li class="footer-nav-item">
        <router-link to="/about" class="footer-nav-link">
          <img
            :src="aboutActive"
            alt="about"
            class="footer-nav-icon"
            v-if="$route.name === 'About'"
          />
          <img :src="aboutInactive" alt="about" class="footer-nav-icon" v-else />
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-background-2);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.footer-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  gap: 3rem;
  padding: 0;
}

.footer-nav-item {
  margin: 0 auto;
}

.footer-nav-link {
  font-size: var(--f-header-menu);
  transition: all 0.3s ease;
}

.footer-nav-icon {
  width: 24px;
  height: 24px;
}

@media (min-width: 640px) {
  .footer {
    display: none;
  }
}
</style>
