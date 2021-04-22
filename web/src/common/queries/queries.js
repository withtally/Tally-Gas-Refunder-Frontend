
export const getAllRefundersQuery = () => `{
  refunders{
    id
    owner
    maxGasPrice
    version
    isPaused
    refundCount
    depositCount
    withdrawlCount
    refundableCount
  }
}`


export const refundablesByRefunder = (refunder) => `
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
