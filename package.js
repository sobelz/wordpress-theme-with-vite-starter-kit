import { existsSync } from "node:fs";
import { glob, mkdir, cp, rm } from "node:fs/promises";
import { join, basename } from "node:path";

import AdmZip from "adm-zip";

const makePackage = async () => {
    const packageName = basename(process.cwd());
    const outputPath = join(process.cwd(), "output", packageName);
    const outputPathZip = join(process.cwd(), "output", packageName + ".zip");
    if (existsSync("./output")) {
        await rm("./output", { force: true, recursive: true });
    }


    await mkdir(outputPath, { recursive: true });
    for await (const entry of glob("*", {
        exclude: [
            "public",
            "output",
            "src",
            "*.env",
            "package.json",
            "package-lock.json",
            "node_modules",
            "*.gitignore",
            ".git",
            "tsconfig.json",
            "vite.config.ts",
        ],
    }))
        await cp(join(process.cwd(), entry), join(outputPath, entry), {
            recursive: true,
        });

    const zip = new AdmZip();

    zip.addLocalFolder(outputPath);
    zip.writeZip(outputPathZip);
};

makePackage();
