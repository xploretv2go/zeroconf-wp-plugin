
# zeroconf-w
Wordpress plugin to display the service discovery dashboard. This plugin is created using reactpress [reactpress](https://wordpress.org/plugins/reactpress/). Reactpress needs to to be installed in the wordpress installation in order for zeroconf-wp-plugin to function.
## Deployment using ReactPress

To Deploy the application using ReactPress plugin make sure to copy the build folder to the reactpress directory in your WP installation ( this directory can be found under `/wp-content/plugins/reactpress/`). Then go to ReactPress options page in your WP application and set the slug to the page you want the plugin to display on.

## Installation

For installation download the /build folder and place it in your WP installation under `/wp-content/reactpress/zeroconf-wp-plugin/` direcotry

## Development
- To run a dev server run `yarn start`
- To build the project and create a new build file based on development changes run `yarn build`

## Troubleshooting
- in case of running into issues with CORS for private networks on Chromium/Chrome browsers make sure to go to your browser settings and disable the following setting. `chrome://flags/#block-insecure-private-network-requests` 
- More information on this issue and why it is happening can be found under https://developer.chrome.com/blog/private-network-access-update/