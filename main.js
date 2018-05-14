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

$(document).ready( function() {
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