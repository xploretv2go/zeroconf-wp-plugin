# zeroconf-wp-plugin

Wordpress plugin to display the service discovery dashboard. This plugin is created using reactpress (https://wordpress.org/plugins/reactpress/). Reactpress needs to to be installed in the wordpress installation in order for zeroconf-wp-plugin to function.

## Installation

For installation download the /build folder and place it in your WP installation under `/wp-content/reactpress/zeroconf-wp-plugin/` direcotry

## Development
- To run a dev server run `yarn start`
- To build the project and create a new build file based on development changes run `yarn build`

## Troubleshooting
- in case of running into issues with CORS for private networks on Chromium/Chrome browsers make sure to go to your browser settings and disable the following setting. `chrome://flags/#block-insecure-private-network-requests` 
- More information on this issue and why it is happening can be found under https://developer.chrome.com/blog/private-network-access-update/