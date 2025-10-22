import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
      "no-console": "off",
      "no-empty": "off",
      "no-unused-expressions": "off",
      "no-constant-condition": "off",
      
    },
  },
];

export default eslintConfig;
