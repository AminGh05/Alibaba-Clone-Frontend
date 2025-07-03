export interface ProfileDto {
    accountPhoneNumber: string;
    email: string;
    balance: number;

    firstName: string;
    lastName: string;
    idNumber: string;
    personPhoneNumber: string;
    birthDate: string | null;

    iban: string;
    bankAccountNumber: string;
    cardNumber: string;
}
