export const mockAnalysis = {
  asset: {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 1482.30,
    change: 1.84
  },

  market: {
    trend: "BULLISH",
    momentum: 78,
    volumeSignal: "ABOVE_AVERAGE",
    volatility: "MODERATE"
  },

  synthesis: {
    verdict: "CAUTIOUSLY BULLISH",
    confidence: 74,

    summary:
      "Momentum is positive, but existing portfolio exposure increases concentration risk."
  },

  agents: [
    {
      id: "technical",
      name: "Technical",
      icon: "📈",
      signal: "BULLISH",
      confidence: 78,

      reasoning: [
        "Positive price momentum",
        "Trading volume above average",
        "Short-term trend remains positive"
      ],

      sources: [
        "Market price feed",
        "Volume data"
      ]
    },

    {
      id: "fundamental",
      name: "Fundamental",
      icon: "🏢",
      signal: "POSITIVE",
      confidence: 71,

      reasoning: [
        "Stable earnings trend",
        "Healthy revenue growth",
        "Strong operating performance"
      ],

      sources: [
        "Q1 FY26 Earnings Filing",
        "Corporate Disclosure"
      ]
    },

    {
      id: "sentiment",
      name: "Sentiment",
      icon: "📰",
      signal: "NEUTRAL",
      confidence: 64,

      reasoning: [
        "Mixed news sentiment",
        "Positive institutional commentary",
        "Some short-term uncertainty"
      ],

      sources: [
        "News corpus",
        "Market sentiment feed"
      ]
    },

    {
      id: "risk",
      name: "Risk",
      icon: "🛡️",
      signal: "CAUTIOUS",
      confidence: 58,

      reasoning: [
        "Portfolio concentration is elevated",
        "Volatility remains moderate",
        "Downside exposure should be monitored"
      ],

      sources: [
        "User portfolio",
        "Market volatility"
      ]
    },

    {
      id: "contrarian",
      name: "Contrarian",
      icon: "🕵️",
      signal: "BEARISH",
      confidence: 42,

      reasoning: [
        "Valuation may be stretched",
        "Bullish assumptions could be priced in",
        "Potential downside if momentum reverses"
      ],

      sources: [
        "Valuation metrics",
        "Market data"
      ]
    }
  ],

  debate: [
    {
      agent: "Technical",
      position: "BULLISH",
      statement:
        "Momentum and volume indicate a positive setup."
    },

    {
      agent: "Contrarian",
      position: "BEARISH",
      statement:
        "The bullish thesis may underestimate valuation risk."
    },

    {
      agent: "Risk",
      position: "CAUTIOUS",
      statement:
        "Existing portfolio concentration should influence the decision."
    }
  ],

  evidence: [
    {
      title: "Q1 FY26 Earnings Filing",
      type: "REGULATORY_FILING",
      relevance: 91,

      claim:
        "Supports the fundamental agent's positive assessment."
    },

    {
      title: "Corporate Disclosure",
      type: "CORPORATE_DISCLOSURE",
      relevance: 86,

      claim:
        "Provides additional context for the company's financial position."
    }
  ],

  financialTwin: {
    profile: "Moderate",

    riskScore: 62,

    concentration: 28,

    horizon: "5+ YEARS"
  },

  scenarios: [
    {
      name: "Market Correction",
      marketChange: -10,
      portfolioImpact: -3.2
    },

    {
      name: "Strong Bull Run",
      marketChange: 10,
      portfolioImpact: 4.8
    },

    {
      name: "Sector Decline",
      marketChange: -5,
      portfolioImpact: -2.1
    }
  ],

  risks: [
    "Revenue growth deteriorates",
    "Momentum reverses",
    "Sector sentiment weakens",
    "Portfolio concentration increases"
  ],

  system: {
    status: "ONLINE",

    lastUpdated: "09:42:24",

    latency: 2.8,

    dataQuality: 96
  }
};