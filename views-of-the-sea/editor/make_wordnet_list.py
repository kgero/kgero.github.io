import nltk
from nltk.corpus import wordnet as wn
import json
from collections import defaultdict

# Make sure you have the WordNet data
nltk.download("wordnet")

# Map short POS codes to readable ones
pos_map = {
    'n': 'noun',
    'v': 'verb',
    'a': 'adj',
    's': 'adj',
    'r': 'adv'
}

# Collect word → set of POS
word_pos_dict = defaultdict(set)

for synset in wn.all_synsets():
    pos = pos_map.get(synset.pos())
    if not pos:
        continue
    for lemma in synset.lemmas():
        word = lemma.name().lower().replace("_", " ")
        word_pos_dict[word].add(pos)

# Convert sets to sorted lists
final_dict = {word: sorted(list(pos_tags)) for word, pos_tags in word_pos_dict.items()}

# Save to JSON
with open("wordnet_words_with_pos.json", "w") as f:
    json.dump(final_dict, f, indent=2)

print("Saved wordnet_words_with_pos.json with", len(final_dict), "entries")
