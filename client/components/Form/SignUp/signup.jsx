import React, { Component } from 'react'
import minitoastr from 'mini-toastr'

class signupComponent extends Component {
  constructor () {
    super()
    this.state = {
      password: '',
      confirmPassword: '',
      errorMessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (event) {
    const {name, value} = event.target
    this.setState({name: value})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.isAutheticated) {
      const check = this.props.children
    }
  }
  handleSubmit (event) {
    event.preventDefault()
    this.state.errorMessage = ''
    /**
     * @description for password confrimation
     * @argument {password} as - checkpass
     * @argument {confirmpassword} as - recheckpass
     */
    const checkPass = this.state.password
    const recheckPass = this.state.confirmPassword
    if (checkPass === recheckPass) {
      console.log('it\'s ready to proceed')
    } else {
      minitoastr.init()
      minitoastr.showMessage('pls make sure password mathch')
    }
  }
  render () {
    return (
      
    )
  }
}
