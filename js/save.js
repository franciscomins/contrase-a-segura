
        const passwordForm = document.getElementById("passwordForm");
        const siteNameInput = document.getElementById("siteName");
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const passwordList = document.getElementById("passwordList");

        passwordForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const siteName = siteNameInput.value;
            const username = usernameInput.value;
            const password = passwordInput.value;
            const listItem = document.createElement("li");
            listItem.textContent = `Sitio: ${siteName}, Usuario: ${username}, Contraseña: ${password}`;
            passwordList.appendChild(listItem);
            // Limpia los campos del formulario después de agregar la contraseña.
            siteNameInput.value = "";
            usernameInput.value = "";
            passwordInput.value = "";
        });
        
    