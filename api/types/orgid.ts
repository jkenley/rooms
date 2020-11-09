interface IOrgPublicKey {
  id: string
  publicKeyPem: string
  type: string
}

interface IOrgDetails {
  organization: {
    id: string
    did: string
    publicKey: IOrgPublicKey[]
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

export {
  IOrgDetails,
  IDecodedOrgToken,
  IVerifiedOrgJwtResults,
}