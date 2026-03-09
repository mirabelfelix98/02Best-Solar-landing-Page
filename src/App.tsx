import React, { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 25);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-number">
      {count >= 1000 ? count.toLocaleString() : count}<span>{suffix}</span>
    </span>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const faders = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    faders.forEach(f => observer.observe(f));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const tickerItems = [
    "Solar Panel Installation", "Battery Storage Systems", "Home Solar Setup",
    "Business Solar Solutions", "Industrial Inverters", "Free Energy Audit",
    "Cold Room Power", "School Solar Systems", "Hotel Solar Setup",
    "24/7 Maintenance Support", "Zero Fuel Bills", "Steady Power Guaranteed"
  ];
  const fullTickerItems = [...tickerItems, ...tickerItems];

  return (
    <>
      <a href="https://wa.me/2348000000000?text=SOLAR" className="wa-float" title="WhatsApp Us" target="_blank" rel="noopener noreferrer">📲</a>

      <nav id="navbar" style={{ background: scrolled ? 'rgba(5,5,5,0.97)' : 'rgba(8,8,8,0.88)' }}>
        <a href="#" className="nav-logo">02<span>Best</span> Solar</a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          <li><a href="#services" onClick={() => setMenuOpen(false)}>Services</a></li>
          <li><a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a></li>
          <li><a href="#proof" onClick={() => setMenuOpen(false)}>Results</a></li>
          <li><a href="#bonuses" onClick={() => setMenuOpen(false)}>Bonuses</a></li>
        </ul>
        <a href="https://wa.me/2348000000000?text=SOLAR" className="btn-primary nav-cta" target="_blank" rel="noopener noreferrer">Book Now</a>
        <div className="nav-hamburger" id="hamburger" onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-rays"></div>

        <div className="hero-content">
          <span className="eyebrow">⚡ Attention: Lagos · Abuja · Port Harcourt · Ibadan · Enugu</span>

          <h1 className="hero-headline">
            Stop Feeding<br/>
            That Generator.<br/>
            <em>Start Living</em> on Solar.
          </h1>

          <p className="hero-sub">
            Finally — a complete, professionally installed solar system built for <em style={{color: 'var(--accent)', fontStyle: 'italic'}}>real Nigerian conditions.</em>
            No more fuel wahala. No more noise. No more NEPA stress. Your AC, fridge, lights, and business — running 24/7.
          </p>

          <div className="hero-cta">
            <a href="https://wa.me/2348000000000?text=SOLAR" className="btn-primary" target="_blank" rel="noopener noreferrer">👉 Book Your Free Energy Audit</a>
            <a href="#proof" className="btn-ghost">See Real Results →</a>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <AnimatedCounter target={1200} suffix="+" />
              <span className="stat-label">Homes & Businesses Powered</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <AnimatedCounter target={5} suffix="+" />
              <span className="stat-label">States Across Nigeria</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <AnimatedCounter target={98} suffix="%" />
              <span className="stat-label">Customer Satisfaction Rate</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-number">24<span>/7</span></span>
              <span className="stat-label">Ongoing Support</span>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker-track" id="ticker">
          {fullTickerItems.map((item, i) => (
            <span key={i} className="ticker-item">{item}<span className="ticker-dot"></span></span>
          ))}
        </div>
      </div>

      <section id="pain">
        <div className="section-inner">
          <span className="section-eyebrow fade-up">The Real Problem Nobody Talks About</span>
          <h2 className="section-headline fade-up delay-1">You Wake Up Every Morning to the <em>Same War</em></h2>
          <p className="section-body fade-up delay-2">
            Generator still dey run. Fuel dey finish fast. AC dey blow hot. Fridge no dey keep things properly.
            Kids dey try read for night, lights dey flicker — and you dey stress dey try manage everything before NEPA commot light again.
          </p>

          <div className="pain-grid">
            <ul className="pain-list">
              <li className="pain-item fade-up delay-1">
                <span className="pain-icon">⛽</span>
                <div className="pain-text"><strong>Fuel bills wey never stop climbing.</strong> You dey spend thousands every week just to keep generator running — money wey could have built something better.</div>
              </li>
              <li className="pain-item fade-up delay-2">
                <span className="pain-icon">😤</span>
                <div className="pain-text"><strong>Constant noise and frustration.</strong> That generator sound don become soundtrack of your life — and everybody for your compound dey tired of it.</div>
              </li>
              <li className="pain-item fade-up delay-3">
                <span className="pain-icon">📚</span>
                <div className="pain-text"><strong>Your children dey study under bad light.</strong> Flickering bulbs no good for their eyes, their grades, or their future.</div>
              </li>
              <li className="pain-item fade-up delay-4">
                <span className="pain-icon">💼</span>
                <div className="pain-text"><strong>Business opportunities dey lost.</strong> Meetings dey cancel, cold rooms dey spoil, customers dey complain. Light wahala na silent business killer.</div>
              </li>
              <li className="pain-item fade-up delay-5">
                <span className="pain-icon">😰</span>
                <div className="pain-text"><strong>Embarrassment in front of guests & clients.</strong> Whenever visitor come or important call enter, you dey ashamed say your power no stable.</div>
              </li>
            </ul>

            <div className="pain-quote-block fade-up delay-2">
              <p className="pain-quote">
                "You no dey lazy. You dey careful. You dey look for something real, reliable — not another cheap solution wey go fail in three months."
              </p>
              <span className="pain-quote-attr">— This is what your situation actually demands</span>
            </div>
          </div>
        </div>
      </section>

      <section id="cost">
        <div className="section-inner">
          <span className="section-eyebrow fade-up">The Real Price You're Paying</span>
          <h2 className="section-headline fade-up delay-1">Generator Wahala No Dey Only <em>Drain Fuel.</em><br/>E Dey Steal Your Life.</h2>
          <p className="section-body fade-up delay-2">
            The hidden cost goes far beyond the fuel receipts. Every single day you dey manage this wahala, something bigger is being lost.
          </p>

          <div className="cost-cards">
            <div className="cost-card fade-up delay-1">
              <span className="cost-icon">⏳</span>
              <h3>Your Time</h3>
              <p>Every week: fill tank, manage maintenance, check engine, buy parts. Hours you can never get back — hours your competitors are using to grow.</p>
            </div>
            <div className="cost-card fade-up delay-2">
              <span className="cost-icon">👨‍👩‍👧</span>
              <h3>Your Family's Comfort</h3>
              <p>Kids studying under flickering lights. Spouse dey complain say house no comfortable. The stress e put on your family relationship no get price.</p>
            </div>
            <div className="cost-card fade-up delay-3">
              <span className="cost-icon">💡</span>
              <h3>Your Confidence</h3>
              <p>Deep down, something dey wrong when you no fit guarantee power for your own home or business. That low-level anxiety — you deserve better.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="shift">
        <div className="shift-inner section-inner">
          <span className="section-eyebrow fade-up">A New Way of Seeing This</span>
          <h2 className="section-headline fade-up delay-1">What If the Wahala<br/>No Suppose <em>Be Like This?</em></h2>
          <p className="section-body fade-up delay-2" style={{margin: '0 auto'}}>
            Most people think: "Na Nigeria — this na how e be." That's exactly what makes them stay stuck for years. The truth is: the right solar system dey designed to run your AC, fridge, lights, TV — even when NEPA commot. Not one-size-fits-all panels. A <em style={{color: 'var(--accent)', fontStyle: 'italic'}}>custom solution built for you.</em>
          </p>

          <div className="shift-divider fade-up delay-3">
            <div className="shift-line"></div>
            <span className="shift-icon">☀️</span>
            <div className="shift-line"></div>
          </div>

          <div className="shift-comparison fade-up delay-2">
            <div className="shift-col before">
              <div className="shift-col-label">❌ Right Now</div>
              <ul>
                <li><span className="bullet">→</span> Generator dey run every morning</li>
                <li><span className="bullet">→</span> Fuel bills wey never stop</li>
                <li><span className="bullet">→</span> Noisy nights, hot afternoons</li>
                <li><span className="bullet">→</span> AC dey blow hot or no work</li>
                <li><span className="bullet">→</span> Business dey depend on NEPA</li>
                <li><span className="bullet">→</span> Constant stress & embarrassment</li>
                <li><span className="bullet">→</span> Monthly money wey never build anything</li>
              </ul>
            </div>
            <div className="shift-col after">
              <div className="shift-col-label">✅ After 02Best Solar</div>
              <ul>
                <li><span className="bullet">⚡</span> <strong>Silence.</strong> No generator. No noise.</li>
                <li><span className="bullet">⚡</span> <strong>Zero fuel bills.</strong> Sunshine is free.</li>
                <li><span className="bullet">⚡</span> Cool nights, comfortable afternoons</li>
                <li><span className="bullet">⚡</span> AC running 24/7, fridge staying cold</li>
                <li><span className="bullet">⚡</span> Business running smooth, always</li>
                <li><span className="bullet">⚡</span> Confidence & peace of mind</li>
                <li><span className="bullet">⚡</span> Investment wey pays you back every day</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="solution">
        <div className="section-inner">
          <span className="section-eyebrow fade-up">Finally — A Method That Works</span>
          <h2 className="section-headline fade-up delay-1">This No Be About Buying Panels.<br/><em>This Na About a System.</em></h2>
          <p className="section-body fade-up delay-2">
            When others fail, e dey usually small battery, wrong inverter, poor installation, or zero support after sale.
            The right approach dey simple when someone qualified dey guide you.
          </p>

          <div className="solution-grid">
            <div className="solution-steps fade-up delay-2">
              <div className="solution-step">
                <span className="step-num">01</span>
                <div className="step-content">
                  <h4>We Visit & Assess</h4>
                  <p>Our engineers come to your home or business, check your appliances, and calculate your exact energy needs. No guesswork.</p>
                </div>
              </div>
              <div className="solution-step">
                <span className="step-num">02</span>
                <div className="step-content">
                  <h4>We Design Your Custom System</h4>
                  <p>Based on your actual load, we recommend the right panels, batteries, and inverter combination — not generic, not oversized, not undersized.</p>
                </div>
              </div>
              <div className="solution-step">
                <span className="step-num">03</span>
                <div className="step-content">
                  <h4>We Install Professionally</h4>
                  <p>Our certified team installs everything correctly. Proper wiring, mounting, and testing — so it works from day one and lasts for years.</p>
                </div>
              </div>
              <div className="solution-step">
                <span className="step-num">04</span>
                <div className="step-content">
                  <h4>We Support You Ongoing</h4>
                  <p>We don't disappear after installation. Maintenance, monitoring, quick fixes — we stay with you long after the job is done.</p>
                </div>
              </div>
            </div>

            <div className="formula-box fade-up delay-3">
              <h3>The 02Best Power Formula</h3>
              <div className="formula-line">
                <span className="plus">&nbsp;</span> Premium Solar Panels
              </div>
              <div className="formula-line">
                <span className="plus">+</span> Deep Cycle Batteries
              </div>
              <div className="formula-line">
                <span className="plus">+</span> Industrial-Grade Inverter
              </div>
              <div className="formula-line">
                <span className="plus">+</span> Certified Professional Installation
              </div>
              <div className="formula-line">
                <span className="plus">+</span> 6-Month Maintenance Support
              </div>
              <a href="#cta" className="formula-result" style={{display: 'block', textDecoration: 'none', cursor: 'pointer', transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease'}} onMouseOver={(e) => {e.currentTarget.style.background='rgba(201,168,76,0.2)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(201,168,76,0.25)'; e.currentTarget.style.transform='translateY(-2px)'}} onMouseOut={(e) => {e.currentTarget.style.background=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform=''}}>
                = Steady, Reliable Power. 24/7. &nbsp;👉
              </a>

              <div style={{marginTop: '32px', padding: '20px 0 0', borderTop: '1px solid var(--border)'}}>
                <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7}}>
                  "This solution dey work for thousands of Nigerians already — homeowners, school owners, hotel operators, and business owners who refuse to let NEPA or fuel wahala hold them back."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="section-inner">
          <span className="section-eyebrow fade-up">What We Provide</span>
          <h2 className="section-headline fade-up delay-1">Everything You Need<br/>for <em>Complete Solar Power</em></h2>
          <p className="section-body fade-up delay-2">
            02Best Solar Enterprise provides complete, end-to-end solar solutions. We handle everything — from the first site visit to the last bolt.
          </p>

          <div className="services-grid">
            <div className="service-card fade-up delay-1">
              <span className="service-number">01</span>
              <span className="service-icon">🔆</span>
              <h3>Premium Solar Panels</h3>
              <p>High-efficiency panels engineered to capture maximum Nigerian sunlight — even on overcast days. Built to last 25+ years with proper maintenance.</p>
            </div>
            <div className="service-card fade-up delay-2">
              <span className="service-number">02</span>
              <span className="service-icon">🔋</span>
              <h3>Long-Life Battery Banks</h3>
              <p>Deep cycle batteries that store enough energy for overnight and extended NEPA outages. Your lights, fridge and AC stay on — period.</p>
            </div>
            <div className="service-card fade-up delay-3">
              <span className="service-number">03</span>
              <span className="service-icon">⚡</span>
              <h3>Industrial Inverters</h3>
              <p>High-capacity inverters that run your heavy appliances — AC units, cold rooms, industrial equipment — without tripping or overheating.</p>
            </div>
            <div className="service-card fade-up delay-1">
              <span className="service-number">04</span>
              <span className="service-icon">🔧</span>
              <h3>Certified Installation</h3>
              <p>Our qualified engineers install everything correctly — proper mounting, safe wiring, full system testing — before we hand over to you.</p>
            </div>
            <div className="service-card fade-up delay-2">
              <span className="service-number">05</span>
              <span className="service-icon">🏪</span>
              <h3>Business & Commercial Systems</h3>
              <p>Small shops, restaurants, hotels, schools, cold rooms, offices — we design and install systems that keep your business running and profitable.</p>
            </div>
            <div className="service-card fade-up delay-3">
              <span className="service-number">06</span>
              <span className="service-icon">🛠️</span>
              <h3>Maintenance & Support</h3>
              <p>Ongoing maintenance, troubleshooting, and system monitoring. We don't disappear after installation — we stay your power partner for years.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="section-inner">
          <span className="section-eyebrow fade-up">The Process</span>
          <h2 className="section-headline fade-up delay-1">From Zero to<br/><em>Steady Power</em> in 4 Steps</h2>

          <div className="how-track">
            <div className="how-step fade-up delay-1">
              <div className="how-step-num">01</div>
              <h4>Contact Us</h4>
              <p>DM us "SOLAR" on WhatsApp or click the booking button. We respond within the hour — no waiting, no runaround.</p>
            </div>
            <div className="how-step fade-up delay-2">
              <div className="how-step-num">02</div>
              <h4>Free Site Visit & Audit</h4>
              <p>We visit your home or business, inspect your appliances, measure your energy load, and design your perfect custom system.</p>
            </div>
            <div className="how-step fade-up delay-3">
              <div className="how-step-num">03</div>
              <h4>Professional Installation</h4>
              <p>Our certified team installs your complete system — panels, batteries, inverter, wiring — safely and correctly, on schedule.</p>
            </div>
            <div className="how-step fade-up delay-4">
              <div className="how-step-num">04</div>
              <h4>Enjoy Steady Power</h4>
              <p>Generator rests. Fuel bills stop. AC dey blow cold, fridge keeping food fresh, kids dey read comfortably. Peace at last.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="proof">
        <div className="section-inner">
          <span className="section-eyebrow fade-up">Real Results. Real Nigerians.</span>
          <h2 className="section-headline fade-up delay-1">No Hype. Just People<br/><em>Like You</em> Who Made the Switch.</h2>
          <p className="section-body fade-up delay-2">
            From Lagos to Abuja to Port Harcourt — Nigerians across the country don finally rest their generators. Here's what they're saying.
          </p>

          <div className="proof-grid">
            <div className="testimonial-card fade-up delay-1">
              <div className="stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div>
              <p className="testimonial-quote">
                "I don run AC, fridge, and all my lights for 2 years now — zero generator wahala. My fuel bill don disappear completely. Na the best investment I ever make for my family."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AO</div>
                <div className="author-info">
                  <span className="author-name">Alhaji Usman O.</span>
                  <span className="author-role">Homeowner · Abuja, FCT</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card fade-up delay-2">
              <div className="stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div>
              <p className="testimonial-quote">
                "My fuel cost don drop by more than half. Customers dey happy say business dey run smooth even when NEPA commot. My hotel reputation don improve because of this solar system."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">CE</div>
                <div className="author-info">
                  <span className="author-name">Mrs. Chioma E.</span>
                  <span className="author-role">Hotel Owner · Port Harcourt</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card fade-up delay-3">
              <div className="stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div>
              <p className="testimonial-quote">
                "Before, my cold room don spoil goods worth hundreds of thousands. Since 02Best Solar install my system, e never happen once. The system pay for itself in less than 6 months."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">BK</div>
                <div className="author-info">
                  <span className="author-name">Babatunde K.</span>
                  <span className="author-role">Shop Owner · Lagos Island</span>
                </div>
              </div>
            </div>
          </div>

          <div className="proof-cities fade-up delay-2">
            <div className="city-badge">🏙️ Lagos <span>— Active</span></div>
            <div className="city-badge">🏛️ Abuja <span>— Active</span></div>
            <div className="city-badge">🛢️ Port Harcourt <span>— Active</span></div>
            <div className="city-badge">🌿 Ibadan <span>— Active</span></div>
            <div className="city-badge">🏘️ Enugu <span>— Active</span></div>
          </div>
        </div>
      </section>

      <section id="bonuses">
        <div className="section-inner">
          <span className="section-eyebrow fade-up">What You Get When You Book Today</span>
          <h2 className="section-headline fade-up delay-1">Exclusive Bonuses to<br/><em>Eliminate Every Risk</em></h2>
          <p className="section-body fade-up delay-2">
            When you book through 02Best Solar Enterprise, you don't just get a solar system. You get a complete, risk-free experience designed to give you total peace of mind.
          </p>

          <div className="bonuses-grid">
            <div className="bonus-card fade-up delay-1">
              <span className="bonus-num">1</span>
              <span className="bonus-icon">🔍</span>
              <div className="bonus-content">
                <h4>Free Home & Business Energy Audit</h4>
                <p>We visit, inspect every appliance, and calculate your exact energy load — so your system is perfectly sized. No over-buying. No under-buying.</p>
              </div>
            </div>
            <div className="bonus-card fade-up delay-2">
              <span className="bonus-num">2</span>
              <span className="bonus-icon">🛡️</span>
              <div className="bonus-content">
                <h4>Extended Maintenance Support (6 Months Free)</h4>
                <p>Free follow-up visits and small fixes for 6 months after installation. We stay accountable — your satisfaction is our commitment.</p>
              </div>
            </div>
            <div className="bonus-card fade-up delay-3">
              <span className="bonus-num">3</span>
              <span className="bonus-icon">🚀</span>
              <div className="bonus-content">
                <h4>Priority Installation Scheduling</h4>
                <p>Get moved to the front of the queue. Your system goes live faster — no long waiting period while you continue to suffer fuel wahala.</p>
              </div>
            </div>
            <div className="bonus-card fade-up delay-4">
              <span className="bonus-num">4</span>
              <span className="bonus-icon">📖</span>
              <div className="bonus-content">
                <h4>Mini Solar Training Guide</h4>
                <p>Learn exactly how to maximize your battery life, cut energy waste, and get the most from your system every single day.</p>
              </div>
            </div>
            <div className="bonus-card fade-up delay-1">
              <span className="bonus-num">5</span>
              <span className="bonus-icon">💬</span>
              <div className="bonus-content">
                <h4>WhatsApp Support Group Access</h4>
                <p>Join our exclusive community of solar users. Get instant tips, share wins, troubleshoot issues — 24/7 peer and expert support.</p>
              </div>
            </div>
          </div>

          <p className="bonuses-cta-note fade-up delay-3">
            "These bonuses dey designed to reduce your risk, accelerate your results, and give you genuine peace of mind from day one — not after problems arise."
          </p>
        </div>
      </section>

      <section id="cta">
        <div className="section-inner">
          <span className="section-eyebrow fade-up">Your Choice</span>
          <h2 className="cta-headline fade-up delay-1">
            The Generator Can<br/>
            Rest <em>Starting Today.</em>
          </h2>
          <p className="cta-sub fade-up delay-2">
            You get a choice right now. Continue dey manage flickering lights, noisy generator, and fuel wahala — or take one small action today and enjoy quiet, reliable power every morning for the next 25 years.
          </p>

          <div className="cta-buttons fade-up delay-3">
            <a href="https://wa.me/2348000000000?text=SOLAR" className="btn-primary" target="_blank" rel="noopener noreferrer">👉 Book My Free Energy Audit Now</a>
            <a href="https://wa.me/2348000000000?text=SOLAR" className="btn-ghost" target="_blank" rel="noopener noreferrer">DM "SOLAR" on WhatsApp →</a>
          </div>

          <p className="cta-note fade-up delay-4">
            Not ready yet? <a href="https://wa.me/2348000000000?text=JOIN+SOLAR+GROUP">Join our free WhatsApp group</a> — watch how others are running solar smoothly. Zero pressure.
          </p>

          <div className="cta-trust fade-up delay-3">
            <div className="trust-item"><span className="trust-icon">🛡️</span> Certified Professional Installation</div>
            <div className="trust-item"><span className="trust-icon">✅</span> Full Warranty on Equipment</div>
            <div className="trust-item"><span className="trust-icon">⚡</span> 6-Month Free Maintenance</div>
            <div className="trust-item"><span className="trust-icon">📞</span> 24/7 WhatsApp Support</div>
            <div className="trust-item"><span className="trust-icon">🇳🇬</span> Built for Nigerian Conditions</div>
          </div>
        </div>
      </section>

      <section id="dream">
        <div className="section-inner">
          <span className="section-eyebrow fade-up">Imagine This for a Moment</span>
          <h2 className="section-headline fade-up delay-1">This Is Your Life<br/><em>After the Switch.</em></h2>
          <p className="section-body fade-up delay-2" style={{margin: '0 auto'}}>
            You don become the person wey no dey stress about power. The one wey dey live comfortably, save money, and run their business or family with full confidence — because you took action when you saw this page.
          </p>

          <div className="dream-grid">
            <div className="dream-item fade-up delay-1">
              <span className="dream-emoji">❄️</span>
              <h4>Cool Comfort, Always</h4>
              <p>AC dey blow cold all day and night. No more hot afternoons, no more uncomfortable evenings. Your home is your sanctuary.</p>
            </div>
            <div className="dream-item fade-up delay-2">
              <span className="dream-emoji">📚</span>
              <h4>Kids Thriving</h4>
              <p>Your children dey study under steady, bright light. Their focus dey sharp, their grades dey improve — because you gave them the right environment.</p>
            </div>
            <div className="dream-item fade-up delay-3">
              <span className="dream-emoji">🏪</span>
              <h4>Business Running Smooth</h4>
              <p>No more cancelled meetings. Cold room staying cold. Customers happy. Staff performing their best. Revenue dey grow because power never interrupt.</p>
            </div>
            <div className="dream-item fade-up delay-1">
              <span className="dream-emoji">💰</span>
              <h4>Fuel Money Saved</h4>
              <p>Thousands of naira every month — kept in your pocket instead of the fuel station. That money now dey build your future.</p>
            </div>
            <div className="dream-item fade-up delay-2">
              <span className="dream-emoji">🔇</span>
              <h4>Peace & Quiet</h4>
              <p>Generator don rest. Compound dey quiet. Neighbours thankful. You dey sleep deeply, wake up refreshed — every single morning.</p>
            </div>
            <div className="dream-item fade-up delay-3">
              <span className="dream-emoji">👑</span>
              <h4>Total Control</h4>
              <p>NEPA no fit control your life anymore. You dey in full control of your power, your time, your comfort — and your peace of mind.</p>
            </div>
          </div>

          <div style={{textAlign: 'center', marginTop: '60px'}} className="fade-up delay-2">
            <p style={{fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,28px)', fontStyle: 'italic', color: 'var(--text-headline)', maxWidth: '680px', margin: '0 auto 36px', lineHeight: 1.5}}>
              "Na so your life dey when you no let NEPA or fuel wahala hold you back anymore."
            </p>
            <a href="https://wa.me/2348000000000?text=SOLAR" className="btn-primary" style={{fontSize: '13px', padding: '18px 48px'}} target="_blank" rel="noopener noreferrer">
              👉 I'm Ready — Book My Free Audit
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="nav-logo">02<span>Best</span> Solar</a>
              <p className="footer-tagline">
                Steady, reliable solar power for Nigerian homes and businesses. Built for real conditions. Backed by real people.
              </p>
              <div className="footer-social">
                <a href="#" className="social-btn" title="WhatsApp">📲</a>
                <a href="#" className="social-btn" title="Facebook">📘</a>
                <a href="#" className="social-btn" title="Instagram">📸</a>
              </div>
            </div>

            <div className="footer-col">
              <h5>Services</h5>
              <ul>
                <li><a href="#services">Solar Panels</a></li>
                <li><a href="#services">Battery Storage</a></li>
                <li><a href="#services">Inverter Systems</a></li>
                <li><a href="#services">Installation</a></li>
                <li><a href="#services">Maintenance</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Company</h5>
              <ul>
                <li><a href="#how">How It Works</a></li>
                <li><a href="#proof">Results</a></li>
                <li><a href="#bonuses">Our Bonuses</a></li>
                <li><a href="#cta">Book a Visit</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Locations</h5>
              <ul>
                <li><a href="#">Lagos</a></li>
                <li><a href="#">Abuja (FCT)</a></li>
                <li><a href="#">Port Harcourt</a></li>
                <li><a href="#">Ibadan</a></li>
                <li><a href="#">Enugu</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">© 2025 02Best Solar Enterprise. All rights reserved.</p>
            <p className="footer-accent">Steady Power. Zero Stress. Built for Nigeria.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
