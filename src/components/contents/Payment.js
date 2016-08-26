import React, { Component, PropTypes } from 'react';
import swal from 'sweetalert2';
const Stripe = window.Stripe;
Stripe.setPublishableKey('pk_test_1AtJqGf6KE3PMFdyeUOkuotK');

class Payment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			card: '',
			cvc: '',
			expMonth: '',
			expYear: '',
			postCode: '',
			error: '',
      amount: 1,
      email: '',
			token: ''
		};

		this.handleClick = this.handleClick.bind(this);
    this.stripeResponseHandler = this.stripeResponseHandler.bind(this);
	}

	componentDidMount() {

	}

	stripeResponseHandler(status, res) {
		if(res.error) {
			this.setState({error: res.error});
		} else {
			this.setState({token: res.id});
			this.handleChargeCustomer(res.id);
		}
	}

	handleChargeCustomer(token) {
		let { amount, email } = this.state;
		amount = (parseInt(amount)*4000);
		fetch('/payment', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, amount, token, event: this.props.eventName })
		}).then(res => {
				if (res.status >= 400) {
						throw new Error("Bad response from server");
				}
				return res.json();
		}).then(data => {
				if (data.err) {
					return swal("Oops...", data.err.message, "error");
				}
				this.setState({card: '', cvc: '', expMonth: '', expYear: '', postCode: '', error: '',
					amount: 1, email: '', token: ''});
				swal({title: "Thank You", text: "Your recipt is sent to your email.", type: "success", timer: 2000});

		}).catch(err => {
				swal("Oops...", err, "error");
		});
	}

	handleClick(e) {
		e.preventDefault();
		const { card, cvc, expMonth, expYear, postCode } = this.state;
		Stripe.card.createToken({
			number: card,
			cvc: cvc,
			exp_month: expMonth,
			exp_year: expYear,
			address_zip: postCode
		}, this.stripeResponseHandler);
	}

	render() {
		const {error, email, amount, token, card, expMonth, expYear, cvc, postCode} = this.state;
		return (
			<div className="col-four col-four-offset payment-section">
				<h1>Welcome to Stripe Payment Test</h1>
				<form action="/payment" method="POST" id="payment-form" onSubmit={this.handleClick}>
					{error && <span className="payment-errors">{error}</span>}
					<span>Email:</span>
					<input type="email" name="email" placeholder="Email" value={email} onChange={(e) => this.setState({email: e.target.value})}/>
					<span>Quantaty:</span>
					<input type="number" name="amount" maxLength="10" min="0" value={amount} onChange={(e) => this.setState({amount: e.target.value})}/>
					<span>Card Number:</span>
					<input type="text" data-stripe="number" size="20" placeholder="Card Number" value={card} onChange={(e) => this.setState({card: e.target.value})}/>
					<span>Exp Month:</span>
					<input type="text" size="2" data-stripe="exp_month" placeholder="Exp Month" value={expMonth} onChange={(e) => this.setState({expMonth: e.target.value})}/>
					<span>Exp Year:</span>
					<input type="text" size="2" data-stripe="exp_year" placeholder="Exp Year" value={expYear} onChange={(e) => this.setState({expYear: e.target.value})}/>
					<span>CVC:</span>
					<input type="text" size="4" data-stripe="cvc"	placeholder="CVC" value={cvc} onChange={(e) => this.setState({cvc: e.target.value})}/>
					<span>PostCode/ZipCode:</span>
					<input type="text" data-stripe-zip-code="true" placeholder="PostCode" value={postCode} onChange={(e) => this.setState({postCode: e.target.value})}/>
					{token && <input type="hidden" name="stripeToken" value={token}/>}
					<div>
						<button type="submit">Submit Payment</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Payment;
