<script setup>
import logo from '@/assets/images/img_logo_dtt@3x.png'
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <img :src="logo" alt="logo" class="header-logo" />
      <ul class="header-nav">
        <li class="header-nav-item">
          <router-link to="/" class="header-nav-link" active-class="active">Home</router-link>
        </li>
        <li class="header-nav-item">
          <router-link to="/about" class="header-nav-link" active-class="active">About</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
}

.header-inner {
  display: flex;
  align-items: center;
}

.header-logo {
  width: 120px;
  margin-right: 2rem;
}

.header-nav {
  display: flex;
  gap: 3rem;
}

.header-nav-link {
  font-size: var(--f-header-menu);
  transition: all 0.3s ease;
}

.active {
  font-weight: 700;
  color: #000;
}

@media (max-width: 640px) {
  .header {
    display: none;
  }
}
</style>
