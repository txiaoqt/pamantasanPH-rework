# Security

This document outlines the security measures implemented in the UniCentral platform to protect user data and prevent common vulnerabilities.

## SQL Injection

The UniCentral platform is not vulnerable to SQL injection attacks. This is because all database queries are executed through the [Supabase client library](https://supabase.com/docs/library/js/select), which uses a query builder that automatically parameterizes and sanitizes all inputs.

### How it Works

Instead of directly concatenating user input into SQL queries, the Supabase client library sends the query and the values separately. The database then safely combines them, ensuring that user input is treated as data, not as executable code.

For example, a query to fetch a university by its ID would be executed like this:

```javascript
const { data, error } = await supabase
  .from('universities')
  .select('*')
  .eq('id', userInputId);
```

In this case, `userInputId` is passed as a parameter, not as part of the SQL query string. This prevents a malicious user from injecting harmful SQL code.

## Row-Level Security (RLS)

The UniCentral platform uses Supabase's Row-Level Security (RLS) to ensure that users can only access and modify their own data. RLS policies are defined in the database schema and are automatically enforced by PostgreSQL for every query.

### Policies

The following RLS policies are in place:

*   **`universities` table:**
    *   Anyone can view universities.
    *   Only authenticated users can create, update, or delete universities.

*   **`academic_programs` table:**
    *   Anyone can view academic programs.
    *   Only authenticated users can create, update, or delete academic programs.

*   **`saved_universities` table:**
    *   Users can only view, insert, and delete their own saved universities.

*   **`user_preferences` table:**
    *   Users can only view, insert, and update their own preferences.

*   **`user_requirement_checklist` table:**
    *   Users can only view, insert, update, and delete their own checklist items.

## Cross-Site Scripting (XSS)

The UniCentral platform uses [React](https://reactjs.org/), a UI library that automatically escapes content rendered within JSX. This is a strong defense against Cross-Site Scripting (XSS) attacks, where an attacker injects malicious scripts into a website.

### `dangerouslySetInnerHTML`

While React's automatic escaping provides good protection, it's important to be cautious when using the `dangerouslySetInnerHTML` prop. This prop should be used sparingly and only with sanitized user input. Libraries like [DOMPurify](https://github.com/cure53/DOMPurify) can be used to sanitize HTML and prevent XSS attacks.

## Authentication and Authorization

The UniCentral platform uses [Supabase's built-in authentication](https://supabase.com/docs/guides/auth) for user management. This provides a secure and reliable way to handle user sign-up, login, and session management.

## Cross-Site Request Forgery (CSRF)

Supabase has [built-in CSRF protection](https://supabase.com/docs/guides/auth/auth-helpers/nextjs#csrf-protection-for-server-side-auth) for its APIs. This helps prevent attackers from tricking users into making unintended requests on the platform.

## Dependency Management

The UniCentral platform uses [npm](https://www.npmjs.com/) to manage its dependencies. To ensure that the platform is not vulnerable to known security issues in its dependencies, it's important to:

*   **Keep dependencies up to date:** Regularly update dependencies to their latest versions.
*   **Audit dependencies:** Use the `npm audit` command to check for known vulnerabilities in the project's dependencies.

By following these security best practices, the UniCentral platform aims to provide a safe and secure experience for all users.
