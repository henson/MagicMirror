var TopicsData = [];
						
var TopicStore = merge(EventEmitter.prototype, {
	
  addTopic: function(topic){
	  if(TopicsData.indexOf(topic) === -1)
		TopicsData.unshift(topic);
  },	  
  
  getTopicList: function() {
    return TopicsData;
  },
  
  emitChange: function() {
    this.emit('topic_change');
  },
  
  addChangeListener: function(callback) {
    this.on('topic_change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('topic_change', callback);
  }

});