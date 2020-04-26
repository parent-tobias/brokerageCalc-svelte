const EquityFees =  {
  STT: ()=>{
    return (this.isSellOrder&&this.isComplete) ? Math.abs(this.gross*.00025) : 0 ;
  },
  GST: ()=>{
    return Math.abs((this.brokerage+this.transactionFee)*.18 );
  }
}

export default EquityFees;