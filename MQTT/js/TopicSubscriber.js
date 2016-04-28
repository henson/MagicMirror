// Input text box for topic subscritions
var TopicInput = function() {	

var TopicInput = React.createClass({	
	getInitialState: function(){
		return {topics: TopicStore.getTopicList()};
	},
	componentDidMount: function() {
		$(this.refs.topic.getDOMNode()).tooltip({
			html: 'true',
			placement: 'top',
			container: 'body',
			title: 'Topics must start with /<br>Example: /some/topic/to/publish'
		});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		// Should use in v0.13 var currentMessage = React.findDOMNode(this.refs.messageText).value.trim();
		var topic = this.refs.topic.getDOMNode().value.replace(/\s+/g,"");
		
		TopicStore.addTopic(topic);
		Subscriber.add(topic);
		
		TopicStore.emitChange();
		this.setState({topics:TopicStore.getTopicList()});
	},
	render: function(){
		return(
			<div className="TopicInput">
			<form className="form-horizontal" onSubmit = {this.handleSubmit}> 
					<div className="form-group">
						<div className='row'>
							<div className='col-sm-2 text-right' >
								<label className="middlelabel">Subscribe to topic:</label>
							</div>
							<div className='col-sm-8 text-right'>
								<input type="text" className="form-control" placeholder="Enter your topic" id="topic" ref="topic" rows="1" required/>
							</div>
						
							<div className='col-sm-1 text-right'>
								<input className="btn btn-primary" type="submit" value="Subscribe" />
							</div>
						</div>
					</div>
				</form>
			
			
			<div className="panel panel-success">
				<div className="panel-heading">
					<h3 className="panel-title">Subscribed Topics</h3>
				</div>
				<div className="panel-body">
					<TipicList data={this.state.topics} />
				</div>
			</div>
			
			</div>
		);
	}
});

var TipicList = React.createClass({
	render: function(){
		var TopicNodes = this.props.data.map(function (topic) {
			return (
				<h5>{topic}</h5>
			);
		});
		return(
			<div>
				{TopicNodes}
			</div>
		);
	}
});

return <TopicInput />
}