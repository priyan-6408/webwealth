from fastapi import FastAPI
from pydantic import BaseModel
from typing import List


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
# HEALTH CHECK
# =========================

@app.get("/")
def home():
    return {
        "status": "online",
        "message": "WebWealth API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# =========================
# ANALYZE ENDPOINT
# =========================

@app.post("/analyze")
def analyze(request: AnalyzeRequest):

    symbol = request.symbol.upper()

    # Temporary mock response.
    # Later this will be replaced by the real AI agents.

    response = {
        "symbol": symbol,

        "signal": "BULLISH",

        "confidence": 0.82,

        "agents": [
            {
                "agent": "technical",
                "signal": "BULLISH",
                "confidence": 0.78,
                "reasoning": [
                    "Positive momentum",
                    "Volume above average"
                ],
                "sources": []
            },
            {
                "agent": "fundamental",
                "signal": "BULLISH",
                "confidence": 0.84,
                "reasoning": [
                    "Strong earnings outlook"
                ],
                "sources": []
            },
            {
                "agent": "sentiment",
                "signal": "NEUTRAL",
                "confidence": 0.65,
                "reasoning": [
                    "Mixed market sentiment"
                ],
                "sources": []
            }
        ],

        "evidence": [],

        "risks": [
            "Market volatility",
            "Sector-specific risk"
        ],

        "decision_trace": [
            "Technical agent evaluated market momentum",
            "Fundamental agent evaluated company strength",
            "Sentiment agent evaluated market sentiment",
            "Final signal generated from agent outputs"
        ]
    }

    return response