import spacy
import json
from collections import defaultdict

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")

# spaCy's built-in stopword list
# remember to run `python -m spacy download en_core_web_sm` in the terminal
stopwords = list(spacy.lang.en.stop_words.STOP_WORDS)

# Map stopwords to their coarse POS tags
function_words = defaultdict(set)

for word in stopwords:
    doc = nlp(word)
    if len(doc) != 1:
        continue
    token = doc[0]

    # Map spaCy POS to your labels
    if token.pos_ == "DET":
        pos = "article" if word in {"a", "an", "the"} else "det"
    elif token.pos_ == "ADP":
        pos = "prep"
    elif token.pos_ in {"CCONJ", "SCONJ"}:
        pos = "conj"
    elif token.pos_ == "PART":
        pos = "particle"
    elif token.pos_ == "PRON":
        pos = "pron"
    else:
        continue  # Skip other POS types

    function_words[word.lower()].add(pos)

# Convert to format: { word: [pos1, pos2, ...] }
final_dict = {w: sorted(list(tags)) for w, tags in function_words.items()}

# Save to file
with open("spacy_function_words_with_post.json", "w") as f:
    json.dump(final_dict, f, indent=2)

print(f"Saved {len(final_dict)} function words to missing_function_words_from_spacy.json")
