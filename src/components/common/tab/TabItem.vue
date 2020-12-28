<template>
  <div class="tab-item" @click="nav">
    <div class="icon" :class="iconActive">
      <slot name="icon"></slot>
    </div>
    <div :class="textActive">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabItem",
  props: {
    link: {
      type: String,
      default: null
    }
  },
  methods: {
    nav() {
      this.$router.replace(this.link).catch(err => err);
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1;
    },
    textActive() {
      return this.isActive ? "text-active" : "";
    },
    iconActive() {
      return this.isActive ? "icon-active" : "";
    }
  }
};
</script>

<style scoped lang="scss">
.tab-item {
  flex: 1;
  text-align: center;
  font-size: 0.1rem;
  color: rgba(133, 139, 145, 0.6);
  .icon {
    margin: 4px auto;
    width: 0.25rem;
    height: 0.25rem;
    font-size: 0.2rem;
    border-radius: 50%;
    transition: font-size 0.1s;
    :nth-child(1) {
      height: 0.25rem;
      line-height: 0.25rem;
    }
  }
  .text-active {
    color: #46a3ab;
  }
  .icon-active {
    background-image: linear-gradient(135deg, #46a3ab, #b2dfdb);
    font-size: 0.15rem;
    color: white;
  }
}
</style>
