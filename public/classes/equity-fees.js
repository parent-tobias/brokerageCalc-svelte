const EquityFees =  {
  STT: (isSellOrder, isComplete, gross)=>{
    return (isSellOrder&&isComplete) ? Math.abs(gross*.00025) : 0 ;
  },
  transactionFee: (gross)=>{
    // At this point, there's a question of NSE or BSE.
    const NSE = .0000325;
    const BSE = .00003;
    return Math.abs(gross*NSE);  }
}

export default EquityFees;