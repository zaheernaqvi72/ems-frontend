import { Link } from "react-router-dom";

const Gemini = () => {
    return (
        <div className="fixed bottom-10 right-10 flex justify-center items-center">
            <Link 
                to="/genAI" 
                className="hover:scale-110 hover:rotate-90 transition-all duration-300 delay-300"
            >
                <img 
                    src="/Gemini-Logo.png" 
                    alt="Gemini Logo" 
                    className="w-14 h-14"
                />
            </Link>
        </div>
    );
}

export default Gemini;
