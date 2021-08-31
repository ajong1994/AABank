import React from 'react'


class Try extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      balance: null,
      errormessage: ''
    };
  }

  

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam === "balance") {
      if (val !=="" && !Number(val)) {
        err = <strong>Your balance must be a number</strong>;
      }
    }
    this.setState({errormessage: err});
    this.setState({[nam]: val});
    
  }


  // mySubmitHandler = (event) => {
  //   event.preventDefault();
  //   let balance = this.state.balance;
  //   if (!Number(balance)) {
  //     alert("Your balance must be a number");
  //   }
  // }

  
  render() {

    let header = '';
    if (this.state.username) {
      header = <h1>Hello {this.state.username} {this.state.balance}</h1>;
    } else {
      header = '';
    }
    return (
      <div className="register-main">
        <form>
        {header}
        <p>Enter your name:</p>
        <input
          type='text'
          name='username'
          onChange={this.myChangeHandler}
        />

    

    <p>Enter initial balance:</p>
      <input
        type='number'
        name='balance'
        onChange={this.myChangeHandler}
      />

      <br/>
      <br/>
      <input type='submit' />
      {this.state.errormessage}
        </form>

    
    </div>
      );
    }     
}

export default Try