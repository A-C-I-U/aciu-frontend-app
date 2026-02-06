import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-8 h-full min-h-[90dvh]">
            <img
                src="/images/error-lamp-3d.webp"
                alt="404 Error Lamp 3d"
                className="object-cover max-w-83.75"
            />
            <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex flex-col gap-1 items-center justify-center max-w-109.25 text-center">
                    <h1 className="text-2xl leading-[1.3] text-aciu-border-grey">
                        Page Not Found
                    </h1>
                    <p className="text-aciu-neutral leading-[1.6]">
                        The page you’re looking for doesn’t exist or may have been moved.
                    </p>
                </div>
                <Link to="/dashboard" className="btn btn-primary text-base! max-w-52 leading-[1.55] tracking-wider">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    )
}