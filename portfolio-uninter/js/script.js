document.addEventListener('DOMContentLoaded', () => {

    // --- Funcionalidade 1: Alternar Tema (Claro/Escuro) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // NOVO: Verifica o tema salvo no localStorage assim que a página carrega
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // NOVO: Salva a preferência do usuário no localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });


    // --- Funcionalidade 2: Validação do Formulário de Contato (sem alterações) ---
    const contactForm = document.getElementById('contact-form');
    // Verifica se o formulário existe na página atual antes de adicionar o listener
    if (contactForm) {
        const messageContainer = document.getElementById('message-container');

        const showMessage = (message, isSuccess = false) => {
            messageContainer.textContent = message;
            messageContainer.style.display = 'block';

            if (isSuccess) {
                messageContainer.style.backgroundColor = 'rgba(212, 237, 218, 0.8)';
                messageContainer.style.color = '#155724';
            } else {
                messageContainer.style.backgroundColor = 'rgba(248, 215, 218, 0.8)';
                messageContainer.style.color = '#721c24';
            }
        };

        const hideMessage = () => {
            messageContainer.style.display = 'none';
        };

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            hideMessage();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (nome === '' || email === '' || mensagem === '') {
                showMessage('Por favor, preencha todos os campos.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            showMessage('Mensagem enviada com sucesso!', true);
            contactForm.reset();

            setTimeout(() => {
                hideMessage();
            }, 4000);
        });
    }
});
