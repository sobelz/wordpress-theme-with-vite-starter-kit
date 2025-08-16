<?php
add_filter('pre_set_site_transient_update_themes', 'my_theme_check_for_update');

function my_theme_check_for_update($transient) {
    if (empty($transient->checked)) {
        return $transient;
    }

    $remote_url = 'https://ADDRESS_FOR_UPDATE/UPDATE_DATA.json';
    $remote = wp_remote_get($remote_url);

    if (!is_wp_error($remote) && isset($remote['body'])) {
        $remote_data = json_decode($remote['body']);
        $theme = wp_get_theme();
        $theme_slug = $theme->get_stylesheet();
        if (version_compare($theme->get('Version'), $remote_data->new_version, '<')) {
            $transient->response[$theme_slug] = array(
                'theme'       => $theme_slug,
                'new_version' => $remote_data->new_version,
                'url'         => $remote_data->url,
                'package'     => $remote_data->package
            );
        }
    }

    return $transient;
}

?>