function DecisionXRay({ analysis }) {
  return (
    <section className="xray-card">

      <div className="xray-header">
        <div>
          <div className="xray-label">🕷️ DECISION X-RAY</div>
          <p>Trace how the final intelligence was produced</p>
        </div>

        <div className="trace-status">
          ● TRACE ACTIVE
        </div>
      </div>

      <div className="xray-flow">

        <div className="xray-node">
          <span className="node-icon">📊</span>
          <strong>MARKET DATA</strong>
          <small>Price • Volume • Momentum</small>
        </div>

        <div className="xray-arrow">↓</div>

        <div className="agent-flow">

          {analysis.agents.slice(0, 3).map((agent) => (
            <div className="mini-agent" key={agent.id}>
              <span>{agent.icon}</span>
              <strong>{agent.name}</strong>
              <small>
                {agent.signal} • {agent.confidence}%
              </small>
            </div>
          ))}

        </div>

        <div className="xray-arrow">↓</div>

        <div className="xray-node debate-node">
          <span className="node-icon">⚔️</span>
          <strong>AGENT DEBATE</strong>
          <small>Conflicting signals challenged</small>
        </div>

        <div className="xray-arrow">↓</div>

        <div className="xray-node profile-node">
          <span className="node-icon">👤</span>
          <strong>FINANCIAL TWIN</strong>
          <small>
            {analysis.financialTwin.profile} • Risk{" "}
            {analysis.financialTwin.riskScore}/100
          </small>
        </div>

        <div className="xray-arrow">↓</div>

        <div className="final-node">
          <span>🧠 CHIEF ANALYST</span>

          <strong>{analysis.synthesis.verdict}</strong>

          <div className="final-confidence">
            Confidence: {analysis.synthesis.confidence}%
          </div>
        </div>

      </div>

      <div className="xray-footer">
        <span>✓ MARKET SIGNALS</span>
        <span>✓ MULTI-AGENT REASONING</span>
        <span>✓ USER PROFILE</span>
        <span>✓ SYNTHESIS</span>
      </div>

    </section>
  );
}

export default DecisionXRay;