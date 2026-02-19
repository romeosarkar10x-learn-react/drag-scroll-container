import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

function getBaseURL(): string {
    const githubRepository = process.env.GITHUB_REPOSITORY;

    if (githubRepository === undefined) {
        return "/";
    }

    const [, repo] = githubRepository.split("/");
    return `/${repo}`;
}

export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: getBaseURL(),

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
