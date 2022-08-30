
const ds_cols = ["name", "size_on_disk", "source", "other_resources", "used_by"];
const ds_cols_info = {
  "name": {"title": "Name & Description", "width": "25%"},
  // "papers": {"title": "Other Documentation", "width": "35%"},
  "size_on_disk": {"title": "Size (GB)", "width": "10%"},
  "other_resources": {"title": "Other Resources"},
  "source": {"title": "Documentation", "width": "35%"}
}
const datasets = {
  "C4": {
    "nickname": "C4",
    "name": "Colossal Cleaned Crawled Corpus",
    "description": "Based on the Common Crawl, authors used a series of heuristics to clean up the corpus.",
    "source": "exploring_the_limits_of",
    "papers": ["documenting_large_webtext", "whats_in_the_box"],
    "used_by": ["T5", "Switch Transformer"],
    "size_on_disk": 745,
    "size_source": "exploring_the_limits_of",
    "words": .2,
    "other_resources": {
      "Download": "https://github.com/allenai/allennlp/discussions/5056",
      "Recreate": "https://www.tensorflow.org/datasets/catalog/c4",
      "Query on the web": "https://c4-search.apps.allenai.org/"
    },
  },
  "Pile-CC": {
    "name": "Pile-CC",
    "description": "Based on the Common Crawl, authors use jusText on WebArchive files. (No filtering documented.)",
    "source": "the_pile",
    "papers": ["datasheet_for_pile"],
    "used_by": ["GPT-J", "GPT-NeoX", "OPT"],
    "size_on_disk": 230,
    "words": .2,
    "other_resources": {
      "Download the Pile": "https://pile.eleuther.ai/"
    }
  },
    "Books3": {
    "name": "Books3",
    "description": "A scrape of Bibliotik, which appears to be a private ebook torrent website.",
    "source": ["this tweet (?!)", "https://twitter.com/theshawwn/status/1320282149329784833"],
    "papers": ["the_pile"],
    "used_by": ["GPT-J", "GPT-NeoX", "OPT"],
    "size_on_disk": 100,
    "words": .2,
    "other_resources": {
      "Link to download in the tweet": "https://twitter.com/theshawwn/status/1320282149329784833",
      "Download the Pile": "https://pile.eleuther.ai/"
    }
  },
  "CCNews": {
    "name": "CC-News",
    "description": "Collected from the English portion of the CommonCrawl News dataset. Version reported in Roberta paper not released.",
    "source": "roberta",
    "papers": [],
    "used_by": ["RoBERTa", "OPT"],
    "size_on_disk": 76,
    "words": .2,
    "other_resources": {
      "Download small portion": "https://huggingface.co/datasets/cc_news",
      "news-please extractor": "https://github.com/fhamborg/news-please"
    }
  },
  "OpenWebText2": {
    "name": "OpenWebText2",
    "description": "Similar to the original WebText, a scrape of websites using upvotes on Reddit submissions as a proxy for website quality.",
    "source": "the_pile",
    "papers": ["datasheet_for_pile"],
    "used_by": ["GPT-J", "GPT-NeoX", "OPT"],
    "size_on_disk": 62,
    "words": .2,
    "other_resources": {
      "Download the Pile": "https://pile.eleuther.ai/",
      "Access via HuggingFace": "https://huggingface.co/datasets/the_pile_openwebtext2"
    }
  },
  "OpenWebText": {
    "name": "OpenWebText",
    "description": "The text is web content extracted from URLs shared on Reddit with at least three upvotes. (A recreation of OpenAI's WebText.)",
    "source": "openwebtext",
    "papers": ["realtoxicityprompts", "know_thy_corpus"],
    "used_by": ["RoBERTa", "OPT"],
    "size_on_disk": 38,
    "words": .2,
    "other_resources": {
      "Access via HuggingFace": "https://huggingface.co/datasets/openwebtext"
    }
  },
  "GPT3-CC": {
    "name": "GPT-3 CC",
    "description": "Filtering version of Common Crawl to be similar to WebText. Size of dataset never reported.",
    "source": "language_models_are",
    "papers": ["language_models_are_supp"],
    "used_by": ["GPT-3"],
    "size_on_disk": "??",
    "words": "??",
    "sources": [],
    "web_interactions": []
  },
    "WebText": {
    "name": "WebText",
    "description": "The text is web content extracted from URLs shared on Reddit with at least three upvotes.",
    "source": "gpt2",
    "papers": ["realtoxicityprompts"],
    "used_by": ["GPT-2"],
    "size_on_disk": "??",
    "words": .2,
    "other_resources": {
      "GPT2 Model Card": "https://github.com/openai/gpt-2/blob/master/model_card.md",
      "Top 1k domains": "https://github.com/openai/gpt-2/blob/master/domains.txt"
    }
  },
}

const papers = {
  "language_models_are_supp": {
   "author" : "Brown, Tom and Mann, Benjamin and Ryder, Nick and Subbiah, Melanie and Kaplan, Jared D and Dhariwal, Prafulla and Neelakantan, Arvind and Shyam, Pranav and Sastry, Girish and Askell, Amanda and Agarwal, Sandhini and Herbert-Voss, Ariel and Krueger, Gretchen and Henighan, Tom and Child, Rewon and Ramesh, Aditya and Ziegler, Daniel and Wu, Jeffrey and Winter, Clemens and Hesse, Chris and Chen, Mark and Sigler, Eric and Litwin, Mateusz and Gray, Scott and Chess, Benjamin and Clark, Jack and Berner, Christopher and McCandlish, Sam and Radford, Alec and Sutskever, Ilya and Amodei, Dario",
   "booktitle" : "Advances in Neural Information Processing Systems",
   "editor" : "H. Larochelle and M. Ranzato and R. Hadsell and M.F. Balcan and H. Lin",
   "pages" : "1877--1901",
   "publisher" : "Curran Associates, Inc.",
   "title" : "Language Models are Few-Shot Learners (supplemental)",
   "url" : "https://proceedings.neurips.cc/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf",
   "volume" : "33",
   "year" : "2020"
  },
  "s2orc": {
    "title" : "S2ORC: The Semantic Scholar Open Research Corpus",
    "author" : "Lo, Kyle  and Wang, Lucy Lu  and Neumann, Mark  and Kinney, Rodney  and Weld, Daniel",
    "booktitle" : "Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics",
    "month" : "jul",
    "year" : "2020",
    "address" : "Online",
    "publisher" : "Association for Computational Linguistics",
    "url" : "https://aclanthology.org/2020.acl-main.447",
    "doi" : "10.18653/v1/2020.acl-main.447",
    "pages" : "4969--4983",
},

}

const citations = {
  "the_pile": `@article{DBLP:journals/corr/abs-2101-00027,
  author    = {Leo Gao and
               Stella Biderman and
               Sid Black and
               Laurence Golding and
               Travis Hoppe and
               Charles Foster and
               Jason Phang and
               Horace He and
               Anish Thite and
               Noa Nabeshima and
               Shawn Presser and
               Connor Leahy},
  title     = {The Pile: An 800GB Dataset of Diverse Text for Language Modeling},
  shorttitle= {The Pile},
  journal   = {CoRR},
  volume    = {abs/2101.00027},
  year      = {2021},
  url       = {https://arxiv.org/abs/2101.00027},
  eprinttype = {arXiv},
  eprint    = {2101.00027},
  timestamp = {Thu, 14 Oct 2021 09:16:12 +0200},
  biburl    = {https://dblp.org/rec/journals/corr/abs-2101-00027.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}`,
  "documenting_large_webtext": `@article{DBLP:journals/corr/abs-2104-08758,
  author    = {Jesse Dodge and
               Maarten Sap and
               Ana Marasovic and
               William Agnew and
               Gabriel Ilharco and
               Dirk Groeneveld and
               Matt Gardner},
  title     = {Documenting the English Colossal Clean Crawled Corpus},
  shorttitle= {Documenting the C4},
  journal   = {CoRR},
  volume    = {abs/2104.08758},
  year      = {2021},
  url       = {https://arxiv.org/abs/2104.08758},
  eprinttype = {arXiv},
  eprint    = {2104.08758},
  timestamp = {Mon, 26 Apr 2021 17:25:10 +0200},
  biburl    = {https://dblp.org/rec/journals/corr/abs-2104-08758.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}`,
  "exploring_the_limits_of": `@article{DBLP:journals/corr/abs-1910-10683,
  author    = {Colin Raffel and
               Noam Shazeer and
               Adam Roberts and
               Katherine Lee and
               Sharan Narang and
               Michael Matena and
               Yanqi Zhou and
               Wei Li and
               Peter J. Liu},
  title     = {Exploring the Limits of Transfer Learning with a Unified Text-to-Text
               Transformer},
  journal   = {CoRR},
  volume    = {abs/1910.10683},
  year      = {2019},
  url       = {http://arxiv.org/abs/1910.10683},
  eprinttype = {arXiv},
  eprint    = {1910.10683},
  timestamp = {Fri, 05 Feb 2021 15:43:41 +0100},
  biburl    = {https://dblp.org/rec/journals/corr/abs-1910-10683.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}`,
  "language_models_are": `@inproceedings{NEURIPS2020_1457c0d6,
 author = {Brown, Tom and Mann, Benjamin and Ryder, Nick and Subbiah, Melanie and Kaplan, Jared D and Dhariwal, Prafulla and Neelakantan, Arvind and Shyam, Pranav and Sastry, Girish and Askell, Amanda and Agarwal, Sandhini and Herbert-Voss, Ariel and Krueger, Gretchen and Henighan, Tom and Child, Rewon and Ramesh, Aditya and Ziegler, Daniel and Wu, Jeffrey and Winter, Clemens and Hesse, Chris and Chen, Mark and Sigler, Eric and Litwin, Mateusz and Gray, Scott and Chess, Benjamin and Clark, Jack and Berner, Christopher and McCandlish, Sam and Radford, Alec and Sutskever, Ilya and Amodei, Dario},
 booktitle = {Advances in Neural Information Processing Systems},
 editor = {H. Larochelle and M. Ranzato and R. Hadsell and M.F. Balcan and H. Lin},
 pages = {1877--1901},
 publisher = {Curran Associates, Inc.},
 title = {Language Models are Few-Shot Learners},
 url = {https://papers.nips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html},
 volume = {33},
 year = {2020}
}`,
  "whats_in_the_box": `@inproceedings{luccioni-viviano-2021-whats,
    title = "What's in the Box? An Analysis of Undesirable Content in the Common Crawl Corpus",
    author = "Luccioni, Alexandra  and
      Viviano, Joseph",
    booktitle = "Proceedings of the 59th Annual Meeting of the Association for Computational Linguistics and the 11th International Joint Conference on Natural Language Processing (Volume 2: Short Papers)",
    month = aug,
    year = "2021",
    address = "Online",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2021.acl-short.24",
    doi = "10.18653/v1/2021.acl-short.24",
    pages = "182--189",
}`,
  "datasheet_for_pile": `@article{DBLP:journals/corr/abs-2201-07311,
  author    = {Stella Biderman and
               Kieran Bicheno and
               Leo Gao},
  title     = {Datasheet for the Pile},
  journal   = {CoRR},
  volume    = {abs/2201.07311},
  year      = {2022},
  url       = {https://arxiv.org/abs/2201.07311},
  eprinttype = {arXiv},
  eprint    = {2201.07311},
  timestamp = {Fri, 21 Jan 2022 13:57:15 +0100},
  biburl    = {https://dblp.org/rec/journals/corr/abs-2201-07311.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}`,
  "roberta": `@article{DBLP:journals/corr/abs-1907-11692,
  author    = {Yinhan Liu and
               Myle Ott and
               Naman Goyal and
               Jingfei Du and
               Mandar Joshi and
               Danqi Chen and
               Omer Levy and
               Mike Lewis and
               Luke Zettlemoyer and
               Veselin Stoyanov},
  title     = {RoBERTa: A Robustly Optimized BERT Pretraining Approach},
  journal   = {CoRR},
  volume    = {abs/1907.11692},
  year      = {2019},
  url       = {http://arxiv.org/abs/1907.11692},
  eprinttype = {arXiv},
  eprint    = {1907.11692},
  timestamp = {Thu, 01 Aug 2019 08:59:33 +0200},
  biburl    = {https://dblp.org/rec/journals/corr/abs-1907-11692.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}`,
  "news_please": `@inproceedings{Hamborg2017newsp-41887,
  title={news-please : a Generic News Crawler and Extractor},
  year={2017},
  number={70},
  isbn={978-3-86488-117-6},
  issn={0938-8710},
  address={Glückstadt},
  publisher={Verlag Werner Hülsbusch},
  series={Schriften zur Informationswissenschaft},
  booktitle={Everything changes, everything stays the same : Understanding Information Spaces; Proceedings of the 15th International Symposium of Information Science (ISI 2017), Berlin, Germany, 13th-15th March 2017},
  pages={218--223},
  url={https://edoc.hu-berlin.de/bitstream/handle/18452/2099/hamborg.pdf?sequence=1},
  editor={Gäde, Maria},
  author={Hamborg, Felix and Meuschke, Norman and Breitinger, Corinna and Gipp, Bela}
}`,
  "realtoxicityprompts": `@article{DBLP:journals/corr/abs-2009-11462,
  author    = {Samuel Gehman and
               Suchin Gururangan and
               Maarten Sap and
               Yejin Choi and
               Noah A. Smith},
  title     = {RealToxicityPrompts: Evaluating Neural Toxic Degeneration in Language
               Models},
  shorttitle = {RealToxicityPrompts},
  journal   = {CoRR},
  volume    = {abs/2009.11462},
  year      = {2020},
  url       = {https://arxiv.org/abs/2009.11462},
  eprinttype = {arXiv},
  eprint    = {2009.11462},
  timestamp = {Wed, 30 Sep 2020 16:16:22 +0200},
  biburl    = {https://dblp.org/rec/journals/corr/abs-2009-11462.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}`,
  "openwebtext": `@misc{Gokaslan2019OpenWeb,  
	title={OpenWebText Corpus},
	author={Aaron Gokaslan and Vanya Cohen},
	howpublished={http://Skylion007.github.io/OpenWebTextCorpus}, 
  url={http://Skylion007.github.io/OpenWebTextCorpus}, 
	year={2019}
}`,
  "know_thy_corpus": `@inproceedings{sharoff-2020-know,
    title = "Know thy Corpus! Robust Methods for Digital Curation of Web corpora",
    author = "Sharoff, Serge",
    booktitle = "Proceedings of the 12th Language Resources and Evaluation Conference",
    month = may,
    year = "2020",
    address = "Marseille, France",
    publisher = "European Language Resources Association",
    url = "https://aclanthology.org/2020.lrec-1.298",
    pages = "2453--2460",
    abstract = "This paper proposes a novel framework for digital curation of Web corpora in order to provide robust estimation of their parameters, such as their composition and the lexicon. In recent years language models pre-trained on large corpora emerged as clear winners in numerous NLP tasks, but no proper analysis of the corpora which led to their success has been conducted. The paper presents a procedure for robust frequency estimation, which helps in establishing the core lexicon for a given corpus, as well as a procedure for estimating the corpus composition via unsupervised topic models and via supervised genre classification of Web pages. The results of the digital curation study applied to several Web-derived corpora demonstrate their considerable differences. First, this concerns different frequency bursts which impact the core lexicon obtained from each corpus. Second, this concerns the kinds of texts they contain. For example, OpenWebText contains considerably more topical news and political argumentation in comparison to ukWac or Wikipedia. The tools and the results of analysis have been released.",
    language = "English",
    ISBN = "979-10-95546-34-4",
}
`,
  "gpt2": `@article{radford2019language,
  title={Language models are unsupervised multitask learners},
  author={Radford, Alec and Wu, Jeffrey and Child, Rewon and Luan, David and Amodei, Dario and Sutskever, Ilya and others},
  journal={OpenAI blog},
  volume={1},
  number={8},
  pages={9},
  year={2019},
  url={http://www.persagen.com/files/misc/radford2019language.pdf}
}`,
  'stochastic_parrots': `@inproceedings{10.1145/3442188.3445922,
author = {Bender, Emily M. and Gebru, Timnit and McMillan-Major, Angelina and Shmitchell, Shmargaret},
title = {On the Dangers of Stochastic Parrots: Can Language Models Be Too Big? 🦜},
shorttitle = {On the Dangers of Stochastic Parrots},
year = {2021},
isbn = {9781450383097},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3442188.3445922},
doi = {10.1145/3442188.3445922},
abstract = {The past 3 years of work in NLP have been characterized by the development and deployment of ever larger language models, especially for English. BERT, its variants, GPT-2/3, and others, most recently Switch-C, have pushed the boundaries of the possible both through architectural innovations and through sheer size. Using these pretrained models and the methodology of fine-tuning them for specific tasks, researchers have extended the state of the art on a wide array of tasks as measured by leaderboards on specific benchmarks for English. In this paper, we take a step back and ask: How big is too big? What are the possible risks associated with this technology and what paths are available for mitigating those risks? We provide recommendations including weighing the environmental and financial costs first, investing resources into curating and carefully documenting datasets rather than ingesting everything on the web, carrying out pre-development exercises evaluating how the planned approach fits into research and development goals and supports stakeholder values, and encouraging research directions beyond ever larger language models.},
booktitle = {Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency},
pages = {610–623},
numpages = {14},
location = {Virtual Event, Canada},
series = {FAccT '21}
}`,
  "addressing_doc_debt": `@article{DBLP:journals/corr/abs-2105-05241,
  author    = {Jack Bandy and
               Nicholas Vincent},
  title     = {Addressing "Documentation Debt" in Machine Learning Research: A
               Retrospective Datasheet for BookCorpus},
  shorttitle = {Retrospective Datasheet for BookCorpus},
  journal   = {CoRR},
  volume    = {abs/2105.05241},
  year      = {2021},
  url       = {https://arxiv.org/abs/2105.05241},
  eprinttype = {arXiv},
  eprint    = {2105.05241},
  timestamp = {Fri, 14 May 2021 12:13:30 +0200},
  biburl    = {https://dblp.org/rec/journals/corr/abs-2105-05241.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}`,
  "lessons_from_the_archive": `@inproceedings{10.1145/3351095.3372829,
author = {Jo, Eun Seo and Gebru, Timnit},
title = {Lessons from Archives: Strategies for Collecting Sociocultural Data in Machine Learning},
shorttitle = {Lessons from Archives},
year = {2020},
isbn = {9781450369367},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3351095.3372829},
doi = {10.1145/3351095.3372829},
abstract = {A growing body of work shows that many problems in fairness, accountability, transparency, and ethics in machine learning systems are rooted in decisions surrounding the data collection and annotation process. In spite of its fundamental nature however, data collection remains an overlooked part of the machine learning (ML) pipeline. In this paper, we argue that a new specialization should be formed within ML that is focused on methodologies for data collection and annotation: efforts that require institutional frameworks and procedures. Specifically for sociocultural data, parallels can be drawn from archives and libraries. Archives are the longest standing communal effort to gather human information and archive scholars have already developed the language and procedures to address and discuss many challenges pertaining to data collection such as consent, power, inclusivity, transparency, and ethics &amp; privacy. We discuss these five key approaches in document collection practices in archives that can inform data collection in sociocultural ML. By showing data collection practices from another field, we encourage ML research to be more cognizant and systematic in data collection and draw from interdisciplinary expertise.},
booktitle = {Proceedings of the 2020 Conference on Fairness, Accountability, and Transparency},
pages = {306–316},
numpages = {11},
keywords = {data collection, sociocultural data, ML fairness, datasets, archives, machine learning},
location = {Barcelona, Spain},
series = {FAT* '20}
}`,
  "whose_words_hurt": `@article{doi:10.1177/01461672211026128,
author = {Manuel Almagro and Ivar R. Hannikainen and Neftalí Villanueva},
title ={Whose Words Hurt? Contextual Determinants of Offensive Speech},
shorttitle = {Whose Words Hurt?},
journal = {Personality and Social Psychology Bulletin},
volume = {48},
number = {6},
pages = {937-953},
year = {2022},
doi = {10.1177/01461672211026128},
    note ={PMID: 34247527},
URL = { 
        https://doi.org/10.1177/01461672211026128
    
},
eprint = { 
        https://doi.org/10.1177/01461672211026128
    
},
    abstract = { Tracing the boundaries of freedom of expression is a matter of wide societal and academic import—especially, as these boundaries encroach on the politics of inclusion. Yet, the elements that constitute offensive speech and determine its legal status remain poorly defined. In two studies, we examined how lay judges evaluate the offensiveness of apparently descriptive statements. Replicating prior work, we found that non-linguistic features (including speaker intent and outcomes on the audience) modulated the statements’ meaning. The speaker’s identity—and, in particular, their membership in the target group—independently influenced evaluations of offensive speech among conservatives and progressives alike. When asked to disclose their abstract principles, or jointly evaluate two contrastive cases, participants tended to deny the relevance of identity while primarily endorsing the intent principle. Taken together, our findings confirm that assessments of offensive speech are governed by contextual features, some of which are not introspectively deemed relevant. }
}`
}

// {Gokaslan2019OpenWeb,  
// 	title={OpenWebText Corpus},
// 	author={Aaron Gokaslan and Vanya Cohen},
// 	howpublished{\url{http://Skylion007.github.io/OpenWebTextCorpus}}, 
// 	year={2019}
// }

/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and moves a button you can add from the README
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"


function makePaperLink(papername) {
  if (!citations.hasOwnProperty(papername)) { return; }
  var p = $("<p>"); var a = $("<a>");
  var citation = bibtexParse.toJSON(citations[papername])[0].entryTags;
  a.attr("href", citation.url);
  a.attr("target", "_blank");
  a.text(citation.title);
  p.append(a);
  return p;
}

function makeResourceLink(name, link) {
  var p = $("<p>"); var a = $("<a>");
  a.attr("href", link);
  a.attr("target", "_blank");
  a.text(name);
  p.append(a);
  return p;
}

function makeCitation(span) {
  
  var citekey = span.attr("citekey");
  console.log('make citation', citekey);
  if (!citations.hasOwnProperty(citekey)) {return;}
  var citation = bibtexParse.toJSON(citations[citekey])[0].entryTags;
  if (citation.hasOwnProperty("shorttitle")) {
    span.text(citation.shorttitle);
  } else {
    span.text(citation.title);
  }
  
  var poptext = $("<p>")
  poptext.append(citation.author + ". ");
  var a = $("<a>");
  a.attr("href", citation.url);
  a.attr("target", "_blank");
  
  a.text(citation.title);
  poptext.append(a).append(". ");
  poptext.append(citation.year);
  span.popover({
        placement: 'bottom',
        container: 'body',
        html: true,
        trigger: 'focus',
        content: poptext
    })
}

 $(document).ready(function(){

  console.log("Hello 🌎");
   
  $('.popper').popover({
        placement: 'bottom',
        container: 'body',
        html: true,
        trigger: 'focus',
        content: "<a href='http://katygero.com' target='_blank'>test</a>"
    })
   
   $(".citation").each(function() {
     makeCitation($(this));
   });
   // makeCitation($(".citation"));
   
   const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
   const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

//    const popover = new bootstrap.Popover('.popover-dismiss', {
//   trigger: 'focus'
// });
   

  
   
  var thead = $("<thead>");
  $.each(ds_cols, function(i, val) {
    console.log(val);
    var th = $("<th>").attr('scope', 'col');
    if (val in ds_cols_info) { th.text(ds_cols_info[val].title).attr("style", "width:"+ds_cols_info[val].width); }
    else { th.text(val); }
    
    thead.append(th);
  });
  
  
   var tbody = $("<tbody>");
   
   $.each(datasets, function(i, dataset) {
     var tr = $("<tr>");
     $.each(ds_cols, function(j, col) {
       var cell = $("<td>")
       if (col === "name") { 
         var span = $("<span>").addClass("description").text(dataset.description);
         cell.append(dataset.name).append('<br>').append(span);
       } else if (col === "source") {
         cell.append("Original paper");
         if (Array.isArray(dataset.source)) {
           cell.append(makeResourceLink(dataset.source[0], dataset.source[1]));
         } else {
           cell.append(makePaperLink(dataset.source));
         }
         cell.append("Additional documentation");
         $.each(dataset.papers, function(k, paper) {
           cell.append(makePaperLink(paper));
         })
       } else if (col === "size_on_disk") {
         cell.text(dataset[col]);
       } else if (col === "other_resources") { 
         $.each(dataset[col], function (name, link) {
           cell.append(makeResourceLink(name,link));
         })
       } else {
         if (col in dataset) { cell.text(dataset[col]); }
         else { cell.text(""); }
       }
       tr.append(cell);
     });
     tbody.append(tr);
   });
   
   $('#datasets').append(thead).append(tbody);

}); 

