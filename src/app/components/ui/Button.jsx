import Link from "next/link"

const Button = ({ kind = "primary", to, children }) => {
    if (typeof to !== "string" || to === "") {
        console.error("Button.jsx: Please provide a valid link destination!")
        return <></>
    }

    let classNames = "bg-accent border border-transparent hover:border-accent hover:bg-white hover:text-black text-white px-4 py-2 transition-colors font-headline italic uppercase font-bold";

    if (kind === "secondary") {
        classNames = "bg-white border border-transparent hover:border-accent hover:text-black text-accent px-4 py-2 transition-colors font-headline italic uppercase font-bold";
    }

    return (
        <Link href={to}>
            <span className={classNames}>{children}</span>
        </Link>
    )
}

export default Button