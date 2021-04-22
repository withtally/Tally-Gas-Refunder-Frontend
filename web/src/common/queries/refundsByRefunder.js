export const query = (refunder) => `
{
  refunder(id:"${refunder}") {
    id
    owner
    maxGasPrice
    version
    balance
    isPaused
    refundCount
    depositCount
    withdrawlCount
    deposits{
      value
      depositor
    }
    withdrawls {
      value
      recipient
    }
    refundables{
      target
      identifier
      validatingContract
      validatingIdentifier
      isRefundable
      refunds {
        caller
        target
        identifier
        refund
      }
    }
    refunds{
      refunder {
        id
      }
        caller
        target
        identifier
        refund
    }
  }
}

`

{
  refunds(where:{refunder: "0xa3c41df78a91f188e6570d635b7c7ce0a4e7dc58"}){
    caller
    target
    identifier
    refund
  }
  }
