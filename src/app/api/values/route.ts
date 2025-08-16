import { NextResponse } from "next/server";
import { Value } from "@/types/value_t";

export async function GET() {
    const values: Value[] = [
        {
            id: 1,
            title: "Empathy",
            description: "People comes first! no matter what",
        },
        {
            id: 2,
            title: "Ownership",
            description: "What you start, you should finsish as well",
        },
        {
            id: 3,
            title: "Flexibility",
            description: "Skills are not limited, expand and grow :)",
        },
        {
            id: 4,
            title: "Attitude",
            description: "Comes First!",
        },
        {
            id: 5,
            title: "Fast Delivery",
            description: "Budgets are important, Deliver fast and deliver well",
        },
        {
            id: 6,
            title: "Collaboration",
            description: "Teamwork makes the dream work! Collaborate and grow together",
        },
    ];

    return NextResponse.json(values);
}
