"use client"
import { Filter } from "./filter";
import { AdminDataTable } from "./table";

export default function AdminPanel() {
    return (
        <div>
            <Filter />
            <AdminDataTable />
        </div>
    )
} 