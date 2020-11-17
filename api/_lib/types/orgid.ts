interface IOrgPublicKey {
  id: string
  did: string
  publicKeyPem: string
  type: string
}

interface IOrgDetails {
  organization: {
    id: string
    did: string
    publicKey: Array<IOrgPublicKey>
    owner: string
    isActive: boolean
  }
}

interface IJwtOptions {
  aud: string
  iss: string
  exp: string
}

interface IDecodedOrgToken {
  payload: IJwtOptions
}

interface IVerifiedOrgJwtResults extends IJwtOptions {
  orgDetails: IOrgDetails
}

interface IDecodedOrgIdToken {
  orgId: string
  publicKeyFragment: string
}

export {
  IOrgDetails,
  IDecodedOrgToken,
  IVerifiedOrgJwtResults,
  IDecodedOrgIdToken,
}
