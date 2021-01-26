<template>
  <div class="title">
    <p>{{ title }}</p>
    <GetMoreButton></GetMoreButton>
  </div>
</template>

<script>
import GetMoreButton from "@/components/button/GetMoreButton";

export default {
  name: "Tittle",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  components: {
    GetMoreButton
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/variables.scss";

.title {
  display: flex;
  justify-content: space-between;
  padding: 0 0.1rem;
  p {
    font-size: $font-size-m;
    line-height: 0.3rem;
    font-weight: 700;
  }
}
</style>
