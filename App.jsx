import { useState, useEffect } from "react";

/* ── REAL PLATFORM DETAILS ─────────────────────────────────── */
const PLATFORM = {
  name: "Wealth Bridge Africa",
  tagline: "Bridging Africa's Wealth — One USDT at a Time",
  domain: "wealthbridgeafrica.net",
  email: "Africawealthbridge@gmail.com",
  whatsapp: "+27732110465",
  whatsappLink: "https://wa.me/27732110465",
  telegram: "@wbafrica",
  telegramLink: "https://t.me/wbafrica",
  depositWallet: "TFnez4UAkL8bRLzec8bo3Datuxuhj8nxNH",
  network: "USDT TRC20 (TRON)",
  minDeposit: 50,
  minWithdraw: 10,
  withdrawFee: 2,
  monthlyReturn: 3,
  referralL1: 5,
  referralL2: 2,
  countries: ["🇳🇬 Nigeria", "🇿🇦 South Africa", "🇬🇭 Ghana", "🇰🇪 Kenya", "🇺🇬 Uganda"],
};

/* ── TOKENS ────────────────────────────────────────────────── */
const C = {
  gold: "#D4A843",
  goldLight: "#F0C060",
  goldDark: "#A07820",
  green: "#1DB954",
  greenDark: "#148A3C",
  red: "#E63B2E",
  blue: "#1A8FD1",
  purple: "#7B2FBE",
  bg: "#060A06",
  bgCard: "#0D130D",
  bgCard2: "#101810",
  border: "#1A2A1A",
  borderGold: "#D4A84333",
  text: "#EDE8DC",
  muted: "#6A8A6A",
  white: "#FFFFFF",
};

/* ── GLOBAL STYLES ─────────────────────────────────────────── */
const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.bg};color:${C.text};font-family:'Outfit',sans-serif;overflow-x:hidden;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:${C.bg};}
  ::-webkit-scrollbar-thumb{background:${C.gold};border-radius:2px;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
  @keyframes shimmer{0%{background-position:-600px 0;}100%{background-position:600px 0;}}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
  @keyframes gradShift{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
  @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px ${C.gold}33;}50%{box-shadow:0 0 40px ${C.gold}66;}}
  @keyframes borderPulse{0%,100%{border-color:${C.gold}33;}50%{border-color:${C.gold}88;}}

  .fu{animation:fadeUp .65s ease both;}
  .d1{animation-delay:.1s;}.d2{animation-delay:.2s;}.d3{animation-delay:.3s;}
  .d4{animation-delay:.4s;}.d5{animation-delay:.5s;}.d6{animation-delay:.6s;}

  .btn-gold{
    background:linear-gradient(135deg,${C.gold},${C.goldDark});
    color:#000;border:none;border-radius:8px;padding:13px 28px;
    font-size:14px;font-weight:700;font-family:'Outfit',sans-serif;
    cursor:pointer;transition:all .2s;letter-spacing:.5px;text-transform:uppercase;
  }
  .btn-gold:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 8px 28px ${C.gold}55;}

  .btn-green{
    background:linear-gradient(135deg,${C.green},${C.greenDark});
    color:#fff;border:none;border-radius:8px;padding:13px 28px;
    font-size:14px;font-weight:700;font-family:'Outfit',sans-serif;
    cursor:pointer;transition:all .2s;
  }
  .btn-green:hover{opacity:.9;transform:translateY(-1px);}

  .btn-outline{
    background:transparent;color:${C.text};
    border:1px solid ${C.border};border-radius:8px;padding:12px 24px;
    font-size:14px;font-family:'Outfit',sans-serif;cursor:pointer;transition:all .2s;
  }
  .btn-outline:hover{border-color:${C.gold};color:${C.gold};}

  .btn-ghost{
    background:transparent;color:${C.muted};border:none;
    font-size:14px;font-family:'Outfit',sans-serif;cursor:pointer;transition:color .2s;padding:6px 12px;border-radius:6px;
  }
  .btn-ghost:hover{color:${C.gold};background:${C.gold}11;}

  .card{
    background:${C.bgCard};border:1px solid ${C.border};
    border-radius:14px;padding:24px;transition:border-color .2s;
  }
  .card:hover{border-color:#2A3A2A;}

  .card-gold{
    background:${C.bgCard};
    border:1px solid ${C.borderGold};
    border-radius:14px;padding:24px;
    animation:borderPulse 4s ease infinite;
  }

  .input{
    width:100%;background:#080E08;border:1px solid ${C.border};
    border-radius:8px;padding:13px 16px;color:${C.text};
    font-size:14px;font-family:'Outfit',sans-serif;outline:none;transition:border .2s;
  }
  .input:focus{border-color:${C.gold};}
  .input::placeholder{color:#2A4A2A;}
  select.input option{background:#080E08;}

  .nav-item{
    background:transparent;border:none;border-bottom:2px solid transparent;
    color:${C.muted};padding:10px 14px;font-size:13px;font-family:'Outfit',sans-serif;
    cursor:pointer;transition:all .2s;white-space:nowrap;letter-spacing:.3px;
  }
  .nav-item:hover,.nav-item.active{color:${C.gold};border-bottom-color:${C.gold};}

  .sidebar-link{
    display:flex;align-items:center;gap:10px;width:100%;
    background:transparent;border:none;color:${C.muted};
    padding:11px 14px;border-radius:8px;font-size:13px;
    font-family:'Outfit',sans-serif;cursor:pointer;transition:all .15s;text-align:left;
    letter-spacing:.3px;
  }
  .sidebar-link:hover,.sidebar-link.active{color:${C.gold};background:${C.gold}11;}

  .stat-card{
    background:${C.bgCard};border:1px solid ${C.border};
    border-radius:14px;padding:20px;position:relative;overflow:hidden;
  }

  .tag{
    display:inline-block;padding:3px 10px;border-radius:20px;
    font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;
  }

  .progress-bar{height:6px;background:#152015;border-radius:3px;overflow:hidden;}
  .progress-fill{height:100%;border-radius:3px;transition:width 1s ease;}

  .wallet-box{
    background:#050A05;border:1px solid ${C.gold}44;
    border-radius:10px;padding:14px 18px;
    font-family:'Courier New',monospace;font-size:13px;
    color:${C.gold};word-break:break-all;letter-spacing:.5px;
  }

  .copy-btn{
    background:${C.gold}22;border:1px solid ${C.gold}44;
    color:${C.gold};border-radius:6px;padding:6px 14px;
    font-size:12px;font-family:'Outfit',sans-serif;
    cursor:pointer;transition:all .2s;white-space:nowrap;
  }
  .copy-btn:hover{background:${C.gold}33;}

  .alert-warning{
    background:#1A0F00;border:1px solid ${C.gold}55;border-left:4px solid ${C.gold};
    border-radius:8px;padding:14px 18px;font-size:13px;color:#D4A84388;line-height:1.7;
  }
  .alert-success{
    background:#001A0A;border:1px solid ${C.green}44;border-left:4px solid ${C.green};
    border-radius:8px;padding:14px 18px;font-size:13px;color:#1DB95488;line-height:1.7;
  }

  .kente-pattern{
    background-image:
      repeating-linear-gradient(45deg,${C.gold}08 0,${C.gold}08 1px,transparent 0,transparent 50%),
      repeating-linear-gradient(-45deg,${C.green}05 0,${C.green}05 1px,transparent 0,transparent 50%);
    background-size:28px 28px;
  }
`;

/* ── HELPERS ───────────────────────────────────────────────── */
const fmt = n => parseFloat(n || 0).toFixed(2);
const fmtDate = d => new Date(d).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });

/* ── MOCK DATA ─────────────────────────────────────────────── */
const MOCK_USER = {
  name: "Kwame Asante", email: "kwame@example.com",
  country: "Ghana", balance: 1025.50,
  totalEarned: 75.50, totalDeposited: 950.00,
  referralCode: "KWAME2025", referralCount: 9,
  referralEarned: 47.50, level: "Agent",
  joinDate: "2025-02-01", kycStatus: "verified",
};

const MOCK_TXS = [
  { id:"tx001", type:"deposit",    amount:500,   status:"confirmed", date:"2025-05-01", note:"USDT TRC20 deposit" },
  { id:"tx002", type:"earning",    amount:15.00, status:"credited",  date:"2025-05-01", note:"Monthly 3% performance reward" },
  { id:"tx003", type:"deposit",    amount:450,   status:"confirmed", date:"2025-04-01", note:"USDT TRC20 deposit" },
  { id:"tx004", type:"referral",   amount:25.00, status:"credited",  date:"2025-04-03", note:"Referral bonus — Ade K." },
  { id:"tx005", type:"earning",    amount:13.50, status:"credited",  date:"2025-04-01", note:"Monthly 3% performance reward" },
  { id:"tx006", type:"referral",   amount:22.50, status:"credited",  date:"2025-03-15", note:"Referral bonus — Fatima S." },
  { id:"tx007", type:"earning",    amount:9.00,  status:"credited",  date:"2025-03-01", note:"Monthly 3% performance reward" },
];

const MOCK_REFERRALS = [
  { name:"Ade Kofi",      country:"Ghana",        deposit:500, earned:25.00, date:"2025-04-03", status:"active" },
  { name:"Fatima Sow",    country:"Senegal",       deposit:450, earned:22.50, date:"2025-03-15", status:"active" },
  { name:"Chidi Eze",     country:"Nigeria",       deposit:300, earned:15.00, date:"2025-03-02", status:"active" },
  { name:"Amina Kamau",   country:"Kenya",         deposit:0,   earned:0,     date:"2025-05-10", status:"pending" },
  { name:"Sipho Dlamini", country:"South Africa",  deposit:200, earned:10.00, date:"2025-02-20", status:"active" },
];

/* ── TICKER ────────────────────────────────────────────────── */
function Ticker() {
  const items = [
    "🇳🇬 Nigeria — Chidi deposited $200 USDT","🇰🇪 Kenya — Amina earned $15.00 this month",
    "🇬🇭 Ghana — Kwame withdrew $300 USDT","🇿🇦 South Africa — Sipho referred 4 friends",
    "🇺🇬 Uganda — Grace joined Wealth Bridge Africa","🇳🇬 Nigeria — Tunde deposited $500 USDT",
    "🇬🇭 Ghana — Ama earned referral bonus $25","🇿🇦 South Africa — David's withdrawal processed",
  ];
  return (
    <div style={{ background:"#08100A", borderBottom:`1px solid ${C.border}`, padding:"8px 0", overflow:"hidden" }}>
      <div style={{ display:"flex", animation:"ticker 32s linear infinite", whiteSpace:"nowrap" }}>
        {[...items,...items].map((t,i) => (
          <span key={i} style={{ color:C.muted, fontSize:"12px", padding:"0 28px", letterSpacing:".3px" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── LANDING ───────────────────────────────────────────────── */
function Landing({ onNav }) {
  const [counts, setCounts] = useState({ users:0, funds:0, countries:0, paid:0 });

  useEffect(() => {
    const targets = { users:12840, funds:2180000, countries:22, paid:98400 };
    let step = 0;
    const t = setInterval(() => {
      step++;
      const p = 1 - Math.pow(1 - step/70, 3);
      setCounts({
        users: Math.floor(targets.users * p),
        funds: Math.floor(targets.funds * p),
        countries: Math.floor(targets.countries * p),
        paid: Math.floor(targets.paid * p),
      });
      if (step >= 70) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, []);

  const features = [
    { icon:"💰", title:"3% Monthly Rewards", desc:`Earn ${PLATFORM.monthlyReturn}% of your wallet balance every month — automatically credited on the 1st. Based on real platform performance.`, color:C.gold },
    { icon:"⚡", title:"24–48h Withdrawals", desc:"Request your USDT anytime. Every withdrawal is manually processed and sent to your wallet within 24–48 hours. No delays.", color:C.green },
    { icon:"🔐", title:"USDT TRC20 Secure", desc:`Powered by the TRON network. Minimum deposit just $${PLATFORM.minDeposit}. Fees under $1. Stable value. Confirmed in minutes.`, color:C.blue },
    { icon:"🤝", title:"5% Referral Bonus", desc:`Invite friends and earn ${PLATFORM.referralL1}% of their first deposit instantly. Plus ${PLATFORM.referralL2}% on second-level referrals.`, color:C.gold },
    { icon:"🌍", title:"Built for Africa", desc:`Designed for ${PLATFORM.countries.slice(0,3).join(", ")} and 20+ more countries. We understand Africa's financial landscape.`, color:C.green },
    { icon:"🛡️", title:"Transparent & Safe", desc:"Every withdrawal comes with a TxID so you can verify on the TRON blockchain yourself. Full transparency, always.", color:C.blue },
  ];

  const steps = [
    { n:"01", title:"Create Account", desc:"Sign up free in 60 seconds. Just your name, email, phone and country." },
    { n:"02", title:`Deposit Min $${PLATFORM.minDeposit}`, desc:`Send USDT TRC20 to our wallet. Submit your TxID. Confirmed within hours.` },
    { n:"03", title:"Balance Grows Monthly", desc:`Every 1st of the month, ${PLATFORM.monthlyReturn}% is added to your balance automatically. Watch your wealth grow.` },
    { n:"04", title:"Withdraw Anytime", desc:`Min withdrawal $${PLATFORM.minWithdraw}. Request sent to our team. USDT in your wallet within 24–48 hours.` },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight:"94vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"80px 20px 60px", textAlign:"center", position:"relative",
        background:`radial-gradient(ellipse 90% 60% at 50% -10%, ${C.gold}18 0%, transparent 55%),
                   radial-gradient(ellipse 50% 40% at 10% 80%, ${C.green}10 0%, transparent 50%),
                   radial-gradient(ellipse 50% 40% at 90% 70%, ${C.blue}08 0%, transparent 50%)`,
        overflow:"hidden",
      }}>
        <div className="kente-pattern" style={{ position:"absolute", inset:0, opacity:.4 }} />

        <div style={{ position:"relative", maxWidth:"820px" }}>
          {/* Live badge */}
          <div className="fu d1" style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            background:`${C.green}18`, border:`1px solid ${C.green}44`,
            color:C.green, borderRadius:"24px", padding:"7px 18px",
            fontSize:"12px", fontWeight:600, letterSpacing:"1.5px",
            textTransform:"uppercase", marginBottom:"28px",
          }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:C.green, animation:"pulse 2s infinite", display:"block" }} />
            Live Across {PLATFORM.countries.length} African Countries
          </div>

          <h1 className="fu d2" style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(42px,7vw,84px)", fontWeight:800,
            lineHeight:1.05, color:C.white, marginBottom:"20px",
          }}>
            Bridge Your Money<br />
            <span style={{
              background:`linear-gradient(135deg, ${C.gold}, ${C.goldLight}, ${C.gold})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundSize:"200%", animation:"gradShift 3s ease infinite",
            }}>Into Wealth</span>
          </h1>

          <p className="fu d3" style={{
            fontSize:"clamp(16px,2vw,20px)", color:C.muted, maxWidth:"580px",
            margin:"0 auto 40px", lineHeight:1.75,
          }}>
            {PLATFORM.tagline}. Deposit USDT, earn <strong style={{color:C.gold}}>3% monthly</strong>,
            refer friends, and withdraw anytime — across Africa.
          </p>

          <div className="fu d4" style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap", marginBottom:"52px" }}>
            <button className="btn-gold" onClick={() => onNav("register")} style={{ fontSize:"15px", padding:"16px 40px" }}>
              Start Earning — Free →
            </button>
            <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer">
              <button className="btn-outline" style={{ fontSize:"14px", padding:"15px 28px" }}>
                💬 WhatsApp Us
              </button>
            </a>
          </div>

          {/* Stats */}
          <div className="fu d5" style={{
            display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",
            gap:"1px", background:C.border, borderRadius:"14px", overflow:"hidden",
            border:`1px solid ${C.border}`,
          }}>
            {[
              { val:`${counts.users.toLocaleString()}+`, label:"Active Users" },
              { val:`$${(counts.funds/1000000).toFixed(2)}M`, label:"USDT Managed" },
              { val:`${counts.countries}+`, label:"Countries" },
              { val:`$${counts.paid.toLocaleString()}+`, label:"Rewards Paid" },
            ].map(s => (
              <div key={s.label} style={{ background:C.bgCard, padding:"20px 16px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(22px,3vw,32px)", fontWeight:800, color:C.gold }}>{s.val}</div>
                <div style={{ fontSize:"11px", color:C.muted, textTransform:"uppercase", letterSpacing:"1.5px", marginTop:"4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background:C.bgCard, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"16px 20px" }}>
        <div style={{ maxWidth:"900px", margin:"0 auto", display:"flex", gap:"28px", justifyContent:"center", flexWrap:"wrap", alignItems:"center" }}>
          {[
            `✅ Min Deposit $${PLATFORM.minDeposit} USDT`,
            `📈 ${PLATFORM.monthlyReturn}% Monthly Performance Reward`,
            `💸 Min Withdraw $${PLATFORM.minWithdraw}`,
            `⚡ 24–48h Withdrawal Processing`,
            `🔗 USDT TRC20 Network`,
          ].map(t => <span key={t} style={{ fontSize:"13px", color:C.muted }}>{t}</span>)}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding:"90px 20px", maxWidth:"1100px", margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"60px" }}>
          <div style={{ color:C.gold, fontSize:"11px", letterSpacing:"4px", textTransform:"uppercase", marginBottom:"14px" }}>WHY CHOOSE US</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:800, color:C.white, lineHeight:1.1 }}>
            The Smartest Way to<br />Grow Your USDT in Africa
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"20px" }}>
          {features.map((f,i) => (
            <div key={i} className="card" style={{ borderTop:`3px solid ${f.color}` }}>
              <div style={{ fontSize:"36px", marginBottom:"16px" }}>{f.icon}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:700, color:C.white, marginBottom:"10px" }}>{f.title}</div>
              <div style={{ color:C.muted, fontSize:"14px", lineHeight:1.75 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:"90px 20px", background:C.bgCard, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"60px" }}>
            <div style={{ color:C.green, fontSize:"11px", letterSpacing:"4px", textTransform:"uppercase", marginBottom:"14px" }}>HOW IT WORKS</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:800, color:C.white }}>Start in 4 Simple Steps</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:"24px" }}>
            {steps.map((s,i) => (
              <div key={i} style={{ textAlign:"center", padding:"28px 16px", position:"relative" }}>
                {i < steps.length-1 && (
                  <div style={{ position:"absolute", top:"36px", right:"-12px", color:`${C.gold}44`, fontSize:"20px", display:"none" }}>→</div>
                )}
                <div style={{
                  width:"68px", height:"68px", borderRadius:"50%", margin:"0 auto 20px",
                  background:`linear-gradient(135deg, ${C.gold}22, ${C.gold}08)`,
                  border:`2px solid ${C.gold}44`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:800, color:C.gold,
                  animation:"float 4s ease-in-out infinite",
                  animationDelay:`${i*0.5}s`,
                }}>{s.n}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"19px", fontWeight:700, color:C.white, marginBottom:"10px" }}>{s.title}</div>
                <div style={{ color:C.muted, fontSize:"13px", lineHeight:1.75 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOSIT WALLET PUBLIC INFO */}
      <section style={{ padding:"80px 20px", maxWidth:"700px", margin:"0 auto", textAlign:"center" }}>
        <div style={{ color:C.gold, fontSize:"11px", letterSpacing:"4px", textTransform:"uppercase", marginBottom:"14px" }}>FULL TRANSPARENCY</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:C.white, marginBottom:"20px" }}>
          Our Deposit Wallet Address
        </h2>
        <p style={{ color:C.muted, fontSize:"14px", marginBottom:"28px", lineHeight:1.7 }}>
          We publish our USDT TRC20 deposit address publicly. Every transaction is verifiable on the TRON blockchain. This is how we prove we're real.
        </p>
        <div style={{ display:"flex", gap:"12px", alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
          <div className="wallet-box" style={{ flex:1, minWidth:"260px" }}>{PLATFORM.depositWallet}</div>
          <a href={`https://tronscan.org/#/address/${PLATFORM.depositWallet}`} target="_blank" rel="noreferrer">
            <button className="copy-btn" style={{ padding:"14px 18px" }}>🔍 Verify</button>
          </a>
        </div>
        <div style={{ marginTop:"12px", fontSize:"12px", color:C.muted }}>
          Network: {PLATFORM.network} · Verify on TronScan ↗
        </div>
      </section>

      {/* COUNTRIES */}
      <section style={{ padding:"60px 20px", background:C.bgCard, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"860px", margin:"0 auto", textAlign:"center" }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(22px,3vw,36px)", fontWeight:800, color:C.white, marginBottom:"32px" }}>
            Currently Serving These Countries
          </h3>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"12px", justifyContent:"center" }}>
            {["🇳🇬 Nigeria","🇿🇦 South Africa","🇬🇭 Ghana","🇰🇪 Kenya","🇺🇬 Uganda",
              "🇹🇿 Tanzania","🇸🇳 Senegal","🇨🇮 Côte d'Ivoire","🇷🇼 Rwanda","🇿🇼 Zimbabwe",
              "🇨🇲 Cameroon","🇲🇿 Mozambique","🇿🇲 Zambia","🇧🇼 Botswana","🌍 More coming soon"].map(c => (
              <span key={c} style={{
                background:C.bg, border:`1px solid ${C.border}`,
                borderRadius:"24px", padding:"8px 18px", fontSize:"13px", color:C.text,
              }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & SUPPORT */}
      <section style={{ padding:"80px 20px", maxWidth:"900px", margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"48px" }}>
          <div style={{ color:C.green, fontSize:"11px", letterSpacing:"4px", textTransform:"uppercase", marginBottom:"14px" }}>GET IN TOUCH</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:C.white }}>
            We're Always Here for You
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"20px" }}>
          {[
            { icon:"💬", label:"WhatsApp Support", value:PLATFORM.whatsapp, link:PLATFORM.whatsappLink, color:C.green },
            { icon:"✈️", label:"Telegram Channel", value:PLATFORM.telegram, link:PLATFORM.telegramLink, color:C.blue },
            { icon:"📧", label:"Email Support", value:PLATFORM.email, link:`mailto:${PLATFORM.email}`, color:C.gold },
          ].map((c,i) => (
            <a key={i} href={c.link} target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
              <div className="card" style={{ textAlign:"center", cursor:"pointer", borderTop:`3px solid ${c.color}` }}>
                <div style={{ fontSize:"36px", marginBottom:"12px" }}>{c.icon}</div>
                <div style={{ fontSize:"12px", color:C.muted, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"6px" }}>{c.label}</div>
                <div style={{ color:c.color, fontWeight:600, fontSize:"14px", wordBreak:"break-all" }}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        margin:"0 20px 80px", borderRadius:"20px", padding:"70px 40px",
        textAlign:"center",
        background:`linear-gradient(135deg, ${C.gold}18, ${C.green}12, ${C.gold}18)`,
        border:`1px solid ${C.gold}33`,
        position:"relative", overflow:"hidden",
      }}>
        <div className="kente-pattern" style={{ position:"absolute", inset:0, opacity:.3 }} />
        <div style={{ position:"relative" }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,52px)", fontWeight:800, color:C.white, marginBottom:"16px" }}>
            Your Wealth Journey Starts Today
          </h2>
          <p style={{ color:C.muted, fontSize:"16px", marginBottom:"36px", maxWidth:"500px", margin:"0 auto 36px" }}>
            Join 12,000+ Africans growing their USDT on Wealth Bridge Africa.
            Minimum deposit just ${PLATFORM.minDeposit}.
          </p>
          <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-gold" onClick={() => onNav("register")} style={{ fontSize:"15px", padding:"16px 44px" }}>
              Create Free Account →
            </button>
            <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer">
              <button className="btn-outline" style={{ padding:"15px 28px" }}>💬 Chat on WhatsApp</button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"44px 20px 28px" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"32px", marginBottom:"36px" }}>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:800,
                background:`linear-gradient(135deg,${C.gold},${C.green})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:"10px" }}>
                Wealth Bridge Africa
              </div>
              <div style={{ color:C.muted, fontSize:"13px", lineHeight:1.7 }}>{PLATFORM.tagline}</div>
            </div>
            <div>
              <div style={{ color:C.gold, fontSize:"12px", textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>Contact</div>
              {[
                { label:"WhatsApp", val:PLATFORM.whatsapp, link:PLATFORM.whatsappLink },
                { label:"Telegram", val:PLATFORM.telegram, link:PLATFORM.telegramLink },
                { label:"Email", val:PLATFORM.email, link:`mailto:${PLATFORM.email}` },
              ].map(c => (
                <a key={c.label} href={c.link} target="_blank" rel="noreferrer" style={{ display:"block", color:C.muted, fontSize:"13px", textDecoration:"none", marginBottom:"6px" }}>
                  {c.label}: <span style={{color:C.text}}>{c.val}</span>
                </a>
              ))}
            </div>
            <div>
              <div style={{ color:C.gold, fontSize:"12px", textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>Platform</div>
              {[`Min Deposit: $${PLATFORM.minDeposit}`,`Min Withdraw: $${PLATFORM.minWithdraw}`,`Withdrawal Fee: ${PLATFORM.withdrawFee}%`,`Monthly Return: ${PLATFORM.monthlyReturn}%`,`Network: USDT TRC20`].map(t => (
                <div key={t} style={{ color:C.muted, fontSize:"13px", marginBottom:"5px" }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"20px", textAlign:"center", color:C.muted, fontSize:"12px", lineHeight:1.8 }}>
            © 2025 Wealth Bridge Africa · {PLATFORM.domain}<br />
            ⚠ Performance-based rewards. Investing carries risk. Only invest what you can afford to lose. Returns are not guaranteed.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── AUTH ──────────────────────────────────────────────────── */
function Auth({ mode, onNav, onLogin }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", country:"Nigeria", password:"", ref:"", agree:false });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const countries = ["Nigeria","South Africa","Ghana","Kenya","Uganda","Tanzania","Senegal","Rwanda","Cameroon","Zimbabwe","Other"];

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "login") onLogin();
      else if (step === 1) setStep(2);
      else onLogin();
    }, 1400);
  };

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      padding:"40px 20px",
      background:`radial-gradient(ellipse 70% 50% at 30% 20%, ${C.gold}10 0%, transparent 55%),
                 radial-gradient(ellipse 60% 40% at 70% 80%, ${C.green}08 0%, transparent 50%)`,
    }}>
      <div style={{ width:"100%", maxWidth:"440px" }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:"36px" }}>
          <div className="fu" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", marginBottom:"8px" }}>
            <div style={{
              width:"38px", height:"38px", borderRadius:"9px",
              background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"18px", fontWeight:900, color:"#000", fontFamily:"'Outfit',sans-serif",
            }}>W</div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:"16px", fontWeight:700, color:C.white, fontFamily:"'Outfit',sans-serif", lineHeight:1.1 }}>Wealth Bridge</div>
              <div style={{ fontSize:"10px", color:C.gold, letterSpacing:"2px", textTransform:"uppercase" }}>Africa</div>
            </div>
          </div>
          <div style={{ color:C.muted, fontSize:"13px" }}>
            {mode === "login" ? "Sign in to your account" : step === 1 ? "Create your free account" : "Verify your phone number"}
          </div>
        </div>

        <div className="card fu d1" style={{ padding:"32px" }}>
          {mode === "register" && step === 1 && (<>
            {[
              { label:"FULL NAME", key:"name", type:"text", ph:"e.g. Amara Diallo" },
              { label:"EMAIL ADDRESS", key:"email", type:"email", ph:PLATFORM.email },
              { label:"PHONE NUMBER", key:"phone", type:"tel", ph:"+27 73 211 0465" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:"16px" }}>
                <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>{f.label}</label>
                <input className="input" type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})} />
              </div>
            ))}
            <div style={{ marginBottom:"16px" }}>
              <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>COUNTRY</label>
              <select className="input" value={form.country} onChange={e => setForm({...form,country:e.target.value})}>
                {countries.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:"16px" }}>
              <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>PASSWORD</label>
              <input className="input" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={e => setForm({...form,password:e.target.value})} />
            </div>
            <div style={{ marginBottom:"20px" }}>
              <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>REFERRAL CODE (Optional)</label>
              <input className="input" placeholder="e.g. KWAME2025" value={form.ref} onChange={e => setForm({...form,ref:e.target.value})} />
            </div>
            <div style={{ display:"flex", gap:"10px", alignItems:"flex-start", marginBottom:"24px" }}>
              <input type="checkbox" checked={form.agree} onChange={e => setForm({...form,agree:e.target.checked})} style={{ marginTop:3, accentColor:C.gold }} />
              <span style={{ fontSize:"12px", color:C.muted, lineHeight:1.6 }}>
                I agree to the Terms of Service. I understand rewards are performance-based and not guaranteed. Minimum deposit ${PLATFORM.minDeposit} USDT.
              </span>
            </div>
          </>)}

          {mode === "register" && step === 2 && (
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ fontSize:"52px", marginBottom:"16px" }}>📱</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:700, color:C.white, marginBottom:"8px" }}>Verify Your Phone</div>
              <div style={{ color:C.muted, fontSize:"13px", marginBottom:"24px", lineHeight:1.6 }}>
                We sent a code to <strong style={{color:C.text}}>{form.phone || "+27 ••• ••••"}</strong>
              </div>
              <input className="input" placeholder="Enter 6-digit code" style={{ textAlign:"center", letterSpacing:"8px", fontSize:"22px", marginBottom:"16px" }} />
              <div style={{ fontSize:"12px", color:C.muted }}>
                Didn't receive it? <span style={{color:C.gold, cursor:"pointer"}}>Resend</span>
              </div>
              <div style={{ marginTop:"20px", padding:"12px", background:`${C.green}11`, border:`1px solid ${C.green}33`, borderRadius:"8px", fontSize:"12px", color:C.muted }}>
                💬 Need help? <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer" style={{color:C.green, textDecoration:"none"}}>WhatsApp us: {PLATFORM.whatsapp}</a>
              </div>
            </div>
          )}

          {mode === "login" && (<>
            <div style={{ marginBottom:"16px" }}>
              <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>EMAIL ADDRESS</label>
              <input className="input" type="email" placeholder="your@email.com" />
            </div>
            <div style={{ marginBottom:"8px" }}>
              <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>PASSWORD</label>
              <input className="input" type="password" placeholder="Your password" />
            </div>
            <div style={{ textAlign:"right", marginBottom:"24px" }}>
              <span style={{ color:C.gold, fontSize:"12px", cursor:"pointer" }}>Forgot password?</span>
            </div>
            <div style={{ marginBottom:"20px", padding:"12px", background:`${C.green}11`, border:`1px solid ${C.green}33`, borderRadius:"8px", fontSize:"12px", color:C.muted }}>
              💬 Need support? <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer" style={{color:C.green, textDecoration:"none"}}>{PLATFORM.whatsapp}</a>
            </div>
          </>)}

          <button className="btn-gold" onClick={submit} disabled={loading} style={{ width:"100%", padding:"14px", fontSize:"14px" }}>
            {loading ? "Please wait..." : mode==="login" ? "Sign In →" : step===1 ? "Continue →" : "Verify & Enter →"}
          </button>

          <div style={{ textAlign:"center", marginTop:"20px", fontSize:"13px", color:C.muted }}>
            {mode==="login"
              ? <>No account? <span style={{color:C.gold, cursor:"pointer"}} onClick={() => onNav("register")}>Register free</span></>
              : <>Have an account? <span style={{color:C.gold, cursor:"pointer"}} onClick={() => onNav("login")}>Sign in</span></>}
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:"16px" }}>
          <button className="btn-ghost" onClick={() => onNav("landing")} style={{ fontSize:"12px" }}>← Back to website</button>
        </div>
      </div>
    </div>
  );
}

/* ── DASHBOARD LAYOUT ──────────────────────────────────────── */
function Layout({ user, page, setPage, onLogout, children }) {
  const nav = [
    { id:"dashboard", icon:"📊", label:"Dashboard" },
    { id:"deposit",   icon:"💳", label:"Deposit" },
    { id:"withdraw",  icon:"💸", label:"Withdraw" },
    { id:"referral",  icon:"🤝", label:"Referrals" },
    { id:"history",   icon:"📋", label:"History" },
    { id:"profile",   icon:"👤", label:"Profile" },
    { id:"support",   icon:"🆘", label:"Support" },
  ];
  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      {/* Sidebar */}
      <div style={{
        width:"230px", flexShrink:0, background:C.bgCard,
        borderRight:`1px solid ${C.border}`, padding:"24px 14px",
        display:"flex", flexDirection:"column",
        position:"sticky", top:0, height:"100vh", overflowY:"auto",
      }}>
        <div style={{ marginBottom:"28px", padding:"0 6px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
            <div style={{
              width:"30px", height:"30px", borderRadius:"7px", flexShrink:0,
              background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"14px", fontWeight:900, color:"#000", fontFamily:"'Outfit',sans-serif",
            }}>W</div>
            <div>
              <div style={{ fontSize:"13px", fontWeight:700, color:C.white, lineHeight:1.1, fontFamily:"'Outfit',sans-serif" }}>Wealth Bridge</div>
              <div style={{ fontSize:"9px", color:C.gold, letterSpacing:"2px", textTransform:"uppercase" }}>Africa</div>
            </div>
          </div>
        </div>
        <div style={{ flex:1 }}>
          {nav.map(n => (
            <button key={n.id} className={`sidebar-link ${page===n.id?"active":""}`} onClick={() => setPage(n.id)} style={{ marginBottom:"3px" }}>
              <span>{n.icon}</span><span>{n.label}</span>
              {n.id==="deposit" && <span style={{ marginLeft:"auto", background:`${C.green}22`, color:C.green, borderRadius:"10px", padding:"1px 8px", fontSize:"10px" }}>3%</span>}
            </button>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"14px" }}>
          <div style={{ display:"flex", gap:"10px", alignItems:"center", padding:"8px 8px 12px" }}>
            <div style={{
              width:"34px", height:"34px", borderRadius:"50%", flexShrink:0,
              background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"14px", fontWeight:700, color:"#000",
            }}>{user.name[0]}</div>
            <div style={{ overflow:"hidden" }}>
              <div style={{ fontSize:"13px", fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user.name}</div>
              <div style={{ fontSize:"11px", color:C.muted }}>{user.level}</div>
            </div>
          </div>
          <button className="sidebar-link" onClick={onLogout}>🚪 Sign Out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          background:C.bgCard, borderBottom:`1px solid ${C.border}`,
          padding:"15px 28px", display:"flex", alignItems:"center", justifyContent:"space-between",
          position:"sticky", top:0, zIndex:50,
        }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:700, color:C.white }}>
            {nav.find(n=>n.id===page)?.label}
          </div>
          <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
            <div style={{ background:`${C.gold}18`, border:`1px solid ${C.gold}33`, color:C.gold, borderRadius:"20px", padding:"5px 16px", fontSize:"12px", fontWeight:600 }}>
              ${fmt(user.balance)} USDT
            </div>
            <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer">
              <button className="btn-ghost" style={{ fontSize:"12px", color:C.green }}>💬 Support</button>
            </a>
          </div>
        </div>
        <div style={{ padding:"28px" }}>{children}</div>
      </div>
    </div>
  );
}

/* ── DASHBOARD HOME ────────────────────────────────────────── */
function DashHome({ user, setPage }) {
  const nextEarn = fmt(user.balance * (PLATFORM.monthlyReturn / 100));
  const annualEarn = fmt(user.balance * (PLATFORM.monthlyReturn / 100) * 12);

  return (
    <div>
      <div style={{ marginBottom:"28px" }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:800, color:C.white }}>
          Welcome back, {user.name.split(" ")[0]} 👋
        </h2>
        <div style={{ color:C.muted, fontSize:"14px", marginTop:"4px" }}>
          Next reward: <strong style={{color:C.gold}}>${nextEarn} USDT</strong> credited on the 1st of next month
        </div>
      </div>

      {/* Main stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"16px", marginBottom:"24px" }}>
        {[
          { label:"Wallet Balance", val:`$${fmt(user.balance)}`, sub:"USDT TRC20", color:C.gold, icon:"💰" },
          { label:"Total Earned", val:`$${fmt(user.totalEarned)}`, sub:"All time rewards", color:C.green, icon:"📈" },
          { label:"Referral Earnings", val:`$${fmt(user.referralEarned)}`, sub:`${user.referralCount} referrals`, color:C.blue, icon:"🤝" },
          { label:"Monthly Reward", val:`$${nextEarn}`, sub:`${PLATFORM.monthlyReturn}% this month`, color:C.gold, icon:"⏳" },
        ].map((s,i) => (
          <div key={i} className="stat-card">
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,${s.color},transparent)` }} />
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:"11px", color:C.muted, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"10px" }}>{s.label}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:800, color:C.white }}>{s.val}</div>
                <div style={{ fontSize:"12px", color:s.color, marginTop:"4px" }}>{s.sub}</div>
              </div>
              <div style={{ fontSize:"28px", opacity:.5 }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Earnings projection + recent tx */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"20px", marginBottom:"20px" }}>
        <div className="card">
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:700, color:C.white, marginBottom:"20px" }}>
            📊 Earnings Breakdown
          </div>
          {[
            { label:"Total Deposited", val:user.totalDeposited, max:user.balance, color:C.blue },
            { label:"Monthly Rewards Earned", val:user.totalEarned - user.referralEarned, max:user.totalEarned, color:C.green },
            { label:"Referral Bonuses", val:user.referralEarned, max:user.totalEarned, color:C.gold },
          ].map((b,i) => (
            <div key={i} style={{ marginBottom:"16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:"13px", marginBottom:"6px" }}>
                <span style={{color:C.muted}}>{b.label}</span>
                <span style={{color:C.text}}>${fmt(b.val)}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width:`${Math.min((b.val/b.max)*100,100)}%`, background:`linear-gradient(90deg,${b.color},${b.color}88)` }} />
              </div>
            </div>
          ))}
          <div style={{ background:`${C.gold}11`, border:`1px solid ${C.gold}22`, borderRadius:"8px", padding:"12px", marginTop:"16px", fontSize:"13px" }}>
            💡 At your current balance, you'll earn approximately <strong style={{color:C.gold}}>${annualEarn} USDT</strong> this year in performance rewards.
          </div>
        </div>

        <div className="card">
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:700, color:C.white, marginBottom:"20px" }}>
            🕐 Recent Activity
          </div>
          {MOCK_TXS.slice(0,5).map((tx,i) => (
            <div key={i} style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"10px 0", borderBottom: i<4 ? `1px solid ${C.border}` : "none",
            }}>
              <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                <div style={{
                  width:"36px", height:"36px", borderRadius:"50%", flexShrink:0,
                  background: tx.type==="deposit" ? `${C.blue}22` : tx.type==="earning" ? `${C.green}22` : `${C.gold}22`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px",
                }}>
                  {tx.type==="deposit"?"💳":tx.type==="earning"?"📈":"🤝"}
                </div>
                <div>
                  <div style={{ fontSize:"13px", fontWeight:500, color:C.text }}>
                    {tx.type==="deposit"?"USDT Deposit":tx.type==="earning"?"Monthly Reward":"Referral Bonus"}
                  </div>
                  <div style={{ fontSize:"11px", color:C.muted }}>{fmtDate(tx.date)}</div>
                </div>
              </div>
              <div style={{ color:C.green, fontWeight:700, fontSize:"14px" }}>+${fmt(tx.amount)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"16px" }}>
        <div style={{
          background:`linear-gradient(135deg,${C.gold}18,${C.gold}08)`,
          border:`1px solid ${C.gold}33`, borderRadius:"14px", padding:"24px",
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"14px",
        }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:700, color:C.white, marginBottom:"6px" }}>Deposit USDT</div>
            <div style={{ color:C.muted, fontSize:"13px" }}>Min ${PLATFORM.minDeposit} · TRC20 Network</div>
          </div>
          <button className="btn-gold" onClick={() => setPage("deposit")} style={{ padding:"10px 22px", fontSize:"13px" }}>Deposit →</button>
        </div>
        <div style={{
          background:`linear-gradient(135deg,${C.green}18,${C.green}08)`,
          border:`1px solid ${C.green}33`, borderRadius:"14px", padding:"24px",
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"14px",
        }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:700, color:C.white, marginBottom:"6px" }}>Invite & Earn</div>
            <div style={{ color:C.muted, fontSize:"13px" }}>${PLATFORM.referralL1}% of friend's deposit</div>
          </div>
          <button className="btn-green" onClick={() => setPage("referral")} style={{ padding:"10px 22px", fontSize:"13px" }}>Refer →</button>
        </div>
      </div>
    </div>
  );
}

/* ── DEPOSIT PAGE ──────────────────────────────────────────── */
function Deposit({ user }) {
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddr = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const preview3 = amount && parseFloat(amount) >= PLATFORM.minDeposit ? fmt(parseFloat(amount) * 0.03) : null;
  const previewAnnual = preview3 ? fmt(parseFloat(preview3) * 12) : null;

  if (done) return (
    <div style={{ maxWidth:"500px", margin:"0 auto", textAlign:"center", padding:"60px 0" }}>
      <div style={{ fontSize:"64px", marginBottom:"20px" }}>✅</div>
      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:800, color:C.white, marginBottom:"12px" }}>Deposit Submitted!</h3>
      <p style={{ color:C.muted, lineHeight:1.8, marginBottom:"28px" }}>
        We'll verify your transaction on the TRON blockchain and credit your wallet within <strong style={{color:C.gold}}>2–6 hours</strong>. You'll receive a notification.
      </p>
      <div className="alert-success" style={{ marginBottom:"24px" }}>
        ✅ Once confirmed, your balance will update and your <strong style={{color:C.green}}>{PLATFORM.monthlyReturn}% monthly reward</strong> cycle begins immediately.
      </div>
      <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
        <button className="btn-gold" onClick={() => setDone(false)}>Make Another Deposit</button>
        <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer">
          <button className="btn-outline">💬 WhatsApp Support</button>
        </a>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:"620px" }}>
      <div style={{ marginBottom:"28px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:800, color:C.white, marginBottom:"6px" }}>Deposit USDT</h3>
        <p style={{ color:C.muted, fontSize:"14px" }}>
          Send USDT TRC20 directly to our wallet below. Minimum: <strong style={{color:C.gold}}>${PLATFORM.minDeposit} USDT</strong>
        </p>
      </div>

      {/* Step 1 — wallet address */}
      <div className="card" style={{ marginBottom:"16px", borderTop:`3px solid ${C.gold}` }}>
        <div style={{ display:"flex", gap:"12px" }}>
          <div style={{ background:`${C.gold}22`, color:C.gold, width:"30px", height:"30px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:700, flexShrink:0 }}>1</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:600, color:C.white, marginBottom:"14px", fontSize:"15px" }}>Send USDT TRC20 to this wallet</div>
            <div className="wallet-box" style={{ marginBottom:"10px" }}>{PLATFORM.depositWallet}</div>
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              <button className="copy-btn" onClick={copyAddr}>{copied ? "✓ Copied!" : "📋 Copy Address"}</button>
              <a href={`https://tronscan.org/#/address/${PLATFORM.depositWallet}`} target="_blank" rel="noreferrer">
                <button className="copy-btn">🔍 View on TronScan</button>
              </a>
            </div>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginTop:"12px" }}>
              <span className="tag" style={{ background:`${C.green}18`, border:`1px solid ${C.green}33`, color:C.green }}>⚡ TRC20 Only</span>
              <span className="tag" style={{ background:`${C.gold}18`, border:`1px solid ${C.gold}33`, color:C.gold }}>Fee ~$1</span>
              <span className="tag" style={{ background:`${C.blue}18`, border:`1px solid ${C.blue}33`, color:C.blue }}>3 min confirm</span>
              <span className="tag" style={{ background:`${C.gold}18`, border:`1px solid ${C.gold}33`, color:C.gold }}>Min ${PLATFORM.minDeposit} USDT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 — fill form */}
      <div className="card" style={{ marginBottom:"16px" }}>
        <div style={{ display:"flex", gap:"12px" }}>
          <div style={{ background:`${C.green}22`, color:C.green, width:"30px", height:"30px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:700, flexShrink:0 }}>2</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:600, color:C.white, marginBottom:"16px", fontSize:"15px" }}>Enter your deposit details</div>
            <div style={{ marginBottom:"14px" }}>
              <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>AMOUNT SENT (USDT)</label>
              <input className="input" type="number" placeholder={`Minimum $${PLATFORM.minDeposit}`} value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div style={{ marginBottom:"14px" }}>
              <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>TRANSACTION ID (TxID)</label>
              <input className="input" placeholder="Paste TxID from your wallet or exchange" value={txid} onChange={e => setTxid(e.target.value)} />
              <div style={{ fontSize:"11px", color:C.muted, marginTop:"5px" }}>Find this in your wallet's transaction history after sending</div>
            </div>
            <div>
              <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>PAYMENT SCREENSHOT</label>
              <div style={{
                border:`2px dashed ${C.border}`, borderRadius:"8px", padding:"24px",
                textAlign:"center", cursor:"pointer", color:C.muted, fontSize:"13px",
                background:"#050A05",
              }}>
                📎 Click to upload screenshot<br />
                <span style={{ fontSize:"11px" }}>PNG, JPG — Max 5MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings preview */}
      {preview3 && (
        <div style={{
          background:`${C.green}11`, border:`1px solid ${C.green}33`,
          borderRadius:"10px", padding:"16px", marginBottom:"16px", fontSize:"13px", lineHeight:1.8,
        }}>
          🎯 <strong style={{color:C.green}}>Earnings preview for ${parseFloat(amount).toFixed(0)} USDT:</strong><br />
          Monthly {PLATFORM.monthlyReturn}% reward: <strong style={{color:C.white}}>${preview3} USDT</strong><br />
          Projected annual earnings: <strong style={{color:C.white}}>${previewAnnual} USDT</strong><br />
          <span style={{color:C.muted,fontSize:"11px"}}>*Performance-based. Credited on the 1st of each month to your dashboard balance.</span>
        </div>
      )}

      <div className="alert-warning" style={{ marginBottom:"16px" }}>
        ⚠ <strong style={{color:C.gold}}>Important:</strong> Only send USDT on the <strong style={{color:C.gold}}>TRC20 (TRON)</strong> network. Sending on other networks (ERC20, BEP20) will result in permanent loss of funds.
      </div>

      <button className="btn-gold" style={{ width:"100%", padding:"15px", fontSize:"15px" }} onClick={() => setDone(true)}>
        Submit Deposit Request →
      </button>

      <div style={{ textAlign:"center", marginTop:"14px", fontSize:"12px", color:C.muted }}>
        Need help? <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer" style={{color:C.green, textDecoration:"none"}}>WhatsApp: {PLATFORM.whatsapp}</a>
        {" · "}
        <a href={`mailto:${PLATFORM.email}`} style={{color:C.gold, textDecoration:"none"}}>{PLATFORM.email}</a>
      </div>
    </div>
  );
}

/* ── WITHDRAW PAGE ─────────────────────────────────────────── */
function Withdraw({ user }) {
  const [amount, setAmount] = useState("");
  const [addr, setAddr] = useState("");
  const [done, setDone] = useState(false);
  const fee = amount ? fmt(parseFloat(amount) * (PLATFORM.withdrawFee / 100)) : "0.00";
  const receive = amount ? fmt(parseFloat(amount) * (1 - PLATFORM.withdrawFee / 100)) : "0.00";

  if (done) return (
    <div style={{ maxWidth:"500px", margin:"0 auto", textAlign:"center", padding:"60px 0" }}>
      <div style={{ fontSize:"64px", marginBottom:"20px" }}>⏳</div>
      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:800, color:C.white, marginBottom:"12px" }}>Withdrawal Requested!</h3>
      <p style={{ color:C.muted, lineHeight:1.8, marginBottom:"20px" }}>
        Your withdrawal of <strong style={{color:C.gold}}>${amount} USDT</strong> is being processed by our team.
        You'll receive it to your wallet within <strong style={{color:C.green}}>24–48 hours</strong> with a TxID confirmation.
      </p>
      <div className="alert-success" style={{ marginBottom:"24px" }}>
        ✅ Funds reserved · Status: <strong style={{color:C.green}}>Processing</strong><br />
        Questions? <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer" style={{color:C.green, textDecoration:"none"}}>WhatsApp {PLATFORM.whatsapp}</a>
      </div>
      <button className="btn-gold" onClick={() => setDone(false)}>Done</button>
    </div>
  );

  return (
    <div style={{ maxWidth:"540px" }}>
      <div style={{ marginBottom:"28px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:800, color:C.white, marginBottom:"6px" }}>Withdraw USDT</h3>
        <p style={{ color:C.muted, fontSize:"14px" }}>
          Processed within 24–48 hours. Minimum: <strong style={{color:C.gold}}>${PLATFORM.minWithdraw} USDT</strong> · Fee: {PLATFORM.withdrawFee}%
        </p>
      </div>

      {/* Balance card */}
      <div style={{
        background:`linear-gradient(135deg,${C.gold}18,${C.gold}08)`,
        border:`1px solid ${C.gold}33`, borderRadius:"14px", padding:"24px",
        marginBottom:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px",
      }}>
        <div>
          <div style={{ fontSize:"12px", color:C.muted, marginBottom:"4px" }}>AVAILABLE TO WITHDRAW</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:800, color:C.white }}>${fmt(user.balance)}</div>
          <div style={{ fontSize:"12px", color:C.green }}>USDT TRC20</div>
        </div>
        <button className="btn-outline" onClick={() => setAmount(fmt(user.balance * 0.98))} style={{ padding:"10px 18px", fontSize:"12px" }}>Withdraw Max</button>
      </div>

      <div className="card">
        <div style={{ marginBottom:"16px" }}>
          <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>AMOUNT TO WITHDRAW (USDT)</label>
          <input className="input" type="number" placeholder={`Min $${PLATFORM.minWithdraw}`} value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div style={{ marginBottom:"16px" }}>
          <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>YOUR USDT TRC20 WALLET ADDRESS</label>
          <input className="input" placeholder="Starts with T..." value={addr} onChange={e => setAddr(e.target.value)} />
          <div style={{ fontSize:"11px", color:"#E63B2E", marginTop:"5px" }}>⚠ Double check your address — wrong addresses cannot be recovered</div>
        </div>
        <div style={{ marginBottom:"16px" }}>
          <label style={{ fontSize:"11px", color:C.muted, display:"block", marginBottom:"6px", letterSpacing:"1px" }}>REASON (Optional)</label>
          <input className="input" placeholder="e.g. Personal use, business, etc." />
        </div>

        {amount && parseFloat(amount) >= PLATFORM.minWithdraw && (
          <div style={{ background:"#050A05", border:`1px solid ${C.border}`, borderRadius:"8px", padding:"16px", marginBottom:"16px", fontSize:"13px" }}>
            {[
              ["Withdrawal Amount", `$${fmt(parseFloat(amount))} USDT`],
              [`Platform Fee (${PLATFORM.withdrawFee}%)`, `-$${fee} USDT`],
              ["You Will Receive", `$${receive} USDT`],
              ["Processing Time", "24–48 hours"],
              ["Network", "USDT TRC20"],
            ].map(([k,v],i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom: i<4 ? `1px solid ${C.border}` : "none" }}>
                <span style={{color:C.muted}}>{k}</span>
                <span style={{color: i===2 ? C.green : C.text, fontWeight: i===2 ? 700 : 400}}>{v}</span>
              </div>
            ))}
          </div>
        )}

        <div className="alert-warning" style={{ marginBottom:"16px" }}>
          ⚠ Withdrawals are manually processed by our team. You'll receive your USDT with a blockchain TxID within 24–48 hours. Contact <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer" style={{color:C.green, textDecoration:"none"}}>{PLATFORM.whatsapp}</a> if delayed.
        </div>

        <button className="btn-gold" style={{ width:"100%", padding:"14px", fontSize:"15px" }} onClick={() => setDone(true)}>
          Submit Withdrawal Request →
        </button>
      </div>
    </div>
  );
}

/* ── REFERRAL ──────────────────────────────────────────────── */
function Referral({ user }) {
  const [copied, setCopied] = useState(false);
  const link = `https://${PLATFORM.domain}/join/${user.referralCode}`;
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2500); };

  return (
    <div>
      <div style={{ marginBottom:"28px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:800, color:C.white, marginBottom:"6px" }}>Referral Program</h3>
        <p style={{ color:C.muted, fontSize:"14px" }}>Share your link. Earn {PLATFORM.referralL1}% of every friend's first deposit. Build passive income across Africa.</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:"16px", marginBottom:"28px" }}>
        {[
          { label:"Total Referrals", val:user.referralCount, color:C.gold, icon:"👥" },
          { label:"Active", val:MOCK_REFERRALS.filter(r=>r.status==="active").length, color:C.green, icon:"✅" },
          { label:"Total Earned", val:`$${fmt(user.referralEarned)}`, color:C.blue, icon:"💰" },
          { label:"Pending", val:"$0.00", color:C.gold, icon:"⏳" },
        ].map((s,i) => (
          <div key={i} className="stat-card">
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,${s.color},transparent)` }} />
            <div style={{ fontSize:"22px", marginBottom:"8px" }}>{s.icon}</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:800, color:C.white }}>{s.val}</div>
            <div style={{ fontSize:"11px", color:C.muted, textTransform:"uppercase", letterSpacing:"1px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Your link */}
      <div className="card" style={{ marginBottom:"20px", borderTop:`3px solid ${C.gold}` }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:700, color:C.white, marginBottom:"16px" }}>🔗 Your Referral Link</div>
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"14px" }}>
          <div style={{ flex:1, minWidth:"240px", background:"#050A05", border:`1px solid ${C.gold}33`, borderRadius:"8px", padding:"12px 16px", fontSize:"13px", color:C.gold, fontFamily:"monospace", wordBreak:"break-all" }}>
            {link}
          </div>
          <button className="btn-gold" onClick={copy} style={{ padding:"12px 20px", flexShrink:0, fontSize:"13px" }}>
            {copied ? "✓ Copied!" : "Copy Link"}
          </button>
        </div>
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <a href={`${PLATFORM.whatsappLink}?text=Join Wealth Bridge Africa and earn 3% monthly on your USDT! Use my referral link: ${link}`} target="_blank" rel="noreferrer">
            <button className="btn-outline" style={{ fontSize:"12px", padding:"8px 14px" }}>💬 Share on WhatsApp</button>
          </a>
          <a href={PLATFORM.telegramLink} target="_blank" rel="noreferrer">
            <button className="btn-outline" style={{ fontSize:"12px", padding:"8px 14px" }}>✈️ Share on Telegram</button>
          </a>
        </div>
      </div>

      {/* Reward structure */}
      <div className="card" style={{ marginBottom:"20px" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:700, color:C.white, marginBottom:"16px" }}>🏆 Reward Structure</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"12px" }}>
          {[
            { level:"Level 1 — Direct", pct:`${PLATFORM.referralL1}%`, desc:"Of friend's first deposit", color:C.gold },
            { level:"Level 2 — Network", pct:`${PLATFORM.referralL2}%`, desc:"Of their referral's deposit", color:C.green },
            { level:"Agent Bonus", pct:"+2%", desc:"Extra once you reach Agent tier", color:C.blue },
          ].map((r,i) => (
            <div key={i} style={{ background:`${r.color}11`, border:`1px solid ${r.color}33`, borderRadius:"10px", padding:"18px", textAlign:"center" }}>
              <div style={{ fontSize:"11px", color:r.color, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"8px" }}>{r.level}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"32px", fontWeight:800, color:r.color }}>{r.pct}</div>
              <div style={{ fontSize:"12px", color:C.muted, marginTop:"6px" }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral table */}
      <div className="card">
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:700, color:C.white, marginBottom:"16px" }}>👥 Your Referrals</div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"13px" }}>
            <thead>
              <tr>
                {["Name","Country","Deposited","Bonus Earned","Status"].map(h => (
                  <th key={h} style={{ padding:"10px 12px", textAlign:"left", color:C.muted, fontSize:"11px", textTransform:"uppercase", letterSpacing:"1px", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_REFERRALS.map((r,i) => (
                <tr key={i}>
                  <td style={{ padding:"12px", color:C.text, fontWeight:500, borderBottom:`1px solid ${C.border}` }}>{r.name}</td>
                  <td style={{ padding:"12px", color:C.muted, borderBottom:`1px solid ${C.border}` }}>{r.country}</td>
                  <td style={{ padding:"12px", color:C.text, borderBottom:`1px solid ${C.border}` }}>${fmt(r.deposit)}</td>
                  <td style={{ padding:"12px", color:C.green, fontWeight:700, borderBottom:`1px solid ${C.border}` }}>+${fmt(r.earned)}</td>
                  <td style={{ padding:"12px", borderBottom:`1px solid ${C.border}` }}>
                    <span className="tag" style={{
                      background: r.status==="active" ? `${C.green}18` : `${C.gold}18`,
                      border:`1px solid ${r.status==="active" ? C.green : C.gold}44`,
                      color: r.status==="active" ? C.green : C.gold,
                    }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── HISTORY ───────────────────────────────────────────────── */
function History() {
  const [filter, setFilter] = useState("all");
  const tabs = [["all","All"],["deposit","Deposits"],["earning","Earnings"],["referral","Referrals"]];
  const txs = filter==="all" ? MOCK_TXS : MOCK_TXS.filter(t=>t.type===filter);
  const cfg = { deposit:{label:"Deposit",color:C.blue,icon:"💳"}, earning:{label:"Reward",color:C.green,icon:"📈"}, referral:{label:"Referral",color:C.gold,icon:"🤝"}, withdrawal:{label:"Withdrawal",color:C.red,icon:"💸"} };

  return (
    <div>
      <div style={{ marginBottom:"24px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:800, color:C.white, marginBottom:"6px" }}>Transaction History</h3>
        <p style={{ color:C.muted, fontSize:"14px" }}>All deposits, monthly rewards, referral bonuses and withdrawals.</p>
      </div>
      <div style={{ display:"flex", gap:0, borderBottom:`1px solid ${C.border}`, marginBottom:"20px", overflowX:"auto" }}>
        {tabs.map(([id,label]) => (
          <button key={id} className={`nav-item ${filter===id?"active":""}`} onClick={() => setFilter(id)}>{label}</button>
        ))}
      </div>
      <div className="card" style={{ padding:0, overflow:"hidden" }}>
        {txs.map((tx,i) => {
          const c = cfg[tx.type] || cfg.deposit;
          return (
            <div key={tx.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 24px", borderBottom: i<txs.length-1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ display:"flex", gap:"14px", alignItems:"center" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:`${c.color}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize:"14px", fontWeight:500, color:C.text }}>{tx.note}</div>
                  <div style={{ fontSize:"12px", color:C.muted, marginTop:"2px" }}>{fmtDate(tx.date)} · {tx.id}</div>
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontWeight:700, fontSize:"15px", color: tx.type==="withdrawal" ? C.red : C.green }}>
                  {tx.type==="withdrawal" ? "-" : "+"}${fmt(tx.amount)}
                </div>
                <span className="tag" style={{ background:`${c.color}18`, border:`1px solid ${c.color}33`, color:c.color, marginTop:"4px" }}>{tx.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── PROFILE ───────────────────────────────────────────────── */
function Profile({ user }) {
  return (
    <div style={{ maxWidth:"580px" }}>
      <div style={{ marginBottom:"28px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:800, color:C.white, marginBottom:"6px" }}>My Profile</h3>
        <p style={{ color:C.muted, fontSize:"14px" }}>Manage your account settings and security.</p>
      </div>
      <div style={{ display:"flex", gap:"20px", alignItems:"center", marginBottom:"28px" }}>
        <div style={{
          width:"72px", height:"72px", borderRadius:"50%",
          background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"28px", fontWeight:800, color:"#000",
          fontFamily:"'Cormorant Garamond',serif", border:`3px solid ${C.gold}44`,
        }}>{user.name[0]}</div>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:800, color:C.white }}>{user.name}</div>
          <div style={{ fontSize:"13px", color:C.muted }}>{user.email}</div>
          <div style={{ display:"flex", gap:"8px", marginTop:"8px" }}>
            <span className="tag" style={{ background:`${C.green}18`, border:`1px solid ${C.green}33`, color:C.green }}>✅ KYC Verified</span>
            <span className="tag" style={{ background:`${C.gold}18`, border:`1px solid ${C.gold}33`, color:C.gold }}>⭐ {user.level}</span>
          </div>
        </div>
      </div>
      <div className="card" style={{ marginBottom:"16px" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", fontWeight:700, color:C.white, marginBottom:"16px" }}>Account Details</div>
        {[["Full Name",user.name],["Email",user.email],["Country",user.country],["Member Since",fmtDate(user.joinDate)],["Referral Code",user.referralCode]].map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${C.border}`, fontSize:"13px" }}>
            <span style={{color:C.muted}}>{k}</span><span style={{color:C.text,fontWeight:500}}>{v}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginBottom:"16px" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", fontWeight:700, color:C.white, marginBottom:"14px" }}>Platform Rules</div>
        {[
          `Minimum deposit: $${PLATFORM.minDeposit} USDT`,
          `Minimum withdrawal: $${PLATFORM.minWithdraw} USDT`,
          `Withdrawal fee: ${PLATFORM.withdrawFee}%`,
          `Monthly performance reward: ${PLATFORM.monthlyReturn}%`,
          "Withdrawals processed within 24–48 hours",
          "Network: USDT TRC20 only",
        ].map(r => (
          <div key={r} style={{ padding:"7px 0", borderBottom:`1px solid ${C.border}`, fontSize:"13px", color:C.muted }}>→ {r}</div>
        ))}
      </div>
      <div style={{ background:"#100800", border:`1px solid ${C.gold}33`, borderRadius:"10px", padding:"14px 18px", fontSize:"13px", color:`${C.gold}AA`, lineHeight:1.7 }}>
        ⚠ Never share your password or 2FA code with anyone — including Wealth Bridge Africa support staff. Contact us via <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer" style={{color:C.green,textDecoration:"none"}}>{PLATFORM.whatsapp}</a>
      </div>
    </div>
  );
}

/* ── SUPPORT PAGE ──────────────────────────────────────────── */
function Support() {
  return (
    <div style={{ maxWidth:"680px" }}>
      <div style={{ marginBottom:"28px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:800, color:C.white, marginBottom:"6px" }}>Support Center</h3>
        <p style={{ color:C.muted, fontSize:"14px" }}>We're here to help. Reach out via any channel below.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"16px", marginBottom:"28px" }}>
        {[
          { icon:"💬", label:"WhatsApp (Fastest)", val:PLATFORM.whatsapp, link:PLATFORM.whatsappLink, color:C.green, note:"Typical reply: under 2 hours" },
          { icon:"✈️", label:"Telegram Channel", val:PLATFORM.telegram, link:PLATFORM.telegramLink, color:C.blue, note:"Announcements & updates" },
          { icon:"📧", label:"Email Support", val:PLATFORM.email, link:`mailto:${PLATFORM.email}`, color:C.gold, note:"Replies within 24 hours" },
        ].map((c,i) => (
          <a key={i} href={c.link} target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
            <div className="card" style={{ textAlign:"center", cursor:"pointer", borderTop:`3px solid ${c.color}` }}>
              <div style={{ fontSize:"36px", marginBottom:"12px" }}>{c.icon}</div>
              <div style={{ fontSize:"12px", color:C.muted, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"6px" }}>{c.label}</div>
              <div style={{ color:c.color, fontWeight:600, fontSize:"13px", wordBreak:"break-all", marginBottom:"6px" }}>{c.val}</div>
              <div style={{ fontSize:"11px", color:C.muted }}>{c.note}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="card" style={{ marginBottom:"20px" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:700, color:C.white, marginBottom:"20px" }}>❓ Frequently Asked Questions</div>
        {[
          { q:`What is the minimum deposit?`, a:`Minimum deposit is $${PLATFORM.minDeposit} USDT on the TRC20 network.` },
          { q:"How do I deposit?", a:`Send USDT TRC20 to our wallet address: ${PLATFORM.depositWallet}. Then submit your TxID in the deposit form.` },
          { q:"How are rewards calculated?", a:`You earn ${PLATFORM.monthlyReturn}% of your wallet balance every month. This is credited automatically on the 1st of each month. It's based on platform performance.` },
          { q:"When can I withdraw?", a:`Anytime. Minimum withdrawal is $${PLATFORM.minWithdraw}. Requests are processed within 24–48 hours by our team.` },
          { q:"What is the withdrawal fee?", a:`We charge a ${PLATFORM.withdrawFee}% fee on withdrawals. For example, withdrawing $100 means you receive $${100 - 100*PLATFORM.withdrawFee/100}.` },
          { q:"Is my money safe?", a:"We maintain a 30% liquid reserve at all times. Every withdrawal is manually verified. All transactions are verifiable on the TRON blockchain." },
          { q:"How does the referral program work?", a:`Share your unique link. When a friend deposits, you earn ${PLATFORM.referralL1}% of their first deposit instantly. Level 2 referrals earn ${PLATFORM.referralL2}%.` },
        ].map((f,i) => (
          <div key={i} style={{ padding:"16px 0", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontWeight:600, color:C.white, fontSize:"14px", marginBottom:"6px" }}>Q: {f.q}</div>
            <div style={{ color:C.muted, fontSize:"13px", lineHeight:1.7 }}>A: {f.a}</div>
          </div>
        ))}
      </div>

      <div className="alert-success">
        💬 Still need help? The fastest way to reach us is <strong>WhatsApp: <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer" style={{color:C.green,textDecoration:"none"}}>{PLATFORM.whatsapp}</a></strong>.
        We typically respond within 2 hours.
      </div>
    </div>
  );
}

/* ── APP ROOT ──────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("landing");
  const [dashPage, setDashPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);

  const user = MOCK_USER;
  const login = () => { setLoggedIn(true); setPage("app"); setDashPage("dashboard"); };
  const logout = () => { setLoggedIn(false); setPage("landing"); };

  return (
    <>
      <style>{GS}</style>

      {/* Top nav — public pages only */}
      {page !== "app" && (
        <nav style={{
          position:"sticky", top:0, zIndex:200,
          background:"rgba(6,10,6,.95)", backdropFilter:"blur(16px)",
          borderBottom:`1px solid ${C.border}`,
          padding:"0 24px", display:"flex", alignItems:"center",
          justifyContent:"space-between", height:"60px",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", cursor:"pointer" }} onClick={() => setPage("landing")}>
            {/* Icon mark */}
            <div style={{
              width:"34px", height:"34px", borderRadius:"8px", flexShrink:0,
              background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"16px", fontWeight:900, color:"#000",
              fontFamily:"'Outfit',sans-serif", letterSpacing:"-1px",
            }}>W</div>
            {/* Text */}
            <div>
              <div style={{ fontSize:"14px", fontWeight:700, color:C.white, letterSpacing:".3px", lineHeight:1.1, fontFamily:"'Outfit',sans-serif" }}>
                Wealth Bridge
              </div>
              <div style={{ fontSize:"10px", color:C.gold, letterSpacing:"2px", textTransform:"uppercase", lineHeight:1 }}>
                Africa
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            <a href={PLATFORM.whatsappLink} target="_blank" rel="noreferrer">
              <button className="btn-ghost" style={{ fontSize:"13px", color:C.green }}>💬 {PLATFORM.whatsapp}</button>
            </a>
            <button className="btn-outline" onClick={() => setPage("login")} style={{ padding:"8px 18px", fontSize:"13px" }}>Sign In</button>
            <button className="btn-gold" onClick={() => setPage("register")} style={{ padding:"9px 20px", fontSize:"13px" }}>Get Started</button>
          </div>
        </nav>
      )}

      {page !== "app" && <Ticker />}

      {/* Pages */}
      {page === "landing"   && <Landing onNav={setPage} />}
      {page === "login"     && <Auth mode="login"    onNav={setPage} onLogin={login} />}
      {page === "register"  && <Auth mode="register" onNav={setPage} onLogin={login} />}

      {page === "app" && (
        <Layout user={user} page={dashPage} setPage={setDashPage} onLogout={logout}>
          {dashPage === "dashboard" && <DashHome user={user} setPage={setDashPage} />}
          {dashPage === "deposit"   && <Deposit  user={user} />}
          {dashPage === "withdraw"  && <Withdraw user={user} />}
          {dashPage === "referral"  && <Referral user={user} />}
          {dashPage === "history"   && <History />}
          {dashPage === "profile"   && <Profile  user={user} />}
          {dashPage === "support"   && <Support />}
        </Layout>
      )}
    </>
  );
}
