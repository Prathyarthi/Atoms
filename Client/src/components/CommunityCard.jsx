import doctorLogo from "../../assets/doctor-image.png";

function CommunityCard({ title, description }) {
    return (
        <div className="h-[90vh] m-6 mx-auto w-[80vw]">
            <div className="h-[45vh] bg-gradient-to-r from-slate-900 to-slate-500 border flex w-90 border-black rounded-3xl mx-auto">
                <div className="flex flex-col justify-center m-2 items-center w-1/2">
                    <h1 className="text-5xl text-gray-50 font-medium pl-10">{title}</h1>
                    <p className="text-gray-50">{description}</p>
                    <div className="my-5 flex">
                        <button className="bg-gray-50 border-[2px] border-black hover:bg-slate-900 hover:border-black  text-black font-bold py-2 px-4 rounded">Join Today</button>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <img src={doctorLogo} className="h-full" alt="logo" />
                </div>
            </div>
        </div>
    )
}

export default CommunityCard;