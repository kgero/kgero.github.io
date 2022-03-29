var poems = [
	{
		'title': 'Whalefall (excerpt)',
		'publication': 'Stirring Lit',
		'month': 'Jan',
		'date': '2022',
		'link': 'https://www.stirringlit.com/vol-24-ed-1-p-whalefall-by-katy-gero',
		'description': ''
	},
	{
		'title': 'Ode to Marelle',
		'publication': 'flux anthology',
		'month': 'Feb',
		'date': '2022',
		'link': 'https://fifthwheelpress.com/flux-backend/ode-to-marelle-katy-ilonka-gero',
		'description': ''
	},
	{
		'title': 'Private Dead',
		'publication': 'flux anthology',
		'month': 'Feb',
		'date': '2022',
		'link': 'https://fifthwheelpress.com/flux-backend/ode-to-marelle-katy-ilonka-gero-5xjda',
		'description': ''
	},
	{
		'title': 'Shuffled Still Life',
		'publication': 'Catapult',
		'month': 'Nov',
		'date': '2021',
		'link': 'https://catapult.co/community/stories/shuffled-still-life-katy-gero-poem/',
		'description': ''
	},
	{
		'title': 'The Architect',
		'publication': 'Pigeonholes',
		'month': 'Aug',
		'date': '2021',
		'link': 'http://pidgeonholes.com/2021/07/the-architect/',
		'description': ''
	},
	{
		'title': 'WHALEFALL',
		'publication': 'taper',
		'month': 'Oct',
		'date': '2020',
		'link': 'https://taper.badquar.to/5/whalefall.html',
		'description': ''
	},
	{
		'title': 'Our Ocean',
		'publication': 'Brooklyn Poets Poet-of-the-Week',
		'month': 'Apr',
		'date': '2020',
		'link': 'https://brooklynpoets.org/poet/katy-ilonka-gero/',
		'description': ''
	},
	// {
	// 	'title': 'Three Ocean Poems',
	// 	'publication': 'Dear Ocean Reading Series',
	// 	'month': 'Nov',
	// 	'date': '2019',
	// 	'link': '',
	// 	'description': ''
	// },
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
		'fulltitle': 'An Introduction to Feedback',
		'title': 'An Introduction to Feedback', 
		'publication': 'CultureHub',
		'month': 'February',
		'date': '2021',
		'link': 'https://www.culturehub.org/read/katy-ilonka-gero-an-introduction-to-feedback',
		'description': 'feedback is how we nourish the creative soul'
	},
	{
		'fulltitle': 'What Kind of Sonnets Will Computers Write?',
		'title': 'What Kind of Sonnets Will Computers Write?', 
		'publication': 'Catapult',
		'month': 'October',
		'date': '2020',
		'link': 'https://catapult.co/stories/katy-gero-language-art-science-computer-generated-poetry',
		'description': 'even a computational poem has to uncover something new'
	},
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
	}
	// {
	// 	'title': 'The Gates of Heaven',
	// 	'publication': 'Around the World Travel Anthology',
	// 	'month': 'July',
	// 	'date': '2015',
	// 	'link': '',
	// 	'description': 'hiking in the everest region of nepal'
	// }
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
		var item = $('<li>');
		var title = $("<span class='wtitle'>")
		if (val['link'] != '') {
			title.append("<a target='_blank' href='" + val['link'] + "'>" + val['title']);
		} else {
			title.append(val['title']);
		}
		item.append(title);
		item.append(" <span class='publication'>" + val['publication'] + "</span>");
		item.append("; <span class='date'>" + val['date'] + "</span>");
		$('.essays').append(item);
	})
})