---
title: "What is a graph model allowed to know?"
description: "A working note on held-out edges, reverse relations, and what a link-prediction score actually measures."
topics: ['machine-learning']
status: draft
draft: true
featured: true
type: note
readingTime: '6 min read'
dateLabel: 'New draft · for review'
editorialNote: 'Newly prepared editorial draft for Yashav’s review, inspired by the MetaFam project listed in his CV. This is not a previously published article or a verified description of that project’s experimental protocol.'
related: ['metafam']
sources:
  - 'https://arxiv.org/abs/1703.06103'
  - 'https://pytorch-geometric.readthedocs.io/en/latest/generated/torch_geometric.transforms.RandomLinkSplit.html'
  - 'https://ogb.stanford.edu/docs/linkprop/'
---

Evaluating a graph model requires specifying which connections it should predict and which connections it can see while making those predictions.

The examples here use a hypothetical family graph. MetaFam's implementation, splits and reported results still need to be checked against its code and experiment records before this draft is published.

## The graph used for learning is part of the model

A knowledge-graph fact can be written as a triple: a source entity, a relation, and a destination entity. For example, `(Ada, parent_of, Bea)` says something different from an unlabelled connection between Ada and Bea.

Relational graph convolutional networks extend graph convolution to multiple relation types. They can collect evidence through a graph before scoring a possible missing fact. The [original R-GCN paper](https://arxiv.org/abs/1703.06103) studies this approach for entity classification and link prediction.

The encoder's input graph affects the evaluation. A triple hidden from the loss function may still be visible elsewhere in the model's inputs. The message-passing graph supplies context; supervision edges supply targets.

## A missing edge can leave its answer behind

Suppose `(Ada, parent_of, Bea)` is a test target. Three situations deserve different interpretations:

1. The target remains in the message-passing graph. The model receives the exact connection it is being asked to recover.
2. Its explicit inverse remains: `(Bea, child_of, Ada)`. If the dataset defines these relations as inverses, the answer survives in another representation.
3. Other family context remains: perhaps Bea and Cal share a parent. This may provide useful evidence without directly restating the target.

The third case is not automatically leakage. Inferring missing facts from permitted context is often the intended task. Removing every informative path would change that task. The distinction is between information available under the intended evaluation setting and information that reveals a held-out answer through an unintended shortcut.

An edge split and a family-level split therefore ask different questions. Holding out edges can test completion among familiar entities. Holding out whole families can test transfer to separate groups, if the dataset and model support that setting. Neither result should silently stand in for the other.

## Split facts before expanding their representations

One useful implementation rule is to keep an original fact and its inverse together when assigning splits. Then construct the permitted graph for each evaluation stage. PyTorch Geometric’s [RandomLinkSplit documentation](https://pytorch-geometric.readthedocs.io/en/latest/generated/torch_geometric.transforms.RandomLinkSplit.html) describes controls for paired reverse edge types and for separating message-passing edges from training supervision. These controls address specific representations; they do not replace an audit of dataset semantics.

This illustrative Python-style pseudocode assumes each triple represents one independently assigned fact and that the inverse relation mapping is correct. It is not MetaFam code.

```python
# Illustrative split audit; not a complete training pipeline.
train, valid, test = split_original_facts(facts, seed=seed)

def inverse(triple):
    head, relation, tail = triple
    return tail, inverse_relation[relation], head

# Add inverse representations only after assigning facts.
train_context = set(train) | {inverse(t) for t in train}

for target in set(valid) | set(test):
    assert target not in train_context
    assert inverse(target) not in train_context
```

These assertions are a starting point. They do not detect equivalent labels, duplicate records under different identifiers, or target information embedded in node features. A real audit also needs a declared policy for validation edges at test time. Save that policy alongside the split seed and dataset version so a later rerun asks the same question.

## Read the score together with the ranking protocol

Mean reciprocal rank averages the inverse position of the correct answer across evaluation queries:

$$
\operatorname{MRR} = \frac{1}{N}\sum_{i=1}^{N}\frac{1}{\operatorname{rank}_i}
$$

For an illustrative three-query evaluation with ranks 1, 2, and 4, MRR is approximately 0.583. This arithmetic is easy; interpreting the number requires knowing the candidate set. Ranking against all eligible entities differs from ranking against a small sampled set.

The [Open Graph Benchmark protocols](https://ogb.stanford.edu/docs/linkprop/) specify candidate sampling and filtering for their knowledge-graph tasks. Filtering removes other known true answers from the competing negatives. It affects scoring, rather than granting the encoder access to test edges. A reproducible report should state candidate restrictions, filtering, tie handling, and whether it predicts heads, tails, or both.

## The useful result may be in the breakdown

A single average can hide uneven performance. In a family graph, direct parent relations, symmetric relations, and relations requiring longer paths may behave differently. Reporting relation-specific scores with their query counts makes that variation easier to inspect. A tiny relation category also needs more caution than a large one.

A useful next analysis would compare a simple baseline and the graph model under the same information budget, then inspect representative mistakes. Does performance change when direct inverse shortcuts are removed? Does it persist on separate family groups? These are proposed diagnostic questions, not claims about completed experiments.

A leakage audit records the targets, context and candidate answers used to obtain a score. Whether the benchmark captures reasoning that transfers beyond its dataset remains a separate question.
