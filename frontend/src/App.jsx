import { useMemo, useState } from "react";
import "./App.css";
import { mockAnalysis } from "./data/mockData";
import DecisionXRay from "./components/DecisionXRay";

function App() {
  const [stock, setStock] = useState("RELIANCE");
  const [profile, setProfile] = useState("Moderate");
  const [showXRay, setShowXRay] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // NEW:
  // Stores the agent/topic currently being viewed
  const [selectedAgent, setSelectedAgent] = useState(null);

  const profileData = {
    Conservative: {
      risk: 42,
      concentration: "18%",
      verdict: "CAUTIOUS",
      verdictText:
        "Your current exposure makes additional risk less suitable for a conservative profile.",
    },
    Moderate: {
      risk: 62,
      concentration: "28%",
      verdict: "CAUTIOUSLY BULLISH",
      verdictText:
        "Momentum is positive, but your existing exposure increases portfolio concentration risk.",
    },
    Aggressive: {
      risk: 76,
      concentration: "34%",
      verdict: "BULLISH",
      verdictText:
        "The current momentum supports continued exposure, although volatility remains elevated.",
    },
  };

  const stockData = {
    RELIANCE: {
      price: 1482.3,
      change: 1.84,
      name: "Reliance Industries",
      trend: "BULLISH",
    },

    TCS: {
      price: 4218.65,
      change: 0.92,
      name: "Tata Consultancy Services",
      trend: "POSITIVE",
    },

    "HDFC BANK": {
      price: 1976.4,
      change: 1.27,
      name: "HDFC Bank",
      trend: "BULLISH",
    },

    INFOSYS: {
      price: 1894.25,
      change: -0.48,
      name: "Infosys",
      trend: "NEUTRAL",
    },
  };

  const currentProfile = profileData[profile];
  const currentStock = stockData[stock];

  const analysis = useMemo(() => {
    return {
      ...mockAnalysis,

      asset: {
        ...mockAnalysis.asset,
        symbol: stock,
        name: currentStock.name,
        price: currentStock.price,
        change: currentStock.change,
      },

      market: {
        ...mockAnalysis.market,
        trend: currentStock.trend,
      },

      synthesis: {
        ...mockAnalysis.synthesis,
        verdict: currentProfile.verdict,
        summary: currentProfile.verdictText,
      },

      financialTwin: {
        ...mockAnalysis.financialTwin,
        profile,
        riskScore: currentProfile.risk,
        concentration: parseInt(currentProfile.concentration),
      },
    };
  }, [stock, profile, currentProfile, currentStock]);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setShowXRay(false);
    setSelectedAgent(null);

    setTimeout(() => {
      setAnalyzing(false);
      setShowXRay(true);
    }, 900);
  };

  // =========================================================
  // AGENT DETAIL DATA
  // =========================================================

  const getAgentDescription = (agent) => {
    const name = agent.name.toLowerCase();

    if (name.includes("technical")) {
      return {
        title: "TECHNICAL ANALYSIS",
        icon: "📈",
        description:
          "Evaluates price movement, momentum, volume behavior, volatility and market trends to identify potential technical signals.",
      };
    }

    if (name.includes("fundamental")) {
      return {
        title: "FUNDAMENTAL ANALYSIS",
        icon: "🏢",
        description:
          "Evaluates the underlying business using financial strength, valuation, earnings quality and company fundamentals.",
      };
    }

    if (name.includes("sentiment")) {
      return {
        title: "MARKET SENTIMENT",
        icon: "🧠",
        description:
          "Analyzes the overall market mood and investor sentiment to determine whether market participants are optimistic, cautious or negative.",
      };
    }

    if (name.includes("risk")) {
      return {
        title: "RISK ANALYSIS",
        icon: "🛡️",
        description:
          "Identifies potential downside factors, volatility, concentration risk and conditions that could invalidate the current thesis.",
      };
    }

    if (name.includes("contrarian")) {
      return {
        title: "CONTRARIAN ANALYSIS",
        icon: "🕵️",
        description:
          "Challenges the dominant market narrative and searches for risks, overlooked information and arguments against the consensus.",
      };
    }

    if (name.includes("news")) {
      return {
        title: "NEWS ANALYSIS",
        icon: "📰",
        description:
          "Reviews relevant news and events that may influence the company's outlook, price movement or investor expectations.",
      };
    }

    if (name.includes("valuation")) {
      return {
        title: "VALUATION ANALYSIS",
        icon: "💰",
        description:
          "Examines whether the current market price appears attractive relative to the company's financial characteristics and expectations.",
      };
    }

    return {
      title: `${agent.name.toUpperCase()} ANALYSIS`,
      icon: agent.icon || "🤖",
      description:
        "This AI agent independently evaluates the selected asset and contributes its findings to the final FinVerse decision.",
    };
  };

  // =========================================================
  // AGENT DETAIL VIEW
  // =========================================================

  if (selectedAgent) {
    const agentInfo = getAgentDescription(selectedAgent);

    return (
      <div className="app">
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

        {/* BACK BUTTON */}
        <button
          className="why-button"
          onClick={() => setSelectedAgent(null)}
          style={{
            marginBottom: "20px",
            fontSize: "10px",
          }}
        >
          ← BACK TO DASHBOARD
        </button>

        {/* DETAIL HEADER */}
        <section className="card" style={{ marginBottom: "20px" }}>
          <div className="card-label">
            MULTI-AGENT INTELLIGENCE / DETAIL VIEW
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginTop: "18px",
            }}
          >
            <div
              className="agent-icon"
              style={{
                width: "55px",
                height: "55px",
                fontSize: "26px",
              }}
            >
              {agentInfo.icon}
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "25px",
                  letterSpacing: "1px",
                }}
              >
                {agentInfo.title}
              </h2>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#777",
                  fontSize: "11px",
                }}
              >
                {currentStock.name} • {stock} • {profile} Profile
              </p>
            </div>
          </div>

          <p
            style={{
              marginTop: "20px",
              color: "#aaa",
              lineHeight: "1.7",
              fontSize: "12px",
              maxWidth: "850px",
            }}
          >
            {agentInfo.description}
          </p>
        </section>

        {/* SIGNAL + CONFIDENCE */}
        <section className="market-grid">
          <div className="card">
            <div className="card-label">AGENT SIGNAL</div>

            <div
              style={{
                marginTop: "20px",
                fontSize: "30px",
                fontWeight: "900",
                color: "#ff5964",
              }}
            >
              {selectedAgent.signal}
            </div>

            <div
              style={{
                marginTop: "8px",
                color: "#777",
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
              }}
            >
              CURRENT ASSESSMENT
            </div>

            <div style={{ marginTop: "25px" }}>
              <div className="confidence">
                <span>CONFIDENCE LEVEL</span>
                <strong>{selectedAgent.confidence}%</strong>
              </div>

              <div className="confidence-bar">
                <div
                  style={{
                    width: `${selectedAgent.confidence}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-label">ASSET UNDER ANALYSIS</div>

            <div
              style={{
                marginTop: "20px",
                fontSize: "27px",
                fontWeight: "900",
              }}
            >
              {stock}
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "#777",
                fontSize: "11px",
              }}
            >
              {currentStock.name}
            </div>

            <div className="market-metrics">
              <div>
                <span>PRICE</span>
                <strong>
                  ₹
                  {currentStock.price.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              <div>
                <span>CHANGE</span>

                <strong
                  className={
                    currentStock.change >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {currentStock.change >= 0 ? "+" : ""}
                  {currentStock.change}%
                </strong>
              </div>

              <div>
                <span>TREND</span>
                <strong>{currentStock.trend}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED REASONING */}
        <section className="card" style={{ marginTop: "20px" }}>
          <div className="card-label">
            🔍 DETAILED AGENT REASONING
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gap: "12px",
            }}
          >
            {selectedAgent.reasoning &&
            selectedAgent.reasoning.length > 0 ? (
              selectedAgent.reasoning.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "15px",
                    background: "#090909",
                    border: "1px solid #241517",
                    borderLeft: "2px solid #e50914",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Space Mono, monospace",
                      color: "#ff5964",
                      fontSize: "8px",
                      marginBottom: "7px",
                    }}
                  >
                    SIGNAL {String(index + 1).padStart(2, "0")}
                  </div>

                  <div
                    style={{
                      color: "#aaa",
                      fontSize: "11px",
                      lineHeight: "1.6",
                    }}
                  >
                    {item}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  color: "#777",
                  fontSize: "11px",
                }}
              >
                No detailed reasoning data is currently available
                for this agent.
              </div>
            )}
          </div>
        </section>

        {/* SOURCE ANALYSIS */}
        <section className="card" style={{ marginTop: "20px" }}>
          <div className="card-label">
            📚 SOURCES ANALYZED
          </div>

          <div
            style={{
              marginTop: "18px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "10px",
            }}
          >
            {selectedAgent.sources &&
            selectedAgent.sources.length > 0 ? (
              selectedAgent.sources.map((source, index) => (
                <div
                  key={index}
                  style={{
                    padding: "14px",
                    background: "#090909",
                    border: "1px solid #202020",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#ddd",
                      fontSize: "10px",
                      fontWeight: "700",
                    }}
                  >
                    📄 SOURCE {index + 1}
                  </div>

                  <div
                    style={{
                      marginTop: "7px",
                      color: "#666",
                      fontSize: "9px",
                      lineHeight: "1.5",
                    }}
                  >
                    {typeof source === "string"
                      ? source
                      : JSON.stringify(source)}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  color: "#777",
                  fontSize: "10px",
                }}
              >
                No source details available.
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "15px",
              borderTop: "1px solid #1d1d1d",
              color: "#54d68b",
              fontFamily: "Space Mono, monospace",
              fontSize: "8px",
            }}
          >
            ✓ {selectedAgent.sources?.length || 0} SOURCES
            PROCESSED BY THIS AGENT
          </div>
        </section>

        {/* IMPACT ON FINAL DECISION */}
        <section
          className="card"
          style={{
            marginTop: "20px",
            borderColor: "#57181c",
          }}
        >
          <div className="card-label">
            🧠 IMPACT ON FINAL DECISION
          </div>

          <div
            style={{
              marginTop: "18px",
              padding: "18px",
              background:
                "radial-gradient(circle at center, rgba(229,9,20,0.08), transparent 70%), #080808",
              borderRadius: "9px",
              border: "1px solid #3b1518",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                color: "#777",
                fontSize: "8px",
                letterSpacing: "1px",
              }}
            >
              CHIEF ANALYST CURRENT VERDICT
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "23px",
                fontWeight: "900",
                color: "#ff5964",
              }}
            >
              {currentProfile.verdict}
            </div>

            <p
              style={{
                margin: "10px auto 0",
                maxWidth: "650px",
                color: "#777",
                fontSize: "10px",
                lineHeight: "1.6",
              }}
            >
              This agent's analysis is combined with the other
              independent agents before FinVerse produces the final
              decision-support output.
            </p>
          </div>
        </section>

        {/* CLOSE */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          <button
            className="analyze-button"
            onClick={() => setSelectedAgent(null)}
          >
            ← RETURN TO FINVERSE
          </button>
        </div>

        <footer>
          FINVERSE • MULTI-AGENT FINANCIAL INTELLIGENCE
          <span>
            {" "}
            • DECISION SUPPORT — NOT FINANCIAL ADVICE
          </span>
        </footer>
      </div>
    );
  }

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
            onChange={(e) => {
              setStock(e.target.value);
              setShowXRay(false);
              setSelectedAgent(null);
            }}
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
            onChange={(e) => {
              setProfile(e.target.value);
              setShowXRay(false);
              setSelectedAgent(null);
            }}
          >
            <option>Conservative</option>
            <option>Moderate</option>
            <option>Aggressive</option>
          </select>
        </div>

        <button
          className={`analyze-button ${
            analyzing ? "analyzing" : ""
          }`}
          onClick={handleAnalyze}
          disabled={analyzing}
        >
          {analyzing ? "◌ ANALYZING..." : "⚡ ANALYZE"}
        </button>
      </section>

      {/* QUICK STATUS */}
      <section className="quick-status">
        <div className="status-card">
          <span>ASSET</span>
          <strong>{stock}</strong>
        </div>

        <div className="status-card">
          <span>MARKET TREND</span>
          <strong className="green-text">
            {currentStock.trend}
          </strong>
        </div>

        <div className="status-card">
          <span>AI CONFIDENCE</span>
          <strong>{analysis.synthesis.confidence}%</strong>
        </div>

        <div className="status-card">
          <span>DATA QUALITY</span>
          <strong>{analysis.system.dataQuality}%</strong>
        </div>
      </section>

      {/* MARKET OVERVIEW */}
      <section className="market-grid">
        <div className="card market-card">
          <div className="card-label">MARKET SNAPSHOT</div>

          <div className="market-header">
            <div>
              <div className="stock-name">{stock}</div>
              <div className="company-name">
                {currentStock.name}
              </div>
            </div>

            <div className="market-trend">
              <span className="trend-dot"></span>
              {currentStock.trend}
            </div>
          </div>

          <div className="price">
            ₹
            {currentStock.price.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}

            <span
              className={
                currentStock.change >= 0
                  ? "positive"
                  : "negative"
              }
            >
              {currentStock.change >= 0 ? " +" : " "}
              {currentStock.change}%
            </span>
          </div>

          <div className="chart">
            <div className="chart-grid-lines"></div>
            <div className="chart-line"></div>
            <div className="chart-glow"></div>
          </div>

          <div className="chart-labels">
            <span>09:30</span>
            <span>11:00</span>
            <span>12:30</span>
            <span>14:00</span>
            <span>15:30</span>
          </div>

          <div className="market-metrics">
            <div>
              <span>MOMENTUM</span>
              <strong>
                {analysis.market.momentum}/100
              </strong>
            </div>

            <div>
              <span>VOLUME</span>
              <strong>
                {analysis.market.volumeSignal.replace(
                  "_",
                  " "
                )}
              </strong>
            </div>

            <div>
              <span>VOLATILITY</span>
              <strong>
                {analysis.market.volatility}
              </strong>
            </div>
          </div>
        </div>

        {/* AI SYNTHESIS */}
        <div className="card verdict-card">
          <div className="card-label">AI SYNTHESIS</div>

          <div className="verdict">
            {currentProfile.verdict}
          </div>

          <div className="confidence">
            <span>CONFIDENCE</span>
            <strong>
              {analysis.synthesis.confidence}%
            </strong>
          </div>

          <div className="confidence-bar">
            <div
              style={{
                width: `${analysis.synthesis.confidence}%`,
              }}
            ></div>
          </div>

          <p className="verdict-text">
            {currentProfile.verdictText}
          </p>

          <div className="synthesis-points">
            <div>
              <span>MARKET SIGNAL</span>
              <strong>{analysis.market.trend}</strong>
            </div>

            <div>
              <span>PORTFOLIO RISK</span>
              <strong>{currentProfile.risk}/100</strong>
            </div>

            <div>
              <span>CONCENTRATION</span>
              <strong>
                {currentProfile.concentration}
              </strong>
            </div>
          </div>

          <button
            className="why-button"
            onClick={() => setShowXRay(!showXRay)}
          >
            {showXRay
              ? "▲ HIDE DECISION TRACE"
              : "▼ TRACE DECISION"}
          </button>
        </div>
      </section>

      {/* DECISION X-RAY */}
      {showXRay && <DecisionXRay analysis={analysis} />}

      {/* =====================================================
          MULTI-AGENT INTELLIGENCE
      ===================================================== */}

      <section>
        <div className="section-heading">
          <div>
            <h2>🧠 MULTI-AGENT INTELLIGENCE</h2>

            <p>
              Click any agent to inspect its complete analysis
            </p>
          </div>

          <div className="live-badge">
            <span>●</span> LIVE ANALYSIS
          </div>
        </div>

        <div className="agents-grid">
          {analysis.agents.map((agent) => (
            <div
              className="card agent-card"
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              style={{
                cursor: "pointer",
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedAgent(agent);
                }
              }}
            >
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
                    width: `${agent.confidence}%`,
                  }}
                ></div>
              </div>

              <ul className="agent-reasoning">
                {agent.reasoning.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className="agent-source-count">
                {agent.sources.length} SOURCES ANALYZED
              </div>

              {/* NEW CLICK INDICATOR */}
              <div
                style={{
                  marginTop: "12px",
                  paddingTop: "9px",
                  borderTop: "1px solid #1c1c1c",
                  color: "#ff5964",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "7px",
                  letterSpacing: "0.7px",
                }}
              >
                ↗ CLICK TO VIEW FULL ANALYSIS
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEBATE */}
      <section className="card debate-card">
        <div className="section-heading">
          <div>
            <h2>⚔️ AGENT DEBATE</h2>

            <p>
              Conflicting signals are challenged before synthesis
            </p>
          </div>
        </div>

        <div className="debate">
          {analysis.debate.map((item) => (
            <div
              className={`debate-message ${item.position.toLowerCase()}`}
              key={item.agent}
            >
              <span>
                {item.agent === "Technical"
                  ? "📈"
                  : item.agent === "Contrarian"
                  ? "🕵️"
                  : "🛡️"}{" "}
                {item.agent.toUpperCase()} AGENT
              </span>

              <div className="debate-position">
                {item.position}
              </div>

              <p>"{item.statement}"</p>
            </div>
          ))}
        </div>

        <div className="chief-verdict">
          <span>🧠 CHIEF ANALYST SYNTHESIS</span>

          <strong>{currentProfile.verdict}</strong>

          <small>
            {analysis.synthesis.confidence}% confidence based on
            multi-agent consensus
          </small>
        </div>
      </section>

      {/* SCENARIOS */}
      <section>
        <div className="section-heading">
          <div>
            <h2>📊 SCENARIO SIMULATION</h2>

            <p>
              Stress-test the portfolio against possible market
              conditions
            </p>
          </div>
        </div>

        <div className="scenario-grid">
          {analysis.scenarios.map((scenario) => (
            <div
              className="card scenario-card"
              key={scenario.name}
            >
              <div className="scenario-icon">
                {scenario.marketChange >= 0
                  ? "📈"
                  : "📉"}
              </div>

              <div className="scenario-name">
                {scenario.name}
              </div>

              <div className="scenario-row">
                <span>MARKET</span>

                <strong
                  className={
                    scenario.marketChange >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {scenario.marketChange > 0 ? "+" : ""}
                  {scenario.marketChange}%
                </strong>
              </div>

              <div className="scenario-row">
                <span>PORTFOLIO IMPACT</span>

                <strong
                  className={
                    scenario.portfolioImpact >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {scenario.portfolioImpact > 0
                    ? "+"
                    : ""}
                  {scenario.portfolioImpact}%
                </strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM GRID */}
      <section className="bottom-grid">
        {/* EVIDENCE */}
        <div className="card">
          <div className="card-label">
            📚 RETRIEVED EVIDENCE
          </div>

          {analysis.evidence.map((item) => (
            <div className="evidence" key={item.title}>
              <div className="source-icon">📄</div>

              <div className="evidence-content">
                <strong>{item.title}</strong>

                <p>
                  {item.type.replaceAll("_", " ")}
                </p>

                <div className="relevance">
                  <span>RELEVANCE</span>

                  <strong>
                    {item.relevance}%
                  </strong>
                </div>

                <small>{item.claim}</small>
              </div>
            </div>
          ))}

          <div className="citation-status">
            ✓ ALL MAJOR CLAIMS CITED
          </div>
        </div>

        {/* FINANCIAL TWIN */}
        <div className="card">
          <div className="card-label">
            👤 YOUR FINANCIAL TWIN
          </div>

          <div className="profile-header">
            <div className="profile-avatar">👤</div>

            <div>
              <div className="profile-name">
                {profile} Risk
              </div>

              <span>
                PERSONALIZED RISK MODEL
              </span>
            </div>
          </div>

          <div className="risk-score">
            <div className="risk-score-ring">
              <strong>{currentProfile.risk}</strong>
              <span>/100</span>
            </div>

            <div>
              <span>PORTFOLIO RISK</span>

              <p>
                {profile === "Conservative"
                  ? "Lower tolerance for volatility"
                  : profile === "Aggressive"
                  ? "Higher tolerance for volatility"
                  : "Balanced risk tolerance"}
              </p>
            </div>
          </div>

          <div className="profile-stat">
            <span>Concentration</span>

            <strong>
              {currentProfile.concentration}
            </strong>
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
            {analysis.risks.map((risk) => (
              <li key={risk}>
                <span>!</span>
                {risk}
              </li>
            ))}
          </ul>

          <div className="risk-note">
            Risk conditions are continuously monitored by the AI
            system.
          </div>
        </div>
      </section>

      {/* SYSTEM FOOTER */}
      <div className="system-footer">
        <div>
          <span className="status-dot"></span>
          DATA PIPELINE ACTIVE
        </div>

        <div>
          LATENCY: {analysis.system.latency}s
        </div>

        <div>
          LAST UPDATED: {analysis.system.lastUpdated}
        </div>

        <div>
          DATA QUALITY: {analysis.system.dataQuality}%
        </div>
      </div>

      <footer>
        FINVERSE • MULTI-AGENT FINANCIAL INTELLIGENCE
        <span>
          {" "}
          • DECISION SUPPORT — NOT FINANCIAL ADVICE
        </span>
      </footer>
    </div>
  );
}

export default App;