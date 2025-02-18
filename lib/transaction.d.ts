import { Log } from "@ethersproject/abstract-provider";
import EtherscanClient from "./clients/EtherscanClient";
import EthereumNodeClient from "./clients/EthereumNodeClient";
import { Contracts, Network, Participants, Trace, TransactionDetails, Transfer } from "./types/tx2umlTypes";
export declare class TransactionManager {
    readonly ethereumNodeClient: EthereumNodeClient;
    readonly etherscanClient: EtherscanClient;
    apiConcurrencyLimit: number;
    constructor(ethereumNodeClient: EthereumNodeClient, etherscanClient: EtherscanClient, apiConcurrencyLimit?: number);
    getTransactions(txHashes: string[], network: string): Promise<TransactionDetails[]>;
    getTransaction(txHash: string): Promise<TransactionDetails>;
    getTraces(transactions: TransactionDetails[]): Promise<Trace[][]>;
    getContractsFromTraces(transactionsTraces: Trace[][], configFilename?: string, abiFilename?: string, network?: Network): Promise<Contracts>;
    getTransferParticipants(transactionsTransfers: Transfer[][], block: number, network: Network, configFilename?: string): Promise<Participants>;
    fillContractsABIFromAddresses(contracts: Contracts & Participants, addresses: string[], abiFilename: string): Promise<void>;
    getContractsFromAddresses(addresses: string[]): Promise<Contracts>;
    setTokenAttributes(contracts: Contracts, network: Network): Promise<void>;
    configOverrides(contracts: Contracts & Participants, filename?: string): Promise<void>;
    static parseTraceParams(traces: Trace[][], contracts: Contracts): void;
    static parseTransactionLogs(logs: Array<Log>, contracts: Contracts): void;
    static parseTraceDepths(traces: Trace[][], contracts: Contracts): void;
    static filterTransactionTraces(transactionTraces: Trace[][], contracts: Contracts, options: {
        noDelegates?: boolean;
        excludedContracts?: string[];
    }): [Trace[][], Contracts];
}
