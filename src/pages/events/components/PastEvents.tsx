import { Outlet } from "react-router-dom"

export default function PastEvents() {

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <Outlet />
        </div>
    )
}