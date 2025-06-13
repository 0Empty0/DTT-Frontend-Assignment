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
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  padding: 40px 0;
  min-height: calc(100vh - 100px);
}

.about-container {
  max-width: 800px;
  width: 100%;
  padding: 0 20px;
}

h1 {
  font-size: var(--f-h1-desktop);
  margin-bottom: 1rem;
}

h2 {
  font-size: var(--f-h2-desktop);
  margin-top: 1rem;
  margin-bottom: 1rem;
}

p {
  font-size: var(--font-secondary);
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
  .title {
    display: none;
  }
}

@media (max-width: 640px) {
  .about-page {
    flex-direction: column;
    padding: 1rem;
  }
  .title {
    display: block;
    text-align: center;
    font-size: var(--f-h1-desktop);
  }
  h1 {
    font-size: var(--f-h1-mobile);
  }
  h2 {
    margin-top: 2rem;
    font-size: var(--f-h2-mobile);
  }
  p {
    font-size: var(--f-p-mobile);
  }
}
</style>
