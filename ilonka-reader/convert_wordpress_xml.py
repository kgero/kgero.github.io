import bs4
import json

books = []

path = 'theilonkareader.wordpress.com/theilonkareader.wordpress.2020-12-27.001.xml'
with open(path, 'r') as fle:
    source = fle.read()

soup = bs4.BeautifulSoup(source,'xml')
all_items = soup.find_all("item")
for item in all_items:
    
    title = item.title.text
    if title == 'About' or title == '':
        continue
    date_added = item.pubDate.text
    main_text = item.find('content:encoded').text
    main_text = main_text.replace('<!-- wp:paragraph -->\n', '')
    main_text = main_text.replace('<!-- /wp:paragraph -->\n', '')
    category = item.find('category', {'domain': 'category'}).text
    if category == 'lit mag':
        author = 'multiple'
        notes = main_text
    else:
        lines = main_text.split("\n\n")
        author = lines[0][3:].strip('.')
        notes = '\n\n'.join(lines[1:])
    
    obj = {'title': title, 'date_added': date_added, 'tags': [category],
           'notes': notes, 'author': author}
    books.append(obj)
    # break

lib = {
    "name": "The Ilonka Reader",
    "url": "https://tomcritchlow.com/",
    "bio": "A running list of books I've read...",
    "lists":[{   
            "name": "Books Read",
            "url": "https://tomcritchlow.com/wiki/books/books-read/",
            "books": books
        }]
    }

with open('wordpress-export.json', 'w') as fle:
    fle.write(json.dumps(lib, indent=4))
