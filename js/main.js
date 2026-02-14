document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("not-loaded");

    // ==========================================
    // 1. VARIÁVEIS E ELEMENTOS
    // ==========================================
    const envelope = document.getElementById('envelope');
    const cardWrapper = document.querySelector('.card-wrapper');
    const letter = document.getElementById('letter');
    const messageArea = document.getElementById('message-area');
    const pokeContainer = document.getElementById('poke-container');
    const pokeCard = document.getElementById('poke-card');
    const glare = document.querySelector('.glare');
    const garden = document.querySelector('.garden');
    const catWrapper = document.querySelector('.cat-wrapper');

    let isOpen = false;
    let messageIndex = 0;

    // ==========================================
    // 2. CONTEÚDO DA CARTA (Carrossel)
    // ==========================================
    const content = [
        { type: 'text', text: 'Oi, meu amor! ❤️<br>(Toque para continuar)' },
        { type: 'text', text: 'Feliz São valetim meu grande amor' },
        { type: 'text', text: 'Preparei este jardim<br>especialmente para você princesa...' },
        { type: 'text', text: 'Para mostrar meu amor por voce' },
        { type: 'text', text: 'O grande amor da minha vida' },
        // Use suas fotos aqui
        { type: 'image', src: './img/presente6.jpeg' }, 
        { type: 'text', text: 'Desde que voce chegou minha vida mudou totalmente' },
        { type: 'text', text: 'Voce me faz feliz todos os dias' },
        { type: 'text', text: 'Me faz querer sempre ser um homem melhor' },
        { type: 'text', text: 'Voce se tornou minha vida princesa' },
        { type: 'image', src: './img/presente4.jpeg' },
        { type: 'text', text: 'Obrigado por tanta coisa amor' },
        { type: 'text', text: 'Eu sempre vou cuidar de voce minha princesa' },
        { type: 'text', text: 'Espero que voce tenha gostado dessa pequena e humilde surpresa!' },
        { type: 'text', text: 'Eu te amo minha princesaaaa' },
        // A MENSAGEM FINAL QUE ATIVA A CARTA
        { type: 'text', text: 'Mas espere...<br>Tenho um presente RARO para você!<br><b>(Toque aqui)</b>', isFinal: true }
    ];

    // ==========================================
    // 3. INTERAÇÃO DO ENVELOPE
    // ==========================================
    envelope.addEventListener('click', () => {
        if (!isOpen) {
            envelope.classList.add('open');
            isOpen = true;
        }
    });

    letter.addEventListener('click', (e) => {
        if (!isOpen) return;
        e.stopPropagation();

        // Se for a mensagem final, ativa a surpresa
        if (content[messageIndex].isFinal) {
            ativarModoPokemon();
            return;
        }

        // Próxima mensagem
        messageIndex++;
        if (messageIndex >= content.length) {
            messageIndex = 0; 
        }

        // Transição de texto
        messageArea.style.opacity = 0;
        setTimeout(() => {
            const item = content[messageIndex];
            if (item.type === 'text') {
                messageArea.innerHTML = item.text;
            } else if (item.type === 'image') {
                messageArea.innerHTML = `<img src="${item.src}" style="width:85%; height:120px; object-fit:cover; border-radius:5px; border:3px solid white;">`;
            }
            messageArea.style.opacity = 1;
        }, 300);
    });

    // ==========================================
    // 4. MODO POKÉMON (SURPRESA)
    // ==========================================
    function ativarModoPokemon() {
        // 1. Esconde o envelope, o jardim e o gato
        cardWrapper.style.transition = "opacity 1s, transform 1s";
        cardWrapper.style.opacity = "0";
        cardWrapper.style.transform = "translate(-50%, -50%) scale(0)"; // Some encolhendo
        
        garden.style.transition = "opacity 1s";
        garden.style.opacity = "0";
        
        catWrapper.style.transition = "opacity 1s";
        catWrapper.style.opacity = "0";

        // 2. Mostra a carta Pokémon
        setTimeout(() => {
            pokeContainer.classList.add('active');
            
            // Pequena animação de "Pop" ao aparecer
            pokeCard.style.transform = "scale(0.5)";
            setTimeout(() => {
                pokeCard.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                pokeCard.style.transform = "scale(1)";
            }, 100);
        }, 800);
    }

    // ==========================================
    // 5. EFEITO 3D NA CARTA POKÉMON + BRILHO HOLO
    // ==========================================
    document.addEventListener('mousemove', (e) => rotateCard(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
        rotateCard(e.touches[0].clientX, e.touches[0].clientY);
    });

    function rotateCard(x, y) {
        if (!pokeContainer.classList.contains('active')) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Calcula posição relativa (-1 a 1) para rotação 3D
        const xVal = (x - width / 2) / (width / 2); 
        const yVal = (y - height / 2) / (height / 2);

        // --- CÁLCULO PARA O BRILHO HOLOGRÁFICO (NOVO) ---
        // Converte a posição do mouse em porcentagem (0% a 100%)
        // Multiplicamos para o brilho se mover mais rápido que o mouse
        const holoX = 50 + (xVal * 50); 
        const holoY = 50 + (yVal * 50);

        // Aplica rotação 3D
        const yRotation = 20 * xVal; 
        const xRotation = -20 * yVal; 
        
        pokeCard.style.transition = "none"; 
        pokeCard.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1)`;

        // Aplica a posição do brilho nas variáveis CSS
        pokeCard.style.setProperty('--bg-x', `${holoX}%`);
        pokeCard.style.setProperty('--bg-y', `${holoY}%`);
    }

    // Reset quando solta
    document.addEventListener('mouseleave', resetCard);
    document.addEventListener('touchend', resetCard);

    function resetCard() {
        if (!pokeContainer.classList.contains('active')) return;
        pokeCard.style.transition = "transform 0.5s ease";
        pokeCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        
        // O brilho volta pro centro devagar
        pokeCard.style.setProperty('--bg-x', `50%`);
        pokeCard.style.setProperty('--bg-y', `50%`);
    }
    // Reset quando solta
    document.addEventListener('mouseleave', resetCard);
    document.addEventListener('touchend', resetCard);

    function resetCard() {
        if (!pokeContainer.classList.contains('active')) return;
        pokeCard.style.transition = "transform 0.5s ease";
        pokeCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        
        // O brilho volta pro centro devagar
        pokeCard.style.setProperty('--bg-x', `50%`);
        pokeCard.style.setProperty('--bg-y', `50%`);
    }

    // Quando tirar o mouse/dedo, volta ao centro suavemente
    document.addEventListener('mouseleave', resetCard);
    document.addEventListener('touchend', resetCard);

    function resetCard() {
        if (!pokeContainer.classList.contains('active')) return;
        pokeCard.style.transition = "transform 0.5s ease";
        pokeCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        glare.style.opacity = "0";
    }

    // ==========================================
    // 6. LÓGICA DO GATINHO (MANTIDA)
    // ==========================================
    const backImg = document.querySelector(".back-img");
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    function startDrag(e) {
        if (e.type === 'touchstart') e.preventDefault();
        isDragging = true;
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        startX = clientX;
        startY = clientY;
        initialLeft = backImg.offsetLeft;
        initialTop = backImg.offsetTop;
        backImg.style.cursor = "grabbing";
        backImg.style.zIndex = "1000"; 
    }

    function drag(e) {
        if (!isDragging) return;
        if (e.type === 'touchmove') e.preventDefault();
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        backImg.style.left = `${initialLeft + deltaX}px`;
        backImg.style.top = `${initialTop + deltaY}px`;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        backImg.style.cursor = "grab";
    }

    backImg.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);
    backImg.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", endDrag);
});