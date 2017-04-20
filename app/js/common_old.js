var dataJson = [],
    currentItem = 0,
    howMatchItems = 5;

function addList() {
	var addItems = '';
	for(var i=0; i < howMatchItems; i++) {
		if(currentItem >= dataJson.length) return false;
		obj = dataJson[currentItem];
		//console.log(obj.Name);
		addItems +=
			'<li class="list__item list__item_preload">' +
				'<a href="#' + currentItem + '" class="list__item__link clearfix">' +
					'<span class="list__item__image"><img src="' + obj.Logo + '" alt=""></span>' +
					'<span class="list__item__content clearfix">' +
						'<h3 class="list__item__title">' + obj.Name + '</h3>' +
						'<span class="list__item__type">' + obj.Cuisines.split(' / ').join(', ') + '</span>' +
						( obj.IsOpen ? 
							( obj.WorkingTime.split(' - ').length > 1 ?
								'<span class="list__item__time">С <span class="list__item__time__value">' + obj.WorkingTime.split(' - ').join(' до ') + '</span></span>' :
								'<span class="list__item__time"><span class="list__item__time__value">' + obj.WorkingTime + '</span></span>' ) :
							'<span class="list__item__time list__item__time_close">Откроется в <span class="list__item__time__value">' + obj.WorkingTime.split(' - ')[0] + '</span></span>' ) +
							( obj.PositiveReviewsPercent ? 
								( obj.PositiveReviewsPercent > 70 ?
									'<span class="list__item__rating list__item__rating_positive"><i class="fa fa-thumbs-up"></i>' + obj.PositiveReviewsPercent + '%</span>' :
									'<span class="list__item__rating list__item__rating_negative"><i class="fa fa-thumbs-down"></i>' + obj.PositiveReviewsPercent + '%</span>' ) :
								'' ) +
					'</span>' +
					'<span class="list__item__info">' +
						'<span class="list__item__info__item list__item__info__item_price"><i class="fa fa-shopping-bag"></i>От <span class="list__item__info__value">' + obj.MinCost + ' &#8381;</span><span class="list__item__info__note">мин сумма заказа</span></span>' +
						'<span class="list__item__info__item list__item__info__item_delivery"><i class="fa fa-car"></i><span class="list__item__info__value">' + obj.DeliveryCost + ' &#8381;</span><span class="list__item__info__note">стоимость доставки</span></span>' +
						'<span class="list__item__info__item list__item__info__item_delivery-time"><i class="fa fa-clock-o"></i><span class="list__item__info__value">' + obj.DeliveryTime + '</span><span class="list__item__info__note">среднее время доставки</span></span>' +
					'</span>' +
					( obj.IsNew ? '<span class="list__item__label list__item__label_new"><span>Новый</span></span>' : 
						( obj.HasSails ? '<span class="list__item__label list__item__label_sails"><span>Акция</span></span>' : 
							( obj.HasPaymentForPoints ? '<span class="list__item__label list__item__label_points"><span>За<br> баллы</span></span>' : '' ))) +
				'</a>' +
			'</li>';
		currentItem++;
	}
	$( ".list" ).append(addItems);
	$('.list__item_preload').fadeTo(1500, 1).removeClass('list__item_preload');
	addItems = '';
}

$(window).scroll(function() {
	if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
		addList();
	}
});

$(function() {

	howMatchItems = ( $('.main').height() / $('.list__item_empty').height() ^ 0 ) + 2;

	$.getJSON('./js/items.json', function (data) {
		dataJson = data;
		console.log(dataJson);
		$( ".list" ).html('').removeClass('list_loading');
		addList();
	});
	
});
