// tests/dex.test.ts
import { describe, expect, it, beforeAll } from 'vitest';
import { Chain, Account, types } from '@hirosystems/clarinet-sdk';

describe('DEX Contract Tests', () => {
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

    describe('Pool Initialization', () => {
        it('should successfully initialize a new pool', () => {
            const block = chain.mineBlock([
                deployer.callContract('dex', 'initialize', [
                    types.principal(wallet1.address),
                    types.principal(wallet2.address)
                ])
            ]);
            expect(block.receipts[0].result).toContain('(ok true)');
        });

        it('should fail when initializing with same token addresses', () => {
            const block = chain.mineBlock([
                deployer.callContract('dex', 'initialize', [
                    types.principal(wallet1.address),
                    types.principal(wallet1.address)
                ])
            ]);
            expect(block.receipts[0].result).toContain('(err u104)'); // ERR-SAME-TOKEN
        });
    });

    describe('Pool Operations', () => {
        it('should return correct pool details after initialization', () => {
            chain.mineBlock([
                deployer.callContract('dex', 'initialize', [
                    types.principal(wallet1.address),
                    types.principal(wallet2.address)
                ])
            ]);
            
            const result = chain.callReadOnlyFn(
                'dex',
                'get-pool-details',
                [
                    types.principal(wallet1.address),
                    types.principal(wallet2.address)
                ],
                deployer.address
            );
            
            expect(result.result).toContain('balance-x: u0');
            expect(result.result).toContain('balance-y: u0');
        });
    });
});
