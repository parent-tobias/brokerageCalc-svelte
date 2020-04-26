const FuturesFees = {
  STT: (isSellOrder, isComplete, gross)=>{
    return (isSellOrder&&isComplete) ? Math.abs(gross*.0001) : 0 ;
  },
  transactionFee: (gross)=> {
    // futures are strictly NSE
    const NSE = .000019;
    return Math.abs(gross*NSE);  }
}

export default FuturesFees;