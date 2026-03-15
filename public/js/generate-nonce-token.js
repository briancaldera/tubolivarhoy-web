// Adapted from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string

function generateNonceToken() {
  const nonce = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))),
  )
  const encoder = new TextEncoder()
  const encodedNonce = encoder.encode(nonce)
  crypto.subtle.digest('SHA-256', encodedNonce).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedNonce = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  })

  return {
    nonce: nonce,
    hashedNonce: encodedNonce,
  }
}

// Use 'hashedNonce' when making the authentication request to Google
// Use 'nonce' when invoking the supabase.auth.signInWithIdToken() method
