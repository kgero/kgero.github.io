var paintings = [
  {
    'src': 'img/jellyfishII.jpg',
    'colsize': 'is-2',
    'text': ''
  },
  {
    'src': 'img/jellyfishI.jpg',
    'colsize': 'is-4',
    'text': ''
  },
  {
    'src': 'img/nephew.jpg',
    'colsize': 'is-2',
    'text': ''
  },
  {
    'src': 'img/nude.jpg',
    'colsize': 'is-2',
    'text': "This mural is painted in Senior House at MIT. The photo was taken as part of a mural documentation and preservation project. You can find more murals from the dormitory <a href='https://www.flickr.com/photos/151658333@N05/sets/72157685050910985' target='_blank'>here</a>. It was selected to be part of an exhibit about Senior House. There is a video of the exhibit <a href='https://youtu.be/D5GK7L9e5QI' target='_blank'>here</a> and a write up <a href='https://thetech.com/2018/04/19/senior-house-mural-exhibit' target='_blank'>here</a>"
  }]

var meche = [
  {
    'src': 'img/yoyo.jpg',
    'text': 'Injection-molded, 50 piece run of a functioning clutch yo-yo. 2011.'
  }, 
  {
    'src': 'img/projector.jpg',
    'text': "A wedding gift designed and constructed to project their profiles. <a href='https://katygero.wordpress.com/2015/11/20/stereographic-projector-lamp-as-wedding-gift/' target='_blank'>More here</a>. 2016."
  },
  {
    'src': 'img/lathe.jpg',
    'text': 'Capable of machining better than 10 micrometer precision radially. 2013.'
  },
  {
    'src': 'img/hexapods.jpg',
    'text': "Lightweight, composite hexapods with two degrees of freedom. <a href='https://katygero.wordpress.com/2012/07/17/hexapods/' target='_blank'>More here</a>. 2012."
  },
  {
    'src': 'img/lamp.jpg',
    'text': "Linkage-based expanding lamps. <a href='https://katygero.wordpress.com/2013/09/08/expanding-lamp-project-lumen/' target='_blank'>More here</a>. 2012."
  },
  {
    'src': 'img/emural.jpg',
    'text': "An interactive mural using circuit stickers and conductive paint. <a href='https://katygero.wordpress.com/2015/02/10/electronic-mural-completed/' target='_blank'>More here</a>. 2015."
  }]

var papers_cs = [
  {
    'title': 'Challenges in finding metaphorical connections',
    'author': "<span class='myname'>Katy Gero</span> and Lydia Chilton",
    'source': "NAACL Workshop on Figurative Language Processsing (forthcoming)",
    'year': "2018",
    'pdf': 'papers/revised-challenges-finding.pdf',
    'data': 'https://github.com/kgero/metaphorical-connections'
  }];

var papers_other = [
  {
    'title': "Biometeorological indices explain outside dwelling patterns based on Wi-Fi data",
    'author': "Christoph Reinhart, Jay Dhariwal, and <span class='myname'>Katy Gero</span>",
    'journal': "Building and Environment",
    'source': "Building and Environment",
    'volume': "126",
    'pages': "422--430",
    'year': "2017",
    'publisher': "Elsevier",
    'pdf': 'https://www.sciencedirect.com/science/article/pii/S0360132317304845'
  },
  {
    'title': "Design and analysis of a robust, low-cost, highly articulated manipulator enabled by jamming of granular media",
    'author': "Nadia Cheng, Maxim Lobovsky, Steven Keating, Adam Setapen, <span class='myname'>Katy Gero</span>, and Anette Hosoi, and Karl Iagnemma",
    'booktitle': "Robotics and Automation (ICRA), 2012 IEEE International Conference on",
    'source': "IEEE International Conference on Robotics and Automation",
    'pages': "4328--4333",
    'year': "2012",
    'organization': "IEEE",
    'pdf': 'papers/Jamming_Cheng.pdf'
  },
  {
    'title': "Experimental analysis on granular materials for robotic applications",
    'author': "<span class='myname'>Katy Gero</span>, Nadia Cheng, Karl Iagnemma, and Anette Hosoi",
    'year': "2012",
    'source': "Presented at American Physical Society Meeting",
    'slides': 'papers/aps_presentation_reduced.pdf'
  }]

$(document).ready( function() {
  // add papers
  $.each(papers_cs, function(i, val) {
    var tag = $("<p class='is-small'>");
    tag.append("<strong>" + val['title'])
    tag.append("<br />" + val['author'])
    tag.append("<br />" + val['source'] + "; " + val['year'])
    tag.append("<br />")
    if (val.hasOwnProperty('pdf')) {
      tag.append("| <a target='_blank' href='" + val['pdf'] + "'>pdf</a>")
    }
    if (val.hasOwnProperty('data')) {
      tag.append(" | <a target='_blank' href='" + val['data'] + "'>dataset</a>")
    }
    $('.papers_cs').append(tag);
  });
  $.each(papers_other, function(i, val) {
    var tag = $("<p class='is-small'>");
    tag.append("<strong>" + val['title'])
    tag.append("<br />" + val['author'])
    tag.append("<br />" + val['source'] + "; " + val['year'])
    if (val.hasOwnProperty('pdf')) {
      tag.append("<br />| <a target='_blank' href='" + val['pdf'] + "'>pdf</a>")
    }
    if (val.hasOwnProperty('slides')) {
      tag.append("<br />| <a target='_blank' href='" + val['slides'] + "'>slides</a>")
    }
    $('.papers_other').append(tag);
  });

  // add painting images
  $.each(paintings, function(i, val) {
    // make thumbnails
    var imgimg = $("<img>").attr('src', val['src']);
    var imgfig = $("<figure class='image imageclick'>").attr('id', 'painting' + i);
    var imgdiv = $("<div class='column'>");
    imgfig.append(imgimg);
    imgdiv.addClass(val['colsize']);
    imgdiv.append(imgfig);
    $('.paintings').append(imgdiv);

    // make modal overlays
    var modal = $('<div>').addClass('modal').addClass('painting' + i);
    var bckgrnd = $('<div>').addClass('modal-background');
    var newfig = imgfig.clone().removeClass('imageclick').addClass('imagemodal');
    var text = $('<p>').addClass('textmodal').append(val['text']);
    var content = $('<div>').addClass('modal-content').append(newfig).append(text);
    var button = $('<button>').addClass('modal-close').addClass('is-large');
    modal.append(bckgrnd).append(content).append(button);
    $('body').append(modal);
  });

  // add meche images
  $.each(meche, function(i, val) {
    // make thumbnails
    var imgimg = $("<img>").attr('src', val['src']);
    var imgfig = $("<figure class='image imageclick'>").attr('id', 'meche' + i);
    var imgdiv = $("<div class='column'>");
    imgfig.append(imgimg);
    imgdiv.append(imgfig);
    $('.meche').append(imgdiv);

    // make modal overlays
    var modal = $('<div>').addClass('modal').addClass('meche' + i);
    var bckgrnd = $('<div>').addClass('modal-background');
    var newfig = imgfig.clone().removeClass('imageclick').addClass('imagemodal');
    var text = $('<p>').addClass('textmodal').append(val['text']);
    var content = $('<div>').addClass('modal-content').append(newfig).append(text);
    var button = $('<button>').addClass('modal-close').addClass('is-large');
    modal.append(bckgrnd).append(content).append(button);
    $('body').append(modal);
  });

  $('.modal').removeClass('is-active');

  $('.imageclick').click( function() {
    var id = $(this).attr('id');
    $('.' + id).addClass('is-active');
  });

  $('.modal-close').click( function() {
    $('.modal').removeClass('is-active');
  });
  $('.modal-background').click( function() {
    $('.modal').removeClass('is-active');
  });
});