import React from 'react';
import { Link, hashHistory } from 'react-router';



class SignupForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			password: "",
			name: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(newProps){
		console.log(newProps);
		if (newProps.loggedin){
			hashHistory.push("/landing");
		}
	}


	update(field){
		return e => { this.setState({[field]: e.currentTarget.value }); };
	}

	handleSubmit(e){
		e.preventDefault();
		const user = this.state;
		if(this.props.loginType){
		this.props.login({user});
		}else{this.props.signup({user})}
	}

	renderErrors(){
		return(
			<ul className='errors after'>
				{this.props.errors.map( (error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}
	//
	// navLink(){
	// 	return(
	// 		<Link to="/" className='kill-button margin-down'>x</Link>
	// 		)
	// 	}



	render() {
		const formInput= this.props.formType + '-input';
		const formType= this.props.formType + '-form-box';
		return (
			<div className="login-form-container">

					{this.props.loginType ?
						<div className='signin-welcome'><p className='welcome-text'>Welcome back!</p></div> :
							<div className='logo-signup'>
								<div className='logo-signup-image-holder'></div>
								<p className='welcome-text'>Welcome to SplitBys!</p>
							</div>}
				<form onSubmit={this.handleSubmit} className={formType}>
					<div className={formInput}>
					<div className='login-form-elements'>
						{ this.renderErrors() }
						{this.props.loginType ? '' :

						    <label> You go by:<br/>
								<input type="text"
											value={this.state.name}
											onChange={this.update("name")}
											className={formInput} />
									</label>
											}
						<label>Your email is:
							<input type="text"
								value={this.state.email}
								onChange={this.update("email")}
								className={formInput} />
						</label>
						<label> Password:
							<input type="password"
								value={this.state.password}
								onChange={this.update("password")}
								className={formInput} />
						</label>
						<div className='justify-left-flex submit-level'>
						<input type="submit" className='entry-submit button' value="Submit" />
						</div>
					</div>
					</div>
				</form>
			</div>
		);
	}

}


export default SignupForm;
