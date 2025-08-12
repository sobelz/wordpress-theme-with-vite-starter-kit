<?php 

register_nav_menus([
	'main-menu' => __('Main Menu', 'your-text-domain'),
]);


function get_assets_url()
{
	if (is_development_mode()) {
		return DEV_ADDRESS . '/';
	} else {
		return get_template_directory_uri() . '\/dist/';
	}
}

function the_assets_url(){
	echo get_assets_url();
}

function get_shop_address()
{
  return get_permalink(wc_get_page_id('shop'));
}


function get_blog_address()
{
  return get_permalink(get_option('page_for_posts'));
}


?>