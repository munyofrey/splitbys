import { connect } from 'react-redux';
import { createBill, updateBill, receiveBills, receiveErrors } from '../../actions/bill_actions';
import ModalBillForm from './new_bill_modal';
import { values } from 'lodash';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  errors: state.bills.errors,
  friends: values(state.friends.friends)
})

const mapDispatchToProps = dispatch => ({
  createBill: (bill, success) => dispatch(createBill(bill, success)),
  updateBill: (bill, success) => dispatch(updateBill(bill, success)),
  receiveBills: (bills) => dispatch(receiveBills(bills)),
  receiveErrors: errors => dispatch(receiveErrors(errors))
})


export default connect(mapStateToProps, mapDispatchToProps)(ModalBillForm);
