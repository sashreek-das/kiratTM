import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
export async function createOnRampTransaction(amount:number, provider:string){
    const session = await getServerSession(authOptions);
    const userId = session.user.id
    const tokenNum = Math.random().toString();

    if(!userId){
        return {
            mssg:"user not logged in"
        }
    }

    prisma.onRampTransaction.create({
        data:{
            userId : Number(userId),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: tokenNum

        }
    });
    return {
        mssg:"on ramp transactions added"
    }
}