export default function Button({ text , green}: any) {
    return (
        <button className={`text-sm text-white w-full animation-time  font-semibold p-4 rounded-full bg-green border border-solid border-green hover:bg-transparent hover:text-green
        ${green ? 'bg-primary border-primary hover:border-primary' : ''}
        `}>
            {text}
        </button>
    )
}
