type Props = {
    title: string
    onClick?: () => void;
    disabled?: boolean;
}

export const Button = ({title, onClick, disabled}: Props) => {
    return (
        <button className="btn" disabled={disabled} onClick={onClick}>{title}</button>
    )
}
