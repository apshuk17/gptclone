import { type ReactNode } from "react";

type LayoutProps = {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div>{children}</div>
    )
}

export default Layout;