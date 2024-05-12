     // Load icons from local storage when the page loads
     window.addEventListener('load', function() {
        var savedIcons = JSON.parse(localStorage.getItem('icons'));
        if (savedIcons) {
            var linkIconsContainer = document.getElementById('linkIcons');
            savedIcons.forEach(function(icon) {
                addLinkIcon(icon.name, icon.link, icon.img);
            });
        }
    });

    document.getElementById('customLinkForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var websiteName = document.getElementById('websiteName').value;
        var websiteLink = document.getElementById('websiteLink').value;
        if (websiteName && websiteLink) {
            addLinkIcon(websiteName, websiteLink, 'img/link.png');

            // Save the icon to local storage
            var savedIcons = JSON.parse(localStorage.getItem('icons')) || [];
            savedIcons.push({ name: websiteName, link: websiteLink, img: 'img/link.png' });
            localStorage.setItem('icons', JSON.stringify(savedIcons));

            document.getElementById('websiteName').value = '';
            document.getElementById('websiteLink').value = '';
        } else {
            alert('Please enter both website name and link.');
        }
    });

    function addLinkIcon(name, link, imgSrc) {
        var linkIconsContainer = document.getElementById('linkIcons');
        var linkIcon = document.createElement('div');
        linkIcon.className = 'link-icon';
        linkIcon.innerHTML = `
            <a href="${link}" target="_blank">
                <img src="${imgSrc}" alt="${name}">
                <span class="delete-icon" onclick="deleteLink(this)">&times;</span>
            </a>
            <p>${name}</p>
        `;
        linkIconsContainer.appendChild(linkIcon);
    }

    function deleteLink(deleteBtn) {
        // Stop event propagation to prevent opening the link
        event.stopPropagation();
    
        var linkIcon = deleteBtn.parentNode.parentNode;
        var linkName = linkIcon.querySelector('p').textContent;
        var savedIcons = JSON.parse(localStorage.getItem('icons')) || [];
        var updatedIcons = savedIcons.filter(function(icon) {
            return icon.name !== linkName;
        });
        localStorage.setItem('icons', JSON.stringify(updatedIcons));
        linkIcon.remove();
    }



// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardWebsite = card.querySelector('.card-title').innerText.toLowerCase();
        const cardUsername = card.querySelector('.card-text').innerText.toLowerCase();
        if (cardWebsite.includes(searchInput) || cardUsername.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

       // Mapping of website names to their logos
        const websiteLogos = {
            "youtube": "img/icons8-youtube-48.png",
            "instagram": "img/icons8-instagram-48.png",
            "facebook": "img/icons8-facebook-48.png",
            "snapchat": "img/snapchat.jpeg",
            "whatsapp": "img/whatapp logo.jpeg",
            "x": "img/xlogo.jpeg",
            "google": "img/google.jpeg",
            "microsoft": "img/logo.png",

            // Add more mappings as needed
        };

        // Function to get the logo URL based on the website name
        const getWebsiteLogo = (websiteName) => {
            // Convert website name to lowercase for case-insensitive matching
            const lowercaseName = websiteName.toLowerCase();
            // Check if the website name exists in the mapping
            if (lowercaseName in websiteLogos) {
                return websiteLogos[lowercaseName];
            } else {
                // If no logo is found, return a default logo
                return "img/WhatsApp_Image_2024-04-02_at_23.33.54_a3b612e2-removebg-preview.ico";
            }
        };

        // Event listener for generate password button click
        document.getElementById('generatePasswordBtn').addEventListener('click', () => {
            const strength = document.getElementById('passwordStrength').value;
            const generatedPassword = generatePassword(strength);
            displayGeneratedPassword(generatedPassword);
        });

        // Function to generate a random password based on strength
        const generatePassword = (strength) => {
            let password = '';
            const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
            const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';
            const symbols = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

            let allowedChars = '';
            if (strength === 'weak') {
                allowedChars = lowerCase + upperCase;
            } else if (strength === 'medium') {
                allowedChars = lowerCase + upperCase + numbers;
            } else if (strength === 'strong') {
                allowedChars = lowerCase + upperCase + numbers + symbols;
            }

            for (let i = 0; i < 10; i++) {
                password += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
            }

            return password;
        };

        // Event listener for copy generated password button click
        document.getElementById('copyGeneratedPasswordBtn').addEventListener('click', () => {
            const displayedPassword = document.getElementById('displayedPassword').value;
            navigator.clipboard.writeText(displayedPassword).then(
                () => {
                    alert("Password copied to clipboard");
                },
                () => {
                    alert("Clipboard copying failed");
                }
            );
        });

        // Event listener for hide generated password button click
        document.getElementById('hideGeneratedPasswordBtn').addEventListener('click', () => {
            document.getElementById('passwordDisplay').style.display = 'none';
        });

        // Function to display generated password
        const displayGeneratedPassword = (password) => {
            document.getElementById('displayedPassword').value = password;
            document.getElementById('passwordDisplay').style.display = 'block';
        };

        // Masking function to hide password characters
        function maskPassword(pass) {
            let str = "";
            for (let index = 0; index < pass.length; index++) {
                str += "*";
            }
            return str;
        }

        // Function to copy text to clipboard
        function copyText(txt) {
            navigator.clipboard.writeText(txt).then(
                () => {
                    alert("Text copied to clipboard");
                },
                () => {
                    alert("Clipboard copying failed");
                }
            );
        }

        // Function to delete a password entry
        const deletePassword = (id) => {
            console.log("Deleting password entry with ID:", id); // Debugging statement
            let data = localStorage.getItem("passwords");
            let arr = JSON.parse(data);
            arr = arr.filter((entry, index) => index !== id); // Filter based on entry id
            localStorage.setItem("passwords", JSON.stringify(arr));
            alert(`Successfully deleted password entry`);
            showPasswords();
        };

        // Function to copy username to clipboard
        const copyUsername = (username) => {
            copyText(username);
        };

        // Function to copy password to clipboard
        const copyPassword = (password) => {
            copyText(password);
        };

        // Function to create HTML for a password card
        const createCard = (website, username, password, id) => {
            const logoUrl = getWebsiteLogo(website);
            return `
            <div class="col-md-4 mb-4 card-animation" style="animation: fadeIn 0.5s;">
                <div class="card">
                    <div class="card-body">
                        <img src="${logoUrl}" class="card-img-top logo-img" alt="${website}">
                        <h5 class="card-title">${website}</h5>
                        <p class="card-text">Username: ${username} <button class="btn btn-secondary copy-btn" onclick="copyUsername('${username}')">Copy</button></p>
                        <p class="card-text">Password: ${maskPassword(password)} <button class="btn btn-secondary copy-btn" onclick="copyPassword('${password}')">Copy</button></p>
                        <button class="btn btn-danger" onclick="deletePassword(${id})">Delete</button>
                    </div>
                </div>
            </div>`;
        };

        // Function to display all saved passwords
        const showPasswords = () => {
            let passwordCards = document.getElementById("passwordCards");
            let data = localStorage.getItem("passwords");
            if (data == null || JSON.parse(data).length == 0) {
                passwordCards.innerHTML = `
                    <div class="col-md-4 mb-4 card-animation" style="animation: fadeIn 0.5s;">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">No passwords saved</h5>
                            </div>
                        </div>
                    </div>`;
            } else {
                passwordCards.innerHTML = "";
                let arr = JSON.parse(data);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    passwordCards.innerHTML += createCard(element.website, element.username, element.password, index);
                }
            }
            document.getElementById("passwordForm").reset();
        };

        // Event listener for form submission
        document.getElementById("passwordForm").addEventListener("submit", (e) => {
            e.preventDefault();
            let website = document.getElementById("website").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            let passwords = localStorage.getItem("passwords");
            if (passwords == null) {
                let json = [];
                json.push({ website: website, username: username, password: password });
                alert("Password Saved");
                localStorage.setItem("passwords", JSON.stringify(json));
            } else {
                let json = JSON.parse(passwords);
                json.push({ website: website, username: username, password: password });
                alert("Password Saved");
                localStorage.setItem("passwords", JSON.stringify(json));
            }
            showPasswords();
        });

        // Display saved passwords when the page loads
        showPasswords();