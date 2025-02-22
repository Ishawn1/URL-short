document.addEventListener('DOMContentLoaded', () => {
    const longUrlInput = document.getElementById('longUrl');
    const shortenBtn = document.getElementById('shortenBtn');
    const resultDiv = document.getElementById('result');
    const shortUrlInput = document.getElementById('shortUrl');
    const copyBtn = document.getElementById('copyBtn');
    const copyMessage = document.getElementById('copyMessage');
    const errorMessage = document.getElementById('errorMessage');

    // --- Helper function to get the base URL consistently ---
    function getBaseUrl() {
        let baseUrl = window.location.origin;
        // Ensure no trailing slash on the base URL
        if (baseUrl.endsWith('/')) {
            baseUrl = baseUrl.slice(0, -1);
        }
        return baseUrl;
    }


    // --- Function to handle the hash on page load ---
    function handleHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const baseUrl = getBaseUrl(); // Use the helper function
            const expectedShortUrl = `${baseUrl}/#${hash}`; // Construct expected short URL

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);

                if (value === expectedShortUrl) { // Use strict equality
                    window.location.href = key;
                    return;
                }
            }
            errorMessage.textContent = "Shortened URL not found.";
        }
    }

    handleHash();

    shortenBtn.addEventListener('click', () => {
        const longUrl = longUrlInput.value;
        errorMessage.textContent = '';

        if (!longUrl) {
            errorMessage.textContent = "Please enter a URL.";
            return;
        }

        try {
            new URL(longUrl);
        } catch (_) {
            errorMessage.textContent = "Invalid URL. Please enter a valid URL, including the protocol (e.g., https://).";
            return;
        }

        const shortUrl = shortenURL(longUrl);
        shortUrlInput.value = shortUrl;
        resultDiv.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        shortUrlInput.select();
        document.execCommand('copy');

        copyMessage.classList.remove('hidden');
        setTimeout(() => {
            copyMessage.classList.add('hidden');
        }, 2000);
    });

    function shortenURL(longUrl) {
        const storedShortUrl = localStorage.getItem(longUrl);
        if (storedShortUrl) {
            return storedShortUrl;
        }

        const hash = djb2Hash(longUrl);
        const baseUrl = getBaseUrl(); // Use the helper function
        const shortUrl = `${baseUrl}/#${hash}`;
        localStorage.setItem(longUrl, shortUrl);
        return shortUrl;
    }

    function djb2Hash(str) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        return hash.toString(36);
    }
});