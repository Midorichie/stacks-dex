;; Title: liquidity-token.clar
;; Description: SIP-010 compliant liquidity token contract

(impl-trait .sip-010-trait.sip-010-trait)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant token-name "DEX Liquidity Token")
(define-constant token-symbol "DLP")
(define-constant token-decimals u6)

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-INVALID-AMOUNT (err u101))
(define-constant ERR-INVALID-RECIPIENT (err u102))

;; Token data
(define-fungible-token dlp-token)

;; SIP-010 Implementation
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        ;; Validate input parameters
        (asserts! (> amount u0) ERR-INVALID-AMOUNT)
        (asserts! (not (is-eq recipient sender)) ERR-INVALID-RECIPIENT)
        
        ;; Authorization check
        (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
        
        ;; Perform transfer
        (try! (ft-transfer? dlp-token amount sender recipient))
        
        ;; Handle memo if provided
        (match memo memo-data
            (begin 
                (print memo-data)
                true
            )
            true
        )
        (ok true)
    )
)

(define-read-only (get-name)
    (ok token-name)
)

(define-read-only (get-symbol)
    (ok token-symbol)
)

(define-read-only (get-decimals)
    (ok token-decimals)
)

(define-read-only (get-balance (who principal))
    (ok (ft-get-balance dlp-token who))
)

(define-read-only (get-total-supply)
    (ok (ft-get-supply dlp-token))
)
