<?php
/**
 * Plugin Name: SecuraCart - Stripe Payments
 * Description: SecuraCart is the simple and easy solution to accept Stripe payments on your blog or website. Whether you're selling one-time products or recurring subscriptions, we have you covered. To get started: install the SecuraCart plugin to access the widget in your post editor <a href="https://support.securcart.com/wordpress/getting-started">Read the getting started guide here.</a>
 * Author: SecuraCart
 * Author URI: https://securacart.com/
 * Version: 1.0.6
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'src/init.php';