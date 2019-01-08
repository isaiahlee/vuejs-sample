# vuejs

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# window host file -> 127.0.0.1 local.vuejs.com add

# nginx install and modify config , use 80 port
	server {
	   listen 80;
	   server_name local.vuejs.com;

	   location / {
	       proxy_set_header   X-Real-IP $remote_addr;
	       proxy_set_header   Host      $http_host;
	       proxy_pass         http://local.vuejs.com:8081;
	   }
	}      
      
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# call url http://local.vuejs.com/vue

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
