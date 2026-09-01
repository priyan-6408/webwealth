from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="WebWealth API",
    description="AI-powered personalized wealth analysis backend",
    version="1.0.0"
)

# =========================
# REQUEST MODEL
# =========================
class AnalyzeRequest(BaseModel):
    symbol: str
    user_id: str

# =========================
# MOCK AGENT FUNCTION (Temporary until Member 3 finishes)
# =========================
def run_all_agents(symbol: str):
    return {
        "overall_signal": "BULLISH",
        "overall_confidence": 0.82,
        "agents_breakdown": [
            {
                "agent": "technical",
                "signal": "BULLISH",
                "confidence": 0.78,
                "reasoning": ["Positive momentum", "Volume above average"],
                "sources": []
            },
            {
                "agent": "fundamental",
                "signal": "BULLISH",
                "confidence": 0.84,
                "reasoning": ["Strong earnings outlook"],
                "sources": []
            },
            {
                "agent": "sentiment",
                "signal": "NEUTRAL",
                "confidence": 0.65,
                "reasoning": ["Mixed market sentiment"],
                "sources": []
            }
        ],
        "risks": ["Market volatility", "Sector-specific risk"],
        "trace": [
            "Technical agent evaluated market momentum",
            "Fundamental agent evaluated company strength",
            "Sentiment agent evaluated market sentiment"
        ]
    }

# =========================
# ENDPOINTS
# =========================
@app.get("/")
def home():
    return {"status": "online", "message": "WebWealth API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    symbol = request.symbol.upper()
    
    # 1. Run AI Agents (using mock data for now)
    agent_results = run_all_agents(symbol)
    
    # 2. RAG Evidence placeholder
    evidence_data = []

    return {
        "symbol": symbol,
        "signal": agent_results.get("overall_signal", "BULLISH"),
        "confidence": agent_results.get("overall_confidence", 0.82),
        "agents": agent_results.get("agents_breakdown", []),
        "evidence": evidence_data,
        "risks": agent_results.get("risks", []),
        "decision_trace": agent_results.get("trace", [])
    }