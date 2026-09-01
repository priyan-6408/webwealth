import { useState } from "react";
import "./App.css";
import { mockAnalysis } from "./data/mockData";
import DecisionXRay from "./components/DecisionXRay";

function App() {
  const analysis = mockAnalysis;
  const [stock, setStock] = useState("RELIANCE");
  const [profile, setProfile] = useState("Moderate");
  const [showWhy, setShowWhy] = useState(false);
  const [showXRay, setShowXRay] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const profileData = {
    Conservative: {
      risk: 42,
      concentration: "18%",
      verdict: "CAUTIOUS",
      verdictText:
        "Your current exposure makes additional risk less suitable for a conservative profile."
    },
    Moderate: {
      risk: 62,
      concentration: "28%",
      verdict: "CAUTIOUSLY BULLISH",
      verdictText:
        "Momentum is positive, but your existing exposure increases portfolio concentration risk."
    },
    Aggressive: {
      risk: 76,
      concentration: "34%",
      verdict: "BULLISH",
      verdictText:
        "The current momentum supports continued exposure, although volatility remains elevated."
    }
  };

  const currentProfile = profileData[profile];

  return (
    <div className="app">

      {/* HEADER */}
      <header className="topbar">
        <div className="brand">
          <div className="logo">🕸️</div>
          <div>
            <h1>FINVERSE</h1>
            <p>AI FINANCIAL INTELLIGENCE</p>
          </div>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>
      </header>

      {/* CONTROL BAR */}
      <section className="controls">

        <div className="control-group">
          <label>SELECT ASSET</label>
          <select
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          >
            <option>RELIANCE</option>
            <option>TCS</option>
            <option>HDFC BANK</option>
            <option>INFOSYS</option>
          </select>
        </div>

        <div className="control-group">
          <label>FINANCIAL TWIN</label>
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          >
            <option>Conservative</option>
            <option>Moderate</option>
            <option>Aggressive</option>
          </select>
        </div>

        <button 
          className="analyze-button"
          onClick={() => setShowXRay(true)}>
          ⚡ ANALYZE
        </button>

      </section>

      {/* MARKET OVERVIEW */}
      <section className="market-grid">

        <div className="card market-card">
          <div className="card-label">MARKET SNAPSHOT</div>

          <div className="stock-name">{stock}</div>

          <div className="price">
            ₹1,482.30
            <span className="positive"> +1.84%</span>
          </div>

          <div className="chart">
            <div className="chart-line"></div>
          </div>

          <div className="chart-labels">
            <span>09:30</span>
            <span>11:00</span>
            <span>12:30</span>
            <span>14:00</span>
          </div>
        </div>

        <div className="card verdict-card">
          <div className="card-label">AI SYNTHESIS</div>

          <div className="verdict">
            {currentProfile.verdict}
          </div>

          <div className="confidence">
            <span>CONFIDENCE</span>
            <strong>74%</strong>
          </div>

          <div className="confidence-bar">
            <div style={{ width: "74%" }}></div>
          </div>

          <p className="verdict-text">
            {currentProfile.verdictText}
          </p>

          <button
  className="why-button"
  onClick={() => setShowXRay(!showXRay)}
>
  {showXRay ? "▲ HIDE DECISION TRACE" : "▼ TRACE DECISION"}
</button>
        </div>

      </section>
      {showXRay && (
  <DecisionXRay analysis={analysis} />)}
      {/* REASONING */}
      {showWhy && (
        <section className="card reasoning-card">
          <div className="section-title">
            🧠 DECISION TRACE
          </div>

          <div className="reasoning-grid">
            <div>
              <span>01</span>
              <p>Market momentum detected</p>
            </div>

            <div>
              <span>02</span>
              <p>Financial evidence retrieved</p>
            </div>

            <div>
              <span>03</span>
              <p>Agent signals compared</p>
            </div>

            <div>
              <span>04</span>
              <p>Portfolio risk adjusted</p>
            </div>

            <div>
              <span>05</span>
              <p>Contrarian thesis evaluated</p>
            </div>
          </div>
        </section>
      )}

      {/* AGENTS */}
      <section>
        <div className="section-heading">
          <div>
            <h2>🧠 MULTI-AGENT INTELLIGENCE</h2>
            <p>Independent analysis running in parallel</p>
          </div>

          <div className="live-badge">● LIVE ANALYSIS</div>
        </div>

        <div className="agents-grid">
          {analysis.agents.map((agent) => (
            <div className="card agent-card" key={agent.name}>

              <div className="agent-top">
                <div className="agent-icon">
                  {agent.icon}
                </div>

                <div>
                  <h3>{agent.name}</h3>
                  <span>AI AGENT</span>
                </div>
              </div>

              <div className="agent-signal">
                <strong>{agent.signal}</strong>
                <span>{agent.confidence}%</span>
              </div>

              <div className="agent-bar">
                <div
                  style={{
                    width: `${agent.confidence}%`
                  }}
                ></div>
              </div>

              <p>{agent.description}</p>

            </div>
          ))}
        </div>
      </section>

      {/* DEBATE */}
      <section className="card debate-card">

        <div className="section-heading">
          <div>
            <h2>⚔️ AGENT DEBATE</h2>
            <p>Conflicting signals are challenged before synthesis</p>
          </div>
        </div>

        <div className="debate">

          <div className="debate-message bullish">
            <span>📈 TECHNICAL AGENT</span>
            <p>
              "Momentum and volume indicate a positive setup."
            </p>
          </div>

          <div className="debate-message bearish">
            <span>🕵️ CONTRARIAN AGENT</span>
            <p>
              "The bullish thesis may underestimate valuation risk."
            </p>
          </div>

          <div className="debate-message risk">
            <span>🛡️ RISK AGENT</span>
            <p>
              "Existing portfolio concentration should influence the decision."
            </p>
          </div>

        </div>

        <div className="chief-verdict">
          <span>CHIEF ANALYST</span>
          <strong>{currentProfile.verdict}</strong>
        </div>

      </section>

      {/* BOTTOM GRID */}
      <section className="bottom-grid">

        {/* EVIDENCE */}
        <div className="card">

          <div className="card-label">
            📚 RETRIEVED EVIDENCE
          </div>

          <div className="evidence">
            <div className="source-icon">📄</div>

            <div>
              <strong>Q1 FY26 Earnings Filing</strong>
              <p>Relevance score: 91%</p>
            </div>
          </div>

          <div className="evidence">
            <div className="source-icon">📄</div>

            <div>
              <strong>Corporate Disclosure</strong>
              <p>Relevance score: 86%</p>
            </div>
          </div>

          <div className="citation-status">
            ✓ ALL MAJOR CLAIMS CITED
          </div>

        </div>

        {/* FINANCIAL TWIN */}
        <div className="card">

          <div className="card-label">
            👤 YOUR FINANCIAL TWIN
          </div>

          <div className="profile-name">
            {profile} Risk
          </div>

          <div className="profile-stat">
            <span>Portfolio Risk</span>
            <strong>{currentProfile.risk}/100</strong>
          </div>

          <div className="profile-stat">
            <span>Concentration</span>
            <strong>{currentProfile.concentration}</strong>
          </div>

          <div className="profile-stat">
            <span>Investment Horizon</span>
            <strong>5+ YEARS</strong>
          </div>

        </div>

        {/* FAILURE CONDITIONS */}
        <div className="card">

          <div className="card-label">
            ⚠️ WHAT COULD GO WRONG?
          </div>

          <ul className="failure-list">
            <li>Revenue growth deteriorates</li>
            <li>Momentum reverses</li>
            <li>Sector sentiment weakens</li>
            <li>Portfolio concentration increases</li>
          </ul>

        </div>

      </section>

      <footer>
        FINVERSE • MULTI-AGENT FINANCIAL INTELLIGENCE
        <span> • DECISION SUPPORT — NOT FINANCIAL ADVICE</span>
      </footer>

    </div>
  );
}

export default App;