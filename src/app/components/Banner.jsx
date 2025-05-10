const Banner = (kind, props) => {
    let classNames = [
        "bg-linear-to-br",
        "py-24",
        "border-t-16",
        "border-accent"
    ];

    switch (kind) {
        case "dark":
            classNames.push("from-neutral-darkest, to-neutral-darker");
        case "accent":
            classNames.push("from-accent", "to-accent-darker");
        default: 
            classNames.push("from-accent", "to-accent-darker")
    }

    return (
        <div className={classNames.toString()}>
            <p className="font-headline text-5xl text-white uppercase italic font-bold text-center">{props.children}</p>
        </div>
    )
}