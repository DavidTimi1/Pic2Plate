import Link from "next/link";
import getUserSessionHistory from "../actions/history_actions"
import { HistoryConvoItem } from "../ui/convo-history";


export default async function History(){
    const allQueries = await getUserSessionHistory();
    const error = allQueries.error
    const history = error? undefined : allQueries.data;

    return (
        <div className="w-full min-h-full flex flex-col gap-10 items-center justify-center overflow-y-auto py-10 px-3">
        <h1 className="p-4 text-3xl text-center font-bold">
            Histories
        </h1>

            <div className="flex flex-col items-center justify-center w-full gap-5">
                {
                    history?

                        history.length?

                            history.map(
                                item => <HistoryConvoItem key={item.id}  {...item} />
                            )
                            :
                            <div className="">
                                You have not generated any recipes yet <br></br>
                                Click here to create your own recipe
                                
                                <Link href="/browse/upload" className="text-pink-600">
                                    Create your Recipe 💪
                                </Link>
                            </div>

                    : 
                        <div className="bg-red-500 text-white">
                            An error occured while fetching your history. <br></br>
                            No worrries it will be resolves ASAP. <br></br>
                            
                            <p>
                                You can get back to cooking 🔥
                            </p>

                            <Link href="/browse/upload" className="text-pink-600">
                                Create your Recipe 💪
                            </Link>
                        </div>
                }
            </div>
        </div>
    )
}