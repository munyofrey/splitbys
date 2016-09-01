import React from 'react';
import BillItem from './bill_item_component'


class billList extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.requestBills()
  }

  render(){
    return(<div>
      <ul className='bill_list_component'>
        {this.props.bills.map(bill => (<BillItem bill={bill} key={bill.id} clickFunction={()=>console.log(`I work ${bill.id}`)}/>))}
      </ul>
      </div>
    )
  }


}

export default billList;
