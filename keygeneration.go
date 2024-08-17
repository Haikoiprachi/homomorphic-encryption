package main

import (
    "crypto/rand"
    "crypto/rsa"
    "crypto/x509"
    "encoding/pem"
    "os"
)

func generateKeyPair() (*rsa.PrivateKey, error) {
    privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
    if err != nil {
        return nil, err
    }

    publicKey := &privateKey.PublicKey

    privateKeyBytes := x509.MarshalPKCS1PrivateKey(privateKey)
    privateKeyPEM := pem.EncodeToMemory(&pem.Block{
        Type:  "RSA PRIVATE KEY",
        Bytes: privateKeyBytes,
    })
    publicKeyBytes, err := x509.MarshalPKIXPublicKey(publicKey)
    if err != nil {
        return nil, err
    }
    publicKeyPEM := pem.EncodeToMemory(&pem.Block{
        Type:  "RSA PUBLIC KEY",
        Bytes: publicKeyBytes,
    })


    err = os.WriteFile("private.pem", privateKeyPEM, 0600)
    if err != nil {
        return nil, err
    }

    err = os.WriteFile("public.pem", publicKeyPEM, 0644)
    if err != nil {
        return nil, err
    }

    return privateKey, nil
}

func main() {
    _, err := generateKeyPair()
    if err != nil {
        panic(err)
    }
}
 


