document.addEventListener('DOMContentLoaded', function () {
    // Função para alternar entre modos claro e escuro
    var color = "white";
    window.toggleMode = function () {
        document.body.classList.toggle('light-mode');
        const modeIcon = document.getElementById('mode-icon');
        const circleOverlay = document.getElementById('circle-overlay');

        if (document.body.classList.contains('light-mode')) {
            modeIcon.textContent = '☾';
            color = "black";
            circleOverlay.style.backgroundColor = "#f4f4f4"; // Cor do fundo claro
        } else {
            modeIcon.textContent = '☼';
            color = "white";
            circleOverlay.style.backgroundColor = "#121212"; // Cor do fundo escuro
        }

        // Ativa a animação
        circleOverlay.classList.add('active');

        // Remove a classe após a animação para permitir repetir a animação
        setTimeout(() => {
            circleOverlay.classList.remove('active');
        }, 500); // O tempo deve corresponder à duração da animação
    };

    // Função para alternar o idioma do site
    window.toggleLanguage = function () {
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(el => {
            const enText = el.getAttribute('data-en');
            if (el.textContent === enText) {
                el.textContent = el.getAttribute('data-pt');
            } else {
                el.setAttribute('data-pt', el.textContent);
                el.textContent = enText;
            }
        });
    };

    // Código para o fundo animado
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 2000;

    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        stars.push({ x, y, radius });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color;
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function animate() {
        draw();
        stars.forEach(star => {
            star.x -= Math.random() * 0.2;
            if (star.x < 0) {
                star.x = canvas.width;
            }
        });
        requestAnimationFrame(animate);
    }

    animate();

    // Função para alternar o menu dropdown no modo responsivo
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', function () {
        if (dropdownMenu.style.display === 'flex') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'flex';
        }
    });

    // Adiciona rolagem suave ao clicar nos itens do menu
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show the button when the user scrolls down 100px from the top
window.onscroll = function() {
    const button = document.getElementById('back-to-top');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
};
