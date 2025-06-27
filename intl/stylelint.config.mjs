const base = {
  "at-rule-empty-line-before": [
    "always",
    {
      except: [
        "after-same-name",
        "inside-block",
        "blockless-after-same-name-blockless",
        "blockless-after-blockless",
        "first-nested",
      ],
    },
  ],
  "import-notation": "string",
  "keyframes-name-pattern": null,
  "no-descending-specificity": null,
  "no-duplicate-selectors": null,
  "selector-class-pattern": null,
};

const order = {
  "order/order": [["dollar-variables", "custom-properties", "declarations", "rules", "at-rules"]],
  "order/properties-alphabetical-order": null,
};

/** @type {import('stylelint-define-config').RuleConfig}*/
const scss = {
  "scss/at-else-closing-brace-newline-after": "always-last-in-chain",
  "scss/at-else-closing-brace-space-after": "always-intermediate",
  "scss/at-else-if-parentheses-space-before": "always",
  "scss/at-if-closing-brace-newline-after": "always-last-in-chain",
  "scss/at-if-closing-brace-space-after": "always-intermediate",
  "scss/at-if-no-null": null,
  "scss/at-mixin-argumentless-call-parentheses": "never",
  "scss/at-rule-conditional-no-parentheses": true,
  "scss/dollar-variable-colon-space-after": "always-single-line",
  "scss/double-slash-comment-whitespace-inside": "always",
  "scss/dollar-variable-empty-line-before": [
    "always",
    {
      except: ["after-dollar-variable", "first-nested"],
      ignore: ["after-comment", "inside-single-line-block"],
    },
  ],
  "scss/double-slash-comment-empty-line-before": [
    "always",
    {
      except: ["first-nested"],
      ignore: ["between-comments", "stylelint-commands"],
    },
  ],
  "scss/no-duplicate-mixins": true,
};

const stylistic = {
  "@stylistic/declaration-colon-newline-after": "always-multi-line",
  "@stylistic/indentation": 2,
  "@stylistic/max-line-length": 180,
};

/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-recommended-scss"],
  plugins: ["stylelint-order", "@stylistic/stylelint-plugin"],
  overrides: [
    {
      files: ["*.scss", "**/*.scss"],
      rules: {
        ...base,
        ...scss,
        ...order,
        ...stylistic,
      },
    },
  ],
};
