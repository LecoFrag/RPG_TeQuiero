document.addEventListener('DOMContentLoaded', () => {
    // Referências do DOM
    const loginScreen = document.getElementById('login-screen');
    const desktop = document.getElementById('desktop');
    const passwordInput = document.getElementById('password-input');
    const loginBtn = document.getElementById('login-btn');
    const errorMsg = document.getElementById('error-msg');
    const netrunnerBypass = document.getElementById('netrunner-bypass');
    const clock = document.getElementById('clock');
    
    // 1. Relógio em Tempo Real
    setInterval(() => {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }, 1000);

    // 2. Sistema de Login
    function attemptLogin() {
        const pass = passwordInput.value.toUpperCase(); // Converte pra maiúscula pra evitar erro
        // Senhas aceitas: ADMIN123, KOVIC, CARLA, NEON
        if (pass === 'ADMIN123' || pass === 'KOVIC' || pass === 'CARLA' || pass === 'NEON') {
            enterSystem();
        } else {
            errorMsg.classList.remove('hidden');
            passwordInput.value = '';
            setTimeout(() => errorMsg.classList.add('hidden'), 2000);
        }
    }

    function enterSystem() {
        loginScreen.style.display = 'none';
        desktop.classList.remove('hidden');
    }

    loginBtn.addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') attemptLogin();
    });

    // Atalho do Mestre/Netrunner
    netrunnerBypass.addEventListener('click', () => {
        netrunnerBypass.innerText = "BYPASSING FIREWALL... [NETRUNNER: ROLE INTERFACE]";
        netrunnerBypass.style.color = "#00ff00";
        setTimeout(enterSystem, 1500); // 1.5s de drama
    });

    // 3. Gerenciamento de Janelas
    window.openWindow = function(windowName) {
        // Fecha todas as janelas primeiro para limpar a tela
        document.querySelectorAll('.window').forEach(w => w.classList.add('hidden'));
        
        // Abre a janela desejada
        const target = document.getElementById(`window-${windowName}`);
        if(target) target.classList.remove('hidden');
    }

    window.closeWindow = function(windowName) {
        const target = document.getElementById(`window-${windowName}`);
        if(target) target.classList.add('hidden');
    }

    // 4. Lógica do Processo Seletivo (Casting)
    window.openProfile = function(imgName, candidateName) {
        // Define o título da janela de visualização
        const title = document.getElementById('profile-title');
        title.innerText = "FILE: " + candidateName;

        // Carrega a imagem
        const img = document.getElementById('profile-img');
        img.src = imgName + ".jpg"; // Ex: candidate1.jpg

        // Abre a janela de visualização
        const viewer = document.getElementById('window-profile-viewer');
        viewer.classList.remove('hidden');
    }

    // 5. Mecânica de "Hacking" da Porta
    window.triggerOverride = function() {
        const btn = document.getElementById('override-btn');
        const bar = document.getElementById('hacking-progress-bar');
        const fill = document.getElementById('progress-fill');
        const status = document.getElementById('override-status');

        if(btn.disabled) return; // Evita clique duplo

        btn.disabled = true;
        btn.innerText = "EXECUTANDO OVERRIDE DE PROTOCOLO...";
        bar.classList.remove('hidden');

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 8; // Velocidade aleatória
            if (progress > 100) progress = 100;
            fill.style.width = `${progress}%`;

            if (progress === 100) {
                clearInterval(interval);
                status.classList.remove('hidden');
                btn.innerText = "OVERRIDE COMPLETO";
                btn.style.borderColor = "#00ff00";
                btn.style.color = "#00ff00";
                // Momento narrativo: A porta se abre no VTT!
            }
        }, 150); // Atualiza a cada 150ms
    }
});