"use client"
import { Filter } from "./filter";
import { DataTable } from "./table";

export default function AdminPanel() {
    return (
        <div>
            <Filter />
            <DataTable />
        </div>
    )
} 