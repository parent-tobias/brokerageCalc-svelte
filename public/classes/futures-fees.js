const FuturesFees = {
  STT: ()=>{
    return (this.isSellOrder&&this.isComplete) ? Math.abs(this.gross*.0001) : 0 ;
  },
  GST: ()=> {
    return Math.abs((this.brokerage+this.transactionFee)*.18 );
  }
}

export default FuturesFees;