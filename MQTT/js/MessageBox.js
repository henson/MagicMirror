var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;

// Displays received messages in a table
var MessageBox = function() {	

var MessageBox = React.createClass({
	getInitialState: function(){
		return {data: MessageStore.getMessageList()};
	},
		// Update view state when change event is received
	_onChange: function() {
		this.setState({data:MessageStore.getMessageList()});
	},
	// Bind change listener
	componentDidMount: function() {
		MessageStore.addChangeListener(this._onChange);
	},

	// Unbind change listener
	componentWillUnmount: function() {
		MessageStore.removeChangeListener(this._onChange);
	},
	render: function(){
		return(
			<div className="messageBox">
				<Table className="table" data={this.state.data} />
			</div>
		);
	}
});	

return <MessageBox />
}