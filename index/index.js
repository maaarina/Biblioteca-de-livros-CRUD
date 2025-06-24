document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("book-form");
    const titleInput = document.getElementById("add-title");
    const authorInput = document.getElementById("add-autor");
    const resumoInput = document.getElementById("add-resumo");
    const bookList = document.getElementById("book-list");

    let savedBooks = JSON.parse(localStorage.getItem("livros")) || [];

    //
    savedBooks.forEach(book => renderBook(book));

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const book = {
            title: titleInput.value.trim(),
            author: authorInput.value.trim(),
            resumo: resumoInput.value.trim()
        };

        if (!book.title || !book.author || !book.resumo) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        renderBook(book);
        savedBooks.push(book);
        localStorage.setItem("livros", JSON.stringify(savedBooks));

        form.reset();
    });

    function renderBook({ title, author, resumo }) {
        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Autor:</strong> ${author}</p>
            <p><strong>Resumo:</strong> ${resumo}</p>
            <button class="remove-button">Remover</button>
        `;

        const removeButton = card.querySelector(".remove-button");
        removeButton.addEventListener("click", () => {
            card.remove();

            // Atualizar a lista removendo esse livro
            savedBooks = savedBooks.filter(
                book => !(book.title === title && book.author === author && book.resumo === resumo)
            );

            localStorage.setItem("livros", JSON.stringify(savedBooks));
        });

        bookList.appendChild(card);
    }
});
