# Simple URL Shortener (No Backend)

[![Project Status](https://img.shields.io/badge/status-complete-brightgreen.svg)](https://github.com/Ishawn1/URL-short) 

This project is a simple, client-side URL shortener built with HTML, CSS, and JavaScript. It demonstrates fundamental web development concepts without requiring any server-side components or databases.  The shortened URLs are generated using the djb2 hashing algorithm and are optionally stored in the browser's `localStorage` for persistence.

**Note:** This is a *demonstration* project. Because it's entirely client-side, the shortened URLs are only valid within the user's own browser and cannot be shared with others.  It's a good exercise for learning JavaScript and string manipulation.

## Features

*   **Shorten URLs:**  Generates a short, alphanumeric hash for any given URL.
*   **Copy to Clipboard:**  Allows the user to easily copy the shortened URL.
*   **(Optional) Local Storage Persistence:** Stores the long URL and its corresponding short URL in `localStorage`, so the shortened URL can be retrieved even after the page is reloaded.
*   **Basic Error Handling:**  Checks for empty or invalid URLs.
*   **No Backend Required:**  Runs entirely in the browser.

## Technologies Used

*   **HTML:**  Structure of the web page.
*   **CSS:**  Styling and layout.
*   **JavaScript:**  Core logic, including URL shortening, clipboard interaction, and `localStorage` usage.
*   **djb2 Hashing Algorithm:**  A fast and simple hashing algorithm for generating short hashes.

## How it Works

1.  **Input:** The user enters a long URL into the input field.
2.  **Validation:**  The JavaScript checks if the input is empty or a valid URL.
3.  **(Optional) LocalStorage Lookup:** If `localStorage` is available, the script checks if a shortened URL already exists for the given long URL. If so, it's retrieved and displayed.
4.  **Hashing:** If no existing shortened URL is found, the djb2 hashing algorithm is used to generate a hash from the long URL.
5.  **Short URL Creation:**  The shortened URL is created by combining the current page's origin (e.g., `http://localhost:8000`) with a `#` and the hash.  This format (`http://example.com/#yourhash`) uses a fragment identifier.
6.  **(Optional) LocalStorage Storage:** The long URL and its corresponding short URL are stored in `localStorage`.
7.  **Display and Copy:** The shortened URL is displayed, and a button allows the user to copy it to the clipboard.
8. **Fragment routing:** The app can check the fragment of the URL (`#yourhash`) on page load to retrieve the full url

## How to Run

1.  **Clone the repository:**

    ```bash
    git clone  https://github.com/Ishawn1/URL-short
    cd your-repo-name
    ```

2.  **Open `index.html`:** Open the `index.html` file directly in your web browser.  No web server is required.

## Code Structure

*   **`index.html`:**  The main HTML file containing the structure of the web page.
*   **`style.css`:**  The CSS file for styling.
*   **`script.js`:**  The JavaScript file containing the core logic.

##  djb2 Hashing Algorithm

The djb2 hashing algorithm is a simple, fast, and widely used algorithm for generating hashes from strings. It's used in this project to create the short, alphanumeric hashes for the URLs. The code converts the resulting hash to base-36 (0-9 and a-z) for a more compact representation.

##  Limitations and Considerations

*   **Client-Side Only:** This is *not* a real-world URL shortener. The shortened URLs are only valid on the user's machine and within their browser. They cannot be shared with others.
*   **Hash Collisions:** Hash collisions (different long URLs producing the same hash) are *possible*, although unlikely with djb2 for typical URL lengths.  A real-world URL shortener would need a mechanism to handle collisions.
*   **`localStorage` Size Limits:** `localStorage` has a limited storage capacity (typically around 5MB per domain).  This project is unlikely to hit that limit, but it's something to be aware of.
*   **Modern Clipboard API:** This code uses the older `document.execCommand('copy')` method for copying to the clipboard. A more modern approach is to use the `navigator.clipboard.writeText()` API, but it requires an HTTPS connection (which is not needed for this local project).

## Potential Improvements

*   **More Robust URL Validation:** Use a dedicated URL validation library for more comprehensive checks.
*   **Hash Collision Handling:**  Implement a (client-side, if possible) mechanism to detect and handle hash collisions.  This could involve adding a salt to the hash.  (This would be a challenging improvement without a backend.)
*   **Clipboard API Upgrade:**  Use `navigator.clipboard.writeText()` with appropriate fallback and error handling for browsers that don't support it.
*   **UI Enhancements:**  Improve the user interface and styling.
*   **Unit Tests:** Add unit tests for the `shortenURL` and `djb2Hash` functions using a JavaScript testing framework (like Jest).

## Contributing

Contributions are welcome!  If you find a bug or have an improvement, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. (You should create a `LICENSE` file and put the MIT license text in it)