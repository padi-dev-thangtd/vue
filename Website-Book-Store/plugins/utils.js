import Vue from 'vue';

Vue.mixin({
  methods: {
    testUtils(value) {
      console.log(value);
    },

    setMenuActive(arrPath, path) {
      const isMenu = _.filter(arrPath, pathItem => {
        return _.startsWith(path, pathItem);
      });
      return !_.isEmpty(isMenu);
    },
  }
})