export const BranchInitials = ({ branchName }: { branchName: string }) => {
    const nameParts = branchName.split(' ');
    let initials = '';

    for (let i = 0; i < nameParts.length; i++) {
        if (nameParts[i].length > 0 ) {
            initials += nameParts[i][0].toUpperCase();
        }
    }

    return (
        <div
            className="flex items-center justify-center w-17 h-17 border-3 border-aciu-green-normal bg-aciu-green-light-hover rounded-[2.125rem]"
        >
            <p
                className="font-coolvetica font-bold text-2xl leading-6"
            >
                {initials}
            </p>
        </div>

    )
}