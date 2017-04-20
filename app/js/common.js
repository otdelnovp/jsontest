var dataJson = [],
    currentItem = 0,
    howMatchItems = 10,
    mylist;

function addList() {
	for(var i=0; i < howMatchItems; i++) {
		if(currentItem >= dataJson.length) return false;
		mylist.$set('items[' + currentItem + '].show', true);
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

		mylist = new Vue({
			el: "#app",
			data: {
				items: dataJson
			}
		});
		//console.log('mylist', mylist.$data.items);

		addList();

	});

});
