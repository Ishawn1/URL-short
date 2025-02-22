# Simple URL Shortener (Client-Side, No Backend)

[![Project Status](https://img.shields.io/badge/status-complete-brightgreen.svg)](https://github.com/Ishawn1/URL-short) 

This project is a simple, **client-side only** URL shortener built with HTML, CSS, and JavaScript. It demonstrates fundamental web development concepts, including DOM manipulation, event handling, string hashing, and using `localStorage` for persistence.  It does *not* require any server-side components or databases.

**Important Note:** Because this project is entirely client-side, the generated shortened URLs are *not* shareable. They will only work within the same browser on the same machine where they were created. This project is intended as a learning exercise and demonstration of client-side techniques, *not* as a replacement for a real-world URL shortening service.

## Features

*   **Shorten URLs:** Generates a short, alphanumeric hash for any given URL using the djb2 hashing algorithm.
*   **Copy to Clipboard:** Allows the user to easily copy the shortened URL.
*   **Local Storage Persistence:** Stores the long URL and its corresponding short URL in `localStorage`, so the shortened URL can be retrieved and used for client-side redirection even after the page is reloaded *within the same browser*.
*   **Client-Side Redirection:** When a shortened URL (e.g., `http://localhost:8000/#yourhash`) is entered into the browser's address bar, the JavaScript detects the hash and performs a *client-side* redirect to the original long URL (if found in `localStorage`).
*   **Basic Error Handling:** Checks for empty or invalid URLs and displays appropriate error messages.
*   **No Backend Required:** Runs entirely in the browser.

## Technologies Used

*   **HTML:** Structure of the web page.
*   **CSS:** Styling and layout.
*   **JavaScript:** Core logic, including URL shortening, clipboard interaction, `localStorage` usage, and client-side redirection.
*   **djb2 Hashing Algorithm:** A fast and simple hashing algorithm for generating short hashes.

## How it Works (Detailed)

1.  **Input:** The user enters a long URL into the input field.
2.  **Validation:** The JavaScript checks if the input is empty or a valid URL (using `new URL()`).
3.  **Shorten Button Click:** When the user clicks the "Shorten" button:
    *   The `shortenURL()` function is called.
    *   **LocalStorage Lookup (Existing URL):** The script first checks if a shortened URL already exists for the given long URL in `localStorage`. If so, it's retrieved and displayed.
    *   **Hashing (New URL):** If no existing shortened URL is found, the djb2 hashing algorithm is used to generate a hash from the long URL.
    *   **Short URL Construction:** The shortened URL is created by combining the current page's origin (e.g., `http://localhost:8000`) with a `#` and the hash (e.g., `http://localhost:8000/#aB1cD2`). This uses a *fragment identifier*.
    *   **LocalStorage Storage:** The long URL and its corresponding short URL are stored in `localStorage`.
    *   **Display:** The shortened URL is displayed in a read-only input field, and a "Copy" button is shown.
4.  **Copy to Clipboard:** When the user clicks the "Copy" button, the JavaScript copies the shortened URL to the clipboard and displays a brief "Copied!" message.
5.  **Client-Side Redirection (on Page Load):**
    *   When the page loads *with a hash in the URL* (e.g., after the user pastes a shortened URL into the address bar), the `handleHash()` function is executed.
    *   **Hash Extraction:** The function extracts the hash from the URL (everything after the `#`).
    *   **LocalStorage Lookup (Redirection):** It searches `localStorage` for a matching shortened URL.  It does this by comparing the *full* constructed short URL (base URL + hash) with the stored values.
    *   **Redirection:** If a match is found, `window.location.href` is used to perform a *client-side* redirect to the original long URL.  This makes the browser load the original page.
    *   **Not Found:** If no match is found, an error message is displayed ("Shortened URL not found.").

## How to Run

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Ishawn1/URL-short  
    cd your-repo-name
    ```

2.  **Open `index.html`:** Open the `index.html` file directly in your web browser.  No web server is strictly required, but using one is recommended (see below).

3. **Recommended: Use a Local Web Server:**
     Although you *can* open `index.html` directly, it's best practice (and more reliable) to use a local web server. This avoids potential issues and simulates a real deployment environment.  Here are a few easy options:
    * **Python (if you have it installed):**
      ```bash
        python -m http.server # Python 3
      ```
      Then, open `http://localhost:8000` in your browser.
    * **Node.js (if you have it installed):**
      ```bash
        npm install -g http-server  # Install globally (only once)
        http-server .             # Run in the project directory
      ```
      Then open `http://localhost:8080` in your browser (port might be different).
    * **VS Code "Live Server" extension:** If you use VS Code, the "Live Server" extension provides a convenient way to serve your files.

## Code Structure

*   **`index.html`:** The main HTML file containing the structure of the web page (input field, buttons, result display, etc.).
*   **`style.css`:** The CSS file for styling the page.
*   **`script.js`:** The JavaScript file containing the core logic:
    *   `shortenURL()`: Generates the short URL and handles `localStorage` interaction.
    *   `djb2Hash()`: Implements the djb2 hashing algorithm.
    *   `handleHash()`: Handles the client-side redirection when the page loads with a hash in the URL.
    *   Event listeners for the "Shorten" and "Copy" buttons.
    *   `getBaseUrl()`: a helper function that returns the base URL

## Limitations and Considerations (Important)

*   **Client-Side Only (Not Shareable):** This is the most crucial limitation. The shortened URLs are *not* shareable.  They only work within the same browser on the same machine where they were generated.  This is because the mapping between the short hash and the long URL is stored only in that browser's `localStorage`.
*   **`localStorage`:** Relies on `localStorage`, which is browser-specific and has storage limits (typically around 5MB per domain).  While this project is unlikely to hit the limit, it's a factor to consider.
*   **Hash Collisions:** While unlikely with djb2 for typical URL lengths, hash collisions (different long URLs producing the same hash) are *possible*.  A real-world URL shortener would require a mechanism to handle collisions (usually handled by the backend). This project does *not* handle collisions.
*   **Fragment Identifier (`#`):** The shortened URLs use a fragment identifier (`#hash`). This means the browser *doesn't* send the hash to the server (which is good in this case, since we don't have one!). The hash is only processed by the client-side JavaScript.
* **No real redirect:** This is a client side "redirect" and does not work like normal redirect.

## Potential Improvements (Beyond the Scope of this Project)

*   **Shareable URLs:**  This would require a *complete redesign* to include a backend server and a database.  This is a significant undertaking.
*   **More Robust URL Validation:**  Use a dedicated URL validation library for more comprehensive checks.
*   **Hash Collision Handling:**  Implement a (client-side, if possible) mechanism to detect and handle hash collisions, although this is very difficult without a backend.
*   **UI/UX Enhancements:** Improve the user interface and styling.
*   **Unit Tests:** Add unit tests for the JavaScript functions.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion for improvement (within the scope of a *client-side* project), please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.