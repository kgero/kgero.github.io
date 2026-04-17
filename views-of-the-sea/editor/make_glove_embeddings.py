"""
Generate a compact GloVe 100d embedding table for the words used in the
views-of-the-sea editor (WordNet + spaCy function words).

It produces a **binary Float32 matrix** plus a small JSON index:

  - words/word_embeddings_glove100_f32.bin
      Raw Float32 values, row-major, one 100d vector per word.
  - words/word_embeddings_glove100_index.json
      {
        "dim": 100,
        "words": {
          "sea": 0,
          "water": 1,
          ...
        }
      }

All vectors are L2-normalized so cosine similarity reduces to a dot product.

Usage (from the project root or from the editor directory):

    # From project root:
    python editor/make_glove_embeddings.py \\
        --glove words/glove.wikigiga2024.100d.txt

    # From editor directory:
    python make_glove_embeddings.py \\
        --glove ../words/glove.wikigiga2024.100d.txt
"""

import argparse
import json
import math
import os
from array import array
from typing import Dict, List, Set


def load_vocab(
    wordnet_path: str,
    stopwords_path: str,
) -> Set[str]:
    """Load the union of WordNet and stopword vocabularies."""
    with open(wordnet_path, "r", encoding="utf-8") as f:
        wordnet = json.load(f)
    with open(stopwords_path, "r", encoding="utf-8") as f:
        stopwords = json.load(f)

    vocab: Set[str] = set(wordnet.keys()) | set(stopwords.keys())
    return vocab


def parse_glove(
    glove_path: str,
    target_vocab: Set[str],
    dim: int = 100,
) -> Dict[str, List[float]]:
    """
    Read a GloVe text file and return normalized vectors for words in target_vocab.

    Assumes lines of the form:
        word v1 v2 ... v_dim
    """
    vectors: Dict[str, List[float]] = {}

    if not os.path.exists(glove_path):
        raise FileNotFoundError(
            f"GloVe file not found at {glove_path}. "
            "Place your 100d file there (e.g. glove.wikigiga2024.100d.txt), "
            "or pass --glove with the correct path."
        )

    total_lines = 0
    matched = 0
    remaining = set(target_vocab)

    with open(glove_path, "r", encoding="utf-8") as f:
        for line in f:
            total_lines += 1
            parts = line.strip().split()
            if not parts:
                continue

            word = parts[0]
            if word not in remaining:
                continue

            values = parts[1:]
            if len(values) != dim:
                # Skip unexpected dimensionality
                continue

            try:
                vec = [float(x) for x in values]
            except ValueError:
                # Skip malformed lines
                continue

            # L2-normalize
            norm = math.sqrt(sum(v * v for v in vec))
            if norm == 0.0:
                continue
            vec = [v / norm for v in vec]

            vectors[word] = vec
            matched += 1
            remaining.discard(word)

            # Optional early exit if we matched everything
            if not remaining:
                break

    print(f"Read {total_lines} lines from {glove_path}")
    print(f"Matched {matched} / {len(target_vocab)} target words with embeddings")
    return vectors


def main() -> None:
    here = os.path.dirname(os.path.abspath(__file__))

    default_glove = os.path.join(here, "..", "words", "glove.wikigiga2024.100d.txt")
    default_wordnet = os.path.join(here, "..", "words", "wordnet_words_with_pos.json")
    default_stopwords = os.path.join(
        here, "..", "words", "spacy_function_words_with_post.json"
    )
    default_index_output = os.path.join(
        here, "..", "words", "word_embeddings_glove100_index.json"
    )
    default_bin_output = os.path.join(
        here, "..", "words", "word_embeddings_glove100_f32.bin"
    )

    parser = argparse.ArgumentParser(
        description=(
            "Create a compact GloVe 100d embedding table (binary + JSON index) "
            "for the editor vocabulary."
        )
    )
    parser.add_argument(
        "--glove",
        type=str,
        default=default_glove,
        help=f"Path to 100d GloVe text file (default: {default_glove})",
    )
    parser.add_argument(
        "--wordnet",
        type=str,
        default=default_wordnet,
        help=f"Path to wordnet_words_with_pos.json (default: {default_wordnet})",
    )
    parser.add_argument(
        "--stopwords",
        type=str,
        default=default_stopwords,
        help=(
            "Path to spacy_function_words_with_post.json "
            f"(default: {default_stopwords})"
        ),
    )
    parser.add_argument(
        "--index-output",
        type=str,
        default=default_index_output,
        help=f"Output JSON index path (default: {default_index_output})",
    )
    parser.add_argument(
        "--bin-output",
        type=str,
        default=default_bin_output,
        help=f"Output Float32 binary path (default: {default_bin_output})",
    )

    args = parser.parse_args()

    print("Loading vocabulary...")
    vocab = load_vocab(args.wordnet, args.stopwords)
    print(f"Target vocab size (WordNet ∪ stopwords): {len(vocab)} words")

    print("Parsing GloVe embeddings...")
    dim = 100
    vectors = parse_glove(args.glove, vocab, dim=dim)

    words = sorted(vectors.keys())
    print(f"Building binary matrix for {len(words)} words, dim={dim}...")

    # Build a contiguous Float32 array in row-major order.
    buf = array("f")
    for w in words:
        vec = vectors[w]
        if len(vec) != dim:
            raise ValueError(f"Vector for word {w!r} has wrong dim {len(vec)} != {dim}")
        buf.extend(vec)

    # Write binary file
    os.makedirs(os.path.dirname(args.bin_output), exist_ok=True)
    with open(args.bin_output, "wb") as f_bin:
        buf.tofile(f_bin)

    # Build and write JSON index: word -> row index
    index = {
        "dim": dim,
        "words": {w: i for i, w in enumerate(words)},
    }
    with open(args.index_output, "w", encoding="utf-8") as f_idx:
        json.dump(index, f_idx)

    print(f"Wrote {len(words)} word vectors to:")
    print(f"  binary: {args.bin_output}")
    print(f"  index : {args.index_output}")


if __name__ == "__main__":
    main()


