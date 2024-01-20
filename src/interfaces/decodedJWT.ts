// decalre the type of the decoded JWT as string and use it
// to return the decoded JWT
interface DecodedJWT {
    user_id: number;
    user_role: string;
    user_email: string;
    exp: number;
}