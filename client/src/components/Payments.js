import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { config } from '../config';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Payments extends Component {
    render(){
        console.log(process.env.REACT_APP_STRIPE_KEY);
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 para 5 emails"
                amount={500} //amount esta em centavos por isso precisa multiplicar o valor por 100
                token={token => this.props.handleToken(token)}
                stripeKey={config.stripeKey}
            >
                <button className='btn'>Add Credits</button>
            </StripeCheckout>
        );
    }
}
export default connect(null, actions) (Payments);