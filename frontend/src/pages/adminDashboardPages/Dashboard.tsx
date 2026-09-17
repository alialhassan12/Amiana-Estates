import { useGetDashboardStats } from "../../hooks/useDashboard";

const Dashboard=()=>{
    const {data}=useGetDashboardStats();

    const cards=[
        {
            title:"Properties",
            count:data?.totalProperties,
        },
        {
            title:"Property Types",
            count:data?.totalPropertyTypes,
        },
        {
            title:"Penthouses",
            count:data?.totalPenthouses,
        },
        {
            title:"Experience Specifications",
            count:data?.totalExperienceSpecifications,
        }
    ];

    return(
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h1 className="text-2xl font-medium">Welcome back Admin</h1>
                <h2 className="text-sm text-neutral-600">Here's an overview of your estate</h2>
            </div>

            {/* cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card,index)=>{
                    return(
                        <div
                            key={index}
                            className="flex flex-col gap-2 p-6 border border-neutral-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-all"
                        >
                            <h3 className="text-sm font-semibold text-neutral-700">{card.title}</h3>
                            <p className="text-3xl font-bold text-neutral-900">{card.count}</p>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default Dashboard;