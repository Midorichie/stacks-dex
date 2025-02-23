// tests/liquidity-token.test.ts
import { describe, expect, it, beforeAll } from 'vitest';
import { Chain, Account, types } from '@hirosystems/clarinet-sdk';

describe('Liquidity Token Contract Tests', () => {
    let chain: Chain;
    let deployer: Account;
    let wallet1: Account;
    let wallet2: Account;

    beforeAll(() => {
        chain = new Chain();
        deployer = new Account("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM");
        wallet1 = new Account("ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5");
        wallet2 = new Account("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG");
    });

    describe('SIP-010 Trait Implementation', () => {
        it('should return correct token name', () => {
            const result = chain.callReadOnlyFn(
                'liquidity-token',
                'get-name',
                [],
                deployer.address
            );
            expect(result.result).toContain('DEX Liquidity Token');
        });

        it('should return correct token symbol', () => {
            const result = chain.callReadOnlyFn(
                'liquidity-token',
                'get-symbol',
                [],
                deployer.address
            );
            expect(result.result).toContain('DLP');
        });

        it('should return correct decimals', () => {
            const result = chain.callReadOnlyFn(
                'liquidity-token',
                'get-decimals',
                [],
                deployer.address
            );
            expect(result.result).toContain('(ok u6)');
        });
    });

    describe('Transfer Operations', () => {
        it('should fail transfer with zero amount', () => {
            const block = chain.mineBlock([
                wallet1.callContract('liquidity-token', 'transfer', [
                    types.uint(0),
                    types.principal(wallet1.address),
                    types.principal(wallet2.address),
                    types.none()
                ])
            ]);
            expect(block.receipts[0].result).toContain('(err u101)'); // ERR-INVALID-AMOUNT
        });

        it('should fail transfer to self', () => {
            const block = chain.mineBlock([
                wallet1.callContract('liquidity-token', 'transfer', [
                    types.uint(100),
                    types.principal(wallet1.address),
                    types.principal(wallet1.address),
                    types.none()
                ])
            ]);
            expect(block.receipts[0].result).toContain('(err u102)'); // ERR-INVALID-RECIPIENT
        });
    });
});
