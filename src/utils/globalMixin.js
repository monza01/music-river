export default {
  created() {
    this.compute();
  },
  methods: {
    compute() {
      const base = 375;
      let clientWidth = document.documentElement.clientWidth;
      if (clientWidth < 320) {
        clientWidth = 320;
      } else if (clientWidth > 768) {
        clientWidth = 768;
      }
      this.scale = clientWidth / base;
    }
  },
  computed: {
    setUrl() {
      return function(url, width, height) {
        return `${url}?param=${Math.floor(width * this.scale * 3)}y${Math.floor(
          height * this.scale * 3
        )}`;
      };
    }
  }
};
