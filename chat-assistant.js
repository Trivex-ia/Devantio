(function () {
  const toggle = document.getElementById('chatToggle');
  const toggleIcon = document.getElementById('chatToggleIcon');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const quick = document.getElementById('chatQuick');

  if (!toggle || !panel) return;

  const RULES = [
    {
      keywords: ['bonjour', 'salut', 'hello', 'coucou', 'hey', 'bonsoir'],
      reply: "Salut 👋 Je suis l'assistant Devantio. Posez-moi une question sur nos services, nos tarifs ou nos délais, ou cliquez sur une suggestion ci-dessous !"
    },
    {
      keywords: ['prix', 'tarif', 'cout', 'coute', 'combien coute', 'budget', 'cher'],
      reply: "Les tarifs sont adaptés à chaque commerce, pas de prix figé ici. Le plus simple : remplissez le formulaire de contact, on vous envoie un devis clair et sans surprise, gratuitement."
    },
    {
      keywords: ['service', 'propose', 'offre'],
      reply: "On propose 3 choses : 🌐 un site web vitrine, 📱 un menu en QR code, et 📈 un coup de pouce réseaux sociaux. Le détail est juste au-dessus, dans la section \"Ce qu'on propose\"."
    },
    {
      keywords: ['delai', 'temps', 'rapide', 'vite', 'jours', 'longtemps'],
      reply: "En général, quelques jours suffisent pour un site vitrine ou un menu QR code, selon les photos et infos que vous nous donnez."
    },
    {
      keywords: ['contact', 'email', 'mail', 'telephone', 'joindre', 'appeler', 'ecrire'],
      reply: "Le plus simple : remplissez le formulaire juste en dessous ⬇️ dans la section Contact, on revient vers vous rapidement."
    },
    {
      keywords: ['qr', 'menu', 'carte'],
      reply: "Le menu QR code, c'est votre carte accessible par simple scan, modifiable en quelques clics dès que vos prix changent — plus besoin de réimprimer !"
    },
    {
      keywords: ['instagram', 'reseaux', 'facebook', 'tiktok', 'social'],
      reply: "On peut vous aider à lancer ou relancer votre présence Instagram/Facebook, avec du contenu adapté à votre commerce."
    },
    {
      keywords: ['qui', 'equipe', 'emf', 'etudiant', 'eleve', 'ecole'],
      reply: "On est une équipe d'élèves de l'EMF Fribourg qui monte cette agence digitale comme un vrai projet — sérieux, motivés, et basés à Fribourg 📍"
    },
    {
      keywords: ['merci', 'top', 'super', 'cool', 'genial'],
      reply: "Avec plaisir 😊 N'hésitez pas si vous avez d'autres questions !"
    }
  ];

  const FALLBACK = "Je ne suis pas sûr de pouvoir répondre précisément à ça 🤔 Le plus simple : remplissez le formulaire de contact juste en dessous, un vrai humain vous répondra vite !";

  function normalize(str) {
    return str
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase();
  }

  function findReply(text) {
    const n = normalize(text);
    for (const rule of RULES) {
      if (rule.keywords.some((k) => n.includes(k))) return rule.reply;
    }
    return FALLBACK;
  }

  function addMessage(text, who) {
    const el = document.createElement('div');
    el.className = 'chat-msg ' + who;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'chat-msg bot typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function respond(userText) {
    addMessage(userText, 'user');
    const typingEl = showTyping();
    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      typingEl.remove();
      addMessage(findReply(userText), 'bot');
    }, delay);
  }

  let started = false;
  function openChat() {
    panel.hidden = false;
    toggleIcon.textContent = '✕';
    if (!started) {
      started = true;
      showTyping();
      setTimeout(() => {
        messages.innerHTML = '';
        addMessage("Salut 👋 Je suis l'assistant Devantio. Posez-moi une question sur nos services, nos tarifs ou nos délais, ou cliquez sur une suggestion ci-dessous !", 'bot');
      }, 500);
    }
    input.focus();
  }
  function closeChat() {
    panel.hidden = true;
    toggleIcon.textContent = '💬';
  }

  toggle.addEventListener('click', () => {
    if (panel.hidden) openChat();
    else closeChat();
  });
  closeBtn.addEventListener('click', closeChat);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    respond(text);
  });

  quick.addEventListener('click', (e) => {
    if (!e.target.classList.contains('chip')) return;
    respond(e.target.textContent);
  });
})();
