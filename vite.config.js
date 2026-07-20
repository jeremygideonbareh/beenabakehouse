import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    base: "/beenabakehouse/",
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: { port: 5173, open: false },
    build: {
        target: "es2020",
        sourcemap: false,
        cssCodeSplit: true,
        chunkSizeWarningLimit: 900,
        rollupOptions: {
            output: {
                manualChunks: {
                    "motion": ["framer-motion"],
                    "gsap": ["gsap"],
                    "supabase": ["@supabase/supabase-js"],
                    "lenis": ["lenis"],
                },
            },
        },
    },
});
