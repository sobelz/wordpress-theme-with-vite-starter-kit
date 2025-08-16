# WordPress Theme Starter Kit

## Integrates with [Vite](https://vite.dev/) & [Tailwind CSS](https://tailwindcss.com/)

## Usage

1. Download a WordPress theme from the [Underscores](https://underscores.me/) template builder.
2. Remove the **LICENSE** file.
3. Copy all files and directories from this starter kit into your theme (accept replacing the README).
4. Merge the **additional** files and directories with your theme ([see below](#merge-files)).
5. Rename **example.env** to **.env** and set your development ports.
6. Install dependencies:

   ```shell
   npm install
   ```

7. Build your CSS and JS:

   ```shell
   npm run build
   ```

## Development

To use development mode and enable auto-refresh on changes:

1. Set a global variable in the root of your WordPress project in **wp-config.php**:

   ```php
   define('APP_MODE', 'development');
   ```

2. If your project runs on a server, forward the port defined in `.env` to your server (see [VS Code port forwarding](https://code.visualstudio.com/docs/debugtest/port-forwarding)):

   ```shell
   ssh -L local_port:remote_host:remote_port user@ssh_server
   ```

3. Start development mode:

   ```shell
   npm run dev
   ```

## Asset Files

#### assets.json

Manage CSS and JS files for dynamic importing on each WordPress page.  
For example, if you have an **aboutus** page with `aboutus.ts` for animations, and your page route is _about-us_, add the following to load `aboutus.ts` only on that route:

```json
{
  "ts": {
    "main": "/src/ts/main.ts",
    "home": "/src/ts/home/index.ts",
    "about-us": "/src/ts/aboutus/index.ts"
  },
  "css": {
    "main": "main.css",
    "about-us": "aboutus.css"
  }
}
```

- `main.(css|ts)` loads on every route and page (useful for menus, etc.).
- `home` loads only on the home page (`/`).
- `about-us` loads only on the `/about-us` route.

### Merge Files

- Copy files from [additional-inc](./additional-inc/) into your `inc` directory, then remove `additional-inc`.
- Replace [additional-.gitignore](additional-.gitignore) with `.gitignore`.
- Copy the contents of [additional-functions.php](additional-functions.php) into your `functions.php`.
- Replace [additional-package.json](additional-package.json) with `package.json`.

## Updating the Theme

To update the theme, edit [check-update.php](additional-inc/check-update.php) and replace `ADDRESS_FOR_UPDATE` with your server’s address.

Change the version number and run the following command to package all files and create a zip archive of your theme:

```shell
npm run package
```

Upload the output zip file to your server.

On your server, create an update info file in JSON format like this:

```json
{
  "new_version": "2.2.0",
  "url": "https://ADDRESS_FOR_UPDATE/info.html",
  "package": "https://ADDRESS_FOR_UPDATE/THEME_NAME.zip"
}
```
