import React, { Component } from 'react'
import { CONF } from '../config'
import Loading from './Loading.jsx'

class CallInitiate extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          calling: false
        }
        
        this.onPhoneFormSubmit = this.onPhoneFormSubmit.bind(this)
    }

    componentDidMount () { 
      fbq('track', 'Lead'); 
    }
    
    onPhoneFormSubmit(e) {
        e.preventDefault();
        const phoneField = document.getElementById('fieldPhone');      
        const number = phoneField.value.replace(/[^\d]/g, '');

        if (number.length !== 10) {
            phoneField.focus();
            return alert('Please enter your 10 digit phone number.');
        }
        
        const request = new XMLHttpRequest();
        let url = `https://demandprogress.callpower.org/call/create?campaignId=${CONF.callPowerId}&userPhone=${number}`;
        
        let zip
        try {
            if ('zip' in sessionStorage) {
                zip = `${sessionStorage.zip}`;
            }
        } catch (err) {
            // Oh well
        }
      
        request.open('POST', url, true);
        request.send(); 
        this.setState({
          calling: true
        }, this.props.callMade(e))   
    }
    
    render() {
      let button = null
      
      if(this.state.calling){
        button = (
          <button className="btn">
            < Loading/>
          </button>
        )
      } else {
        button= (<button className="btn" onClick={ this.onPhoneFormSubmit }>CALL CONGRESS
          <img src="../images/phone.svg" />
        </button>)
      }

        return (
          <div className="bftn-form call-action-form" id="signThePetition">
            <h3>Now, could you make a call to your senators?</h3>
            <br/><br/>
            <div style={{color: 'white', lineHeight: 1.5}}>
              <strong style={{ fontSize: "25px" }}>
              Please make a call to help block Trump's War Cabinet.
              </strong>
              <br/><br/>
            </div>
            <article>
              <p style={{margin:'0 0 20px 0'}}>
                Just enter your number and click “call”.  We’ll call you, give you a script of what you can say, and connect you to your senators.
              </p>
              <div className="phone-form">
                <form >
                  <input style={{border:'1px solid black'}} placeholder="Your Phone Number" id="fieldPhone" ref="field-phone" className="phone" name="phone" autoComplete="on" pattern="[\d\(\)\-\+ ]*" autoFocus />
                  {button}
                </form>
                <div className="privacy" style={{fontSize:"12px", fontFamily:"inherit", fontStyle:"italic", textAlign:"center", padding:"10px 0 20px", lineHeight:"1.5"}}>
                    This tool uses <a href="http://callpower.org/" target="_blank">Call Power</a>
                    <br/>
                </div>
                <strong style={{ fontSize: '25px', marginTop:'-4px', color: 'white' }}>
                  Or dial <a href="tel:+12028998938">202-899-8938</a> to connect.
                </strong>
              </div>
            </article>
          </div>
        )
    }
}

export default CallInitiate