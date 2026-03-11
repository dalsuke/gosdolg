import { useState, useEffect, useRef } from 'react';
import './index.css';

// --- STABLE HOOKS ---
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if(e.isIntersecting) { 
        setActive(true); 
        obs.unobserve(e.target); 
      } 
    }, {threshold: 0.1});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, className: active ? 'active' : '' };
}

// --- COMPONENTS ---
const Logo = () => (
  <a href="/" className="logo">
    <div className="logo-symbol">
      <div style={{ width: '12px', height: '12px', background: '#fff', borderRadius: '3px' }}></div>
    </div>
    <div className="logo-text">ProLegal</div>
  </a>
);

function Header({ onAuth }: { onAuth: () => void }) {
  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo />
        <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <a href="#team" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Команда</a>
          <a href="#how" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Технология</a>
          <a href="#calc" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Расчет</a>
          <button className="btn btn-outline" style={{ padding: '10px 24px', fontSize: '0.9rem' }} onClick={onAuth}>Кабинет</button>
          <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>Консультация</button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const reveal = useReveal();
  return (
    <section className="hero section">
      <div className="container grid grid-cols-2" style={{ alignItems: 'flex-start', gap: '120px' }}>
        <div ref={reveal.ref} className={`reveal ${reveal.className} fade-left`}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--text-dim)', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', background: '#3B82F6', borderRadius: '50%' }}></span>
            ELITE LEGAL SOLUTIONS 2025
          </div>
          <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '24px', whiteSpace: 'nowrap' }}>
            Свобода от долгов. <br/>
            <span style={{ color: 'var(--text-dim)', fontSize: '2.5rem', fontWeight: 600 }}>Законно&nbsp; и&nbsp; быстро.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-dim)', marginBottom: '48px', maxWidth: '500px', lineHeight: 1.7 }}>
            Профессиональная юридическая платформа для полного обнуления ваших долговых обязательств в Москве. Гарантия результата по договору.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button className="btn btn-primary">Начать списание</button>
            <a href="#how" className="btn btn-outline" style={{ textDecoration: 'none' }}>О технологии</a>
          </div>
        </div>
        
        <div className="reveal active">
          <div className="bento-card" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', padding: '56px' }}>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '12px', letterSpacing: '-0.04em' }}>Анализ дела</h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: '32px' }}>Узнайте свои шансы за 1 минуту</p>
            <form onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Ваше имя" className="form-input-premium" required />
              <input type="tel" placeholder="Телефон" className="form-input-premium" required />
              <button className="btn btn-primary" style={{ width: '100%', borderRadius: '16px', marginTop: '8px' }}>Получить результат</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const reveal = useReveal();
  const members = [
    {
      name: 'Александр Волков',
      role: 'Основатель / Ведущий юрист',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
      desc: '15+ лет опыта в банкротстве. Лично сопроводил более 2000 успешных дел.'
    },
    {
      name: 'Мария Соколова',
      role: 'Арбитражный управляющий',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
      desc: 'Эксперт по защите имущества. Разрабатывает стратегии сохранения активов любой сложности.'
    },
    {
      name: 'Дмитрий Орлов',
      role: 'Head of Legal Tech',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
      desc: 'Архитектор AI-платформы анализа дел. Делает процесс списания прозрачным и быстрым.'
    }
  ];

  return (
    <section id="team" className="section">
      <div className="container">
        <div ref={reveal.ref} className={`reveal ${reveal.className}`}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '80px' }}>Команда защиты</h2>
          <div className="grid grid-cols-3">
            {members.map((m, i) => (
              <div key={i} className="bento-card team-card">
                <div className="team-image-wrapper">
                  <img src={m.image} alt={m.name} className="team-image" />
                </div>
                <div className="team-info">
                  <div className="team-role">{m.role}</div>
                  <h3 className="team-name">{m.name}</h3>
                  <p className="team-desc">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const reveal = useReveal();
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div ref={reveal.ref} className={`reveal ${reveal.className} grid grid-cols-3`} style={{ gap: '24px' }}>
          {[
            { v: '2.4B', l: 'Списано долгов (₽)' },
            { v: '15k+', l: 'Успешных дел' },
            { v: '99%', l: 'Гарантия успеха' }
          ].map((s, i) => (
            <div key={i} className="bento-card" style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '4rem', fontWeight: 900, background: 'linear-gradient(135deg, #3B82F6, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.v}</div>
              <div style={{ color: 'var(--text-dim)', fontWeight: 600, fontSize: '1rem', marginTop: '8px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const [debt, setDebt] = useState(1500000);
  const reveal = useReveal();
  return (
    <section id="calc" className="section">
      <div className="container">
        <div ref={reveal.ref} className={`reveal ${reveal.className}`}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="section-title" style={{ fontSize: '3.5rem' }}>Калькулятор</h2>
          </div>
          <div className="bento-card" style={{ padding: '80px' }}>
            <div className="grid grid-cols-2" style={{ gap: '100px', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginBottom: '12px' }}>Ваша сумма задолженности:</div>
                <div style={{ fontSize: '5rem', fontWeight: 900 }}>
                  {debt.toLocaleString()} <span style={{ color: '#3B82F6' }}>₽</span>
                </div>
                <input type="range" min="100000" max="5000000" step="50000" value={debt} onChange={e => setDebt(parseInt(e.target.value))} className="slider" />
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '64px', borderRadius: '40px', border: '1px solid rgba(59, 130, 246, 0.2)', textAlign: 'center' }}>
                <div style={{ color: '#10B981', fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px' }}>100% Шанс</div>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '32px' }}>Вы имеете полное право на списание {debt.toLocaleString()} ₽</p>
                <button className="btn btn-primary" style={{ width: '100%' }}>Начать списание</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Support() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Здравствуйте! Я юрист ProLegal. Чем я могу помочь?', type: 'support' }]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; 
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, type: 'user' }];
    setMessages(newMessages);
    setInput('');
    setTimeout(() => {
      setMessages([...newMessages, { text: 'Принято. Ожидайте ответа специалиста.', type: 'support' }]);
    }, 800);
  };

  return (
    <>
      <div className="floating-messengers" style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 2000 }}>
        <button className="msg-btn" style={{ background: '#3B82F6', color: 'white', width: '70px', height: '70px', borderRadius: '24px', cursor: 'pointer', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsOpen(!isOpen)}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>
      {isOpen && (
        <div className="support-widget-premium">
          <div className="support-header">
            <div style={{ fontWeight: 900, fontSize: '1.2rem', color: 'white' }}>Online Support</div>
            <div style={{ cursor: 'pointer', color: 'white' }} onClick={() => setIsOpen(false)}>✕</div>
          </div>
          <div className="support-body" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg-bubble-premium msg-${m.type}`} style={{ color: 'white', background: m.type === 'user' ? '#3B82F6' : '#1E293B', padding: '12px 18px', borderRadius: '18px', maxWidth: '85%', alignSelf: m.type === 'user' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>{m.text}</div>
            ))}
          </div>
          <form className="support-footer" onSubmit={handleSend}>
            <input type="text" className="msg-input-premium" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ваш вопрос..." />
            <button type="submit" className="btn-send">➤</button>
          </form>
        </div>
      )}
    </>
  );
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="app-root">
      <div className="app-bg">
        <div className="bg-image"></div>
        <div className="bg-mesh"></div>
        <div className="bg-grid"></div>
      </div>

      <Header onAuth={() => setIsAuth(true)} />

      {!user ? (
        <main>
          <Hero />
          <Stats />
          <Team />
          <Calculator />
          
          <section id="how" className="section">
            <div className="container">
              <h2 className="section-title" style={{ fontSize: '3.5rem' }}>Технология <br/> свободы</h2>
              <div className="grid grid-cols-3" style={{ gap: '24px' }}>
                {[
                  { t: 'Digital Intake', d: 'Сбор данных за 5 минут.' },
                  { t: 'Smart Filing', d: 'Автоматическая подготовка исков.' },
                  { t: 'Remote Legal', d: 'Участие в суде не требуется.' }
                ].map((s, i) => (
                  <div key={i} className="bento-card">
                    <div style={{ color: '#3B82F6', fontWeight: 900, fontSize: '1.2rem', marginBottom: '20px' }}>0{i+1}</div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>{s.t}</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div className="container section">
          <div className="bento-card">
            <h2>Личный кабинет: {user.name}</h2>
            <p style={{ marginTop: '24px' }}>Статус дела: Анализ кредитной истории.</p>
            <button className="btn btn-outline" style={{ marginTop: '40px' }} onClick={() => setUser(null)}>Выйти</button>
          </div>
        </div>
      )}

      <footer className="section" style={{ background: 'rgba(0,0,0,0.5)', borderTop: '1px solid var(--glass-border)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Logo />
          <p style={{ marginTop: '32px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>Москва, Башня Федерация. Лицензия Legal-Tech 2025. <br/> Все права защищены.</p>
        </div>
      </footer>

      <Support />

      {isAuth && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }} onClick={() => setIsAuth(false)}>
          <div className="bento-card" style={{ maxWidth: '440px', width: '100%', background: '#0A0C14' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '32px', color: 'white' }}>Вход</h2>
            <form onSubmit={e => { e.preventDefault(); setUser({name: 'Client'}); setIsAuth(false); }}>
              <input type="text" placeholder="Номер договора" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '20px', borderRadius: '16px', color: 'white', marginBottom: '20px', outline: 'none' }} />
              <button className="btn btn-primary" style={{ width: '100%', borderRadius: '16px' }}>Войти в кабинет</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;