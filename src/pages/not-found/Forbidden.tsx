import { Link } from "react-router-dom";

const ForbiddenPage = () => (
  <div className="mx-7 flex flex-col items-center justify-center gap-8 min-h-[90dvh] px-4">
    <div className="flex flex-col gap-2 items-center max-w-xl text-center">
      <h1 className="font-clash-display text-5xl text-aciu-border-grey mb-2">
        403 Access Denied
      </h1>

      <h2 className="text-2xl font-semibold text-aciu-border-grey mb-4">
        Whoops! You’ve reached a page you can’t access.
      </h2>

      <p className="text-aciu-neutral leading-[1.6] font-medium">
        This section of the dashboard is restricted based on your account role.
      </p>
      <p className="text-aciu-neutral leading-[1.6] font-medium">
        If you think this is a mistake, please contact your administrator or support team.  
        Otherwise, you can return to your dashboard to continue exploring sections you have access to.
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <Link
        to="/dashboard"
        className="btn btn-primary text-base! max-w-52.5 w-full sm:w-auto leading-[1.55] tracking-wide"
      >
        Go to Dashboard
      </Link>

      <Link
        to="/support"
        className="btn btn-secondary text-base! max-w-52.5 w-full sm:w-auto leading-[1.55] tracking-wide"
      >
        Contact Support
      </Link>
    </div>
  </div>
);

export default ForbiddenPage;
