import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

function getBaseURL(): string {
    const githubRepository = process.env.GITHUB_REPOSITORY;

    if (githubRepository === undefined) {
        return "/";
    }

    const [, repo] = githubRepository.split("/");
    return `/${repo}`;
}

export default defineConfig({
    plugins: [react()],
    base: getBaseURL(),
});
