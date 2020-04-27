var poems = [
	{
		'title': 'Our Ocean',
		'publication': 'Brooklyn Poets Poet-of-the-Week',
		'month': 'Apr',
		'date': '2020',
		'link': 'https://brooklynpoets.org/poet/katy-ilonka-gero/',
		'description': ''
	},
	{
		'title': 'Three Ocean Poems',
		'publication': 'Dear Ocean Reading Series',
		'month': 'Nov',
		'date': '2019',
		'link': '',
		'description': ''
	},
	{
		'title': 'Self Portrait as a Decision Tree',
		'publication': 'Bookstore Poets, Vol 1',
		'month': 'June',
		'date': '2019',
		'link': 'img/poems/decisiontree.jpg',
		'description': ''
	},
	{
		'title': 'Lost Color',
		'publication': '--hence, tirade',
		'month': 'Feb',
		'date': '2018',
		'link': 'https://www.robocup-press.com/hence-tirade.html',
		'description': ''
	},
	{
		'title': 'Window',
		'publication': 'Synaesthesia Magazine',
		'month': 'March',
		'date': '2017',
		'link': 'http://www.synaesthesiamagazine.com/home/2017/3/12/window',
		'description': 'flash fiction'
	},
	{
		'title': 'The Cloud',
		'publication': 'Blueshift Journal',
		'month': 'May',
		'date': '2015',
		'link': 'img/poems/cloud.jpg',
		'description': ''
	},
	{
		'title': 'Whispers',
		'publication': 'Spare Change News',
		'month': 'Sept',
		'date': '2015',
		'link': 'img/poems/whispers.jpg',
		'description': ''
	}
]

var essays = [
	{
		'fulltitle': 'Language and the Algorithm',
		'title': 'Language and the Algorithm', 
		'publication': 'Ploughshares blog',
		'month': 'October',
		'date': '2018',
		'link': 'http://blog.pshares.org/index.php/language-and-the-algorithm/',
		'description': 'is writing really anything more than rearranging words?'
	},
	{
		'fulltitle': 'Is It Possible for Machines to Translate Poetry, When Humans Can Barely Do It?',
		'title': 'Is It Possible for Machines to Translate Poetry?', 
		'publication': 'Electric Literature',
		'date': 'April',
		'date': '2018',
		'link': 'https://electricliterature.com/machine-translation-poetry-hofstadter-artificial-intelligence-29245f7fad40',
		'description': 'what engineering has to say about poetry translation'
	},
	{
		'fulltitle': 'Why Siri Sounds Like A Girl, But Says She Is Beyond Gender',
		'title': 'Why Siri Sounds Like a Girl',
		'publication': 'SheCanCode',
		'month': 'May',
		'date': '2017',
		'link': 'https://shecancode.io/blog/why-siri-sounds-like-a-girl-but-says-she-is-beyond-gender',
		'description': 'the implications of gendering digital assistants'
	},
	{
		'title': 'The Physical Landscape of Words',
		'publication': 'Submittable Blog',
		'month': 'Nov',
		'date': '2017',
		'link': 'https://blog.submittable.com/2017/11/the-physical-landscape-of-words/',
		'description': 'the neuroscience of reading on digital media'
	},
	{
		'title': 'The Gates of Heaven',
		'publication': 'Around the World Travel Anthology',
		'month': 'July',
		'date': '2015',
		'link': '',
		'description': 'hiking in the everest region of nepal'
	}
]

$(document).ready( function() {
	$.each(poems, function(i, val) {
		var item = $('<li>');
		var title = $("<span class='wtitle'>")
		if (val['link'] != '') {
			title.append("<a target='_blank' href='" + val['link'] + "'>" + val['title']);
		} else {
			title.append(val['title']);
		}
		item.append(title);
		item.append(" <span class='publication'>" + val['publication']);
		item.append("; <span class='date'>" + val['date']);
		$('.poems').append(item);
	})

	$.each(essays, function(i, val) {
		var item = $('<li>')
		var title = $("<span class='wtitle'>")
		if (val['link'] != '') {
			title.append("<a target='_blank' href='" + val['link'] + "'>" + val['title']);
		} else {
			title.append(val['title']);
		}
		item.append(title);
		item.append(" <span class='publication'>" + val['publication']);
		item.append("; <span class='date'>" + val['date']);
		item.append("<br />");
		item.append("<span class='wdescrip'>" + val['description']);
		$('.essays').append(item);
	})
})