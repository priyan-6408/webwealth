from pathlib import Path


DOCUMENTS_FOLDER = Path(__file__).parent / "documents"


def retrieve_documents(query: str, max_results: int = 3):
    """
    Search the local document collection and return
    the most relevant sources.
    """

    query = query.strip()

    # Handle an empty question
    if not query:
        return {
            "sources": [],
            "message": "Please provide a question."
        }

    query_words = set(query.lower().split())
    results = []

    # Handle missing documents folder
    if not DOCUMENTS_FOLDER.exists():
        return {
            "sources": [],
            "message": "Document folder not found."
        }

    for file_path in DOCUMENTS_FOLDER.glob("*.txt"):
        text = file_path.read_text(encoding="utf-8")
        text_lower = text.lower()

        # Count unique query words found in the document
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

    # Highest relevance first
    results.sort(
        key=lambda item: item["relevance"],
        reverse=True
    )

    # Return only the top results
    results = results[:max_results]

    if not results:
        return {
            "sources": [],
            "message": "No relevant documents found."
        }

    return {
        "sources": results
    }