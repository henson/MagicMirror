var messageListData = [];
						
var MessageStore = merge(EventEmitter.prototype, {
	
  addMessage: function(message){
	  var topic = message._getDestinationName();
	  messageListData.unshift({Topic: topic, Time: (new Date()).toUTCString(), Content: message._getPayloadString()});
  },	  

  getMessageList: function() {
    return messageListData;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});