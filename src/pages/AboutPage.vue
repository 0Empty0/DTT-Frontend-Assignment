<template>
  <div class="about-page">
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

h1,
h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
}

p {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
}

.dtt-credit {
  display: flex;
  align-items: center;
}

.dtt-logo {
  width: 150px;
  height: auto;
  margin-right: 20px;
}

.dtt-info {
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', sans-serif;
}

.dtt-info span {
  font-weight: bold;
}

.dtt-info a {
  color: #007bff;
  text-decoration: none;
}

.dtt-info a:hover {
  text-decoration: underline;
}
</style>
