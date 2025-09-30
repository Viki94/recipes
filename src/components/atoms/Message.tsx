interface MessageProps {
    message: string | string[];
    type?: "error" | "success";
}

const Message: React.FC<MessageProps> = ({ message, type = "error" }) => {
    return (
        <div className={`p-3 rounded-md ${type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {Array.isArray(message) ? (
                <ul className="list-disc pl-5">
                    {message.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
};

export default Message;
