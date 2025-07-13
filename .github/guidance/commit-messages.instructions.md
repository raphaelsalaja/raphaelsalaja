---
description: "Guidance for writing clear, concise, and actionable commit messages"
---

```
<type>(<scope>): <short description>

[optional body]
```

* **type**: one of the permitted categories (see table below)
* **scope**: the affected subsystem or file (omit if not applicable)
* **short description**: imperative, present-tense summary (≤50 characters)
* **body**: blank line then detailed explanation (wrap at 72 characters)

---

## Types & When to Use

| Type     | When to use                                             |
| -------- | ------------------------------------------------------- |
| feat     | Introduce a new feature                                 |
| fix       | Patch a bug                                             |
| docs     | Documentation only changes                              |
| style    | Code style, formatting, missing semi-colons, etc.       |
| refactor | Code change that neither fixes a bug nor adds a feature  |
| perf     | Improve performance                                     |
| test     | Add or correct tests                                    |
| build    | Changes affecting build system or dependencies          |
| ci       | CI configuration or scripts                              |
| chore    | Other changes that do not modify src or test files       |

---

## Short Description

* Keep it **concise** (ideally ≤50 characters).
* Use **imperative mood** (“Add”, “Fix”, “Update”).
* Reference code identifiers in backticks, e.g. ``Remove `UserService` cache``.

---

## Body (Optional)

Use when you need to explain:

* **Why** the change was necessary
* **What** and **how** it addresses the problem
* Any **trade-offs** or side effects

Format:

```
<type>(<scope>): <short description>

- Motivation or context for the change
- Details of the implementation
- Side effects or migration notes
```

---

## Examples

### Valid

```
feat(auth): add OAuth2 login support

- Implement token exchange with Google OAuth2
- Store refresh tokens securely in encrypted storage
- Add tests covering successful and failed logins
```

```
fix(ui): correct header alignment on mobile

- Adjust CSS flex properties in `Header.scss`
- Ensure logo and menu button are vertically centered
```

### Invalid

```
Update stuff in auth module
```

```
refactor: big changes
```

> Both lack clear type/scope and don’t explain what or why.

---

## Quick Reference

* **Use hyphens** (`-`) for bullets, never em-dashes.
* **Wrap** body lines at 72 characters.
* **Capitalize** the description.
* **Avoid** ending the subject line with a period.
