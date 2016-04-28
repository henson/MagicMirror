// Displays the input form and handles user input for publishing messages to topics
var PublishBox = function() {	
var PublishBox = React.createClass({
	componentDidMount: function() {
		$(this.refs.qosSubInput.getDOMNode()).tooltip({
			html: 'true',
			placement: 'bottom',
			container: 'body',
			title: 'QoS 0: at most once<br />QoS 1: at least once<br />QoS 2: exactly once'
		});
		$(this.refs.retainFlag.getDOMNode()).tooltip({
			html: 'true',
			placement: 'bottom',
			container: 'body',
			title: "If the Retain flag is set, the server keeps the message after it has been delivered to the current subscribers.  When a new subscription is established on a topic, the last retained message on that topic is sent to the subscriber."
		});
		TopicStore.addChangeListener(this.onTopicChange);
	},
	getInitialState: function() {
		return {lastMessage: "", topics:TopicStore.getTopicList()};
	},
	// Updates the drop-down menu
	onTopicChange: function() {
		this.setState({topics:TopicStore.getTopicList()});
	},
	componentWillUnmount: function() {
		TopicStore.removeChangeListener(this.onTopicChange);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		// Should use in v0.13 var currentMessage = React.findDOMNode(this.refs.messageText).value.trim();
		// Should use in v0.13 var retainFlag = React.findDOMNode(this.refs.retainFlag).checked;
		// Should use in v0.13 var qos = React.findDOMNode(this.refs.qosSubInput).value;
		// Should use in v0.13 React.findDOMNode(this.refs.messageText).value = '';
		var topic = this.refs.TopicInput.getInput();
		var currentMessage = this.refs.messageText.getDOMNode().value.trim();	// v0.12.2
		var retainFlag = this.refs.retainFlag.getDOMNode().checked;				// v0.12.2
		var qos = this.refs.qosSubInput.getDOMNode().value;						// v0.12.2
		this.refs.messageText.getDOMNode().value = '';
		var pub = new Publisher({topic: topic,message:currentMessage,qos:Number(qos),retained:Boolean(retainFlag)});
		this.setState({lastMessage: currentMessage});
	},
	render: function(){
		return(
			<div className="PublishBox">
				<div className="panel panel-default">
					<div className="panel-body">Last Message: {this.state.lastMessage}</div>
				</div>
				<div className="panel panel-info">
					<div className="panel-heading">
						<h3 className="panel-title">Message:</h3>
					</div>
					<div className="panel-body">	
						<form onSubmit = {this.handleSubmit}>
							<div className="row">
								<div className = 'TopicInput'>
									<TopicInput data = {this.state.topics} ref="TopicInput"/>
								</div>
								
							</div>
							<br/>
							<textarea className="form-control" placeholder="Enter your payload" ref="messageText" rows="3"/>
							<hr/>
							<div className="form-group" >
								<div className='col-sm-1 text-right' >
								<label className="middlelabel">QoS</label>
								</div>
								<div className='col-sm-2' >
								<select className='form-control' data-toggle='tooltip' ref='qosSubInput'>
								  <option>0</option>
								  <option>1</option>
								  <option>2</option>
								</select>
								</div>
								<div className='col-sm-1' >
								<div className="checkbox">
									<label>
										<input type="checkbox" ref="retainFlag"/> Retain
									</label>
								</div>
								</div>
								<div className='col-sm-8 text-right'>
								
									<input className="btn btn-primary" type="submit" value="Publish" />
	
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});	

var TopicInput = React.createClass({
	getInput: function(){
		return (this.refs.TopicInput.getDOMNode().value.trim())
	},
	render: function(){
		var TopicNodes = this.props.data.map(function (topic) {
			return (
				<option>{topic}</option>
			);
		});
		return(
			<div>
				<div className='col-sm-1 text-left' >
					<label className="middlelabel">Topic:</label>
				</div>
				<div className='col-sm-4' >
					<select className='form-control' data-toggle='tooltip' ref='TopicInput'>
					{TopicNodes}
					</select>
				</div>
			</div>
		);
	}
});

return <PublishBox />
}