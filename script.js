document.addEventListener('DOMContentLoaded', function () {
    // Função para alternar entre modos claro e escuro
    window.toggleMode = function () {
        document.body.classList.toggle('light-mode');
        const modeIcon = document.getElementById('mode-icon');
        if (document.body.classList.contains('light-mode')) {
            modeIcon.textContent = '☾';
            String = 'black';
        } else {
            modeIcon.textContent = '☼';
            String = 'white';
        }
    };



    // Código para o fundo animado
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');
    var String = 'white';

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
        ctx.fillStyle = String;
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function animate() {
        draw();
        stars.forEach(star => {
            star.x -= Math.random();
            if (star.x < 0) {
                star.x = canvas.width;
            }
        });
        requestAnimationFrame(animate);
    }

    animate();
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
