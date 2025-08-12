import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import assets from "./assets.json";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseInt(env.PORT ?? 5004);
  return {
    root: "./",
    base: "./",
    publicDir: "./public",
    server: {
      host: "0.0.0.0",
      port,
      cors: true,
    },
    build: {
      copyPublicDir: true,
      outDir: "./dist",
      emptyOutDir: true,
      rollupOptions: {
        input: getAssetsInputs(),
        output: {
          manualChunks: false,
          entryFileNames: "js/[name].js",
          assetFileNames: "[ext]/[name].[ext]",
        },
      },
    },
    plugins: [addLocalhostInURLsOnDevMode(mode, port), tailwindcss()],
  };
});

function getAssetsInputs() {
  const inputs = {};

  Object.keys(assets.ts).forEach((key) => {
    inputs[key] = `.${assets.ts[key]}`;
  });
  return inputs;
}

function addLocalhostInURLsOnDevMode(mode: string, port: number) {
  if (mode === "development")
    return {
      name: "add-localhost-to-urls",
      transform(code: string, id: string) {
        if (id.endsWith(".css")) {
          let newcode = code.replace(/'..\//gm, `'http://localhost:${port}/`);
          newcode = newcode.replace(/"..\//gm, `"http://localhost:${port}/`);
          newcode = newcode.replace(/"\//gm, `"http://localhost:${port}/`);
          newcode = newcode.replace(/'\//gm, `"http://localhost:${port}/`);
          return newcode;
        }
        return code;
      },
    };
}
