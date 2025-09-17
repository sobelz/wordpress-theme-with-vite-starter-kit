<?php
$env = parse_ini_file(__DIR__ . '/../.env');
$port = $env["PORT"];
if (!$port || empty($port)) {
	$port = 5006;
}
define("DEV_ADDRESS", "http://localhost:" . $port);


function get_assets_files_array (){
	$assets_json_data = file_get_contents(get_template_directory_uri().'/assets.json',true);
	$assets_array = json_decode($assets_json_data, true);
	return $assets_array;
}
function assets_import_in_page_keys (){
	$slug = basename(get_permalink());
	if(is_home()){
		$slug = "blog";
	}
	if(is_front_page()){
		$slug = "home";
	}
	$import_page_items = [$slug,"main"];
	return $import_page_items;
}

function load_assets_handler()
{
 
	remove_default_assets();
	set_wpml_current_lang_to_js();
  if (is_development_mode()) {
	
	development_assets();
  } else {
    normal_assets();
  }
}

function remove_default_assets (){
	 wp_dequeue_style('classic-theme-styles');
  wp_dequeue_style('wp-block-library');
  wp_dequeue_style('wp-block-library-theme');
  wp_dequeue_style('global-styles');
  wp_deregister_script('wp-embed');

}

function set_wpml_current_lang_to_js (){
	if (defined('ICL_LANGUAGE_CODE')) {
    wp_localize_script('config', 'wpmlData', [
      'currentLanguage' => ICL_LANGUAGE_CODE,
    ]);
  }
}

function development_assets(){
	$assets_ts = get_assets_files_array()["ts"];
	foreach ($assets_ts as $key => $value) {
		if(in_array($key,assets_import_in_page_keys())){	
			wp_enqueue_script_module('sobelz-vite-'.$key, DEV_ADDRESS.$value, [], null, true);
		}
	}
}

function normal_assets()
{
	$assets_ts = get_assets_files_array()["ts"];
	$assets_css = get_assets_files_array()["css"];

	foreach ($assets_ts as $key => $_) {
		if(in_array($key,assets_import_in_page_keys())){
			  wp_enqueue_script_module('sobelz-'.$key,get_template_directory_uri() . '/dist/js/'.$key.'.js',[],null,true);
		}
	}
	foreach ($assets_css as $key => $value) {
		if(in_array($key,assets_import_in_page_keys())){
			  wp_enqueue_style('sobelz-'.$key, get_template_directory_uri() . "/dist/css/".$value);
		}
	}

}

add_action('wp_enqueue_scripts', 'load_assets_handler');

function is_development_mode()
{
  if (defined('APP_MODE') && APP_MODE === 'development') {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, DEV_ADDRESS);
    $res = curl_exec($ch);
    curl_close($ch);
    if ($res) {
      return true;
    }
  }
  return false;
}
?>
