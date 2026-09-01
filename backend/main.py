from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import Member 3's agent runner module
from backend.agents.agent_runner import run_all_agents

app = FastAPI(title="WebWealth API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    symbol: str
    user_id: str

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    symbol = request.symbol.upper()
    
    # 1. Execute Member 3's AI Agents
    agent_results = run_all_agents(symbol)
    
    return {
        "symbol": symbol,
        "signal": agent_results.get("overall_signal", "BULLISH"),
        "confidence": agent_results.get("overall_confidence", 0.85),
        "agents": agent_results.get("agents_breakdown", []),
        "evidence": agent_results.get("evidence", []),
        "verdictText": "AI agents synthesized market, technical, and fundamental signals."
    }