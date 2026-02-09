import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from "@mui/material";

export default function TableSkeleton({ columns = 5, rows = 5 }: { columns?: number, rows?: number }) {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto", border: "1px solid #EAECF0", boxShadow: "none" }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ height: "2.5rem", backgroundColor: "#F9FAFB" }}>
                        {Array.from({ length: columns }).map((_, i) => (
                            <TableCell key={i} sx={{ padding: ".75rem 1.5rem", borderBottom: "1px solid #EAECF0" }}>
                                <Skeleton variant="text" width="60%" height={20} animation="wave" />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <TableCell key={colIndex} sx={{ padding: "1rem 1.5rem", borderBottom: "1px solid #EAECF0" }}>
                                    <Skeleton variant="text" width="80%" height={24} animation="wave" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}