<template>
  <div class="about-page">
    <h1 class="title">About</h1>
    <div class="about-container">
      <h1>About DTT Real Estate</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>

      <h2>Design and Development</h2>
      <div class="dtt-credit">
        <img src="@/assets/images/img_logo_dtt@3x.png" alt="DTT Logo" class="dtt-logo" />
        <div class="dtt-info">
          <span>By DTT</span>
          <a href="https://www.d-tt.nl" target="_blank">www.d-tt.nl</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: unset;
  padding: 1rem;
  flex-direction: column;
}

.about-container {
  max-width: 800px;
  width: 100%;
  padding: 0 20px;
}

.title {
  display: block;
  text-align: center;
  font-size: var(--f-h1-desktop);
}

h1 {
  font-size: var(--f-h1-mobile);
  margin-bottom: 1rem;
}

h2 {
  font-size: var(--f-h2-mobile);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: var(--f-p-mobile);
  margin-bottom: 1rem;
  color: var(--text-color-secondary);
}

.dtt-credit {
  display: flex;
  align-items: center;
}

.dtt-logo {
  width: 150px;
  height: auto;
  margin-right: 1rem;
}

.dtt-info {
  font-size: var(--font-secondary);
  display: flex;
  flex-direction: column;
}

.dtt-info span {
  font-weight: 700;
}

.dtt-info a {
  color: var(--text-color-hyperlink);
  text-decoration: none;
}

.dtt-info a:hover {
  text-decoration: underline;
}

@media (min-width: 641px) {
  .about-page {
    max-width: 600px;
    padding: 0;
  }
  .title {
    display: none;
  }
  h1 {
    font-size: var(--f-h1-desktop);
  }
  h2 {
    font-size: var(--f-h2-desktop);
    margin-top: 1rem;
  }
  p {
    font-size: var(--font-secondary);
  }
}
</style>
