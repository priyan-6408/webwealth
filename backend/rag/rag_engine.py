from pathlib import Path


DOCUMENTS_FOLDER = Path(__file__).parent / "documents"


def retrieve_documents(query):
    results = []

    query_words = query.lower().split()

    for file_path in DOCUMENTS_FOLDER.glob("*.txt"):
        text = file_path.read_text(encoding="utf-8")
        text_lower = text.lower()

        matches = sum(
            1 for word in query_words
            if word in text_lower
        )

        if matches > 0:
            relevance = matches / len(query_words)

            results.append({
                "title": file_path.stem,
                "relevance": round(relevance, 2),
                "text": text[:300],
                "document_id": file_path.stem.upper()
            })

    results.sort(
        key=lambda x: x["relevance"],
        reverse=True
    )

    return {
        "sources": results
    }