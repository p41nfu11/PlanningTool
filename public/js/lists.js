function ListsViewModel() {
    self = this;

    self.lists = ko.observableArray();
    self.title = ko.observable();
    self.listToJoin = ko.observable();

    self.init = function(){
    	$.get('/api/lists/', function(data) {
    		data.forEach(function (e){
    			self.lists.push(e);	
    		});
    	});
    }

	self.addListWasClicked = function(){
    	var newList = {title: self.title, createdDate: new Date()};
    	$.post('/api/list/', newList, function(res, err) {
    		self.lists.push(res);
    		self.title('');
		});	
    };

    self.joinList = function(){
        $.post('/api/listAddOwner/', {listId: self.listToJoin()}, function(res, err) {

            self.listToJoin('');
        });
        
    }

    self.init();

}

ko.applyBindings(new ListsViewModel());