var poems = [
	{
		'title': 'Lost Color',
		'publication': '--hence, tirade',
		'date': 'Feb 2018',
		'link': 'https://www.robocup-press.com/hence-tirade.html',
		'description': ''
	},
	{
		'title': 'Window',
		'publication': 'Synaesthesia Magazine',
		'date': 'March 2017',
		'link': 'http://www.synaesthesiamagazine.com/home/2017/3/12/window',
		'description': 'flash fiction'
	},
	{
		'title': 'The Cloud',
		'publication': 'Blueshift Journal',
		'date': 'May 2015',
		'link': 'https://www.theblueshiftjournal.com/issue-iii',
		'description': ''
	},
	{
		'title': 'Whispers',
		'publication': 'Spare Change News',
		'date': 'Sept 2015',
		'link': '',
		'description': ''
	}
]

var essays = [
	{
		'fulltitle': 'Is It Possible for Machines to Translate Poetry, When Humans Can Barely Do It?',
		'title': 'Is It Possible for Machines to Translate Poetry?', 
		'publication': 'Electric Literature',
		'date': 'April 2018',
		'link': 'https://electricliterature.com/machine-translation-poetry-hofstadter-artificial-intelligence-29245f7fad40',
		'description': 'what engineering has to say about poetry translation'
	},
	{
		'fulltitle': 'Why Siri Sounds Like A Girl, But Says She Is Beyond Gender',
		'title': 'Why Siri Sounds Like a Girl',
		'publication': 'SheCanCode',
		'date': 'May 2017',
		'link': 'https://shecancode.io/blog/why-siri-sounds-like-a-girl-but-says-she-is-beyond-gender',
		'description': 'the implications of gendering digital assistants'
	},
	{
		'title': 'The Physical Landscape of Words',
		'publication': 'Submittable Blog',
		'date': 'Nov 2017',
		'link': 'https://blog.submittable.com/2017/11/the-physical-landscape-of-words/',
		'description': 'the neuroscience of reading on digital media'
	},
	{
		'title': 'The Gates of Heaven',
		'publication': 'Around the World Travel Anthology',
		'date': 'July 2015',
		'link': '',
		'description': 'hiking in the everest region of nepal'
	}
]

$(document).ready( function() {
	$.each(poems, function(i, val) {
		var item = $('<li>')
		var title = $("<span class='wtitle'>")
		if (val['link'] != '') {
			title.append("<a target='_blank' href='" + val['link'] + "'>" + val['title']);
		} else {
			title.append(val['title']);
		}
		item.append(title);
		item.append(" <span class='publication'>" + val['publication']);
		item.append(" [<span class='date'>" + val['date'] + "]");
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
		item.append(" [<span class='date'>" + val['date'] + "]");
		item.append("<br />");
		item.append("<span class='wdescrip'>" + val['description']);
		$('.essays').append(item);
	})
})