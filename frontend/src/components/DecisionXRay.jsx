function DecisionXRay({ analysis }) {
  return (
    <section className="xray-card">
      <div className="xray-header">
        <div>
          <div className="xray-label">🕷️ DECISION X-RAY</div>

          <p>
            Trace how the final intelligence was produced
          </p>
        </div>

        <div className="trace-status">
          ● TRACE ACTIVE
        </div>
      </div>

      <div className="xray-flow">
        {/* MARKET DATA */}
        <div className="xray-node">
          <span className="node-icon">📊</span>

          <strong>MARKET DATA</strong>

          <small>
            {analysis.asset.symbol} • Price • Volume • Momentum
          </small>

          <div className="node-metrics">
            <span>
              ₹{analysis.asset.price.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>

            <span>{analysis.market.momentum}/100 MOMENTUM</span>
          </div>
        </div>

        <div className="xray-arrow">
          <span>↓</span>
        </div>

        {/* AGENTS */}
        <div className="xray-stage-label">
          PARALLEL AGENT PROCESSING
        </div>

        <div className="agent-flow">
          {analysis.agents.map((agent) => (
            <div className="mini-agent" key={agent.id}>
              <span>{agent.icon}</span>

              <strong>{agent.name}</strong>

              <small>
                {agent.signal} • {agent.confidence}%
              </small>
            </div>
          ))}
        </div>

        <div className="xray-arrow">
          <span>↓</span>
        </div>

        {/* DEBATE */}
        <div className="xray-node debate-node">
          <span className="node-icon">⚔️</span>

          <strong>AGENT DEBATE</strong>

          <small>
            Conflicting signals challenged before synthesis
          </small>

          <div className="debate-mini-summary">
            {analysis.debate.map((item) => (
              <span key={item.agent}>
                {item.agent}: {item.position}
              </span>
            ))}
          </div>
        </div>

        <div className="xray-arrow">
          <span>↓</span>
        </div>

        {/* FINANCIAL TWIN */}
        <div className="xray-node profile-node">
          <span className="node-icon">👤</span>

          <strong>FINANCIAL TWIN</strong>

          <small>
            {analysis.financialTwin.profile} profile • Risk{" "}
            {analysis.financialTwin.riskScore}/100
          </small>

          <div className="profile-mini-stats">
            <span>
              Concentration {analysis.financialTwin.concentration}%
            </span>

            <span>
              Horizon {analysis.financialTwin.horizon}
            </span>
          </div>
        </div>

        <div className="xray-arrow">
          <span>↓</span>
        </div>

        {/* EVIDENCE */}
        <div className="xray-node evidence-node">
          <span className="node-icon">📚</span>

          <strong>RETRIEVED EVIDENCE</strong>

          <small>
            {analysis.evidence.length} verified evidence sources
          </small>

          <div className="evidence-mini">
            {analysis.evidence.map((item) => (
              <span key={item.title}>
                ✓ {item.title} — {item.relevance}%
              </span>
            ))}
          </div>
        </div>

        <div className="xray-arrow">
          <span>↓</span>
        </div>

        {/* FINAL */}
        <div className="final-node">
          <span>🧠 CHIEF ANALYST</span>

          <strong>{analysis.synthesis.verdict}</strong>

          <div className="final-confidence">
            Confidence: {analysis.synthesis.confidence}%
          </div>

          <p>{analysis.synthesis.summary}</p>
        </div>
      </div>

      <div className="xray-footer">
        <span>✓ MARKET SIGNALS</span>
        <span>✓ 5 AI AGENTS</span>
        <span>✓ AGENT DEBATE</span>
        <span>✓ FINANCIAL TWIN</span>
        <span>✓ EVIDENCE</span>
        <span>✓ FINAL SYNTHESIS</span>
      </div>
    </section>
  );
}

export default DecisionXRay;