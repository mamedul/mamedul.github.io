$(document).ready(function(){
	
	document.title = $(document).find('#title').text() + " :: MAMEDUL ISLAM";
	$('#loading').fadeOut(1000);
	$('#body-container').show();
	
    var load = function (link) {
		$.ajax({
			method: 'GET',
			url: link,
			data: { ajax : 'true' },
			beforeSend: function(){
				$('.content-body-box').css( {'visibility' : 'hidden'} );
				$('#loading').show();
			},
			complete: function(h) {
				$('.content-body-box').html(h.responseText);
				//t.parent().find('.nav-item').removeClass('active');
				//t.addClass('active');
				$('.content-body-box').css( {'visibility' : 'visible'});
				$('#loading').fadeOut(500);
				$('.content-body-box').scrollTop(0);
			}
		});
	}

    $(document).on('click', 'a', function (e) {
        e.preventDefault();
        var $this = $(this), url = $this.attr("href");
		
		if (typeof ($this.attr('title'))!='undefined' ) {
			title = $this.attr('title') + ' :: MAMEDUL ISLAM';
		}else{
			title = $this.text() + ' :: MAMEDUL ISLAM';
		}
		
		// ***** if outer link ***** js url parse
		// ***** if link under navigation ***** nav-item bg clear and active
		
        history.pushState({
            url: url,
            title: title
        }, title, url);
		
        document.title = title;

        load(url);
		
    });

    $(window).on('popstate', function (e) {
        var state = e.originalEvent.state;
        if (state !== null) {
            document.title = state.title;
            load(state.url);
        } else {
            document.title = 'Mamedul Islam';
            $('.content-body-box').empty();
			load("/");
        }
    });
	
	var fitdoc=function(){
		
		var ch =$('#content-header'), cb=$('#content-body'), cbb=$('#content-body-box'), cf=$('#content-footer');
		//cbb.css({ "margin- top" : ch.height() +"px", "margin- bottom" : cf.height() +"px");
		cbb.css({ "margin-top" : ch.outerHeight(), "margin-bottom" : cf.outerHeight(), "height" : cb.height() - (ch.outerHeight()+cf.outerHeight()), "max-height" : cb.outerHeight() - (ch.outerHeight()+cf.outerHeight()) });
	};
	
	fitdoc();$(window).on('resize', function(){fitdoc()});
	
});