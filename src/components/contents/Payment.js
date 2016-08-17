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
      amount: 0,
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
		amount = (parseInt(amount)*100);
		fetch('/payment', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, amount, token })
		}).then(res => {
				if (res.status >= 400) {
						throw new Error("Bad response from server");
				}
				return res.json();
		}).then(data => {
				if (data.err) {
					return swal("Oops...", data.err.message, "error");
				}
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
		const {error, email, amount, token} = this.state;
		return (
			<div>
				<h1>Welcome to Stripe Payment Test</h1>
				<form action="/payment" method="POST" id="payment-form" onSubmit={this.handleClick}>
					{error && <span className='payment-errors'>{error}</span>}

          <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => this.setState({email: e.target.value})}/>

          <input name="amount" placeholder="Amount Paying" value={amount} onChange={(e) => this.setState({amount: e.target.value})}/>

          <input data-stripe="number" placeholder="Card Number" onChange={(e) => this.setState({card: e.target.value})}/>
					<input data-stripe="cvc" placeholder="CVC" onChange={(e) => this.setState({cvc: e.target.value})}/>
					<input data-stripe="exp-month" placeholder="Exp Month" onChange={(e) => this.setState({expMonth: e.target.value})}/>
					<input data-stripe="exp-year" placeholder="Exp Year" onChange={(e) => this.setState({expYear: e.target.value})}/>
					<input data-stripe-zip-code="true" placeholder="PostCode" onChange={(e) => this.setState({postCode: e.target.value})}/>
          {token && <input type="hidden" name="stripeToken" value={token}/>}
					<button>Submit Payment</button>
				</form>
			</div>
		);
	}
}

export default Payment;
