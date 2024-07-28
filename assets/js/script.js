function pausePlayBg() {
    let video = document.getElementById("bgVideo");
    let button = document.getElementById("buttonPlayPause");
    let icon = document.getElementById("playPauseIcon");
    if (video.paused) {
        video.play();
        button.setAttribute('title', 'Pausar vídeo'); // Altera o titulo do botão
        icon.setAttribute('name', 'pause-circle'); // Altera o ícone para pausa
    } else {
        video.pause();
        button.setAttribute('title', 'Despausar vídeo'); // Altera o titulo do botão
        icon.setAttribute('name', 'play-circle'); // Altera o ícone para reprodução
    }
}

let originalStyles = [];

function contrastColors() {
    let icon = document.getElementById("contrastIcon");

    // Definir as novas cores
    const newTextColor = 'white';
    const newBackgroundColor = 'black';
    const newBorderColor = 'var(--primary-dark)';

    // Selecionar todos os elementos
    const elements = document.querySelectorAll('*');

    if (originalStyles.length === 0) {
        // Salvar estilos originais
        elements.forEach(element => {
            const originalStyle = {
                element: element,
                color: element.style.color,
                backgroundColor: element.style.backgroundColor,
                backgroundImage: element.style.backgroundImage,
                boxShadow: element.style.boxShadow,
                borderColor: element.style.borderColor
            };
            originalStyles.push(originalStyle);
        });

        // Aplicar novos estilos
        elements.forEach(element => {
            element.style.setProperty('color', newTextColor, 'important');
            element.style.setProperty('background-color', newBackgroundColor, 'important');
            element.style.setProperty('background-image', 'none', 'important');
            element.style.setProperty('box-shadow', 'none', 'important');
            element.style.setProperty('border-color', newBorderColor, 'important');
        });

        icon.setAttribute('name', 'contrast');
    } else {
        // Restaurar estilos originais
        originalStyles.forEach(originalStyle => {
            originalStyle.element.style.setProperty('color', originalStyle.color, 'important');
            originalStyle.element.style.setProperty('background-color', originalStyle.backgroundColor, 'important');
            originalStyle.element.style.setProperty('background-image', originalStyle.backgroundImage, 'important');
            originalStyle.element.style.setProperty('box-shadow', originalStyle.boxShadow, 'important');
            originalStyle.element.style.setProperty('border-color', originalStyle.borderColor, 'important');
        });
        // Limpar os estilos originais armazenados
        originalStyles = [];

        icon.setAttribute('name', 'contrast-outline');
    }
}

let show = false; // Mover a variável show para fora da função

function showHideSidebar() {
    let sidebar = document.getElementById("side-bar");
    let icon = document.getElementById("menuIcon");

    if (show) {
        sidebar.style.left = '-60px';
        icon.setAttribute('name', 'menu');
        show = false;
    } else {
        sidebar.style.left = '15px';
        icon.setAttribute('name', 'chevron-back-outline');
        show = true;
    }
}

function loadGraph() {
    const agricola = document.getElementById("radioAgro").checked;
    const pecuaria = document.getElementById("radioPecu").checked;

    const tA = 350; // R$ 300 bilhões ou 1bi (total agricultura) | 10mi = 1%
    const tP = 1600; // 1,5 bilhão de cabeças (total pecuária)

    let data1 = document.getElementById("dt1");
    let data2 = document.getElementById("dt2");
    let data3 = document.getElementById("dt3");
    let data4 = document.getElementById("dt4");
    let data5 = document.getElementById("dt5");

    let txt1 = document.getElementById("sbtt-txt-1");
    let txt2 = document.getElementById("sbtt-txt-2");
    let txt3 = document.getElementById("sbtt-txt-3");
    let txt4 = document.getElementById("sbtt-txt-4");
    let txt5 = document.getElementById("sbtt-txt-5");

    let d1 = { nA: 'Soja', vA: 345.4, uA: ' bilhões de reais', nP: 'Galináceos (Frangos)', vP: 1586, uP: ' milhões de cabeças' };
    let d2 = { nA: 'Milho (em grão)', vA: 137.7, uA: ' bilhões de reais', nP: 'Bovinos (Bois e Vacas)', vP: 234, uP: ' milhões de cabeças' };
    let d3 = { nA: 'Cana-de-açúcar', vA: 93.4, uA: ' bilhões de reais', nP: 'Suínos (Porcos)', vP: 44, uP: ' milhões de cabeças' };
    let d4 = { nA: 'Café', vA: 51.8, uA: ' bilhões de reais', nP: 'Ovinos (Ovelhas e Carneiros)', vP: 21, uP: ' milhões de cabeças' };
    let d5 = { nA: 'Algodão herbáceo', vA: 33.1, uA: ' bilhões de reais', nP: 'Codornas', vP: 14, uP: ' milhões de cabeças' };

    // (v / t) * 100 = %

    let data = [data1, data2, data3, data4, data5]
    let d = [d1, d2, d3, d4, d5];
    let t = agricola ? tA : tP;

    let txt = [txt1, txt2, txt3, txt4, txt5];
    
    for (i = 0; i <= 4; i++) {
        let v = agricola ? d[i].vA : d[i].vP;        
        data[i].style.width = ((v / t) * 100 + '%'); // grafico
        txt[i].textContent = (agricola ? d[i].nA : d[i].nP) + " - " + (agricola ? d[i].vA : d[i].vP) + (agricola ? d[i].uA : d[i].uP); // legenda
    }
}

document.addEventListener('DOMContentLoaded', loadGraph);

function toSct(id) {
    section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
}


let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    const totop = document.getElementById("boxtotop");
    const section1 = document.getElementById("home");
    const section2 = document.getElementById("sobre");
    const section3 = document.getElementById("atalhos");

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let section1Top = section1.offsetTop;
    let section1Bottom = section1Top + section1.offsetHeight;

    let section2Top = section2.offsetTop;
    let section2Bottom = section2Top + section2.offsetHeight;

    let section3Top = section3.offsetTop;
    let section3Bottom = section3Top + section3.offsetHeight;

    if ((scrollTop >= section1Top && scrollTop <= section1Bottom) || 
        (scrollTop >= section2Top && scrollTop <= section2Bottom) || 
        (scrollTop >= section3Top && scrollTop <= section3Bottom)) {
        // Se estiver em section1 ou section2, mantenha o totop oculto
        totop.classList.add("hiddenToTop");
    } else {
        if (scrollTop > lastScrollTop) {
            // Rolando para baixo
            totop.classList.add("hiddenToTop");
        } else {
            // Rolando para cima
            totop.classList.remove("hiddenToTop");
        }
    }
    lastScrollTop = scrollTop;
});

const toLink = (link) => {
    url = 'https://' + link;

    window.open(url, '_blank');
}