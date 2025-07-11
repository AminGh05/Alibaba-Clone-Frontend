import { ProfileDto } from "@/shared/models/account/ProfileDto"
import agent from "../agent"
import { EditEmailDto } from "@/shared/models/account/EditEmailDto";
import { EditPasswordDto } from "@/shared/models/account/EditPasswordDto";
import { UpsertBankAccountDto } from "@/shared/models/account/UpsertBankAccountDto";
import { PersonDto } from "@/shared/models/account/PersonDto";
import { TicketOrderSummaryDto } from "@/shared/models/transaction/TicketOrderSummaryDto";
import { TransactionDto } from "@/shared/models/transaction/TransactionDto";
import { TopUpDto } from "@/shared/models/transaction/TopUpDto";

export const getProfile = async () => {
    return await agent.get<ProfileDto>("/Account/profile");
}

export const editEmail = async (data: EditEmailDto) => {
    return await agent.put<void>("/Account/email", data);
}

export const editPassword = async (data: EditPasswordDto) => {
    return await agent.put<void>("/Account/password", data);
}

export const upsertBankAccountDetails = async (data: UpsertBankAccountDto) => {
    return await agent.post<void>("/Account/bank-account-details", data);
}

export const getMyPeople = async () => {
    return await agent.get<ProfileDto[]>("/Account/people");
}

export const upsertAccountPerson = async (data: PersonDto) => {
    return await agent.post<number>("/Account/account-person", data);
}

export const upsertPerson = async (data: PersonDto) => {
    return await agent.post<number>("/Account/person", data);
}

export const getMyTravels = async () => {
    return await agent.get<TicketOrderSummaryDto[]>("/Account/my-travels");
}

export const getMyTransactions = async () => {
    return await agent.get<TransactionDto[]>("/Account/my-transactions");
}

export const topUp = async (data: TopUpDto) => {
    return await agent.post<number>("/Account/top-up", data);
}
