import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";


export function PageLoader() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-4"
      style={{ animation: 'fadeIn 200ms ease-in' }}
    >
      <CircularProgress sx={{ color: '#00B686' }} />
      <p>Loading...</p>
    </div>
  )
}

export function DelayedLoader({ delay = 600 }: { delay?: number }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return show ? <PageLoader /> : null
}