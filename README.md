# Wordpress starter kit

## For integrate with [**Vite**](https://vite.dev/) & [**Tailwindcss**](https://tailwindcss.com/)

## Usage

1. Download Wordpress theme from [Underscores](https://underscores.me/) template theme builder
2. Copy evry files and directory here _(accept to replace readme)_
3. Merge **additional** files and directory with your theme ([Read more](#merge-files))
4. Rename **example.env** to **.env** and set your ports for development mode
5. Run this code for install dependency

   ```shell
   npm install
   ```

## Assets files

#### assets.json

In this file you manage css and js files for daynamic importing in each page in wordpress <br>
For example you have **aboutus** page and in this page you have **aboutus.ts** for manage some section animations <br>
If your page route is _about-us_ you can add like this for load **aboutus.ts** just in _about-us_ route

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

In this sample **main**._(css|ts)_ loaded on evry routes and page , you can use this for menu and ...
and **home** just loaded on home page by this route

> /

And **about-us** loaded on this route

> /about-us

### Merge files

- Copy [additional-inc](./additional-inc/) inner files into inc directory and remove additional-inc
- Replace [additional-.gitignore](additional-.gitignore) with _.gitignore_
- Copy [additional-functions.php](additional-functions.php) inner codes into _functions.php_
- Replace [additional-package.json](additional-package.json) with _package.json_
