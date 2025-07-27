import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat_ = new FlatCompat({
  baseDirectory: __dirname,
});

const COMPLEXITY_THRESHOLD = 10

const eslintConfig_ = [
  ...compat_.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "unused-imports": unusedImports,
      import: eslintPluginImport, // Include eslint-plugin-import
    },
    rules: {
      // --- Unused Imports and Variables ---
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error", // Removes unused imports
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_", // Allow vars prefixed with _
          args: "after-used",
          argsIgnorePattern: "^_", // Allow args prefixed with _
        },
      ],
    
      // --- Import Sorting ---
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    
      // --- Variable Declaration ---
      "prefer-const": "error", // Converts `let` to `const` where possible
    
      // --- Logic and Consistency ---
      "default-case": "error", // Ensure switch statements have a default case
      "consistent-return": "error", // Require consistent return statements
      "no-unused-expressions": "error", // Disallow unused expressions
      "eqeqeq": ["error", "always"], // Enforce strict equality
      "no-nested-ternary": "error", // Disallow nested ternary expressions
    
      // --- Maintainability ---
      "no-magic-numbers": [
        "warn",
        { "ignore": [0, 1, -1, 10, 100], "enforceConst": true },
      ],
      "complexity": ["warn", COMPLEXITY_THRESHOLD], // Limit cyclomatic complexity
    
      // --- TypeScript Rules ---

      "@typescript-eslint/consistent-type-imports": "error", // Use consistent type imports
      "@typescript-eslint/no-explicit-any": "off",
    
      // --- Security and Performance ---
      "no-new-func": "error", // Disallow Function constructor usage
      "no-unsafe-optional-chaining": "error", // Prevent unsafe optional chaining
    
      // --- React and Next.js Rules ---
      "react-hooks/rules-of-hooks": "error", // Enforce React Hook rules
      "@next/next/no-html-link-for-pages": "warn", // Use Next.js Link for internal links
      "@next/next/no-img-element": "warn", // Use Next.js Image instead of <img>
    
      // --- Code Readability ---
      "prefer-template": "warn", // Prefer template literals over string concatenation
      
    }
  },
];

export default eslintConfig_;
