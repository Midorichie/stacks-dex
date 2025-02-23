;; Title: sip-010-trait.clar
;; Description: SIP-010 Fungible Token Interface

(define-trait sip-010-trait
    (
        ;; Transfer from the caller to a new principal
        (transfer (uint principal principal (optional (buff 34))) (response bool uint))

        ;; Get the token balance of the specified principal
        (get-balance (principal) (response uint uint))

        ;; Get the current total supply
        (get-total-supply () (response uint uint))

        ;; Get the token name
        (get-name () (response (string-ascii 32) uint))

        ;; Get the token symbol
        (get-symbol () (response (string-ascii 32) uint))

        ;; Get the number of decimals
        (get-decimals () (response uint uint))
    )
)
