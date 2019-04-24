import VueRouter from "vue-router";

let routes = [
    {
        path: '/',
        name: 'index',
        component: require('./components/Index').default
    },
];

export default new VueRouter({
  routes
});
