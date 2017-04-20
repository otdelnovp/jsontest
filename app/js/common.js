var dataJson = [],
    dataItems,
    currentItem = 0,
    howMatchItems = 10;

function addList() {
	for(var i=0; i < howMatchItems; i++) {
		if(currentItem >= dataJson.length) return false;
		//mylist.$set('items[' + currentItem + '].show', true);
		Vue.set(dataItems.items[currentItem],'show', true);
		currentItem++;
	}
}

$(window).scroll(function() {
	if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
		addList();
	}
});

$(function() {

	howMatchItems = ( $('.main').height() / $('.list__item').height() ^ 0 ) + 1;
	//console.log('howMatchItems',howMatchItems);

	$.getJSON('./js/items.json', function (data) {
		dataJson = data;
		//console.log(dataJson);
		$( ".list" ).removeClass('list_loading');

		dataItems = new Vue({
			el: "#app",
			data: {
				items: dataJson
			}
		});
		//console.log('dataItems', dataItems.items);

		addList();

	});

});
